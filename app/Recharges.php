<?php

namespace App;

use App\Jobs\Recharge;
use Illuminate\Database\Eloquent\Model;
use UUID;
use Log;
use Lucid\Jsonrpc\Jsonrpc;

class Recharges extends Base
{

    /**
     * 创建充值记录
     * @param $request
     * @return Recharges|bool
     */
    public static function createRecharge($request)
    {
        $rechargeSn = static::generate();
        if (!$rechargeSn) {
            return false;
        }

        $recharges = new Recharges();
        $recharges->uuid = UUID::generate()->string;
        $recharges->trade_no = $rechargeSn;
        $recharges->members_uuid = session('uuid');
        $recharges->state = 'not_payed';
        $recharges->amount = $request->money*100;
        $recharges->method = $request->pay_way;
        $recharges->inout = 'in';
        $result = $recharges->save();
        if (!$result) {
            return false;
        }
        return $recharges;
    }



    /**
     *发起充值
     */
    public static function sendRecharge($uuid, $method)
    {
        $recharge = Recharges::where('uuid', $uuid)
                              ->where('state', 'not_payed')
                              ->first();

        if (is_null($recharge)) {
            return false;
        }

        //rpc配置
        $json = new Jsonrpc(
            config('jsonrpc.client.cloud.route'),
            'POST',
            config('jsonrpc.client.cloud.key')
        );

        $result ='';
        $params = [
            'client_type' => 'pc',
            'pay_sn' => $recharge->trade_no,
            'amount' => $recharge->amount,
            'return_url' => action('MembersController@myblance'),
            'goods' => [ '荟酒虚拟商品' ],
            'extra' => [
                'callback_route' => config('app.url').config('jsonrpc.server.prefix'),
                'callback_key' => config('app.key'),
                'callback_method' => 'POST',
                'callback_resolver' => 'rechargeNotify',
                'callback_class' => 'Notify.rechargeNotify',
                'members_exclusive_uuid'=>'',
                'pay_way'=>$method,
            ]
        ];


        //支付宝
        if ($method === 'alipay') {
            $result = $json->send('pay', 'Ali.pay', $params);
        }


        //农行
        if ($method === 'ABC') {
            $result = $json->send('pay', 'Abchina.pay', $params);
        }


        //银联
        if ($method === 'bank') {
            $result = $json->send('pay', 'Union.pay', $params);
        }


        //微信
        if ($method === 'weixin') {
            $result = $json->send('pay', 'Wechat.pay', $params);
        }

        if ($result->data['status'] != 'success') {
            return false;
        }
        return $result->data['data']['pay_url'];
    }


    /**
     * 创建余额流水
     */
    public static function createBalanceFlows($data)
    {
        $recharge = Recharges::where('trade_no', $data['pay_sn'])
                                ->first();

        $flows = new Flows();
        $flows->uuid = UUID::generate()->string;
        $flows->members_uuid = $recharge->members_uuid;
        $flows->amount = $recharge->amount;
        $flows->out_trade_no = $data['out_trade_no'];
        $flows->inout = 'in';
        $flows->type = 'balance';
        $flows->note = json_encode(['msg'=>'用户线上充值成功，单号：','order_sn'=>$recharge->trade_no]);
        $result = $flows->save();
        if (!$result) {
            Log::info($data['pay_sn'].'--创建余额充值流水失败:');
            return false;
        }
        return $flows;
    }

    /**
     * 修改充值单支付状态
     */
    public static function updateRecharge($data)
    {
        $result = Recharges::where('trade_no', $data['pay_sn'])
                            ->update(['state'=>'payed']);
        if (!$result) {
            Log::info($data['pay_sn'].'--修改充值状态失败:');
            return false;
        }
        return true;
    }


    /**
     * 修改用户余额
     */
    public static function updateBalance($data)
    {
        $recharge = Recharges::where('trade_no', $data['pay_sn'])
                                ->first();

        $result = Members::where('uuid', $recharge->members_uuid)
                                ->increment('balance', $data['amount']);
        if (!$result) {
            Log::info($data['pay_sn'].'--修改余额失败:');
            return false;
        }

        return true;
    }

    /**
     * 修改用户积分
     */
    public static function updatePoints($data)
    {
        $setting = Setting::where('key', 'point')->first();
        $value = json_decode($setting->value, true);

        $recharge = Recharges::where('trade_no', $data['pay_sn'])
                                ->first();

        $returnPoints = floor($value['return_ratio']*$recharge->amount / 1000000);

        $result = Members::where('uuid', $recharge->members_uuid)
                                ->increment('points', $returnPoints);
        if (!$result) {
            Log::info($data['pay_sn'].'--修改积分失败:');
            return false;
        }

        $recharge->points = $returnPoints;

        return $recharge;
    }


    /**
     *创建积分奖励记录
     */
    public static function returnPoints($recharge)
    {
        $flows = new Flows();
        $flows->uuid = UUID::generate()->string;
        $flows->members_uuid = $recharge->members_uuid;
        $flows->amount = $recharge->points;
        $flows->inout = 'in';
        $flows->type = 'points';
        $flows->note = json_encode(['msg'=>'充值奖励积分','order_sn'=>$recharge->trade_no]);
        $result = $flows->save();
        if (!$result) {
            Log::info($recharge->trade_no.'--奖励积分失败:');
            return false;
        }
        return true;
    }

    /**
     *
     * 生成充值单号
     *
     * @return string
     */
    public static function generate()
    {
        //RPC发起短信日志记录
        $json = new Jsonrpc(
            config('jsonrpc.client.cloud.route'),
            'POST',
            config('jsonrpc.client.cloud.key')
        );

        $result = $json->send('factory', 'SerialNumber.rechargeSn');
        if ($result->success && $result->data) {
            return $result->data;
        }
        return false;
    }
}
