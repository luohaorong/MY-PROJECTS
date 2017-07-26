<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Symfony\Component\Yaml\Tests\B;
use UUID;
use Illuminate\Http\Request;
use Validator;
use Lucid\Jsonrpc\Jsonrpc;
use Carbon\Carbon;
use DB;

class Carts extends Base
{

    /**
     * 独家活动验证
     */
    public static function exclusiveCheck($request)
    {

        //参数验证
        $validator = Validator::make($request->all(), [
            'exclusive_uuid'=>'required',
            'areas_uuid'=>'required',
        ]);

        if ($validator->fails()) {
            return false;
        }

        $data['activity_type']= $request->activity_type;
        $data['goods_extends_uuid'] = $request->goods_extends_uuid;
        $data['goods_num'] = $request->goods_num;
        $data['exclusive_uuid'] = $request->exclusive_uuid;
        $data['areas_uuid'] = $request->areas_uuid;

        //判断是否存在该独家商品
        $exclusive = Exclusives::where('uuid', $data['exclusive_uuid'])
            ->where('areas_uuid', $data['areas_uuid'])
            ->first();
        if (empty($exclusive)) {
            return false;
        }


        //判断该商品是否被独家
        $members_exclusives = MembersExclusives::where('exclusives_uuid', $data['exclusive_uuid'])
            ->where('areas_uuid', $data['areas_uuid'])
            ->first();

        if (!empty($members_exclusives)) {
            return false;
        }


        //用户独家资质审核...

         return $exclusive;
    }


    /**
     * 重复添加验证验证
     */
    public static function readdCheck($request)
    {
        //参数验证
        $validator = Validator::make($request->all(), [
            'goods_extends_uuid'=>'required',
            'activity_type'=>'required',
            'goods_num'=>'required',
        ]);

        if ($validator->fails()) {
            return false;
        }
        $data['activity_type']= $request->activity_type;
        $data['goods_extends_uuid'] = $request->goods_extends_uuid;
        $data['goods_num'] = $request->goods_num;
        $data['exclusive_uuid'] = $request->exclusive_uuid;

        $carts = Carts::where('goods_extends_uuid', $data['goods_extends_uuid'])
            ->where('members_uuid', session('uuid'))
            ->where('station_uuid', $request->station_uuid)
            ->where('discount_method', $request->activity_type);

        //独家只能单条下单,重复添加购物车以最后一次记录为准
        if (isset($request->exclusive_uuid)) {
            $request->session()->put('exclusive_uuid', $request->exclusive_uuid);
            $carts = $carts->where('discount_uuid', $request->exclusive_uuid);
        }
        $carts = $carts->first();

        //如果购物车有该商品 直接加减商品数量
        if (!empty($carts)) {
            $carts->goods_num += $data['goods_num'];
            $result = $carts->save();

            $count = Carts::where('members_uuid', session('uuid'))
                ->count();
            if (!$result) {
                return ['status'=>false,'count'=>$count];
            }
            return ['status'=>true,'count'=>$count];
        }

        return ['status'=>true,'count'=>0];
    }



    /**
     *添加购物车
     */
    public static function addCarts($request, $activity)
    {
        $data['goods_extends_uuid'] = $request->goods_extends_uuid;
        $data['station'] = $request->station;
        $data['station_uuid'] = $request->station_uuid;
        $data['goods_num'] = $request->goods_num;
        $data['activity_type'] = $request->activity_type;
        $data['station_alias'] = $request->station_alias;

        $goods_extends = Goods::getGoodExtend($request->goods_extends_uuid);
        $goods = Goods::getGoods($goods_extends['goods_uuid']);

        //检查是否参加独家活动
        if (isset($request->exclusive_uuid)) {
            //检查购物车是否已经添加独家记录,是则直接覆盖
            $carts = Carts::where('members_uuid', session('uuid'))
                ->where('discount_method', 'exclusive')
                ->first();

            if (!empty($carts)) {
                $exclusive = Exclusives::find($request->exclusive_uuid);

                $carts->discount_uuid = $request->exclusive_uuid;
                $carts->selected = 'true';
                $carts->moq = $exclusive->moq;
                $carts->goods_num = $exclusive->moq;
                $carts->goods_price = $exclusive->price;
                $result=  $carts->save();
                $count = Carts::where('members_uuid', session('uuid'))
                    ->count();
                $request->session()->put('carts_count', $count);
                if (!$result) {
                    return ['status'=>false,'data'=>'','count'=>$count];
                }

                return ['status'=>true,'count'=>$count,'data'=>$carts];
            }

            $exclusive = Exclusives::find($request->exclusive_uuid);
            $data['price'] = $exclusive->price;
            $data['moq'] = $exclusive->moq;
            $data['exclusive_uuid'] = $request->exclusive_uuid;
        } else {
            $data['price'] = $goods_extends['price'];
            $data['moq'] = $goods_extends['moq'];
            $data['exclusive_uuid'] = $request->goods_extends_uuid;
            ;
        }

        $carts = new Carts();
        $carts->uuid = UUID::generate()->string;
        $carts->members_uuid = session('uuid');
        $carts->goods_uuid = $goods['uuid'];
        $carts->goods_extends_uuid = $goods_extends['uuid'];
        $carts->goods_chinese_name = $goods['chinese_name'];
        $carts->goods_english_name = $goods['english_name'];
        $carts->image_path = $goods['thumb'];
        $carts->station = $data['station']; //仓库
        $carts->station_alias = $data['station_alias']; //仓库
        $carts->station_uuid = $data['station_uuid'];//仓库UUID
        $carts->moq = $data['moq']; //独家起订量
        $carts->goods_num = $data['goods_num'];
        $carts->goods_price = $data['price'];
        $carts->stock = $goods_extends['stock'];
        $carts->discount_uuid = $data['exclusive_uuid'];
        $carts->discount_method = $data['activity_type'];
        $carts->stocking_pricing_ratio = $goods_extends['stocking_pricing_ratio'];
        $carts->stocking_unit = $goods_extends['stocking_unit'];
        $carts->expired_at = Carbon::now()->addMonths(3)->toDateTimeString();

        if ($goods['agent_type'] === 'region' &&
            $data['activity_type'] === 'normal') {
            $carts->sub_label = '现货';
        } elseif ($goods['agent_type'] === 'region' &&
            $data['activity_type'] === 'exclusive') {
            $carts->sub_label = '独家';
        } elseif ($goods['agent_type'] === 'boutique') {
            $carts->sub_label = '精品酒';
        } elseif (in_array($goods['sub_label'], ['境内发货', '境外发货'])) {
            $carts->sub_label = '现货';
        } else {
            $carts->sub_label = $goods['sub_label'];
        }

        $result = $carts->save();
        $count = Carts::where('members_uuid', '=', session('uuid'))
            ->count();
        $request->session()->put('carts_count', $count);
        if (!$result) {
            return ['status'=>false,'data'=>'','count'=>$count];
        }

        return ['status'=>true,'count'=>$count,'data'=>$carts];
    }



    /**
     * 购物车分组输出
     */
    public static function cartsGroup($address, $shipWay = [], $isStationUuid = false)
    {
        // 购物车分组输出$k是仓库
        $tmp = Carts::where('members_uuid', session('uuid'))
                    ->where('selected', 'true')
                    ->get()
                    ->groupBy('station_alias')
                    ->toArray();

        $carts = [];
        if (!$isStationUuid) {
            foreach ($tmp as $value) {
                $carts[trim($value[0]['station_alias'])] = $value;
            }
        } else {
            $carts = $tmp;
        }

        // 订单商品总库存
        $totalGoodsAmount = 0;
        // 订单商品总数量（瓶）
        $totalGoodsTotal = 0;
        // 订单商品总金额
        $totalPriceAmount = 0;
        // 订单总物流费
        $shipFeeAmount = 0;
        // 订单总上门服务费
        $homeServiceAmount = 0;
        foreach ($carts as $k => $v) {
            // 配货单商品总库存
            $goodsAmount = 0;
            // 配货单商品总数量（瓶）
            $goodsTotal = 0;
            // 配货单商品总金额
            $priceAmount = 0;
            // 配货单物流费
            $shipFee = 0;
            // 配货单上门服务费
            $homeService = 0;
            foreach ($v as $c => $d) {
                $goodsAmount += $d['goods_num'];
                $goodsTotal += $d['goods_num']*$d['stocking_pricing_ratio'];
                $priceAmount  += $d['goods_num']*$d['stocking_pricing_ratio']*$d['goods_price'];

                $goods = Goods::find($d['goods_uuid']);
                if (is_null($goods)) {
                    // 商品被下架
                    $d['discount_method'] = 'normal';
                    $d['goods_invalid'] = true;
                } else {
                    if ($goods->agent_type==='none') {
                        $d['discount_method'] = 'normal';
                    } elseif ($goods->agent_type==='region' && $v[$c]['discount_method']==='exclusive') {
                        $d['discount_method'] = 'exclusive';
                    } elseif ($goods->agent_type==='region' && $v[$c]['discount_method']==='normal') {
                        $d['discount_method'] = 'normal';
                    } elseif ($goods->agent_type==='boutique') {
                        $d['discount_method'] = 'boutique';
                    }
                }
                $v[$c] = $d;
            }
            $carts[$k] = $v;

            $method = 'freight';
            if (empty($address) || ($k=== 'jingwai')) {
                $method = 'other';
            } else {
                foreach ($shipWay as $value) {
                    if ($value['send_station'] === trim($v[0]['station'])) {
                        if ($value['method'] === 'freight') {
                            $method = 'freight';
                        } elseif ($value['method'] === 'express') {
                            $method = 'express';
                        } elseif ($value['method'] === 'self') {
                            $method = 'self';
                        } else {
                            $method = 'other';
                        }
                        if ($value['home_service'] === 'yes') {
                            $homeService = 5000;
                        }
                        break;
                    }
                }
            }

            //没有收获地址或者境外发货
            if ($method === 'freight') {
                $shipFee = static::shippingFee(['city'=>trim($v[0]['station'])], $address[0]);
            } elseif ($method === 'express') {
                $shipFee = $goodsTotal * 1000;
            }

            if (empty($shipWay)) {
                $homeService = 5000;
            }

            $totalGoodsAmount += $goodsAmount;
            $totalGoodsTotal += $goodsTotal;
            $totalPriceAmount += $priceAmount;
            $shipFeeAmount += $shipFee;
            $homeServiceAmount += $homeService;

            $carts[$k]['amount'] = [
                'goods_amount' => $goodsAmount,
                'goods_total' => $goodsTotal,
                'price_amount' => $priceAmount,
                'ship_fee' => $shipFee,
                'home_service' => $homeService,
            ];
        }

        $data = [];
        $data['carts'] = $carts;
        $data['goods_amount'] = $totalGoodsAmount;
        $data['goods_total'] = $totalGoodsTotal;
        $data['price_amount'] = $totalPriceAmount;
        $data['ship_fee_amount'] = $shipFeeAmount;
        $data['home_service_amount'] = $homeServiceAmount;
        $data['goods_and_service'] = $homeServiceAmount+$totalPriceAmount;

        return $data;
    }


    /**
     * 移入收藏夹
     */
    public static function moveTo($uuid)
    {
        DB::beginTransaction();
        $cart = Carts::find($uuid);
        if (is_null($cart)) {
            return false;
        }

        $result = $cart->delete();
        if (!$result) {
            DB::rollBack();
            return false;
        }

        $isFavorite = Favorites::where('goods_uuid', $cart->goods_uuid)
                                 ->where('members_uuid', session('uuid'))
                                 ->exists();
        if ($isFavorite) {
            DB::commit();
            return true;
        }

        $favior = new Favorites();
        $favior->uuid = UUID::generate()->string;
        $favior->members_uuid = session('uuid');
        $favior->goods_uuid = $cart->goods_uuid;
        $favior->goods_image = $cart->image_path;
        $favior->goods_chinese_name = $cart->goods_chinese_name;
        $favior->goods_english_name = $cart->goods_english_name;
        $result = $favior->save();
        if (!$result) {
            DB::rollBack();
            return false;
        }
        DB::commit();
        return true;
    }


    /**
     * 选中购物车
     */
    public static function cartSelect($request)
    {

        //用户加入购物车所有UUID
        $uuids = Carts::where('members_uuid', session('uuid'))
            ->pluck('uuid')
            ->toArray();

        DB::beginTransaction();

        //全部选中或者部分选中
        if (!empty($request->uuid) && trim($request->uuid) != ',') {
            //设置选中
            $result1 = Carts::where('members_uuid', session('uuid'))
                ->whereIn('uuid', explode(',', trim($request->uuid)))
                ->update(['selected'=>'true']);
            if (!$result1) {
                DB::rollBack();
                return false;
            }

            //设置未选中
            $unselected_uuid = array_diff($uuids, explode(',', $request->uuid));
            if (!empty($unselected_uuid)) {
                $result2 = Carts::where('members_uuid', session('uuid'))
                    ->whereIn('uuid', $unselected_uuid)
                    ->update(['selected'=>'false']);
                if (!$result2) {
                    DB::rollBack();
                    return false;
                }
            }
        }

        //一个都没有选中的情况
        if (trim($request->uuid) ==',') {
            $unselected_uuid = array_diff($uuids, explode(',', $request->uuid));
            if (!empty($unselected_uuid)) {
                $result2 = Carts::where('members_uuid', session('uuid'))
                    ->whereIn('uuid', $unselected_uuid)
                    ->update(['selected'=>'false']);
                if (!$result2) {
                    DB::rollBack();
                    return false;
                }
            }
        }
        DB::commit();
        return true;
    }


    /**
     * 输出价格变动
     */
    public static function changeCarts($useCorns = 0)
    {
        $carts = Carts::where('members_uuid', session('uuid'))
                      ->get([ 'uuid', 'goods_chinese_name', 'goods_english_name', 'station', 'station_alias', 'stock', 'moq', 'image_path', 'goods_num', 'goods_price', 'stocking_pricing_ratio', 'stocking_unit', 'selected', 'expired_at' ]);

        // 商品总种数
        $totalCategory = count($carts);
        // 已选商品种数
        $selectedCategory = 0;
        // 已选商品库存（库存单位）
        $selectedStocking = 0;
        // 已选商品库存（定价单位）
        $selectedPricing = 0;
        // 已选商品总金额
        $selectedAmount = 0;
        foreach ($carts as $cart) {
            if ($cart->selected === 'true') {
                $selectedCategory ++;
                $selectedStocking += $cart->goods_num;
                $selectedPricing += $cart->goods_num * $cart->stocking_pricing_ratio;
                $selectedAmount += $cart->goods_num * $cart->stocking_pricing_ratio * $cart->goods_price;
            }
            $cart->goods_total = $cart->goods_price * $cart->goods_num * $cart->stocking_pricing_ratio;
        }

        $fact = static::maxCorn($selectedAmount, $useCorns);
        $available = static::maxCorn($selectedAmount);

        // 使用金币
        $factCorns = $fact['useable_corns'];
        // 总金币
        $totalCorns = session('corns');
        // 可用金币
        $availableCorns = $available['useable_corns'];
        // 剩余金币
        $restCorns = $totalCorns - $factCorns;
        // 金币抵用金额
        $exchangeMoney = (int)$fact['max_corns_discount'];
        // 实际支付金额
        $factAmount = $selectedAmount - $exchangeMoney;

        $data = [];
        $data['carts'] = $carts->toArray();
        $data['total_goods_category'] = $totalCategory;
        $data['selected_goods_category'] = $selectedCategory;
        $data['selected_stocking'] = $selectedStocking;
        $data['selected_pricing'] = $selectedPricing;
        $data['selected_goods_amount'] = $selectedAmount;
        $data['use_corns'] = $factCorns;
        $data['total_corns'] = $totalCorns;
        $data['available_corns'] = $availableCorns;
        $data['rest_corns'] = $restCorns;
        $data['exchange_money'] = $exchangeMoney;
        $data['fact_amount'] = $factAmount;

        return $data;
    }

    /**
     * 最大可用金币和优惠折扣计算
     */
    public static function maxCorn($priceAmount, $useCorns = null)
    {
        if ($useCorns === null || $useCorns > session('corns')) {
            $useCorns = session('corns');
        }

        $setting = Setting::where('key', 'gold')->first();
        $value = json_decode($setting->value, true);

        //最多使用金币
        $maxUsedCorn = floor(session('corns') * $value['max_self_ratio'] / 10000);

        if ($maxUsedCorn < $useCorns) {
            $useCorns = $maxUsedCorn;
        }

        //金币最大抵扣费用(以分为单位)
        $maxCornsDiscount = $priceAmount * $value['max_used_ratio'] / 10000;

        //用户可用金币折算(以分为单位)
        $userCornsDiscount = $useCorns * $value['exchange_money'];

        //最大金币抵扣费用
        $maxCornsDiscount = $maxCornsDiscount >= $userCornsDiscount ? $userCornsDiscount : $maxCornsDiscount;

        //最大可用金币(金币个数向下取整)
        $useable_corns = floor($maxCornsDiscount/$value['exchange_money']);

        return [
            'useable_corns' => $useable_corns,
            'max_corns_discount' => $maxCornsDiscount,
            'exchange_money' => $value['exchange_money']
        ];
    }



    /**
     * 按仓库计算运费
     * 发货地一个  收获地一个  商品多个
     *
     */
    public static function shippingFee($data, $address = [])
    {
        //如果用户没有收获地址无法计算物流
        if (empty($address)) {
            return 0;
        }

        $params_data = [];
        if (trim($data['city']) == '上海仓') {
            $params_data['city'] = '上海市';
            $params_data['detail'] = '外高桥';
        } elseif (trim($data['city']) == '宁波仓') {
            $params_data['city'] = '宁波市';
            $params_data['detail'] = '海港';
        } elseif (trim($data['city']) == '成都仓') {
            $params_data['city'] = '成都市';
            $params_data['detail'] = '盛大国际';
        }

        $carts = Carts::where('members_uuid', session('uuid'))
            ->where('selected', 'true')
            ->get()
            ->toArray();

        $volume = 0;
        $weight = 0;
        foreach ($carts as $k => $v) {
            $goods_extends = GoodsExtends::where('uuid', $v['goods_extends_uuid'])->first();
            $volume  += $goods_extends['volume'];
            $weight  += $goods_extends['weight']*$v['goods_num'];
        }

        //计算距离用
        $params = [
           'origin'=>['city'=>$params_data['city'],'address'=>$params_data['detail']],
           'destination'=>['city'=>$address['city'],'address'=>$address['zone']],
        ];

        $json = new Jsonrpc(
            config('jsonrpc.client.cloud.route'),
            'POST',
            config('jsonrpc.client.cloud.key')
        );
        $result = $json->send('map', 'Baidu.shipDistance', $params);

        //如果算不出距离
        if (empty($result->data)) {
            return 0;
        }

        //　偏移20公里
        $distance = (int) $result->data + 20000;

        $setting = Setting::where('key', 'freight')->first();
        $value = json_decode($setting->value, true);
        //运费计算公式

        if ($volume < 4000) {
            $fee = $weight * $distance * $value['price'];
        } else {
            $fee = $weight * $distance * $value['price'] * 12;
        }

        return (int) $fee;
    }

    /**
    * 检查商品参加活动类型
    */
    public static function checkActivity($request)
    {
        //检验是否参加活动
        $goods_extend = GoodsExtends::find($request->goods_extends_uuid);
        $goods = Goods::find($goods_extend->goods_uuid);

        $activity = Activities::where('activity_status', 'true')
           ->lists('goods_uuid', 'activity_title')
           ->toArray();

        $activities = [];
        foreach ($activity as $k => $v) {
            $activities[$k] = json_decode($v, true);
        }

        $tmp = [];
        foreach ($activities as $k => $v) {
            if (in_array($goods->uuid, $v)) {
                array_push($tmp, $k);
            } else {
                continue;
            }
        }
        return $tmp;
    }
}
