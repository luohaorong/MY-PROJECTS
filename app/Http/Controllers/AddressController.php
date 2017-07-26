<?php

namespace App\Http\Controllers;

use App\Address;
use App\Addresses;
use App\Areas;
use App\Base;
use App\MembersAreas;
use Illuminate\Http\Request;
use UUID;
use Validator;
use DB;
use Illuminate\Support\Facades\Storage;

class AddressController extends BaseController
{
    /**
     * 添加收件地址
     */
    public function addAddr(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'real_name' => 'required',
            'mobile' => 'required|valid_mobile',
            'areas_uuid' => 'required',
            'detail'=>'required',
        ]);

        if ($validator->fails()) {
            return response()->json(config('error_code.100'));
        }

        $isDefault = Addresses::where('members_uuid', session('uuid'))
                               ->where('is_default', 'true')
                               ->exists();

        $address = new Addresses();
        $address->uuid = UUID::generate()->string;
        $address->real_name = $request->real_name;
        $address->mobile = $request->mobile;
        $address->areas_uuid = $request->areas_uuid;
        $address->members_uuid = session('uuid');
        $address->detail = $request->detail;
        $address->is_default = $isDefault ? 'false' : 'true';
        $result = $address->save();

        if (!$result) {
            return response()->json(config('error_code.-1'));
        }
        return response()->json(config('error_code.0'));
    }


    /**
     * 删除收件地址
     */
    public function deleteAddr(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'uuid' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(config('error_code.100'));
        }

        $address = Addresses::where('uuid', $request->uuid)->delete();

        if (!$address) {
            return response()->json(config('error_code.-1'));
        }
        return response()->json(config('error_code.0'));
    }


    /**
     * 收件地址列表
     */
    public function addrList(Request $request)
    {
        $addresses  = Addresses::addressList();
        $members_areas = MembersAreas::where('members_uuid', session('uuid'))->get();
        foreach ($members_areas as $k => $v) {
            $area = Areas::where('uuid', $v['areas_uuid'])->first();
            $members_areas[$k]['name'] = $area['name'];
        }

        $main_zone = isset($request->main_zone) ? $request->main_zone : false;
        return view('members.addrlist', [ 'addresses' => $addresses, 'members_areas'=> $members_areas, 'main_zone'=> $main_zone ]);
    }

    /**
     * 编辑地址
     */
    public function editAddr(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'uuid' => 'required',
            'real_name'=>'required',
            'mobile'=>'required',
            'areas_uuid'=>'required',
            'detail'=>'required',
        ]);

        if ($validator->fails()) {
            return response()->json(config('error_code.100'));
        }

        $addresses = Addresses::findOrFail($request->uuid);
        $addresses->real_name = $request->real_name;
        $addresses->mobile = $request->mobile;
        $addresses->areas_uuid = $request->areas_uuid;
        $addresses->detail = $request->detail;
        if (!$addresses->save()) {
            return response()->json(config('error_code.-1'));
        }
        return response()->json(config('error_code.0'));
    }


    /**
     * 设置为默认地址
     */
    public function setDefault(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'uuid' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(config('error_code.100'));
        }

        $result = Addresses::where('uuid', $request->uuid)
                  ->update(['is_default'=>'true']);

        if (!$result) {
            return response()->json(config('error_code.-1'));
        }

        Addresses::where('uuid', '<>', $request->uuid)
                  ->where('members_uuid', session('uuid'))
                  ->update(['is_default'=>'false']);
            
        return response()->json(config('error_code.0'));
    }

    /**
     * 添加主营区域
     */
    public function addAreas(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'uuid' => 'required',
            'detail' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(config('error_code.100'));
        }

        $members_areas = new  MembersAreas();
        $members_areas->members_uuid = session('uuid');
        $members_areas->detail = $request->detail;
        $members_areas->uuid = UUID::generate()->string;
        $members_areas->areas_uuid = $request->uuid;
        $members_areas->verify_pass = 'ing';
        $result = $members_areas->save();
        if (!$result) {
            return response()->json(config('error_code.-1'));
        }
        return response()->json(config('error_code.0'));
    }
}
