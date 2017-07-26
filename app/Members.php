<?php

namespace App;

use Illuminate\Http\Request;
use Validator;
use App\Base;

class Members extends Base
{
    /**
     * 获取个人中心数据
     * (默认所有订单)
     */
    public static function getInfoBymobile($request)
    {
        $validator = Validator::make($request->all(), [
            'mobile' => 'required|valid_mobile',
        ]);

        if ($validator->fails()) {
            return output(false, $validator->errors());
        }

        $member =  Members::where(['mobile'=>$request->mobile])->first();
        return $member->toArray();
    }

    /**
     *
     */
    public static function getInfoByuuid($request)
    {
        $member =  Members::where(['uuid'=>$request])->first();
        return $member->toArray();
    }
}
