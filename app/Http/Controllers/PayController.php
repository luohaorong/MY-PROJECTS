<?php

namespace App\Http\Controllers;

use App\DeliveryBills;
use App\Orders;
use App\Recharges;
use Illuminate\Http\Request;
use UUID;
use Validator;
use DB;
use Log;
use App\Pays;

class PayController extends BaseController
{
    /**
     *收银台
     */
    public function pays(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'uuid'=>'required',
            'from'=>'required',
        ]);
        if ($validator->fails()) {
            $errors = $validator->errors();
            return back()->withErrors($errors)->withInput();
        }

        $payed_amount = 0;
        if ($request->from === 'recharge') {
            $order = Recharges::where('uuid', $request->uuid)
                                ->where('state', 'not_payed')
                                ->first();

            if (is_null($order)) {
                return redirect()->action('MembersController@recharge');
            }
            $payed_amount = $order->amount;
        }

        if ($request->from === 'order_pay') {
            $order = Orders::where('uuid', $request->uuid)
                            ->where('order_state', '待支付')
                            ->first();

            if (is_null($order)) {
                return redirect()->action('OrdersController@orderlist');
            }

            $payed_amount = $order->payed_amount;
        }
        $balance = session('balance');
        return view('orders.pay', ['uuid'=>$request->uuid,'order_amount'=>$payed_amount,'balance'=>$balance]);
    }


    /**
     * 发起支付
     */
    public function sendPay(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'attach' =>'required',
            'pay_way' =>'required',
            'from'   =>'required',
        ]);

        if ($validator->fails()) {
            return response()->json(config('error_code.100'));
        }

        //如果是发起订单支付
        $data = '';
        if ($request->from === 'order_pay') {
            $result = Pays::sendPay(json_decode($request->attach, true)['order_id'], $request->pay_way);
            if ($result === false) {
                return response()->json(config('error_code.10020'));
            }
            if ($result === 'timeout') {
                return response()->json(config('error_code.10027'));
            }

            $data = $result;
        }

        //如果是发起充值支付
        if ($request->from =='recharge') {
            $result = Recharges::sendRecharge(json_decode($request->attach, true)['uuid'], $request->pay_way);
            if ($result === false) {
                return response()->json(config('error_code.10023'));
            }
            $data = $result;
        }
        return response()->json(configs('error_code.0', $data));
    }

    /**
     * 是否充值完成
     */
    public function isPayed(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'uuid'=>'required',
            'from'=>'required',
        ]);

        if ($validator->fails()) {
            return response()->json(configs('error_code.100'));
        }

        if ($request->from =='order_pay') {
            $result = Orders::where('uuid', $request->uuid)
                            ->whereNotNull('payed_at')
                            ->exists();
        }

        //如果是发起充值支付
        if ($request->from =='recharge') {
            $result = Recharges::where('uuid', $request->uuid)
                            ->where('state', 'payed')
                            ->exists();
        }

        if (!$result) {
            return response()->json(configs('error_code.0', [ 'is_payed' => false ]));
        }
        return response()->json(configs('error_code.0', [ 'is_payed' => true ]));
    }
}
