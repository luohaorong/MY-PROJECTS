<?php

/**
 * 输出json
 */
if (!function_exists('output')) {
    function output($status = 0, $info = '', $data = null)
    {
        if (is_null($data)) {
            $data = new Stdclass;
        }
        return [ 'status' => $status, 'info' => $info, 'data' => $data ];
    }
}

/**
 * 是否为UUID
 */
if (!function_exists('is_uuid')) {
    function is_uuid($uuid)
    {
        return strlen($uuid) === 36;
    }
}

/**
 * 一维数组转二维数组
 */
if (!function_exists('array_to_tree')) {
    function array_to_tree($data)
    {
        $tmp = [];
        foreach ($data as $value) {
            $tmp[$value['uuid']] = $value;
        }

        $tree = [];
        foreach ($tmp as $item) {
            if (isset($tmp[$item['parent_uuid']])) {
                $tmp[$item['parent_uuid']]['sub'][] = &$tmp[$item['uuid']];
            } else {
                $tree[] = &$tmp[$item['uuid']];
            }
        }
        return $tree;
    }
}

/**
 * 二维数组转一维数组
 */
if (!function_exists('tree_to_array')) {
    function tree_to_array($arr)
    {
        static $res;
        foreach ($arr as $k => $v) {
            $name = isset($v['sub']) ? 'sub' : 'value';
            if (is_array($v) && isset($v[$name])) {
                $child = $v[$name];
                unset($v[$name]);
                $res[] = $v;
                tree_to_array($child);
            } else {
                $res[] = $v;
            }
        }
        return $res;
    }
}

/**
 * 判断数组是否相等
 */
if (!function_exists('array_length_is_equal')) {
    function array_length_is_equal()
    {
        $arr = func_get_args();
        foreach ($arr as $k => $v) {
            if ($k > 0 && (count($v) !== count($arr[$k - 1]))) {
                return false;
            }
        }
        return true;
    }
}

/**
 * 翻译信息
 */
if (!function_exists('trans_message')) {
    function trans_message($lang, $find)
    {
        $keys = array_keys($find);
        foreach ($keys as $key => $value) {
            $keys[$key] = ':'.$value;
        }
        return str_replace($keys, array_values($find), trans($lang));
    }
}

/**
 * 个性化时间
 */
if (!function_exists('personal_time')) {
    function personal_time($time)
    {
        $rtime = date("m-d H:i", $time);
        $htime = date("H:i", $time);
         
        $time = time() - $time;

        if ($time < 60) {
            $str = '刚刚';
        } elseif ($time < 60 * 60) {
            $min = floor($time/60);
            $str = $min.'分钟前';
        } elseif ($time < 60 * 60 * 24) {
            $h = floor($time/(60*60));
            $str = $h.'小时前 '.$htime;
        } elseif ($time < 60 * 60 * 24 * 3) {
            $d = floor($time/(60*60*24));
            if ($d==1) {
                $str = '昨天 '.$rtime;
            } else {
                $str = '前天 '.$rtime;
            }
        } else {
            $str = $rtime;
        }
        return $str;
    }
}
