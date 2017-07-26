<?php

namespace App;

use UUID;
use DB;
use Cache;

class Setting extends Base
{
    /**
     * 写入配置信息.
     *
     * @param array $data 配置信息
     *
     * @return bool
     */
    public static function put($data)
    {
        DB::beginTransaction();
        $settings = static::all(['uuid', 'key', 'value']);
        $arr = [];
        foreach ($settings as $setting) {
            $arr[$setting->key] = $setting->uuid;
        }

        foreach ($data as $key => $value) {
            cache([$key => $value], 15);
            if (array_key_exists($key, $arr)) {
                $value = is_array($value) ? json_encode($value, true) : $value;
                $flag = static::where('uuid', $arr[$key])->update(['value' => $value]);
            } else {
                $config = new static();
                $config->uuid = UUID::generate()->string;
                $config->key = $key;
                $config->value = is_array($value) ? json_encode($value, true) : $value;
                $flag = $config->save();
            }
            if (!$flag) {
                DB::rollBack();

                return false;
            }
        }
        DB::commit();

        return true;
    }

    /**
     * 获取配置信息.
     *
     * @param string $key 属性名
     *
     * @return string
     */
    public static function get($key)
    {
        $value = Cache::get($key);
        if (!is_null($value)) {
            return $value;
        }
        $settings = static::all(['key', 'value']);
        foreach ($settings as $setting) {
            $tmp = json_decode($setting->value, true);
            $tmp = is_null($tmp) ? $setting->value : $tmp;
            Cache::put($setting->key, $tmp, 15);
        }
        return Cache::get($key);
    }
}
