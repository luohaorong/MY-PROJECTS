<?php

namespace App\Http\Controllers;

use App\Addresses;
use App\Countries;
use App\Exclusives;
use App\Goods;
use App\GoodsAttrs;
use App\GoodsExtends;
use App\GoodsAttrNames;
use App\GoodsAttrValues;
use App\Favorites;
use App\RecentScans;
use App\Areas;
use Illuminate\Http\Request;
use Validator;
use UUID;
use App\MembersAreas;

class GoodsController extends BaseController
{
    /**
     * 商品详情页
     */
    public function show($uuid)
    {
        $goods = Goods::findOrFail($uuid);
        // 国别
        $goods->country = Countries::findOrFail($goods->countries_uuid);
        // 购买流程
        $goods->purchase_process = json_decode($goods->purchase_process, true);
        // 服务
        $goods->service = json_decode($goods->service, true);
        // 获得荣誉
        $goods->honor = json_decode($goods->honor, true);
        // 商品扩展信息
        $goods->goods_extends = GoodsExtends::where('goods_uuid', $uuid)->get();
        $data = [];
        $totalStock = 0;
        foreach ($goods->goods_extends as $goodsExtend) {
            $goodsExtend->combination = json_decode($goodsExtend->combination, true);
            $goodsExtend->image = json_decode($goodsExtend->image, true);
            $tmp = [];
            foreach ($goodsExtend->combination as $val) {
                $tmp[] = $val;
            }
            $index = implode('_', $tmp);
            $data[$index] = [];
            $data[$index]['uuid'] = $goodsExtend->uuid;
            $data[$index]['moq'] = $goodsExtend->moq;
            $data[$index]['price'] = $goodsExtend->price;
            $data[$index]['pricing_unit'] = $goodsExtend->pricing_unit;
            $data[$index]['stock'] = $goodsExtend->stock;
            $data[$index]['stocking_unit'] = $goodsExtend->stocking_unit;
            $data[$index]['stocking_pricing_ratio'] = $goodsExtend->stocking_pricing_ratio;

            $totalStock += $goodsExtend->stock;
        }
        $goods->total_stock = $totalStock;

        // 商品属性名
        $attrNames = GoodsAttrs::where('goods_uuid', $uuid)->distinct('goods_attr_names_uuid')->pluck('goods_attr_names_uuid')->toArray();

        $commonAttrNames = GoodsAttrNames::whereIn('uuid', $attrNames)
                                    ->whereIn('level', [ 'key', 'other', 'custom' ])
                                    ->where('category', '<>', 'other')
                                    ->orderBy('lft')
                                    ->pluck('uuid')
                                    ->toArray();

        $pgavu = GoodsAttrNames::whereIn('uuid', $commonAttrNames)
                                ->distinct()
                                ->orderBy('lft')
                                ->pluck('parent_goods_attr_values_uuid')
                                ->toArray();

        $pga = GoodsAttrValues::whereIn('uuid', array_filter($pgavu))
                                ->distinct()
                                ->pluck('goods_attr_names_uuid')
                                ->toArray();

        $commonAttrNames = array_merge($pga, $commonAttrNames);

        // 商品销售属性名
        $saleAttrNames = GoodsAttrNames::whereIn('uuid', $attrNames)
                                    ->where('level', 'sale')
                                    ->pluck('uuid')
                                    ->toArray();
        // 商品仓库属性名
        $warehouseAttrNames = GoodsAttrNames::whereIn('uuid', $attrNames)
                                    ->where('is_warehouse', 'yes')
                                    ->pluck('uuid')
                                    ->toArray();
        $commonAttrNames = GoodsAttrNames::getBatchTreeArray($commonAttrNames);
        $saleAttrNames = GoodsAttrNames::getBatchTreeArray($saleAttrNames);

        // 商品属性值
        $attrValues = GoodsAttrs::where('goods_uuid', $uuid)->pluck('goods_attr_values_uuid')->toArray();
        $attrValues = array_merge($attrValues, array_filter($pgavu));
        $attrValues = GoodsAttrValues::whereIn('uuid', $attrValues)
                                    ->orderBy('sort')
                                    ->get([ 'uuid', 'name', 'goods_attr_names_uuid'])
                                    ->toArray();

        $warehouse = [];
        foreach ($attrValues as $attrValue) {
            foreach ($commonAttrNames as $k => $v) {
                if ($attrValue['goods_attr_names_uuid'] === $v['uuid']) {
                    $commonAttrNames[$k]['value'][] = $attrValue;
                    $commonAttrNames[$k]['string'][] = $attrValue['name'];
                    break;
                }
            }
            foreach ($saleAttrNames as $k => $v) {
                if ($attrValue['goods_attr_names_uuid'] === $v['uuid']) {
                    foreach ($data as $ky => $vu) {
                        if (strpos($ky, $attrValue['uuid']) !== false) {
                            $saleAttrNames[$k]['price'][] = $vu['price'];
                            break;
                        }
                    }
                    $saleAttrNames[$k]['value'][] = $attrValue;
                    $saleAttrNames[$k]['string'][] = $attrValue['name'];
                    break;
                }
            }
            if ($attrValue['goods_attr_names_uuid'] === $warehouseAttrNames[0]) {
                $warehouse[] = $attrValue;
            }
        }
        $commonAttrNames = array_to_tree($commonAttrNames);
        $saleAttrNames = array_to_tree($saleAttrNames);

        // 销售属性组合取得仓库信息
        $saleCombination = [];
        $tmp = $goods->goods_extends->toArray();
        foreach ($tmp as $i => $val) {
            $wName = $val['combination'][$warehouseAttrNames[0]];
            $val['warehouse'] = GoodsAttrValues::find($wName)->toArray();
            unset($val['combination'][$warehouseAttrNames[0]]);
            $index = implode('_', array_values($val['combination']));
            if (isset($saleCombination[$index])) {
                $val['default_show'] = false;
                $saleCombination[$index][] = $val;
            } else {
                $val['default_show'] = $i === 0;
                $saleCombination[$index] = [$val];
            }
        }

        $memberUuid = session('uuid');

        // 增加商品浏览量
        Goods::incrementScan($uuid);
        // 添加最近浏览记录
        RecentScans::addFootPrint($uuid, $memberUuid);

        $result = [];
        $result['goods'] = $goods;
        $result['attrNames'] = $commonAttrNames;
        $result['saleAttrNames'] = $saleAttrNames;
        $result['saleCombination'] = $saleCombination;
        $result['data'] = $data;
        $result['favoriteGoods'] = Goods::getHotGoods();
        $result['isFavorite'] = is_null($memberUuid) ? false : Favorites::isFavorite($uuid, $memberUuid);
        $result['recentScanGoods'] = is_null($memberUuid) ? false : Goods::getRecentGoods($memberUuid);
        $result['check_favor'] = $result['isFavorite'] ? 1 : 0;

        return view('goods.productdetail', $result);
    }
}
