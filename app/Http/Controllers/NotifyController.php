<?php

namespace App\Http\Controllers;

use App\Orders;
use App\Recharges;
use Log;
use Validator;
use App\Jobs\Notify;
use App\Jobs\Recharge;
use Lucid\Jsonrpc\Jsonrpc;
use Illuminate\Support\Facades\Input;

class NotifyController extends Controller
{

    /**
     * 支付异步回调
     */
    public static function notify()
    {
        $data = json_decode(Input::get('params'), true);
        Log::info(json_encode($data, true));
        $orders = Orders::where('order_sn', $data['pay_sn'])
            ->where('order_state', '已支付')
            ->first();

        if (!empty($orders)) {
            Log::info('返回success');
            return ['status' => "success"];
        }
        //将异步回调请求放入队列
        dispatch(new Notify($data));
        return ['status' => "success"];
    }


    /**
     * 充值异步回调
     */
    public static function rechargeNotify()
    {
        $data = json_decode(Input::get('params'), true);
        $recharge = Recharges::where('trade_no',$data['pay_sn'])
            ->where('state','payed')
            ->first();
        if (!empty($recharge)) {
            Log::info('返回success');
            return ['status' => "success"];
        }
        //将异步回调请求放入队列
        dispatch(new Recharge($data));
        return ['status' => "success"];
    }


    public function rpcClient()
    {
        $json = new Jsonrpc(
            config('jsonrpc.client.cloud.route'),
            'GET',
            config('jsonrpc.client.cloud.key')
        );

        $params = [
            'out_trade_no' => '444444444444',//充值平台交易号
            'amount' => 1,
            'pay_sn' => '2017042517520700000',
            'extra' => [
                'pay_way' => 'alipay', //支付方式
                'members_exclusive_uuid' => '',
            ],
        ];
        $result = $json->send('notify', 'Notify.notify', $params);
        print_r($result);
        exit;
    }

}
