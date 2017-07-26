<?php

namespace App\Http\Controllers;

use App\Addresses;
use App\Areas;
use App\Base;
use App\Carts;
use App\DeliveryBills;
use App\Goods;
use App\GoodsExtends;
use App\MembersExclusives;
use App\OrderGoods;
use App\Orders;
use App\Setting;
use App\Invoices;
use Illuminate\Http\Request;
use UUID;
use Validator;
use DB;
use App\Pays;
use App\Activities;
use Carbon\Carbon;

/**
 * Class OrdersController
 * @package App\Http\Controllers
 *
 */
class OrdersController extends BaseController
{
    /**
     * 提交订单动作
     * 生成订单
     * 生成订单商品关联
     * 生成配送单
     * 按发货仓库生成配货单,订单UUID和发货仓库确定唯一配货单
     */
    public function writeOrder(Request $request)
    {
        //验证所有参数是否合法
        $validator = Validator::make($request->all(), [
            'delivery'=>'required',
            'address_uuid' =>'required',
        ]);

        if ($validator->fails()) {
            return response()->json(configs('error_code.100'));
        }

        //验证输入金币合法性
        $result = Orders::checkCorns();
        if ($result === 10015) {
            return response()->json(configs('error_code.10015'));
        }

        //验证商品库存是否充足
        $result = Orders::checkStock();
        if ($result === false) {
            return response()->json(configs('error_code.-1'));
        } elseif (!empty($result)) {
            return response()->json(configs('error_code.10025', $result));
        }

        // 验证是否满足发货条件
        $result = Orders::checkPurchase();
        if (!$result) {
            return response()->json(configs('error_code.10030'));
        }

        DB::beginTransaction();

        //冻结金币
        $result = Orders::freezeCorns();
        if (!$result) {
            DB::rollBack();
            return response()->json(configs('error_code.10016'));
        } else {
            $corns = session('corns')-session('use_corns');
            $request->session()->put('corns', $corns);
        }

        //扩展添加活动后统计计算订单费用不再单独计算.........

        //计算订单总运费
        $feeCount = Orders::orderFeeCount($request->address_uuid, json_decode($request->delivery, true));

        //生成订单
        $result = Orders::createOrder($request, $feeCount);
        if ($result['status'] === false) {
            DB::rollBack();
            return response()->json(configs('error_code.10016'));
        }
        $order = $result['order'];

        //创建order_goods记录 + 判断独家
        $result = Orders::createOrderGoods($request, $order);

        if ($result === 'exclusivesed') {
            DB::rollBack();
            return response()->json(configs('error_code.10026'));
        }
        if (!$result) {
            DB::rollBack();
            return response()->json(configs('error_code.10016'));
        }

        //下单减库存20分钟失效
        $result = Orders::updateStock();
        if (!$result) {
            DB::rollBack();
            return response()->json(configs('error_code.10016'));
        }

        //创建配送单记录(按仓库)
        $result = Orders::createDelivery($request, $order);
        if (!$result) {
            DB::rollBack();
            return response()->json(configs('error_code.10016'));
        }

        // 更新商品购买数量
        Orders::updateBuyNum();

        //删除购物车
        $result = Orders::delCarts($request);
        if (!$result) {
            DB::rollBack();
            return response()->json(configs('error_code.10016'));
        }
        DB::commit();

        // 更新订单数量
        $orders_count = Orders::where('members_uuid', session('uuid'))
                                 ->where('order_state', '待支付')
                                 ->count();
        $request->session()->put('orders_count', $orders_count);

        // 更新购物车数量
        $count = Carts::where('members_uuid', session('uuid'))
                       ->count();
        $request->session()->put('carts_count', $count);

        //提交到支付页面
        return response()->json(configs('error_code.0', ['order_uuid'=>$order->uuid]));
    }

    /**
     * 审核页面输出(商品分组)
     */
    public function ordercheck()
    {
        //收获地址输出
        $address = Addresses::addressList();

        //购物车分组输出
        $result = Carts::cartsGroup($address);

        // 奖励金币
        $cornsSetting = Setting::where('key', 'gold')->first();
        $gold = json_decode($cornsSetting->value, true);

        // 抵用金币折算金额
        $discountAmount = session('use_corns') * $gold['exchange_money'];

        $orderAmount = 0;
        $orderAmount += $result['price_amount']; // 商品总金额
        $orderAmount += $result['ship_fee_amount']; // 物流费
        $orderAmount += $result['home_service_amount']; // 上门服务费
        $orderAmount -= $discountAmount; // 抵用金币换算金额
        // 实际支付金额
        $result['payed_amount'] = $orderAmount;
        $result['discount_amount'] =  $discountAmount;//金币抵扣金额

        $data = [];
        $data['addresses'] = $address;
        $data['carts'] = $result['carts'];
        $data['data'] = $result;

        return view('orders.orderscheck', $data);
    }

    /**
     * 文件下载
     */
    public function download($uuid)
    {
        $orderGoods = OrderGoods::where('orders_uuid', $uuid)->get();
        foreach ($orderGoods as $og) {
            $goods = Goods::find($og->goods_uuid);
            if (!is_null($goods)) {
                $og->certification = json_decode($goods->certification, true);
            }
        }
        return view('orders.download', [ 'orderUuid' => $uuid, 'orderGoods' => $orderGoods ]);
    }

    /**
     *
     * 获取物流运费
     *
     * @param  Request $request
     * @return
     */
    public function getShipFee(Request $request)
    {
        //验证所有参数是否合法
        $validator = Validator::make($request->all(), [
            'delivery'=>'required',
            'address_uuid' =>'required',
        ]);

        if ($validator->fails()) {
            return response()->json(configs('error_code.100'));
        }

        //收获地址输出
        $address = Addresses::getAddress($request->address_uuid);
        //购物车分组输出
        $result = Carts::cartsGroup([ $address ], json_decode($request->delivery, true), true);
        
        // 奖励金币
        $cornsSetting = Setting::where('key', 'gold')->first();
        $gold = json_decode($cornsSetting->value, true);

        // 抵用金币折算金额
        $discountAmount = session('use_corns') * $gold['exchange_money'];

        $orderAmount = 0;
        $orderAmount += $result['price_amount']; // 商品总金额
        $orderAmount += $result['ship_fee_amount']; // 物流费
        $orderAmount += $result['home_service_amount']; // 上门服务费
        $orderAmount -= $discountAmount; // 抵用金币换算金额
        // 实际支付金额
        $result['payed_amount'] = $orderAmount;
        $result['discount_amount'] = $discountAmount;//金币抵扣金额

        $data = [];
        $data['carts'] = $result['carts'];
        $data['data'] = $result;

        return response()->json(configs('error_code.0', $data));
    }


    /**
     * 订单列表
     */
    public function orderlist(Request $request)
    {
        $orders = Orders::where('members_uuid', session('uuid'));
        if (isset($request->state)) {
            $reqState = trim($request->state);
            if (in_array($reqState, ['待支付','已支付','待发货','已完成','已取消'])) {
                $orders = $orders->where('order_state', $reqState);
            } elseif ($reqState === '已发货') {
                $orders = $orders->whereIn('order_state', ['已支付','已发货']);
            }
        }
        
        if ($request->begin_time && (!$request->end_time)) {
            $orders = $orders->whereDate('created_at', '>=', $request->begin_time);
        } elseif ($request->end_time && (!$request->begin_time)) {
            $orders = $orders->where('created_at', '<=', Carbon::parse($request->end_time)->addDay()->subSecond()->toDateTimeString());
        } elseif ($request->end_time && $request->begin_time) {
            $orders = $orders->where('created_at', '<=', Carbon::parse($request->end_time)->addDay()->subSecond()->toDateTimeString())
                             ->whereDate('created_at', '>=', $request->begin_time);
        }

        $orders = $orders->orderBy('order_sn', 'DESC')->paginate(5);

        $orders_uuid = Orders::where(['members_uuid' => session('uuid')])
                                ->pluck('uuid')
                                ->toArray();

        $orders_goods = OrderGoods::whereIn('orders_uuid', $orders_uuid)
                                    ->get()
                                    ->groupBy('orders_uuid')
                                    ->toArray();

        foreach ($orders_goods as $key => $value) {
            foreach ($value as $c => $d) {
                $goods = Goods::find($d['goods_uuid']);
                if (is_null($goods)) {
                    // 商品被下架
                    $d['discount_method'] = 'normal';
                    $d['goods_invalid'] = true;
                } else {
                    if ($goods->agent_type==='none') {
                        $d['discount_method'] = 'normal';
                    } elseif ($goods->agent_type==='region' &&$value[$c]==='exclusive') {
                        $d['discount_method'] = 'exclusive';
                    } elseif ($goods->agent_type==='region' &&$value[$c]==='exclusive') {
                        $d['discount_method'] = 'normal';
                    } elseif ($goods->agent_type==='boutique') {
                        $d['discount_method'] = 'boutique';
                    }
                }
                $value[$c] = $d;
            }

            $orders_goods[$key] = $value;
        }

        //订单数组orders
        foreach ($orders as $value) {
            $value->goods = $orders_goods[$value->uuid];
        }

        return view('orders.myorder', [
            'orders'=>$orders,
            'state'=>$request->state,
        ]);
    }


    /**
     * 订单详情
     */
    public function orderDetail(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'orders_uuid'=>'required',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
            return back()->withErrors($errors)->withInput();
        }

        $order = Orders::findOrFail($request->orders_uuid)->toArray();

        $orders_goods = OrderGoods::where('orders_uuid', $request->orders_uuid)
            ->get()
            ->toArray();

        $delivery_count = DeliveryBills::where('orders_uuid', $order['uuid'])
            ->where('members_uuid', session('uuid'))
            ->where('home_service', 'yes')
            ->count();

        $goods_amount = 0;
        $goods_total = 0;
        $price_sum = 0;
        foreach ($orders_goods as $value) {
            $goods_amount +=$value['goods_num'];
            $goods_total += $value['goods_num']*$value['stocking_pricing_ratio'];
            $price_sum  += $value['price_sum'];
        }
        $goods_amount = 0;
        $goods_total = 0;
        $price_sum = 0;
        foreach ($orders_goods as $key => $value) {
            $goods_amount +=$value['goods_num'];
            $goods_total += $value['goods_num']*$value['stocking_pricing_ratio'];
            $price_sum  += $value['price_sum'];

            $goods = Goods::find($value['goods_uuid']);
            if (is_null($goods)) {
                // 商品被下架
                $value['discount_method'] = 'normal';
                $value['goods_invalid'] = true;
            } else {
                if ($goods->agent_type==='none') {
                    $value['discount_method'] = 'normal';
                } elseif ($goods->agent_type==='region' && $value['discount_method']==='exclusive') {
                    $value['discount_method'] = 'exclusive';
                } elseif ($goods->agent_type==='region' && $value['discount_method']==='normal') {
                    $value['discount_method'] = 'normal';
                } elseif ($goods->agent_type==='boutique') {
                    $value['discount_method'] = 'boutique';
                }
            }
            $orders_goods[$key] = $value;
        }

        // 是否有发票申请
        $invoice = Invoices::where('orders_uuid', $order['uuid'])->first();

        return view('orders.orderDetail', [
                'order' => $order,
                'goods_amount' => $goods_amount,
                'goods_total' => $goods_total,
                'price_num' => $price_sum,
                'order_total' => $order['order_amount'],
                'orders_goods' => $orders_goods,
                'home_service' => $delivery_count*5000,
                'invoice' => $invoice
            ]);
    }

    /**
     * 取消订单
     */
    public function orderCancel(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'order_uuid'=>'required',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
            return back()->withErrors($errors)->withInput();
        }

        DB::beginTransaction();

        //删除订单
        $result = Orders::where('uuid', $request->order_uuid)
            ->where('members_uuid', session('uuid'))
            ->where('order_state', '待支付')
            ->update(['order_state'=>'已取消']);
        if (!$result) {
            DB::rollBack();
            return back()->withInput();
        }

        //删除用户独家记录
        $isExist = MembersExclusives::where('orders_uuid', $request->order_uuid)
                                    ->exists();

        if ($isExist) {
            $result = MembersExclusives::where('orders_uuid', $request->order_uuid)
                                        ->delete();
            if (!$result) {
                DB::rollBack();
                return back()->withInput();
            }
        }

        //删除配货单
        $result = DeliveryBills::where('orders_uuid', $request->order_uuid)
                                ->delete();

        if (!$result) {
            DB::rollBack();
            return back()->withInput();
        }

        //解冻冻结金币
        $result = Orders::unfreezeCorns($request->order_uuid);
        if (!$result) {
            DB::rollBack();
            return back()->withInput();
        }

        //恢复库存
        $result = Orders::stockBack($request->order_uuid);
        if (!$result) {
            DB::rollBack();
            return back()->withInput();
        }

        DB::commit();
        return redirect()->action('OrdersController@orderlist');
    }


    /**
     * 确认收货
     */
    public function orderConfirm(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'order_uuid'=>'required',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
            return back()->withErrors($errors)->withInput();
        }

        //修改订单状态为已完成
        $result = Orders::where('uuid', $request->order_uuid)
            ->where('members_uuid', session('uuid'))
            ->update(['order_state'=>'已完成']);

        return redirect()->action('OrdersController@orderlist');
    }
}
