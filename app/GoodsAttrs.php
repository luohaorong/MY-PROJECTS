<?php

namespace App;

use App\GoodsAttrNames;
use App\GoodsAttrValues;
use App\Base;

class GoodsAttrs extends Base
{
    /**
     *
     * 根据分类获取可提供筛选的条件
     *
     * @param  category $uuid 分类UUID
     * @return array
     */
    public static function getAvailableAttrbute($uuid)
    {
        // 获取存在商品关联的商品属性
        $attributes = static::where('goods_categories_uuid', $uuid)
                                ->distinct('goods_attr_names_uuid')
                                ->pluck('goods_attr_names_uuid', 'goods_attr_values_uuid')
                                ->toArray();

        // 获取属性名详细信息
        $attrNames = GoodsAttrNames::whereIn('uuid', array_values($attributes))
                                    ->where('is_filter', 'yes')
                                    ->get([ 'uuid', 'name', 'parent_goods_attr_values_uuid', 'parent_uuid', 'lft' ])
                                    ->toArray();

        $tmp = [];
        foreach ($attrNames as $value) {
            if (!empty($value['parent_goods_attr_values_uuid'])) {
                $tmp[] = $value['parent_goods_attr_values_uuid'];
            }
        }
        $vTmp = array_merge(array_keys($attributes), $tmp);

        // 获取属性值详细信息
        $attrValues = GoodsAttrValues::whereIn('uuid', $vTmp)
                                        ->get([ 'uuid', 'name', 'goods_attr_names_uuid' ])
                                        ->toArray();

        $kTmp = [];
        foreach ($attrValues as $value) {
            if (in_array($value['uuid'], $tmp)) {
                $kTmp[] = $value['goods_attr_names_uuid'];
            }
        }

        $attrNamesTmp = GoodsAttrNames::whereIn('uuid', $kTmp)
                                    ->where('is_filter', 'yes')
                                    ->get([ 'uuid', 'name', 'parent_goods_attr_values_uuid', 'parent_uuid', 'lft' ])
                                    ->toArray();
        $attrNames = array_merge($attrNames, $attrNamesTmp);

        usort($attrNames, 'sort_by_lft');

        // 整理层次关系
        $result = [];
        foreach ($attrNames as $value) {
            $value['parent_uuid'] = $value['parent_goods_attr_values_uuid'];
            unset($value['parent_goods_attr_values_uuid']);
            $result[] = $value;
        }

        foreach ($attrValues as $value) {
            $value['parent_uuid'] = $value['goods_attr_names_uuid'];
            unset($value['goods_attr_names_uuid']);
            $result[] = $value;
        }

        $result = array_to_tree($result);

        foreach ($result as $k => $v) {
            if (!isset($v['sub'])) {
                unset($result[$k]);
            }
        }

        return $result;
    }
}
