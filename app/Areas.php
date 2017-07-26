<?php

namespace App;

use App\Base;

class Areas extends Base
{
    /**
     *
     * 获取祖先树路径
     *
     * @param  string $uuid      UUID
     * @param  string $seperator 分隔符
     * @return string
     */
    public static function getParentsPath($uuid, $seperator = '')
    {
        $area = static::find($uuid);
        if (is_null($area)) {
            return '';
        }

        $result = static::where('lft', '<=', $area->lft)
                        ->where('rgt', '>=', $area->rgt)
                        ->orderBy('lft')
                        ->pluck('name');
        return implode($seperator, $result->toArray());
    }
}
