<?php

namespace App\Http\Controllers;

use UUID;
use Validator;
use App\Staff;
use App\Area;
use App\WechatUser;
use Illuminate\Http\Request;

class ProvinceStaffController extends Controller
{
    /**
     * 显示列表页面
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $province = Area::where('layout', 2)->orderBy('lft')->get();

        $uuid = $province->map(function ($item) {
            return $item->uuid;
        });

        $sf = Staff::whereIn('areas_uuid', $uuid)
                    ->where('status', config('const.staffs_status_normal'))
                    ->get();

        $staff = $sf->mapWithKeys(function ($item) {
            return [ $item->areas_uuid => $item ];
        });

        $wechatUsers = WechatUser::all();

        return view('staff.province', [ 'provinces' => $province, 'staffs' => $staff, 'wechatUsers' => $wechatUsers ]);
    }

    /**
     *
     * 保存省级业务经理
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'code' => 'required',
            'real_name' => 'required',
            'mobile' => 'required',
            'openid' => 'required',
            'areas_uuid' => 'required',
            'inducted_at' => 'required',
        ]);

        if ($validator->fails()) {
            return output(1, '信息不完整');
        }

        $wu = WechatUser::where('openid', $request->openid)->first();
        if (is_null($wu)) {
            return output(3, '微信用户不存在');
        }

        $staff = Staff::where('name', $request->name)->first();
        if (is_null($staff)) {
            $staff = new Staff();
            $staff->uuid = UUID::generate()->string;
            $staff->password = bcrypt($request->password);
            $staff->areas_uuid = $request->areas_uuid;
        } else {
            if (!empty($request->password)) {
                $staff->password = bcrypt($request->password);
            }
        }

        $staff->avatar = $wu->headimgurl;
        $staff->name = $request->name;
        $staff->code = $request->code;
        $staff->real_name = $request->real_name;
        $staff->mobile = $request->mobile;
        $staff->openid = $request->openid;
        $staff->email = $request->email;
        $staff->status = config('const.staffs_status_normal');
        $staff->inducted_at = $request->inducted_at;
        $result = $staff->save();
        if ($result) {
            Staff::where('areas_uuid', $staff->areas_uuid)
                    ->where('uuid', '<>', $staff->uuid)
                    ->update([ 'status' => config('const.staffs_status_locked') ]);
            return output();
        }
        return output(2, '保存失败');
    }
}
