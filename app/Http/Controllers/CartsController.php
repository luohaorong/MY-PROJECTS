<?php

namespace App\Http\Controllers;

use App\Activities;
use App\Base;
use App\Carts;
use App\Favorites;
use App\Goods;
use App\GoodsAttrs;
use App\GoodsAttrNames;
use App\GoodsAttrValues;
use App\GoodsExtends;
use App\RecentScans;
use App\Countries;
use App\Setting;
use App\Exclusives;
use Carbon\Carbon;
use DB;
use UUID;
use Validator;
use Illuminate\Http\Request;

class CartsController extends BaseController
{
    /**
     * 添加购物车
     */
    public function addCarts(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'goods_extends_uuid' =>'required',
            'goods_num'=>'required|numeric|min:1',
            // 'station'=>'required',
            // 'station_uuid'=>'required',
            // 'station_alias'=>'required',
            'activity_type'=>'required',
        ]);

        //基本参数验证
        if ($validator->fails()) {
            return response()->json(configs('error_code.100'));
        }

        // 商品失效
        $goodsExtends = GoodsExtends::find($request->goods_extends_uuid);
        if (is_null($goodsExtends)) {
            return response()->json(configs('error_code.10031'));
        }

        $goodsExtends = GoodsExtends::where('goods_uuid', $goodsExtends->goods_uuid)
                                    ->orderBy('stock', 'desc')
                                    ->get();

        $stock = $goodsExtends->sum('stock');

        // 库存是否充足
        if ($request->goods_num > $stock) {
            return response()->json(configs('error_code.10032'));
        }

        // 获取起订量或者独家起订量
        $moq = $goodsExtends->first()->moq;
        if ($request->activity_type === 'exclusive') {
            $exclusive = Exclusives::find($request->exclusive_uuid);
            if (is_null($exclusive)) {
                return response()->json(configs('error_code.10034'));
            }
            $moq = $exclusive->moq;
        }

        // 起订量是否满足
        if ($request->goods_num < $moq) {
            return response()->json(configs('error_code.10033'));
        }

        $goods = Goods::find($goodsExtends->first()->goods_uuid);
        $goodsAttrName = GoodsAttrNames::where('is_warehouse', 'yes')
                                        ->where('goods_categories_uuid', $goods->goods_categories_uuid)
                                        ->first();
        if (is_null($goodsAttrName)) {
            return response()->json(configs('error_code.-1'));
        }
        $goodsAttrValues = GoodsAttrValues::where('goods_attr_names_uuid', $goodsAttrName->uuid)->pluck('name', 'uuid')->toArray();

        // 暂时写死
        $pinyin = [ 'ningbo' => '宁波仓', 'shanghai' => '上海仓', 'chengdu' => '成都仓' ];

        DB::beginTransaction();
        $tmpStock = $request->goods_num;
        $count = session('carts_count');
        foreach ($goodsExtends as $goodsExtend) {
            if ($tmpStock <= 0) {
                break;
            }
            
            $combination = json_decode($goodsExtend->combination, true);
            $station = array_intersect(array_values($combination), array_keys($goodsAttrValues));
            if (!count($station)) {
                DB::rollBack();
                return response()->json(configs('error_code.-1'));
            }

            // 库存充足
            if ($tmpStock <= $goodsExtend->stock) {
                $request->merge([
                    'goods_extends_uuid' => $goodsExtend->uuid,
                    'goods_num' => $tmpStock,
                    'station' => $goodsAttrValues[$station[0]],
                    'station_uuid' => $station[0],
                    'station_alias' => array_search($goodsAttrValues[$station[0]], $pinyin)
                ]);
                $tmpStock = 0;
            } else {
                $request->merge([
                    'goods_extends_uuid' => $goodsExtend->uuid,
                    'goods_num' => $goodsExtend->stock,
                    'station' => $goodsAttrValues[$station[0]],
                    'station_uuid' => $station[0],
                    'station_alias' => array_search($goodsAttrValues[$station[0]], $pinyin)
                ]);
                $tmpStock -= $goodsExtend->stock;
            }

            //检验是否重复添加
            $result = Carts::readdCheck($request);
            if (!$result['status']) {
                DB::rollBack();
                return response()->json(configs('error_code.10018'));
            } elseif ($result['status'] && $result['count'] > 0) {
                $count = $result['count'];
                continue;
            }

            //检验所参加的活动(活动可为空可以多个)
            $activity = Carts::checkActivity($request);

            //加入购物车
            $result = Carts::addCarts($request, $activity);
            if (!$result['status']) {
                DB::rollBack();
                return response()->json(configs('error_code.10018'));
            }
            $count = $result['count'];
        }
        DB::commit();
        return response()->json(configs('error_code.0', $count));
    }

    /**
     * 更新购物车数据
     *
     */
    public function updateCart(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'corns' => 'numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(configs('error_code.100'));
        }

        $expiredAt = Carbon::now()->addMonths(3)->toDateTimeString();

        $result = [ 'carts' => [], 'statistics' => [] ];
        $carts = $request->carts ?? [];
        foreach ($carts as $cart) {
            $iCart = Carts::where('members_uuid', session('uuid'))
                            ->where('uuid', $cart['uuid'])
                            ->first();
            // 不存在
            if (is_null($iCart)) {
                $result['carts'][$cart['uuid']] = [ 'status' => 'not_exist', 'msg' => '购物车记录不存在' ];
                continue;
            }

            // 删除商品
            if (!$cart['goods_num'] &&
                (!isset($cart['favorite']) || !$cart['favorite'])) {
                $rs = $iCart->delete();
                if ($rs) {
                    $result['carts'][$iCart->uuid] = [ 'status' => 'delete_success', 'msg' => '删除商品成功' ];
                } else {
                    $result['carts'][$iCart->uuid] = [ 'status' => 'delete_error', 'msg' => '删除商品失败' ];
                }
                continue;
            }

            // 商品失效
            $goods = Goods::find($iCart->goods_uuid);
            $goodsExtends = GoodsExtends::find($iCart->goods_extends_uuid);
            if ($cart['goods_num'] && (is_null($goods) || is_null($goodsExtends))) {
                $result['carts'][$iCart->uuid] = [ 'status' => 'goods_invalid', 'msg' => '商品已下架' ];
                continue;
            }

            // 移入收藏夹
            if (isset($cart['favorite']) && $cart['favorite']) {
                $rs = Carts::moveTo($iCart->uuid);
                if ($rs) {
                    $result['carts'][$iCart->uuid] = [ 'status' => 'favorite_success', 'msg' => '移入收藏夹成功' ];
                } else {
                    $result['carts'][$iCart->uuid] = [ 'status' => 'favorite_error', 'msg' => '移入收藏夹失败' ];
                }
                continue;
            }

            // 库存是否充足
            if ($cart['goods_num'] > $goodsExtends->stock) {
                $result['carts'][$iCart->uuid] = [ 'status' => 'stock_error', 'msg' => '库存不足，最多只能购买'.$goodsExtends->stock.$goodsExtends->stocking_unit ];
                continue;
            }

            $iCart->goods_price = $goodsExtends->price;
            $iCart->moq = $goodsExtends->moq;
            // 获取起订量或者独家起订量
            if ($iCart->discount_method === 'exclusive') {
                $exclusive = Exclusives::find($iCart->discount_uuid);
                if (is_null($exclusive)) {
                    return response()->json(configs('error_code.10034'));
                }
                $iCart->goods_price = $exclusive->price;
                $iCart->moq = $exclusive->moq;
            }

            // 起订量是否满足
            if ($cart['goods_num'] < $iCart->moq) {
                $result['carts'][$iCart->uuid] = [ 'status' => 'moq_error', 'msg' => '不够起订量，至少购买'.$iCart->moq.$goodsExtends->stocking_unit ];
                continue;
            }
            
            // 更新购物车
            $iCart->goods_chinese_name = $goods->chinese_name;
            $iCart->goods_english_name = $goods->english_name;
            $iCart->stock = $goodsExtends->stock;
            $iCart->image_path = $goods->thumb;
            $iCart->goods_num = $cart['goods_num'];
            $iCart->stocking_pricing_ratio = $goodsExtends->stocking_pricing_ratio;
            $iCart->stocking_unit = $goodsExtends->stocking_unit;
            $iCart->selected = 'true';
            if (isset($request->corns) && ($request->corns > 0)) {
                $iCart->use_corns = 'true';
            } else {
                $iCart->use_corns = 'false';
            }
            $iCart->expired_at = $expiredAt;
            $rs = $iCart->save();
            if ($rs) {
                $result['carts'][$iCart->uuid] = [ 'status' => 'save_success', 'msg' => '更新成功' ];
            } else {
                $result['carts'][$iCart->uuid] = [ 'status' => 'save_error', 'msg' => '更新失败' ];
            }
        }

        // 更新未被选中的商品
        if (empty($result['carts'])) {
            Carts::where('members_uuid', session('uuid'))
                  ->update([ 'selected' => 'false' ]);
        } else {
            Carts::whereNotIn('uuid', array_keys($result['carts']))
                  ->where('members_uuid', session('uuid'))
                  ->update([ 'selected' => 'false' ]);
        }
              

        $result['statistics'] = Carts::changeCarts($request->corns);


        $use_corn = ($request->corns) > ($result['statistics']['available_corns']) ? $result['statistics']['available_corns'] : ($request->corns);

        //用户使用金币写入session
        $request->session()->put('use_corns', $use_corn);


        // 更新购物车数量
        $request->session()->put('carts_count', $result['statistics']['total_goods_category']);

        return response()->json(configs('error_code.0', $result));
    }


    /**
    * 购物车列表
    * 按仓库分组
    */
    public function cartsList(Request $request)
    {
        $tmp = Carts::where('members_uuid', session('uuid'))
                    ->get()
                    ->groupBy('station_alias')
                    ->toArray();
                    
        $carts = [];
        foreach ($tmp as $value) {
            $carts[trim($value[0]['station_alias'])] = $value;
        }

        $goods_amount = 0;
        $goods_total = 0;
        $price_amount = 0;

        foreach ($carts as $k => $value) {
            foreach ($value as $c => $d) {
                $goods = Goods::find($d['goods_uuid']);
                if (is_null($goods)) {
                    // 商品被下架
                    $d['discount_method'] = 'normal';
                    $d['goods_invalid'] = true;
                    Carts::where('members_uuid', session('uuid'))
                          ->where('goods_uuid', $d['goods_uuid'])
                          ->update([ 'selected' => 'false' ]);
                } else {
                    if ($goods->agent_type==='none') {
                        $d['discount_method'] = 'normal';
                    } elseif ($goods->agent_type==='region' && ($value[$c]['discount_method']==='exclusive')) {
                        $d['discount_method'] = 'exclusive';
                    } elseif ($goods->agent_type==='region' && ($value[$c]['discount_method']==='normal')) {
                        $d['discount_method'] = 'normal';
                    } elseif ($goods->agent_type==='boutique') {
                        $d['discount_method'] = 'boutique';
                    }

                    $price_amount += $d['goods_num']*$d['goods_price']*$d['stocking_pricing_ratio'];
                    $goods_amount += $d['goods_num'];
                    $goods_total += $d['goods_num']*$d['stocking_pricing_ratio'];
                }
                $value[$c] = $d;
            }
            $carts[$k] = $value;
        }

        //计算公式 金币最大抵扣费用 = 总金额 * 商品抵扣金币比列 * 金币兑换人民币比列
        $result = Carts::maxCorn($price_amount);

        // 猜你喜欢
        $uuids = RecentScans::where('members_uuid', session('uuid'))
                            ->orderBy('created_at', 'DESC')
                            ->pluck('goods_uuid')
                            ->take(8)
                            ->toArray();
        $goods = Goods::whereIn('uuid', $uuids)->get();
        foreach ($goods as $goo) {
            $goo->country = Countries::find($goo->countries_uuid);
        }


        //默认最大可用金币写入session
        $request->session()->put('use_corns', $result['useable_corns']);
    
        return view('carts.cartslist', [
            'goods_amount'=>$goods_amount,
            'carts'=>$carts,
            'scan'=>$goods,
            'useable_corns'=>$result['useable_corns'],
            'exchange_money'=>$result['exchange_money'],
            'price_amount'=>$price_amount,
            'goods_total'=>$goods_total
        ]);
    }
}
