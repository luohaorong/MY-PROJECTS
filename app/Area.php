<?php

namespace App;

class Area extends Base
{
    /**
     *
     * 获取子孙集合
     *
     * @param  string $uuid UUID
     * @return array
     */
    public static function getChildren($uuid)
    {
        $area = static::find($uuid);
        if (is_null($area)) {
            return null;
        }

        $result = static::where('lft', '>=', $area->lft)
                        ->where('rgt', '<=', $area->rgt)
                        ->orderBy('lft')
                        ->pluck('uuid');

        return $result;
    }
}
