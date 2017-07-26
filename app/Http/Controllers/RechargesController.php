<?php

namespace App\Http\Controllers;

use App\Flows;
use App\Recharges;
use Illuminate\Http\Request;
use Validator;
use UUID;
use Carbon\Carbon;

class RechargesController extends BaseController
{
    /**
     * 充值
     */
    public function recharges(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'money' =>'required',
            'pay_way'=>'required',
        ]);

        if ($validator->fails()) {
            return response()->json(configs('error_code.100'));
        }

        $result = Recharges::createRecharge($request);
        if ($result === false) {
            return response()->json(configs('error_code.-1'));
        }
        $data = ['uuid'=>$result->uuid,'from'=>'recharge','method'=>$request->pay_way];
        return response()->json(configs('error_code.0', $data));
    }

    /**
     * 充值记录
     */
    public function rechargesRecord(Request $request)
    {
        $recharge  = Flows::where('members_uuid', session('uuid'))
            ->where('type', 'balance')
            ->where('inout','in')
            ->orderBy('created_at', 'DESC');

        if ($request->begin_time && (!$request->end_time)) {
            $recharge = $recharge->whereDate('created_at', '>=', $request->begin_time);
        } elseif ($request->end_time && (!$request->begin_time)) {
            $recharge = $recharge->where('created_at', '<=', Carbon::parse($request->end_time)->addDay()->subSecond()->toDateTimeString());
        } elseif ($request->end_time && $request->begin_time) {
            $recharge = $recharge->where('created_at', '<=', Carbon::parse($request->end_time)->addDay()->subSecond()->toDateTimeString())
                                 ->whereDate('created_at', '>=', $request->begin_time);
        }
        $recharge = $recharge->paginate(15);
        return view('members.chongzhi', ['recharge'=>$recharge,'from'=>$request->from]);
    }
}
