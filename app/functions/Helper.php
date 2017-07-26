<?php
use Illuminate\Support\Str;
use Illuminate\Support\HtmlString;
use Illuminate\Container\Container;
use Illuminate\Contracts\Bus\Dispatcher;
use Illuminate\Contracts\Auth\Access\Gate;
use Illuminate\Contracts\Routing\UrlGenerator;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Contracts\Auth\Factory as AuthFactory;
use Illuminate\Contracts\View\Factory as ViewFactory;
use Illuminate\Contracts\Cookie\Factory as CookieFactory;
use Illuminate\Database\Eloquent\Factory as EloquentFactory;
use Illuminate\Contracts\Validation\Factory as ValidationFactory;

/**
 * 公共方法
 */
if (!function_exists('get_bread_crumbs_name')) {
    function get_bread_crumbs_name($default = '')
    {
        $url = parse_url(url()->current(), PHP_URL_PATH);
        if (is_null($url)) {
            return $default;
        }
        $url = preg_replace('/\/[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}\//', '/', $url);
        $url = explode('/', trim($url, '/'));
        $url = implode('_', $url);
        return $url;
    }
}

/**
 * 获取活动菜单
 */
if (!function_exists('get_active_menu_name')) {
    function get_active_menu_name($default = '')
    {
        $url = parse_url(url()->current(), PHP_URL_PATH);
        if (is_null($url)) {
            return $default;
        }
        $url = preg_replace('/\/[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}\//', '/', $url);
        $url = strstr(trim($url, '/'), '/', true);
        return $url;
    }
}

/**
 * 重置图片地址
 */
if (!function_exists('reset_image_url')) {
    function reset_image_url($completedUrl)
    {
        $url = parse_url($completedUrl);
        return dirname($url['path']);
    }
}

/**
 * Json输出
 */
if (!function_exists('output')) {
    function output($status, $data)
    {
        $key = is_string($data) ? 'msg' : ($status ? 'data' : 'error');
        $result['status'] = $status;
        $result[$key] = $data;
        return $result;
    }
}

/**
 * 数组转树
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
            if (isset($item['parent_uuid']) && isset($tmp[$item['parent_uuid']])) {
                $tmp[$item['parent_uuid']]['sub'][] = &$tmp[$item['uuid']];
            } else {
                $tree[] = &$tmp[$item['uuid']];
            }
        }
        return $tree;
    }
}

/**
 * 树转数组
 */
if (!function_exists('tree_to_array')) {
    function tree_to_array($arr)
    {
        $ar_room = &$arr[key($arr)];
        if (!is_array($ar_room)) {
            $ar_room = array($ar_room);
        }
        next($arr);
        while (list($k, $v) = each($arr)) {
            $v = is_array($v) ? call_user_func(__FUNCTION__, $v) : array($v);
            $ar_room = array_merge_recursive($ar_room, $v);
            unset($arr[$k]);
        }
        return $ar_room;
    }
}


/**
 * 获取字符串长度
 */
if (!function_exists('checkLength')) {
    function checkLength($str, $chineseLength = 2)
    {
        $reg = '/[\x7f-\xff]{3}/';
        $str = preg_replace($reg, str_repeat('a', $chineseLength), $str);
        return strlen($str);
    }
}


/**
 * 验证邮箱
 */
if (!function_exists('valid_email')) {
    function valid_email($email)
    {
        return preg_match("/^(.)+@([\w\.\?\[\]\x7f-\xff]\.?)+\.([a-zA-Z0-9_-])+$/", $email);
    }
}

/**
 * 密码规则验证
 */
if (!function_exists('valid_passwd')) {
    function valid_passwd($passwd)
    {
        return preg_match(" /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/", $passwd);
    }
}

/**
 * 验证手机号
 */
if (!function_exists('valid_mobile')) {
    function valid_mobile($mobile)
    {
        return preg_match("/^1[34578][0-9]{9}$/", $mobile);
    }
}

/**
 * 验证座机号
 */
if (!function_exists('validTel')) {
    function validTel($tel)
    {
        return preg_match("/^(0[0-9]{2,3}[\-]?[2-9][0-9]{6,7}[\-]?[0-9]?)$/", $tel);
    }
}


/**
 *curl方式发送一个post请求
 */
if (!function_exists('httpPost')) {
    function httpPost($url, $data, $isPost = true, $json = true)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_0);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSLVERSION, 3);
        curl_setopt($ch, CURLOPT_POST, $isPost);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data, true));
        curl_setopt($ch, CURLOPT_HTTPGET, false);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        $result = curl_exec($ch);
        curl_close($ch);
        exit($result);
        return $json ? json_decode($result, true) : $result;
    }
}

/**
 * 生成随机数
 */
if (!function_exists('gen_rand_str')) {
    function gen_rand_str($len)
    {
        $charid = md5(uniqid(mt_rand(), true));
        return substr($charid, 0, $len);
    }
}


/**
 * 计算身份证校验码，根据国家标准GB 11643-1999
 */
if (!function_exists('idcard_verify_number')) {
    function idcard_verify_number($idcard_base)
    {
        if (strlen($idcard_base) != 17) {
            return false;
        }
        //加权因子
        $factor = array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
        //校验码对应值
        $verify_number_list = array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
        $checksum = 0;
        for ($i = 0; $i < strlen($idcard_base); $i++) {
            $checksum += substr($idcard_base, $i, 1) * $factor[$i];
        }
        $mod = $checksum % 11;
        $verify_number = $verify_number_list[$mod];
        return $verify_number;
    }
}


/**
 * 将15位身份证升级到18位
 */
if (!function_exists('idcard_15to18')) {
    function idcard_15to18($idcard)
    {
        if (strlen($idcard) != 15) {
            return false;
        } else {
            // 如果身份证顺序码是996 997 998 999，这些是为百岁以上老人的特殊编码
            if (array_search(substr($idcard, 12, 3), array('996', '997', '998', '999')) !== false) {
                $idcard = substr($idcard, 0, 6) . '18' . substr($idcard, 6, 9);
            } else {
                $idcard = substr($idcard, 0, 6) . '19' . substr($idcard, 6, 9);
            }
        }
        $idcard = $idcard . idcard_verify_number($idcard);
        return $idcard;
    }
}

/**
 * 检查18位身份证校验码
 */
if (!function_exists('idcard_checksum18')) {
    function idcard_checksum18($idcard)
    {
        if (strlen($idcard) != 18) {
            return false;
        }
        $idcard_base = substr($idcard, 0, 17);
        if (idcard_verify_number($idcard_base) != strtoupper(substr($idcard, 17, 1))) {
            return false;
        } else {
            return true;
        }
    }
}

/**
 * 验证身份证号码
 */
if (!function_exists('validIdCard')) {
    function validIdCard($id_card)
    {
        if (strlen($id_card) == 18) {
            return idcard_checksum18($id_card);
        } elseif ((strlen($id_card) == 15)) {
            return idcard_checksum18(idcard_15to18($id_card));
        } else {
            return false;
        }
    }
}

/**
 * 封装JSON数据输出
 */
if (!function_exists('configs')) {
    function configs($key = null, $data = array())
    {
        if (is_null($key)) {
            return app('config');
        }
        $tmp = app('config')->get($key);
        $data_tmp['data'] = $data;
        $tmp = array_merge($tmp, $data_tmp);
        return $tmp;
    }
}

if (!function_exists('array_reverse_keys')) {
    function array_reverse_keys(&$arr)
    {
        foreach ($arr as $k => $v) {
            if (isset($v['sub'])) {
                array_reverse_keys($arr[$k]['sub']);
                $arr[$k] = $arr[$k]['sub'];
            } else {
                $arr[$k] = $k;
            }
        }
    }
}

if (!function_exists('sort_by_lft')) {
    function sort_by_lft($a, $b)
    {
        if ($a['lft'] === $b['lft']) {
            return 0;
        } else {
            return ($a['lft'] > $b['lft']) ? 1 : -1;
        }
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
 * 文件加锁
 */
if (!function_exists('lock_file')) {
    function lock_file($locktype = false)
    {
        if ($locktype === false) {
            $locktype = LOCK_EX | LOCK_NB;
        }
        $can_write = 0;
    
        $lockfp = fopen(storage_path('tmp.lock'), 'w');
        if ($lockfp) {
            $can_write = flock($lockfp, $locktype);
        }
        if ($can_write) {
            return $lockfp;
        }
        if ($lockfp) {
            fclose($lockfp);
            unlink(storage_path('tmp.lock'));
        }
        return false;
    }
}

/**
 * 文件解锁
 */
if (!function_exists('unlock_file')) {
    function unlock_file($fp)
    {
        flock($fp, LOCK_UN);
        fclose($fp);
        unlink(storage_path('tmp.lock'));
    }
}

/**
 * 添加筛选参数
 */
if (!function_exists('filter')) {
    function filter($number, $array = [])
    {
        if (!in_array($number, $array)) {
            $array[] = $number;
        }
        return implode('_', $array);
    }
}

/**
 * 移除筛选参数
 */
if (!function_exists('remove')) {
    function remove($number, $array = [])
    {
        $key = array_search($number, $array);
        if ($key !== false) {
            array_splice($array, $key, 1);
        }
        return implode('_', $array);
    }
}
