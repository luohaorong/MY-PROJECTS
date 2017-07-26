<?php

namespace App;

use App\Base;
use UUID;

class RecentScans extends Base
{
    /**
     *
     * 添加商品浏览足迹
     *
     * @param  string  $goodsUuid  商品UUID
     * @param  string  $memberUuid 会员UUID
     * @return boolean
     */
    public static function addFootPrint($goodsUuid, $memberUuid)
    {
        $isExist = static::where('members_uuid', $memberUuid)
                                ->where('goods_uuid', $goodsUuid)
                                ->exists();
        if ($isExist) {
            return true;
        }
        $recentScans = new static();
        $recentScans->uuid = UUID::generate()->string;
        $recentScans->members_uuid = $memberUuid;
        $recentScans->goods_uuid = $goodsUuid;
        $result = $recentScans->save();
        return $result;
    }
}
