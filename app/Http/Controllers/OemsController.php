<?php

namespace App\Http\Controllers;

use App\Oems;
use Illuminate\Http\Request;
use App\Orders;
use App\OemPastes;
use App\OemDesigns;
use App\Countries;
use App\Events\OemEvent;
use Validator;
use UUID;

class OemsController extends BaseController
{

    /**
     * 品牌定制第一步
     */
    public function brandCustomizitionFirst()
    {
        $countries = Countries::all();
        $oemPastes = OemPastes::all();
        return view('oems.brandcustomiziton_first', [ 'oemPastes' => $oemPastes, 'countries' => $countries ]);
    }

    /**
     * 品牌定制第二步
     */
    public function brandCustomizitionSecond($uuid)
    {
        // $oemPaste = OemPastes::findOrFail($uuid);
        // $oemPaste->country = Countries::findOrFail($oemPaste->countries_uuid);
        // $oemDesigns = OemDesigns::all();

        // return view('oems.brandcustomiziton_second', [ 'oemPaste' => $oemPaste, 'oemDesigns' => $oemDesigns ]);
        return view('oems.brandcustomiziton_second');
    }

    /**
     *
     * 计算Oem费用
     *
     * @param  Request $request
     * @return array
     */
    public function calcOemFee(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'oem_pastes_uuid' => 'required',
            'oem_designs_uuid' => 'required',
            'nums' => 'required|numeric|min:1',
        ]);

        if ($validator->fails()) {
            return output(false, $validator->errors());
        }

        $oemPaste = OemPastes::findOrFail($request->oem_pastes_uuid);

        // 酒浆单价
        $pasteFee = $oemPaste->price;
        // 设计单价
        $designFee = OemDesigns::whereIn('uuid', $request->oem_designs_uuid)
            ->sum('price');
        // 组合单价
        $combination = $pasteFee + $designFee;
        // 总瓶数
        $nums = $oemPaste->stocking_pricing_ratio * $request->nums;
        // 总费用
        $totalFee = $combination * $nums;
        // 预付款
        $preFee = (int) ($totalFee * 30) / 100;

        $data = [];
        $data['pasteFee'] = $pasteFee;
        $data['designFee'] = $designFee;
        $data['combination'] = $combination;
        $data['nums'] = $nums;
        $data['totalFee'] = $totalFee;
        $data['preFee'] = $preFee;
        return output(true, $data);
    }

    /**
     *
     * 存放OEM定制需求
     * @param  Request $request
     * @return array
     */
    public function storeOem(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'chinese_name' => 'required',
            'nums' => 'required|numeric|min:1',
            'oem_pastes_uuid' => 'required',
            'oem_designs_uuid' => 'required',
        ]);
        if ($validator->fails()) {
            return output(false, $validator->errors());
        }

        $oemPaste = OemPastes::find($request->oem_pastes_uuid);

        if (is_null($oemPaste)) {
            return output(false, '酒浆不存在');
        }

        // 酒浆单价
        $pasteFee = $oemPaste->price;
        // 设计单价
        $designFee = OemDesigns::whereIn('uuid', $request->oem_designs_uuid)
            ->sum('price');
        // 组合单价
        $combination = $pasteFee + $designFee;
        // 总瓶数
        $nums = $oemPaste->stocking_pricing_ratio * $request->nums;
        // 总费用
        $totalFee = $combination * $nums;
        // 预付款
        $preFee = ($totalFee * 30) / 100;

        $oem = new Oems();
        $oem->uuid = UUID::generate()->string;
        $oem->chinese_name = $request->chinese_name;
        $oem->english_name = $request->english_name;
        $oem->paste_price = $pasteFee;
        $oem->design_price = $designFee;
        $oem->total_fee = $totalFee;
        $oem->pre_fee = $preFee;
        $oem->pre_fee_ratio = 3000;
        $oem->quantity = $request->nums;
        $oem->pricing_unit = $oemPaste->pricing_unit;
        $oem->stocking_unit = $oemPaste->stocking_unit;
        $oem->stocking_pricing_ratio = $oemPaste->stocking_pricing_ratio;
        $oem->combination = json_encode($request->oem_designs_uuid, true);
        $oem->oem_pastes_uuid = $oemPaste->uuid;
        $oem->members_uuid = session('uuid');
        $oem->remark = $request->remark;
        $oem->verify_pass = 'ing';
        $result = $oem->save();

        if ($result) {
            // 通知提示后台
            event(new OemEvent($oem->uuid));

            return output(true, '提交成功');
        }
        return output(false, '提交失败');
    }


    /**
     * 我的定制
     */
    public function myOem()
    {
        $oems = Oems::where('members_uuid', session('uuid'))
            ->paginate(5);
        return view('oems.oem', ['oems'=>$oems]);
    }


    /**
     * 定制详情
     */
    public function oemDetail(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'uuid' => 'required',
        ]);
        if ($validator->fails()) {
            $errors = $validator->errors();
            return back()->withErrors($errors)->withInput();
        }

        $oems = Oems::where('members_uuid', session('uuid'))
            ->where('uuid', $request->uuid)
            ->first();

        $pastes = OemPastes::findOrFail($oems->oem_pastes_uuid);
        $country = Countries::findOrFail($pastes->countries_uuid);

        $pastes->country = $country->chinese_abbreviation;

        $combination = json_decode($oems->combination, true);
        $oems_designe = OemDesigns::whereIn('uuid', $combination)
            ->get()
            ->groupBy('category')
            ->toArray();
        return view('oems.oemdetail', ['oems'=>$oems,'pastes'=>$pastes,'designe'=>$oems_designe]);
    }
}
