<?php

namespace App\Http\Controllers;

use UUID;
use DB;
use Validator;
use App\Flows;
use App\Pays;
use App\SmsLogs;
use App\Addresses;
use App\Areas;
use App\Base;
use App\Favorites;
use App\Members;
use App\Goods;
use Illuminate\Http\Request;
use Carbon\Carbon;

class MembersController extends BaseController
{
    /**
     * 获取用户信息
     */
    public function getInfo()
    {
        $uuid = session('uuid');
        $member = Members::getInfoByuuid($uuid);
        $address = Addresses::where('members_uuid', '=', $uuid)
            ->get()
            ->toArray();

        foreach ($address as $k => $value) {
            $add = Areas::where('uuid', '=', $value['areas_uuid'])->first()->toArray();
            $area = Areas::where('lft', '<', $add['lft'])
                ->where('rgt', '>', $add['rgt'])
                ->get()
                ->toArray();
            $address[$k]['all_add'] = $area[0]['name'].$area[1]['name'].$value['detail'];
        }
        return view('members.center', ['member'=>$member,'addresses'=>$address]);
    }


    /**
     *异步修改用户名和邮箱
     */
    public function editUser(Request $request)
    {
        $members = Members::where('uuid', session('uuid'))
            ->first();

        $result = '';
        if ($request->name) {
            $members->real_name = $request->name;
            $result = $members->save();
        }

        if ($request->email) {
            $validator = Validator::make($request->all(), [
                'email' => 'required|valid_email',
            ]);

            if ($validator->fails()) {
                return response()->json(configs('error_code.10014'));
            }
            $members->email = $request->email;
            $result = $members->save();
        }

        if (!$result) {
            return response()->json(configs('error_code.-1'));
        }
        return response()->json(configs('error_code.0'));
    }


    /**
     * 保存用户修改的信息
     */
    public function saveInfo(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'old_passwd' => 'required',
            'new_passwd' => 'required',
            'confirm_passwd' => 'required',
            'code'=>'required'
        ]);


        if ($validator->fails()) {
            return response()->json(configs('error_code.100'));
        }

        //判断旧密码是否输入正确
        $members = Members::find(session('uuid'));

        $passwd = crypt($request->old_passwd, $members->rand_str);
        if ($passwd != $members->password) {
            return response()->json(configs('error_code.10022'));
        }

        if ($request->new_passwd != $request->confirm_passwd) {
            return response()->json(configs('error_code.10024'));
        }

        $sms_logs = SmsLogs::where('mobile', session('mobile'))
            ->where('status', 'success')
            ->where('type', 'reset_passwd')
            ->first();
        if (!$sms_logs) {
            return response()->json(configs('error_code.10007'));
        }

        $time = time();
        if ($time > strtotime($sms_logs->expired_at)) {
            return response()->json(configs('error_code.10028'));
        }

        if ($sms_logs->code !== $request->code) {
            return response()->json(configs('error_code.10007'));
        } else {
            $sms_logs->delete();
        }

        $members->password = crypt($request->new_passwd, $members->rand_str);
        $result = $members->save();
        if (!$result) {
            return response()->json(configs('error_code.-1'));
        }
        return response()->json(configs('error_code.0'));
    }

    /**
     * 物流破损处理
     */
    public function tranInfo()
    {
        return view('tran.tran');
    }

    /**
     *我的独家
     */

    public function myzone()
    {
        return view('tran.myzone');
    }


    /**
     *充值
     */
    public function recharge()
    {
        return view('members.recharge');
    }

    /**
     * 账户余额
     */
    public function myblance(Request $request)
    {
        $members = Members::where('uuid', session('uuid'))->first();
        $recharge  = Flows::where('members_uuid', session('uuid'))
            ->where('type', 'balance');

        if ($request->begin_time && (!$request->end_time)) {
            $recharge = $recharge->whereDate('created_at', '>=', $request->begin_time);
        } elseif ($request->end_time && (!$request->begin_time)) {
            $recharge = $recharge->where('created_at', '<=', Carbon::parse($request->end_time)->addDay()->subSecond()->toDateTimeString());
        } elseif ($request->end_time && $request->begin_time) {
            $recharge = $recharge->where('created_at', '<=', Carbon::parse($request->end_time)->addDay()->subSecond()->toDateTimeString())
                                 ->whereDate('created_at', '>=', $request->begin_time);
        }
        $recharge = $recharge->orderBy('created_at', 'DESC')
                             ->paginate(5);

        return view('members.myblance', ['members'=>$members,'recharge'=>$recharge]);
    }

    /**
     * 消费记录
     */
    public function consumeRecord(Request $request)
    {
        $pays = Pays::where('members_uuid', session('uuid'))
            ->orderBy('created_at', 'DESC');

        if ($request->begin_time && (!$request->end_time)) {
            $pays = $pays->whereDate('created_at', '>=', $request->begin_time);
        } elseif ($request->end_time && (!$request->begin_time)) {
            $pays = $pays->where('created_at', '<=', Carbon::parse($request->end_time)->addDay()->subSecond()->toDateTimeString());
        } elseif ($request->end_time && $request->begin_time) {
            $pays = $pays->where('created_at', '<=', Carbon::parse($request->end_time)->addDay()->subSecond()->toDateTimeString())
                         ->whereDate('created_at', '>=', $request->begin_time);
        }

        $pays = $pays->paginate(15);
        return view('members.consume', ['pays'=>$pays,'from'=>$request->from]);
    }



    /**
     * 我的积分
     */
    public function mypoints(Request $request)
    {
        $flows = Flows::where('members_uuid', session('uuid'))
            ->where('type', 'points')
            ->orderBy('created_at', 'DESC');
            
        if ($request->begin_time && (!$request->end_time)) {
            $flows = $flows->whereDate('created_at', '>=', $request->begin_time);
        } elseif ($request->end_time && (!$request->begin_time)) {
            $flows = $flows->where('created_at', '<=', Carbon::parse($request->end_time)->addDay()->subSecond()->toDateTimeString());
        } elseif ($request->end_time && $request->begin_time) {
            $flows = $flows->where('created_at', '<=', Carbon::parse($request->end_time)->addDay()->subSecond()->toDateTimeString())
                           ->whereDate('created_at', '>=', $request->begin_time);
        }
        $flows= $flows->paginate(5);
        $members = Members::find(session('uuid'));

        return view('members.mypoints', ['flows'=>$flows,'members'=>$members]);
    }


    /**
     * 我的金币
     */
    public function mycorns(Request $request)
    {
        $flows = Flows::where('members_uuid', session('uuid'))
            ->where('type', 'corns');

        if (!empty($request->inout)) {
            $flows = $flows->where('inout', $request->inout);
        }

        if ($request->begin_time && (!$request->end_time)) {
            $flows = $flows->whereDate('created_at', '>=', $request->begin_time);
        } elseif ($request->end_time && (!$request->begin_time)) {
            $flows = $flows->where('created_at', '<=', Carbon::parse($request->end_time)->addDay()->subSecond()->toDateTimeString());
        } elseif ($request->end_time && $request->begin_time) {
            $flows = $flows->where('created_at', '<=', Carbon::parse($request->end_time)->addDay()->subSecond()->toDateTimeString())
                           ->whereDate('created_at', '>=', $request->begin_time);
        }

        $flows = $flows->orderBy('created_at', 'DESC');
        $flows = $flows->paginate(5);


        $total_in = DB::table('flows')->where('inout', 'in')
            ->where('members_uuid', session('uuid'))
            ->where('type', 'corns')->sum('amount');
        $total_in = $total_in >0 ? $total_in :0;

        $total_out = DB::table('flows')->where('inout', 'out')
            ->where('members_uuid', session('uuid'))
            ->where('type', 'corns')->sum('amount');
        $total_out = $total_out >0 ? $total_out :0;

        $member = Members::find(session('uuid'));


        return view('members.mycorns', ['flows'=>$flows,'total_in'=>$total_in,
            'total_out'=>$total_out, 'inout'=>$request->inout,'member'=>$member]);
    }


    /**
     * 我的收藏
     */
    public function favorites(Request $request)
    {
        $favorites = Favorites::where('members_uuid', session('uuid'))
            ->orderBy('created_at', 'DESC');
        if ($request->begin_time && (!$request->end_time)) {
            $favorites = $favorites->where('created_at', '>=', $request->begin_time);
        } elseif ($request->end_time && (!$request->begin_time)) {
            $favorites = $favorites->where('created_at', '<=', Carbon::parse($request->end_time)->addDay()->subSecond()->toDateTimeString());
        } elseif ($request->end_time && $request->begin_time) {
            $favorites = $favorites->where('created_at', '<=', Carbon::parse($request->end_time)->addDay()->subSecond()->toDateTimeString())
                                   ->where('created_at', '>=', $request->begin_time);
        }
        $favorites = $favorites->paginate(5);
        foreach ($favorites as $favorite) {
            $goods = Goods::find($favorite->goods_uuid);
            if (is_null($goods)) {
                $favorite->goods_invalid = true;
            }
        }

        return view('members.myfavorites', ['favorites'=>$favorites]);
    }


    /**
     *
     * 修改用户信息
     */
    public function editMember(Request $request)
    {
        $validator = Validator::make($request, [
            'uuid' => 'required',
        ]);
        if ($validator->fails()) {
            return output(false, $validator->errors());
        }
    }


    /**
     * 我的样品券
     */
    public function mySampleCoupons()
    {
        return view('members.coupons');
    }
}
