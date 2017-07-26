<?php

namespace App\Http\Controllers;

use UUID;
use Validator;
use Carbon\Carbon;
use App\Agency;
use App\Area;
use App\AgencyArea;
use App\WechatUser;
use Illuminate\Http\Request;

class DistrictAgencyController extends Controller
{
    /**
     * 显示列表页面
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if (isset($request->id)) {
            $area = Area::findOrFail($request->id);
        } else {
            $area = Area::where('layout', 2)->orderBy('lft')->first();
        }

        $provinces = Area::where('layout', 2)->orderBy('lft')->get();
        $cities = Area::where('parent_uuid', $area->uuid)->orderBy('lft')->get();

        $districts = Area::where('parent_uuid', $request->cid ?? $cities->first()->uuid)
                        ->orderBy('lft')
                        ->get();

        $uuids = $districts->map(function ($item) {
            return $item->uuid;
        });

        $sf = Agency::whereIn('areas_uuid', $uuids)
                    ->whereDate('agent_ended_at', '>=', Carbon::now()->format('Y-m-d'))
                    ->where('status', config('const.agencies_status_normal'))
                    ->get();

        $agencies = $sf->mapWithKeys(function ($item) {
            return [ $item->areas_uuid => $item ];
        });

        $agencyArea = AgencyArea::withTrashed()->whereIn('areas_uuid', $uuids)
                                                ->pluck('deleted_at', 'areas_uuid');

        $wechatUsers = WechatUser::all();

        return view('agency.district', [ 'provinces' => $provinces, 'cities' => $cities, 'districts' => $districts, 'agencyAreas' => $agencyArea, 'agencies' => $agencies, 'wechatUsers' => $wechatUsers ]);
    }

    /**
     *
     * 获取历史代理商
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function history(Request $request)
    {
        if (!isset($request->id)) {
            return output(1, '参数错误');
        }
        $agencies = Agency::where('areas_uuid', $request->id)->get();
        return output(0, '获取数据成功', $agencies->toArray());
    }

    /**
     *
     * 开启
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function open(Request $request)
    {
        if (!isset($request->id)) {
            return output(1, '参数错误');
        }
        $agency = Agency::find($request->id);
        if (is_null($agency)) {
            return output(2, '代理商不存在');
        }
        $agency->status = config('const.agencies_status_normal');
        $result = $agency->save();

        if ($result) {
            return output();
        }

        return output(3, '启用失败');
    }

    /**
     *
     * 停用
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function close(Request $request)
    {
        if (!isset($request->id)) {
            return output(1, '参数错误');
        }
        $agency = Agency::find($request->id);
        if (is_null($agency)) {
            return output(2, '代理商不存在');
        }

        if (Carbon::parse($agency->agent_ended_at)->gt(Carbon::now())) {
            return output(4, '代理未到期，不能停用');
        }

        $agency->status = config('const.agencies_status_locked');
        $result = $agency->save();

        if ($result) {
            return output();
        }

        return output(3, '停用失败');
    }

    /**
     *
     * 保存区级代理商
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'code' => 'required',
            'name' => 'required',
            'real_name' => 'required',
            'mobile' => 'required',
            'openid' => 'required',
            'areas_uuid' => 'required',
            'agent_started_at' => 'required',
            'agent_ended_at' => 'required|after_or_equal:agent_started_at',
        ]);

        if ($validator->fails()) {
            return output(1, '信息不完整');
        }

        $wu = WechatUser::where('openid', $request->openid)->first();
        if (is_null($wu)) {
            return output(5, '微信用户不存在');
        }

        $agency = Agency::where('name', $request->name)->first();
        if (is_null($agency)) {
            $isExist = Agency::where('areas_uuid', $request->areas_uuid)
                    ->whereDate('agent_ended_at', '>=', Carbon::now()->format('Y-m-d'))
                    ->where('status', config('const.agencies_status_normal'))
                    ->exists();

            if ($isExist) {
                return output(4, '此地区已经存在代理商');
            }
        
            $area = Area::find($request->areas_uuid);
            if (is_null($area)) {
                return output(3, '地区不存在');
            }

            $agency = new Agency();
            $agency->uuid = UUID::generate()->string;
            $agency->password = bcrypt($request->password);
            $agency->pay_pwd = bcrypt($request->pay_pwd);
            $agency->areas_uuid = $request->areas_uuid;
            $agency->areas_name = $area->name;
        } else {
            if (!empty($request->password)) {
                $agency->password = bcrypt($request->password);
            }
            if (!empty($request->pay_pwd)) {
                $agency->pay_pwd = bcrypt($request->pay_pwd);
            }
        }

        $agency->avatar = $wu->headimgurl;
        $agency->code = $request->code;
        $agency->name = $request->name;
        $agency->real_name = $request->real_name;
        $agency->mobile = $request->mobile;
        $agency->id_card = $request->id_card;
        $agency->openid = $request->openid;
        $agency->agent_type = config('const.agencies_agent_type_district');
        $agency->status = config('const.agencies_status_normal');
        $agency->agent_started_at = $request->agent_started_at;
        $agency->agent_ended_at = $request->agent_ended_at;
        $result = $agency->save();
        if ($result) {
            $result = Agency::updateAgencyArea($agency->uuid, $agency->areas_uuid);
            if ($result) {
                return output();
            }
        }
        return output(2, '保存失败');
    }
}
