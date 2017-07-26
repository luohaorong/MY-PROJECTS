<?php

namespace App;

use Cache;

class Floors extends Base
{
    /**
     *
     * 获取楼层信息
     *
     * @return array
     */
    public static function getFloorBar()
    {
        $floorBar = Cache::get('floor_bar');
        if (!is_null($floorBar)) {
            return $floorBar;
        }
        $data = static::all([ 'uuid', 'thumb', 'title', 'sub_title', 'image', 'goods_uuid' ])->toArray();
        Cache::put('floor_bar', $data, 15);
        return $data;
    }
}
