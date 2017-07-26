<?php

namespace App\Http\Controllers;

use App\Banners;
use App\Boutiques;
use App\Goods;
use App\Countries;

class BoutiqueController extends BaseController
{
    /**
     * 展示精品酒
     *
     * @return array
     */
    public function index()
    {
        $banners = Banners::getBoutiqueBanner();
        $tmp = Boutiques::all();

        $boutiques = [];
        foreach ($tmp as $boutique) {
            $goods = Goods::find($boutique->goods_uuid);
            if (!is_null($goods)) {
                $boutique->goods = $goods;
                $boutique->goods->country = Countries::find($boutique->goods->countries_uuid);
                $boutique->reputation = json_decode($boutique->reputation, true);
                $boutiques[] = $boutique;
            }
        }

        return view('categories.boutique', [ 'banners' => $banners, 'boutiques' => $boutiques ]);
    }
}
