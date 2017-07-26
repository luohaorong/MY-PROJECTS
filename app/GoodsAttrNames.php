<?php

namespace App;

use App\Base;

class GoodsAttrNames extends Base
{
    /**
     *
     * 获取祖先树形数组
     *
     * @param  string $uuid UUID
     * @param  string $struct 返回数据结构
     * @return array
     */
    public static function getTreeArray($uuid, $struct = 'array')
    {
        $attrName = static::find($uuid);
        if (is_null($attrName)) {
            return null;
        }

        if ($struct === 'array') {
            $result = static::where('lft', '<=', $attrName->lft)
                        ->where('rgt', '>=', $attrName->rgt)
                        ->orderBy('lft')
                        ->get(['uuid', 'name', 'is_warehouse', 'category', 'parent_uuid']);
            return $result->toArray();
        }

        if ($struct === 'pluck') {
            $result = static::where('lft', '<=', $attrName->lft)
                        ->where('rgt', '>=', $attrName->rgt)
                        ->orderBy('lft')
                        ->pluck('name', 'uuid', 'is_warehouse', 'category', 'parent_uuid');
            return $result->toArray();
        }
        

        return [];
    }

    /**
     *
     * 批量获取祖先树形数组
     *
     * @param  string $uuid UUID
     * @return array
     */
    public static function getBatchTreeArray($uuids)
    {
        $result = [];
        foreach ($uuids as $uuid) {
            $tmp = static::getTreeArray($uuid);
            $result = array_merge($result, $tmp);
        }
        return $result;
    }
}
