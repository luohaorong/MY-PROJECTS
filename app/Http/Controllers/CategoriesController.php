<?php

namespace App\Http\Controllers;

use DB;
use App\Floors;
use App\Countries;
use App\Goods;
use App\Filters;
use App\GoodsAttrs;
use App\GoodsAttrNames;
use App\GoodsAttrValues;
use App\GoodsCategories;
use Illuminate\Http\Request;

class CategoriesController extends Controller
{
    /**
     * 获取分类商品
     *
     * @param  string $uuid   分类UUID
     * @param  string $filter 筛选条件
     * @return array
     */
    public function show(Request $request, $uuid, $filter = '')
    {

        // 会员UUID
        $memberUuid = session('uuid');
        // 国别数据
        $countries = Countries::all();
        // 商品分类
        $goodsCategory = GoodsCategories::findOrFail($uuid);

        // -----------------商品筛选开始----------------- //
        $goodsAttrNames = GoodsAttrNames::where('goods_categories_uuid', $goodsCategory->uuid)
                                        ->where('is_filter', 'yes')
                                        ->orderBy('lft')
                                        ->get([ 'uuid', 'name', 'parent_goods_attr_values_uuid as parent_uuid' ]);

        $uuids = $goodsAttrNames->map(function ($item, $key) use ($filter) {
            $item->number = $key;
            $item->array = $filter ? explode('_', $filter) : [];
            return $item->uuid;
        });

        $goodsAttrValues = GoodsAttrValues::whereIn('goods_attr_names_uuid', $uuids)
                                            ->orderBy('sort')
                                            ->get([ 'uuid', 'name', 'goods_attr_names_uuid as parent_uuid' ]);

        $selected = [];
        $filterUuids = [];
        $goodsAttrValues = $goodsAttrValues->map(function ($item, $key) use ($filter, $uuids, $goodsAttrNames, &$selected, &$filterUuids) {
            $item->number = $key + $uuids->count();
            $item->array = $filter ? explode('_', $filter) : [];

            if (in_array($item->number, $item->array)) {
                $goodsAttrNames->get($goodsAttrNames->keyBy('uuid')->get($item->parent_uuid)->number)->selected = true;
                $selected[] = $item;
                $filterUuids[] = $item->uuid;
            }
            return $item;
        });
        //　-----------------商品筛选结束----------------- //

        $filter = [];
        Filters::filterUuids($filterUuids, $filter);

        $goodsUuids = [];
        foreach ($filter as $key => $value) {
            if (is_array($value)) {
                $vv = tree_to_array($value);
                $tmp = GoodsAttrs::whereIn('goods_attr_values_uuid', $vv)
                                  ->distinct()
                                  ->pluck('goods_uuid')
                                  ->toArray();
            } else {
                $tmp = GoodsAttrs::where('goods_attr_values_uuid', $value)
                                  ->distinct()
                                  ->pluck('goods_uuid')
                                  ->toArray();
            }
            if ($key) {
                $goodsUuids = array_intersect($goodsUuids, $tmp);
            } else {
                $goodsUuids = $tmp;
            }
        }

        $data = [];
        $data['selected'] = $selected;
        $data['goodsCategory'] = $goodsCategory;
        $data['request'] = $request;
        $data['countries'] = $countries;
        $data['favoriteGoods'] = Goods::getHotGoods();
        $data['recentScanGoods'] = is_null($memberUuid) ? [] : Goods::getRecentGoods($memberUuid);

        // 商品分类筛选
        $goods = Goods::where('goods_categories_uuid', $goodsCategory->uuid);

        // 商品筛选条件
        if (!empty($filter)) {
            $goods = $goods->whereIn('uuid', $goodsUuids);
        }

        if ($memberUuid) {
            // 独家代理筛选
            if (isset($request->agent) && $request->agent === 'yes') {
                $goods = $goods->where('agent_type', 'region');
            }

            // 现货筛选
            if (isset($request->spot) && $request->spot === 'yes') {
                $goods = $goods->where('is_presale', 'no');
            }

            // 预售筛选
            if (isset($request->pre_sale) && $request->pre_sale === 'yes') {
                $goods = $goods->where('is_presale', 'yes');
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

        $fus = $goods->pluck('uuid');

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

        $goodsAttrs = $goodsAttrNames->merge($goodsAttrValues);
        $attrNames = array_to_tree($goodsAttrs->toArray());

        // 筛选条件存在的属性值
        $values = GoodsAttrs::whereIn('goods_uuid', $fus)
                            ->distinct()
                            ->pluck('goods_attr_values_uuid')
                            ->toArray();
        foreach ($attrNames as $k => $v) {
            foreach ($v['sub'] as $kk => $vv) {
                if (!isset($vv['sub']) && !empty($vv['uuid']) && !in_array($vv['uuid'], $values)) {
                    unset($attrNames[$k]['sub'][$kk]);
                }
            }
        }

        $data['goods'] = $rs;
        $data['attrNames'] = $attrNames;

        return view('categories.wine', $data);
    }

    /**
     * 楼层查看更多
     * @param  string $uuid 楼层UUID
     * @return array
     */
    public function floor(Request $request, $uuid)
    {
        $floor = [];
        $floors = Floors::getFloorBar();
        foreach ($floors as $value) {
            if ($value['uuid'] === $uuid) {
                $floor = $value;
                break;
            }
        }
        if (empty($floor)) {
            abort(404);
        }

        $goods = Goods::whereIn('uuid', json_decode($floor['goods_uuid'], true));

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
        if (isset($request->country_name) && $request->country_name !== 'all') {
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
        $data['countries'] = $countries;
        $data['goods'] = $rs;
        $data['floor'] = $floor;
        $data['favoriteGoods'] = Goods::getHotGoods();
        $data['recentScanGoods'] = is_null($memberUuid) ? [] : Goods::getRecentGoods($memberUuid);
        return view('categories.wine', $data);
    }
}
