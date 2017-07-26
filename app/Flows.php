<?php

namespace App;

use App\Http\Requests\Request;
use Validator;
use App\Base;
use UUID;
use Illuminate\Session;

class Flows extends Base
{

    /**
     * 创建余额消费记录
     */
    public static function consumeBalance($order)
    {
        $flow = new Flows();
        $flow->uuid = UUID::generate()->string;
        $flow->members_uuid = $order->members_uuid;
        $flow->amount = $order->payed_amount;
        $flow->inout = 'out';
        $flow->type = 'balance';
        $flow->note = json_encode(['msg'=>'余额支付','order_sn'=>$order->order_sn]);
        $result = $flow->save();
        if (!$result) {
            return false;
        }
        return true;
    }

    /**
     * 创建金币消费记录
     */
    public static function consumeCorns($order)
    {
        $flows = new Flows();
        $flows->uuid = UUID::generate()->string;
        $flows->members_uuid = $order->members_uuid;
        $flows->amount = $order->use_corns;
        $flows->inout = 'out';
        $flows->type = 'corns';
        $flows->note = json_encode(['msg'=>'支付订单抵扣金币','order_sn'=>$order->order_sn]);
        $result = $flows->save();
        if (!$result) {
            return false;
        }
        return true;
    }
}
