<?php

namespace App;

use UUID;
use Validator;
use App\OrderGoods;
use App\Base;
use App\Carts;
use App\Pays;
use App\Setting;
use App\Http\Requests\Request;
use Illuminate\Session;
use Lucid\Jsonrpc\Jsonrpc;
use Carbon\Carbon;

class Orders extends Base
{

    /**
     * 验证用户可用金币
     */
    public static function checkCorns()
    {
        //验证用户可用金币
        $carts = Carts::where('members_uuid', session('uuid'))
                      ->where('selected', 'true')
                      ->get()
                      ->toArray();

        if (empty($carts)) {
            return 0;
        }

        $price_amount = 0;
        foreach ($carts as $k => $v) {
            $price_amount += $v['goods_num']*$v['stocking_pricing_ratio']*$v['goods_price'];
        }

        $result = Carts::maxCorn($price_amount);
        $useable_corns = $result['useable_corns'];

        if (session('use_corns') > $useable_corns) {
            return 10015;
        }
        return $useable_corns;
    }

    /**
     * 下单检查库存
     */
    public static function checkStock()
    {
        $carts = Carts::where('members_uuid', session('uuid'))
            ->where('selected', 'true')
            ->get()
            ->toArray();
        //遍历购物车
        $out_stock = [];
        foreach ($carts as $k => $value) {
            $goods_extend =  GoodsExtends::find($value['goods_extends_uuid']);
            if ($value['goods_num'] >$goods_extend->stock) {
                $tmp = $value['goods_chinese_name'];
                $out_stock[] = $tmp;

                $result = Carts::where('uuid', $value['uuid'])->update(['stock'=>$goods_extend->stock]);
                if (!$result) {
                    return false;
                }
            }
        }
        return $out_stock;
    }

    /**
     * 30箱发货检查
     */
    public static function checkPurchase()
    {
        $sum = Carts::where('members_uuid', session('uuid'))
                        ->where('selected', 'true')
                        ->sum('goods_num');
        $setting = Setting::get('freight');
        $msq = (int) $setting['msq'];
        return $sum >= $msq;
    }

    /**
     * 生成member_exclusive独家记录
     */
    public static function createMembersExclusive($order, $exclusive_uuid)
    {
        $exclusive = Exclusives::find($exclusive_uuid);
        if (empty($exclusive)) {
            return false;
        }

        //判断是否被独家
        $members_exclusive = MembersExclusives::where('exclusives_uuid', $exclusive_uuid)
            ->first();

        if (!empty($members_exclusive)) {
            return 'exclusivesed';
        }
        $setting = Setting::where('key', 'expired_time')->first();
        $time = time();
        $members_exclusive = new  MembersExclusives();
        $members_exclusive->uuid = UUID::generate()->string;
        $members_exclusive->exclusives_uuid = $exclusive_uuid;
        $members_exclusive->areas_uuid = $exclusive->areas_uuid;
        $members_exclusive->members_uuid = session('uuid');
        $members_exclusive->orders_uuid = $order['uuid'];
        $members_exclusive->goods_uuid = $exclusive->goods_uuid;

        //同订单超期时间
        $members_exclusive->expired_at = date('Y-m-d H:i:s', ($setting->value + $time));
        $members_exclusive->status = 'false';//异步修改
        $result = $members_exclusive->save();
        if (!$result) {
            return false;
        }
        return true;
    }


    /**
     * 生成订单
     */
    public static function createOrder($request, $feeCount)
    {
        // 订单号
        $orderSn = static::generate();
        if (!$orderSn) {
            return [ 'status' => false, 'order' => [] ];
        }

        // 收货地址
        $address = static::address($request->address_uuid);
        $addr = [];
        $addr['real_name'] = $address->real_name;
        $addr['mobile'] = $address->mobile;
        $addr['address'] = $address->add;

        // 过期时间
        $setting = Setting::where('key', 'expired_time')->first();
        $expiredAt = Carbon::now()->addSeconds($setting->value)
                                  ->toDateTimeString();

        // 奖励金币
        $cornsSetting = Setting::where('key', 'gold')->first();
        $gold = json_decode($cornsSetting->value, true);

        // 抵用金币折算金额
        $discountAmount = session('use_corns') * $gold['exchange_money'];

        $returnCorns = floor($gold['return_ratio'] * ($feeCount['price_amount'] - $discountAmount) / 10000 / $gold['exchange_money']);

        // 奖励积分
        $pointsSetting = Setting::where('key', 'point')->first();
        $points = json_decode($pointsSetting->value, true);
        $returnPoints = floor($points['return_ratio'] * ($feeCount['price_amount'] - $discountAmount) / 1000000);

        // 订单总金额（商品总金额 + 物流费 + 上门服务费 - 抵用金币 - 抵用积分 - 优惠金额）
        $orderAmount = 0;
        $orderAmount += $feeCount['price_amount']; // 商品总金额
        $orderAmount += $feeCount['ship_fee_amount']; // 物流费
        $orderAmount += $feeCount['home_service_amount']; // 上门服务费
        $orderAmount -= $discountAmount; // 抵用金币换算金额

        $order = new Orders();
        $order->uuid = UUID::generate()->string;
        $order->order_sn = $orderSn;
        $order->members_uuid = session('uuid');
        $order->addresses_uuid = $request->address_uuid;
        $order->order_from_client = 'pc';
        $order->order_state = '待支付';
        $order->address = json_encode($addr, true);
        $order->goods_amount = $feeCount['price_amount'];
        $order->order_amount = $orderAmount;
        $order->payed_amount = $orderAmount;
        $order->service_amount = $feeCount['home_service_amount'];
        $order->shipping_fee = $feeCount['ship_fee_amount'];
        $order->use_corns = session('use_corns');
        $order->expired_at = $expiredAt;
        $order->corns = $returnCorns;
        $order->points = $returnPoints;

        $result = $order->save();
        if (!$result) {
            return [ 'status' =>false, 'order' => [] ];
        }

        return [ 'status' => true, 'order' => $order ];
    }


    /**
     * 获取收获地址完整信息
     */
    public static function address($request)
    {
        $address = Addresses::where('uuid', $request)
            ->first();

        $areas =  Areas::where('uuid', $address['areas_uuid'])
            ->first()
            ->toArray();

        $parats = Areas::where('lft', '<', $areas['lft'])
            ->where('rgt', '>', $areas['rgt'])
            ->get()
            ->toArray();
        $tree = array_to_tree($parats);

        if (trim($tree[0]['sub'][0]['name'])=='市辖区'
            ||trim($tree[0]['sub'][0]['name'])=='县') {
            $address['add'] = $tree[0]['name'].$areas['name'].$address->detail;
            $address['city'] = $tree[0]['name'];
        } else {
            $address['add'] = $tree[0]['name'].$tree[0]['sub'][0]['name'].$areas['name'].$address->detail;
            $address['city'] = $tree[0]['sub'][0]['name'];
        }
        $address['zone'] = $areas['name'];

        return $address;
    }

    /**
     * 下单减库存
     */
    public static function updateStock()
    {
        $carts = Carts::where('members_uuid', session('uuid'))
                        ->where('selected', 'true')
                        ->get();

        //遍历购物车
        foreach ($carts as $value) {
            $result = GoodsExtends::where('uuid', $value->goods_extends_uuid)
                                    ->decrement('stock', $value->goods_num);

            if (!$result) {
                return false;
            }
        }
        return true;
    }

    /**
     * 更新购买数量
     */
    public static function updateBuyNum()
    {
        $uuids = Carts::where('members_uuid', session('uuid'))
                        ->where('selected', 'true')
                        ->distinct()
                        ->pluck('goods_uuid')
                        ->toArray();
        $result = Goods::whereIn('uuid', $uuids)->increment('buy_num');
        return $result;
    }

    /**
     * 冻结金币
     */
    public static function freezeCorns()
    {
        $result = Members::where('uuid', session('uuid'))
                          ->increment('freeze_corns', session('use_corns'));

        if (!$result) {
            return false;
        }
        return true;
    }

    /**
     * 解冻金币
     */
    public static function unfreezeCorns($request)
    {
        $order = Orders::find($request);
        if ($order->use_corns == 0) {
            return true;
        }

        $result = Members::where('uuid', session('uuid'))
            ->decrement('freeze_corns', $order->use_corns);
        if (!$result) {
            return false;
        }
        return true;
    }


    /**
     * 恢复库存
     */

    public static function stockBack($request)
    {
        $order_goods = OrderGoods::where('orders_uuid', $request)
            ->get();

        foreach ($order_goods as $k => $v) {
            $result = GoodsExtends::where('uuid', $v->goods_extends_uuid)->increment('stock', $v->goods_num);
            if (!$result) {
                return false;
            }
        }
        return true;
    }


    /**
     * 生成order_goods
     */
    public static function createOrderGoods($request, $order)
    {
        $carts = Carts::where('members_uuid', session('uuid'))
                        ->where('selected', 'true')
                        ->get();

        foreach ($carts as $cart) {
            $order_goods = new OrderGoods();
            $order_goods->uuid = UUID::generate()->string;
            $order_goods->orders_uuid = $order->uuid;
            $order_goods->goods_extends_uuid = $cart->goods_extends_uuid;
            $order_goods->goods_uuid = $cart->goods_uuid;
            $order_goods->goods_num = $cart->goods_num;
            $order_goods->goods_price = $cart->goods_price;
            $order_goods->stocking_pricing_ratio = $cart->stocking_pricing_ratio;
            $order_goods->price_sum = $cart->goods_price * $cart->stocking_pricing_ratio * $cart->goods_num;
            $order_goods->goods_image = $cart->image_path;
            $order_goods->goods_chinese_name = $cart->goods_chinese_name;
            $order_goods->goods_english_name = $cart->goods_english_name;
            $order_goods->members_uuid = session('uuid');
            $order_goods->discount_method = $cart->discount_method;
            $order_goods->discount_uuid = $cart->discount_uuid;
            $order_goods->station = $cart->station;
            $order_goods->sub_label = $cart->sub_label;
            $result = $order_goods->save();
            if (!$result) {
                return false;
            }

            //创建代理商独家记录
            if ($cart->discount_method === 'exclusive') {
                $result = static::createMembersExclusive($order, $cart->discount_uuid);
                if ($result === 'exclusivesed') {
                    return 'exclusivesed';
                }
                if ($result === false) {
                    return false;
                }
            }
        }
        return true;
    }


    /**
     * 生成配货单
     */
    public static function createDelivery($request, $order)
    {
        $delivery = json_decode($request->delivery, true);
        foreach ($delivery as $k => $value) {
            $delivery_bill = new DeliveryBills();
            $delivery_bill->uuid = UUID::generate()->string;
            $delivery_bill->orders_sn = $order->order_sn;
            $delivery_bill->orders_uuid = $order->uuid;
            $delivery_bill->members_uuid = $order->members_uuid;
            $delivery_bill->addresses_uuid = $order->addresses_uuid;
            $delivery_bill->delivery_method = $value['method'];
            $delivery_bill->send_station = $value['send_station'];
            $delivery_bill->home_service = $value['home_service'];
            $result = $delivery_bill->save();
            if (!$result) {
                return false;
            }
        }
        return true;
    }


    /**
     * 删除购物车
     */
    public static function delCarts($request)
    {
        $carts = Carts::where('selected', 'true')
                       ->where(['members_uuid'=>session('uuid')])
                       ->delete();

        if (!$carts) {
            return false;
        }

        return true;
    }


    /**
     * 根据member_uuid查询订单以及订单商品
     * 返回订单以及订单的商品数组
     */
    public static function getOrders($request)
    {
        $validator = Validator::make($request, [
            'uuid' => 'required',
        ]);
        if ($validator->fails()) {
            return output(false, $validator->errors());
        }

        //根据members_uuid得到所有订单ID
        $orders =  Orders::where(['members_uuid'=>$request['uuid']])->get();
        $orders = $orders->toArray();
        if (empty($orders)) {
            return array();
        }

        //查询订单商品
        $ordergoods  = OrderGoods::getGoodsByorder($orders);
        $ordergoods = $ordergoods->toArray();
        return $ordergoods;
    }

    /**
     * 更新待支付订单商品价格快照
     * {添加活动表 如果是活动商品更新活动商品价格}
     */
    public static function updateSnap()
    {
        $orders = Orders::where('members_uuid', session('uuid'))
            ->where('order_state', '待支付')
            ->pluck('uuid')
            ->toArray();

        $goods_extends_uuids = OrderGoods::whereIn('orders_uuid', array_values($orders))
            ->where('members_uuid', session('uuid'))
            ->pluck('goods_extends_uuid')
            ->toArray();

        $goods_extends = GoodsExtends::whereIn('uuid', $goods_extends_uuids)
            ->get()
            ->toArray();

        $goods_extends_tmp = array();
        foreach ($goods_extends as $k => $v) {
            $goods_extends_tmp[$v['uuid']] = $v;
        }


        $order_goods = OrderGoods::whereIn('orders_uuid', array_values($orders))
            ->where('members_uuid', session('uuid'))
            ->get()
            ->toArray();
        $order_goods_tmp = array();
        foreach ($order_goods as $k => $v) {
            $order_goods_tmp[$v['goods_extends_uuid']] = $v;
        }


        foreach ($order_goods_tmp as $k => $v) {
            $order_goods_new = OrderGoods::where('uuid', $v['uuid'])
                ->where('members_uuid', session('uuid'))
                ->first();
            $order_goods_new->goods_price = $goods_extends_tmp[$k]['price'];
            $order_goods_new->stocking_pricing_ratio = $goods_extends_tmp[$k]['stocking_pricing_ratio'];

            //更新商品价格后重新计算总价格
            $price_sum = $goods_extends_tmp[$k]['price']*$goods_extends_tmp[$k]['stocking_pricing_ratio']*$v['goods_num'];
            $order_goods_new->price_sum = $price_sum;
            $goods = Goods::where('uuid', $goods_extends_tmp[$k]['goods_uuid'])
                ->first()
                ->toArray();
            $order_goods_new->goods_image = $goods['thumb'];
            $order_goods_new->goods_chinese_name = $goods['chinese_name'];
            $order_goods_new->goods_english_name = $goods['english_name'];
            $result = $order_goods_new->save();
            if (!$result) {
                return false;
            }
        }
        return true;
    }


    /**
     *订单费用计算
     */
    public static function orderFeeCount($addressUuid, $shipWay)
    {
        //收获地址输出
        $address = Addresses::getAddress($addressUuid);

        //购物车分组输出
        $result = Carts::cartsGroup([ $address ], $shipWay);

        return $result;
    }


    /**
     * 过滤独家订单
     */
    public static function filterExclusive()
    {

        //过滤独家订单
        $orders = Orders::where('members_uuid', session('uuid'))
            ->pluck('uuid')
            ->toArray();
        $orders_goods = OrderGoods::whereIn('orders_uuid', $orders)
            ->get()
            ->groupBy('goods_uuid')
            ->toArray();

        $goods = array_keys($orders_goods);//订单所有商品

        $activity = Activities::where('activity_status', 'true')
            ->where('activity_title', 'exclusive')
            ->first()
            ->toArray();
        if (empty($activity)) {
            return $orders;
        }
        $goods_uuid = json_decode($activity['goods_uuid'], true);

        $tmp = [];
        foreach ($goods as $k => $v) {
            if (in_array($v, $goods_uuid)) {
                continue;
            } else {
                array_push($tmp, $v);
            }
        }
        return $tmp;
    }

    /**
     *
     * 生成订单号
     *
     * @return string
     */
    public static function generate()
    {
        //RPC发起短信日志记录
        $json = new Jsonrpc(
            config('jsonrpc.client.cloud.route'),
            'POST',
            config('jsonrpc.client.cloud.key')
        );

        $result = $json->send('factory', 'SerialNumber.orderSn');
        if ($result->success && $result->data) {
            return $result->data;
        }
        return false;
    }
}
