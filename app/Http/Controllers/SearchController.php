<?php

namespace App\Http\Controllers;

use DB;
use App\Countries;
use App\Goods;
use App\SearchDictionaries;
use Illuminate\Http\Request;

class SearchController extends Controller
{

    /**
     * 搜索
     *
     * @param  string $keyword 关键字
     * @return array
     */
    public function index(Request $request, $keyword = '')
    {
        // $categories = DB::select('SELECT categories_uuid FROM search_dictionaries WHERE category = :category AND MATCH (keyword) AGAINST (:keyword IN BOOLEAN MODE)', [ 'category' => 'goods', 'keyword' => $keyword ]);

        // $goodsUuids = [];
        // foreach ($categories as $v) {
        //     $goodsUuids[] = $v->categories_uuid;
        // }
        
        $goodsUuids = SearchDictionaries::where('category', 'goods')
                                ->where(function ($query) use ($keyword) {
                                    $kws = explode('+', $keyword);
                                    foreach ($kws as $kw) {
                                        $query->orWhere('keyword', 'like', '%'.$kw.'%');
                                    }
                                })->pluck('categories_uuid');

        $goods = Goods::whereIn('uuid', $goodsUuids);

        $memberUuid = session('uuid');
        if ($memberUuid) {
            // 独家代理筛选
            if (isset($request->agent) && $request->agent === 'yes') {
                $goods = $goods->where('agent_type', 'region');
            }
            
            // 现货筛选
            if (isset($request->spot) && $request->spot === 'yes') {
                $goods = $goods->where('is_presale', 'no');
            }
        } else {
            // 未登录状态，不显示独家代理
            $goods = $goods->where('agent_type', '<>', 'region');
        }

        // 产地筛选
        if (isset($request->country_name)) {
            $goods = $goods->where('countries_uuid', $request->country_name);
        }

        // 新品筛选
        // if (isset($request->new)) {
        //     $goods = $goods->where('is_new', 'yes');
        // }
        
        // 新品排序
        if (isset($request->new)) {
            $goods = $goods->orderBy('created_at', $request->new === 'asc' ? 'asc' : 'desc');
        }

        // 价格排序
        if (isset($request->price)) {
            $goods = $goods->orderBy('lowest_price', $request->price === 'desc' ? 'desc' : 'asc');
        }

        $countries = Countries::all();

        $rs = $goods->paginate(36);
        foreach ($rs as $goo) {
            $goo->honor = json_decode($goo->honor, true);
            foreach ($countries as $country) {
                if ($country->uuid === $goo->countries_uuid) {
                    $goo->country = $country;
                    break;
                }
            }
        }

        $data = [];
        $data['goods'] = $rs;
        $data['keyword'] = $keyword;
        $data['request'] = $request;
        $data['countries'] = $countries;
        $data['favoriteGoods'] = Goods::getHotGoods();
        $data['recentScanGoods'] = is_null($memberUuid) ? [] : Goods::getRecentGoods($memberUuid);
        return view('categories.wine', $data);
    }
}
