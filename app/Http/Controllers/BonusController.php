<?php

namespace App\Http\Controllers;

use DB;
use UUID;
use Log;
use EasyWeChat;
use Validator;
use App\Area;
use App\Agency;
use App\Setting;
use App\Bonus;
use App\AgencyArea;
use Carbon\Carbon;
use Illuminate\Http\Request;

class BonusController extends Controller
{
    /**
     *
     * 计算分红返利
     *
     * @return array
     */
    public function calculate()
    {
        if (!$this->allowedIp()) {
            return output(2, '不在请求白名单内');
        }

        AgencyArea::clearTimeoutAgency();
        $data = json_decode(file_get_contents('php://input'), true);

        $container = [];
        DB::beginTransaction();
        foreach ($data as $value) {
            $tmp = Bonus::calcBonusAmount($value['areas_uuid'], $value['trade_amount']);
            if (is_null($tmp)) {
                continue;
            }

            $bonus = new Bonus();
            $bonus->uuid = UUID::generate()->string;
            $bonus->agencies_uuid = $tmp['agencies_uuid'];
            $bonus->areas_uuid = $value['areas_uuid'];
            $bonus->bonus_source = $value['bonus_source'];
            $bonus->orders_uuid = $value['orders_uuid'];
            $bonus->order_sn = $value['order_sn'];
            $bonus->merchant_name = $value['merchant_name'];
            $bonus->members_uuid = $value['members_uuid'];
            $bonus->trade_amount = $value['trade_amount'];
            $bonus->amount = $tmp['amount'];
            $result = $bonus->save();
            if (!$result) {
                DB::rollBack();
                return output(1, '计算失败');
            }
            $container[] = $bonus;
        }
        DB::commit();

        foreach ($container as $bonus) {
            $result = Agency::incrementBalance($bonus->agencies_uuid, $bonus->amount, '分红返利');
            if ($result) {
                $agency = Agency::find($bonus->agencies_uuid);
                if (!is_null($agency)) {
                    $data = [
                        "first"  => "领钱啦！",
                        "keyword1" => "分红返利",
                        "keyword2" => ($bonus->amount / 100).'元',
                        "keyword3" => Carbon::now()->format('Y年m月d日'),
                        "keyword4" => (Agency::getAvailableBalance($agency->uuid) / 100).'元',
                        "remark" => "大家继续努力，加油干！",
                    ];
                    EasyWeChat::notice()->uses(env('WECHAT_TEMPLATEID'))
                                    ->withUrl(env('AGENCY_URL'))
                                    ->andData($data)
                                    ->andReceiver($agency->openid)
                                    ->send();
                }
            } else {
                Log::error('分红返利增加余额失败', $bonus->toArray());
            }
        }
    
        return output();
    }

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

        $city = Area::where('lft', '>', $area->lft)
                        ->where('rgt', '<', $area->rgt)
                        ->where('layout', 3)
                        ->orderBy('lft')
                        ->get();

        $uuid = $city->map(function ($item) {
            return $item->uuid;
        });
        $uuid[] = $area->uuid;

        $sf = Agency::whereIn('areas_uuid', $uuid)
                    ->whereDate('agent_ended_at', '>=', Carbon::now()->format('Y-m-d'))
                    ->where('status', config('const.agencies_status_normal'))
                    ->get();

        $agencies = $sf->mapWithKeys(function ($item) {
            return [ $item->areas_uuid => $item ];
        });

        $settings = Setting::get('bonus');

        return view('bonus.setting', [ 'provinces' => $provinces, 'cities' => $city, 'agencies' => $agencies, 'settings' => $settings ]);
    }

    /**
     *
     * 保存配置
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'agency_province_ip' => 'required',
            'agency_province_pbc' => 'required',
            'agency_province_ic' => 'required',
            'agency_province_cbp' => 'required',
            'agency_city_ip' => 'required',
            'agency_city_pbc' => 'required',
            'agency_city_ic' => 'required',
            'agency_city_cbp' => 'required',
            'company_province_ip' => 'required',
            'company_province_pbc' => 'required',
            'company_province_ic' => 'required',
            'company_province_cbp' => 'required',
            'company_city_ip' => 'required',
            'company_city_pbc' => 'required',
            'company_city_ic' => 'required',
            'company_city_cbp' => 'required',
        ]);

        if ($validator->fails()) {
            return output(1, '信息不完整');
        }

        $result = Setting::put([ 'bonus' => $request->all() ]);

        if ($result) {
            return output();
        }
        return output(2, '保存失败');
    }

    /**
     * 分红配置
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function config(Request $request)
    {
        $bonus = Setting::get('bonus');
        return view('bonus.config', [ 'bonus' => $bonus ]);
    }

    /**
     *
     * 保存配置
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function setting(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'bonus' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return output(1, '信息不完整');
        }

        $result = Setting::put([ 'bonus' => $request->bonus * 100 ]);

        if ($result) {
            return output();
        }
        return output(2, '保存失败');
    }

    private function allowedIp()
    {
        $clientIp = \Request::getClientIp();
        return $clientIp === env('ALLOWED_IP');
    }
}
