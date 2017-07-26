<?php

namespace App;

use App\Base;
use Cache;

class Banners extends Base
{
    /**
     *
     * 获取首页轮播图信息
     *
     * @return array
     */
    public static function getIndexBanner()
    {
        $banner = Cache::get('index_banner');
        if (!is_null($banner)) {
            return $banner;
        }
        $data = static::where('location', 'index')
                        ->orderBy('created_at')
                        ->get([ 'uuid', 'image', 'background_image', 'background_color', 'category', 'url' ])->toArray();
        Cache::put('index_banner', $data, 30);
        return $data;
    }

    /**
     *
     * 获取精品酒轮播图信息
     *
     * @return array
     */
    public static function getBoutiqueBanner()
    {
        $banner = Cache::get('boutique_banner');
        if (!is_null($banner)) {
            return $banner;
        }
        $data = static::where('location', 'boutique')->get([ 'uuid', 'image', 'background_image', 'background_color', 'category', 'url' ])->toArray();
        Cache::put('boutique_banner', $data, 30);
        return $data;
    }
}
