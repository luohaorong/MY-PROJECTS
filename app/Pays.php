<?php

namespace App;

use App\Http\Requests\Request;
use Validator;
use App\OrderGoods;
use App\Base;
use UUID;
use Illuminate\Session;
use Log;
use Carbon\Carbon;
use Lucid\Jsonrpc\Jsonrpc;
use App\Jobs\Notify;

class Pays extends Base
{

    /**
     * 订单校验
     */
    public static function check($data)
    {
        //校验订单
        $order = Orders::where('order_sn', $data['pay_sn'])
                        ->where('order_state', '待支付')
                        ->first();

        if (is_null($order)) {
            Log::info($data['pay_sn'].'--订单错误:');
            return false;
        }

        //校验支付金额
        if ($order->payed_amount != $data['amount']) {
            Log::info($data['pay_sn'].'--支付金额错误:');
            return false;
        }

        return $order;
    }


    /**
     * 创建支付日志并修改支付状态
     */
    public static function createUpdate($data, $order)
    {
        $paySn = static::generate();
        if (!$paySn) {
            Log::info('订单：'.$data['pay_sn'].'，支付单号：'.$paySn.'--生成支付单号失败');
            return false;
        }

        //创建支付日志表
        $pay = new static();
        $pay->uuid = UUID::generate()->string;
        $pay->pay_sn = $paySn;
        $pay->money = $data['amount'];
        $pay->trade_no = $data['out_trade_no'];
        $pay->order_no = $data['pay_sn'];
        $pay->members_uuid = $order->members_uuid;
        $pay->pay_way = $data['extra']['pay_way'];
        $result = $pay->save();
        if (!$result) {
            Log::info($data['pay_sn'].'--创建支付记录失败:');
            return false;
        }

        //修改订单状态
        $order->pay_sn = $paySn;
        $order->order_state = "已支付";
        $order->pay_method = $data['extra']['pay_way'];
        $order->payed_at = Carbon::now()->toDateTimeString();
        if ($data['extra']['pay_way'] === 'balance') {
            $order->use_balance = $order->payed_amount;
        }

        $result = $order->save();
        if (!$result) {
            Log::info($data['pay_sn'].'--修改订单状态失败:');
            return false;
        }
        return true;
    }

    /**
     * 扣除用户冻结金币
     */
    public static function deductCorns($order)
    {
        $result = Members::where('uuid', $order->members_uuid)
                            ->decrement('corns', $order->use_corns);

        if (!$result) {
            Log::info('--扣除用户总金币失败');
            return false;
        }

        $result = Members::where('uuid', $order->members_uuid)
                            ->decrement('freeze_corns', $order->use_corns);
        if (!$result) {
            Log::info('--扣除用户冻结金币失败');
            return false;
        }

        return true;
    }

    /**
     * 修改用户独家商品状态
     */

    public static function exclusive($data)
    {
        $uuid = $data['extra']['members_exclusive_uuid'];
        if (empty($uuid)) {
            return true;
        }
        $result  = MembersExclusives::where('uuid', $uuid)
            ->update(['status'=>'true']);
        if (!$result) {
            return false;
        }
        return true;
    }

    /**
     * 修改用户余额
     */
    public static function updateBalance($order)
    {
        $result = Members::where('uuid', $order->members_uuid)
                            ->where('is_locked', 'no')
                            ->decrement('balance', $order->payed_amount);

        if (!$result) {
            return false;
        }

        return true;
    }


    /**
     * 发起支付
     */
    public static function sendPay($order_id, $method)
    {
        $order = Orders::where('uuid', $order_id)
                        ->where('members_uuid', session('uuid'))
                        ->where('order_state', '待支付')
                        ->first();

        //如果订单超时
        if (is_null($order)) {
            return 'timeout';
        }

        //判断独家订单
        $member_exclusive = MembersExclusives::where('orders_uuid', $order_id)->first();

        $members_exclusive_uuid = is_null($member_exclusive) ? '' : $member_exclusive->uuid;

        //配置RPC
        $result = '';
        $json = new Jsonrpc(
            config('jsonrpc.client.cloud.route'),
            'POST',
            config('jsonrpc.client.cloud.key')
        );

        //支付请求参数
        $params = [
            'client_type' => 'pc',
            'pay_sn' => $order->order_sn,
            'amount' => $order->payed_amount,
            'return_url' => action('OrdersController@orderDetail', ['orders_uuid'=>$order->uuid]),
            'goods' => [ '荟酒实物商品' ],
            'extra' => [
                'callback_route' => config('app.url').config('jsonrpc.server.prefix'),
                'callback_key' => config('app.key'),
                'callback_method' => 'POST',
                'callback_resolver' => 'notify',
                'callback_class' => 'Notify.notify',
                'members_exclusive_uuid'=>$members_exclusive_uuid,
                'pay_way'=>$method,
            ]
        ];

        //支付宝支付
        if ($method === 'alipay') {
            $result = $json->send('pay', 'Ali.pay', $params);
        }


        //银联支付
        if ($method === 'bank') {
            $result = $json->send('pay', 'Union.pay', $params);
        }

        //农行
        if ($method === 'ABC') {
            $result = $json->send('pay', 'Abchina.pay', $params);
        }

        //微信支付
        if ($method === 'weixin') {
            $result = $json->send('pay', 'Wechat.pay', $params);
        }
        Log::info(json_encode($result));

        //余额支付
        if ($method === 'balance') {
            //判断余额是否够支付订单

            $member = Members::find(session('uuid'));
            if ($member->balance <= $order->payed_amount) {
                $result = response()->json(configs('error_code.10010'));
                return $result;
            }

            //余额支付没有三方单号
            $data['amount'] = $order->payed_amount;
            $data['out_trade_no'] = 'balance'.$order['order_sn'];
            $data['pay_sn'] = $order['order_sn'];
            $data['client_type'] = 'pc';
            $data['return_url'] = action('OrdersController@orderDetail', ['orders_uuid'=>$order->uuid]);
            $data['goods'] = [ '荟酒实物商品' ];
            $data['extra'] = [
                'pay_way'=>$method,
                'members_exclusive_uuid' =>$members_exclusive_uuid,
            ];
            //将余额支付放入队列
            dispatch(new Notify($data));
            $result = action('OrdersController@orderDetail', ['orders_uuid'=>$order_id]);
            return $result;
        }

        if ($result->data['status'] != 'success') {
            return false;
        }

        return $result->data['data']['pay_url'];
    }

    /**
     * 支付完成发送短信
     *
     */
    public static function sendSms($order)
    {
        //RPC发起短信日志记录
        $json = new Jsonrpc(
            config('jsonrpc.client.cloud.route'),
            'POST',
            config('jsonrpc.client.cloud.key')
        );

        $address = json_decode($order->address, true);

        $params = [];
        $params['mobile'] = [ $address['mobile'] ];

        $dat = [];
        $dat['create_time'] = Carbon::parse($order->created_at)->format('Y年m月d日 H:i');
        $dat['order_sn'] = $order->order_sn;
        $params['content'] = trans_message('sms.payed_success', $dat);

        $result = $json->send('sms', 'Kingtto.send', $params);
        return $result;
    }

    /**
     *
     * 生成支付单号
     *
     * @return string
     */
    public static function generate()
    {
        $json = new Jsonrpc(
            config('jsonrpc.client.cloud.route'),
            'POST',
            config('jsonrpc.client.cloud.key')
        );

        $result = $json->send('factory', 'SerialNumber.paySn');
        if ($result->success && $result->data) {
            return $result->data;
        }
        return false;
    }
}
