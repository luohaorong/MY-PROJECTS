<?php

namespace App;

use Validator;
use App\Base;

class OrderGoods extends Base
{
    /**
     * 根据订单uuid 得到所购商品
     */
    public static function getGoodsByorderid($request)
    {
        $validator = Validator::make($request, [
            'uuids' => 'required',
        ]);

        if ($validator->fails()) {
            return output(false, $validator->errors());
        }

        $order =  OrderGoods::wherein('orders_uuid', $request)->get();
        return $order->toArray();
    }
}
