<?php

namespace App;

class Goods extends Base
{
    /**
     * 根据UUID查询某一个商品
     */

    public static function getGoodExtend($uuid)
    {
        $good = GoodsExtends::find($uuid);
        $good = $good->toArray();
        return $good;
    }

    /**
     * 根据分类查询商品
     */
    public static function getGoods($uuid)
    {
        $good = Goods::find($uuid);
        $good = $good->toArray();
        return $good;
    }

    /**
     *
     * 获取最近浏览商品
     * @param  string  $memberUuid 会员UUID
     * @return Collection
     */
    public static function getRecentGoods($memberUuid)
    {
        $members = RecentScans::where('members_uuid', $memberUuid)->pluck('goods_uuid');
        $recentScanGoods = Goods::whereIn('uuid', $members)->limit(5)->get();
        return $recentScanGoods;
    }

    /**
     *
     * 获取最受喜爱商品
     *
     * @return Collection
     */
    public static function getHotGoods()
    {
        $favoriteGoods = Goods::orderBy('favorite_num', 'desc')->limit(5)->get();
        return $favoriteGoods;
    }

    /**
     *
     * 增加商品浏览量
     *
     * @param  string $goodsUuid 商品UUID
     * @return boolean
     */
    public static function incrementScan($goodsUuid)
    {
        return Goods::where('uuid', $goodsUuid)->increment('scan_num');
    }
}
