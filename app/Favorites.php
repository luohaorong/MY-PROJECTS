<?php

namespace App;

use App\Base;

class Favorites extends Base
{

    /**
     *
     * 判断是否收藏商品
     *
     * @param  string  $goodsUuid  商品UUID
     * @param  string  $memberUuid 会员UUID
     * @return boolean
     */
    public static function isFavorite($goodsUuid, $memberUuid)
    {
        $isFavorite = Favorites::where('goods_uuid', $goodsUuid)
                                ->where('members_uuid', $memberUuid)
                                ->exists();
        return $isFavorite;
    }
}
