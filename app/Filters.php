<?php

namespace App;

class Filters
{
    /**
     * 获取筛选条件
     *
     * @param  string $uuid   分类UUID
     * @param  string $filter 筛选条件
     * @return array
     */
    public static function get($uuid, $filter = '')
    {
        $result = GoodsAttrs::getAvailableAttrbute($uuid);

        self::addDefaultFilter($result);

        $filter = self::getFilter($result, $filter);
        $selected = [];
        foreach ($filter as $k => $v) {
            if (is_array($v)) {
                // 含有子属性
                foreach ($v as $m => $n) {
                    if (is_array($n)) {
                        // 含有子属性
                        foreach ($n as $x => $y) {
                            $result[$k]['sub'][$m]['sub'][$x]['sub'][$y]['selected'] = true;
                            $uuid = $result[$k]['sub'][$m]['sub'][$x]['sub'][$y]['uuid'] ?? '';
                            if (!empty($uuid)) {
                                $selected[$uuid] = $result[$k]['sub'][$m]['sub'][$x]['sub'][$y];
                            }
                        }
                    } else {
                        // 不含有子属性
                        $result[$k]['sub'][$n]['selected'] = true;
                        $uuid = $result[$k]['sub'][$n]['uuid'];
                        if (!empty($uuid)) {
                            $selected[$uuid] = $result[$k]['sub'][$n];
                        }
                    }
                }
            } else {
                // 不含有子属性
                $result[$k]['sub'][$v]['selected'] = true;
                $uuid = $result[$k]['sub'][$v]['uuid'];
                if (!empty($uuid)) {
                    $selected[$uuid] = $result[$k]['sub'][$v];
                }
            }
        }

        foreach ($result as $k => $v) {
            foreach ($v['sub'] as $m => $n) {
                if (isset($n['sub'])) {
                    $tp = [];
                    foreach ($n['sub'] as $x => $y) {
                        foreach ($y['sub'] as $i => $j) {
                            // 选中选项的链接
                            if (isset($result[$k]['sub'][$m]['sub'][$x]['sub'][$i]['selected']) &&
                                !empty($result[$k]['sub'][$m]['sub'][$x]['sub'][$i]['uuid']) &&
                                $result[$k]['sub'][$m]['sub'][$x]['sub'][$i]['selected']) {
                                $t = $filter;
                                if (!is_array($t[$k])) {
                                    $t[$k] = [[[]]];
                                }
                                $t[$k][$m][$x] = 0;
                                $selected[$result[$k]['sub'][$m]['sub'][$x]['sub'][$i]['uuid']]['filter'] = self::filterToString($t);
                            }
                            // 筛选项的链接
                            $t = $filter;
                            if (!is_array($t[$k])) {
                                $t[$k] = [[[]]];
                            }
                            $t[$k][$m][$x] = $i;
                            $result[$k]['sub'][$m]['sub'][$x]['sub'][$i]['filter'] = self::filterToString($t);
                        }
                        $tp[] = 0;
                    }
                    // 选中选项的链接
                    if (isset($result[$k]['sub'][$m]['selected']) &&
                        !empty($result[$k]['sub'][$m]['uuid']) &&
                        $result[$k]['sub'][$m]['selected']) {
                        $tmp = $filter;
                        $tmp[$k] = 0;
                        $selected[$result[$k]['sub'][$m]['uuid']]['filter'] = self::filterToString($tmp);
                    }
                    // 筛选项的链接
                    $tmp = $filter;
                    $tmp[$k] = [ $m, $tp, [0]];
                    $result[$k]['sub'][$m]['filter'] = self::filterToString($tmp);
                } else {
                    // 选中选项的链接
                    if (isset($result[$k]['sub'][$m]['selected']) &&
                        !empty($result[$k]['sub'][$m]['uuid']) &&
                        $result[$k]['sub'][$m]['selected']) {
                        $tmp = $filter;
                        $tmp[$k] = 0;
                        $selected[$result[$k]['sub'][$m]['uuid']]['filter'] = self::filterToString($tmp);
                    }
                    // 筛选项的链接
                    $tmp = $filter;
                    $tmp[$k] = $m;
                    $result[$k]['sub'][$m]['filter'] = self::filterToString($tmp);
                }
            }
        }
        self::afterFilter($result);
        return [ 'filter' => $result, 'selected' => $selected ];
    }

    /**
     *
     * 后续处理筛选条件
     *
     * @param  array &$filter 筛选条件
     */
    private static function afterFilter(&$filter)
    {
        foreach ($filter as $k => $v) {
            foreach ($v['sub'] as $m => $n) {
                if (isset($n['sub'])) {
                    unset($filter[$k]['sub'][$m]['sub']);
                    if (isset($n['selected']) && $n['selected']) {
                        foreach ($n['sub'] as $x => $y) {
                            $n['sub'][$x]['child'] = true;
                        }
                        array_splice($filter, $k + 1, 0, $n['sub']);
                    }
                }
            }
        }
        foreach ($filter as $k => $v) {
            if (!isset($v['sub'][0]['selected']) ||
                !$v['sub'][0]['selected']) {
                unset($filter[$k]);
            }
        }
    }

    /**
     *
     * 添加默认选中值
     *
     * @param array &$filter 筛选条件
     */
    private static function addDefaultFilter(&$filter)
    {
        foreach ($filter as $k => $attrName) {
            if (isset($attrName['sub'])) {
                foreach ($attrName['sub'] as $m => $subAttrName) {
                    if (isset($subAttrName['sub'])) {
                        foreach ($subAttrName['sub'] as $n => $subAttrValue) {
                            array_unshift($filter[$k]['sub'][$m]['sub'][$n]['sub'], [ 'uuid' => '', 'name' => '不限', 'parent_uuid' => '' ]);
                        }
                    }
                }
                array_unshift($filter[$k]['sub'], [ 'uuid' => '', 'name' => '不限', 'parent_uuid' => '' ]);
            }
        }
    }

    /**
     *
     * 筛选条件编译
     *
     * @param  array $filter 筛选条件
     * @return string
     */
    private static function filterToString($filter)
    {
        $filter = json_encode($filter, true);
        $pattern = [ '/\[/', '/\]/', '/,/' ];
        $replace = [ '-', '_', 'l' ];
        return preg_replace($pattern, $replace, $filter);
    }

    /**
     *
     * 筛选条件解译
     *
     * @param array $result 属性
     * @return array
     */
    private static function getFilter($result, $filter)
    {
        if (empty($filter)) {
            $filter = $result;
            array_reverse_keys($filter);
            $filter = json_encode($filter, true);
            $filter = preg_replace('/\[[0-9|,]+\]/', 0, $filter);
            return json_decode($filter, true);
        }

        $pattern = [ '/\-/', '/\_/', '/l/' ];
        $replace = [ '[', ']', ',' ];
        $filter = preg_replace($pattern, $replace, $filter);
        return json_decode($filter, true);
    }

    public static function filterUuids($filterUuids, &$result)
    {
        foreach ($filterUuids as $value) {
            $gan = GoodsAttrNames::where('parent_goods_attr_values_uuid', $value)
                                    ->pluck('uuid');
            if ($gan->isEmpty()) {
                $result[] = $value;
            } else {
                $fu = GoodsAttrValues::whereIn('goods_attr_names_uuid', $gan)
                                    ->pluck('uuid')
                                    ->toArray();
                static::filterUuids($fu, $result[]);
            }
        }
    }
}
