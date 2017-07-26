<?php

namespace App\Http\Controllers;

use DB;
use App\Area;
use App\Agency;
use App\Setting;
use App\Bonus;
use App\Withdrawal;
use Carbon\Carbon;
use Illuminate\Http\Request;

class StatisticController extends Controller
{
    /**
     * 显示列表页面
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function bonus(Request $request)
    {
        if (isset($request->pid)) {
            $pArea = Area::findOrFail($request->pid);
        } else {
            $pArea = Area::where('layout', 2)->orderBy('lft')->first();
        }

        $cities = Area::where('parent_uuid', $pArea->uuid)->orderBy('lft')->get();
        $provinces = Area::where('layout', 2)->orderBy('lft')->get();
        $districts = Area::where('parent_uuid', $request->cid ?? $cities->first()->uuid)->where('layout', 4)->orderBy('lft')->get();
        $stat = $this->common();

        $agentProvinceAll = Agency::where('areas_uuid', $pArea->uuid)->pluck('uuid');
                                    
        $agentCityAll = Agency::where('areas_uuid', $request->cid ?? $cities->first()->uuid)->pluck('uuid');

        $agentDistrictAll = Agency::where('areas_uuid', $request->did ?? $districts->first()->uuid)->pluck('uuid');

        $stat['baps'] = Bonus::whereIn('agencies_uuid', $agentProvinceAll)
                                    ->where('bonus_source', config('const.bonus_bonus_source_agency'))
                                    ->sum('amount');

        $stat['bacs'] = Bonus::whereIn('agencies_uuid', $agentCityAll)
                                    ->where('bonus_source', config('const.bonus_bonus_source_agency'))
                                    ->sum('amount');

        $stat['bads'] = Bonus::whereIn('agencies_uuid', $agentDistrictAll)
                                    ->where('bonus_source', config('const.bonus_bonus_source_agency'))
                                    ->sum('amount');

        $stat['bcps'] = Bonus::whereIn('agencies_uuid', $agentProvinceAll)
                                    ->where('bonus_source', config('const.bonus_bonus_source_company'))
                                    ->sum('amount');

        $stat['bccs'] = Bonus::whereIn('agencies_uuid', $agentCityAll)
                                    ->where('bonus_source', config('const.bonus_bonus_source_company'))
                                    ->sum('amount');

        $stat['bcds'] = Bonus::whereIn('agencies_uuid', $agentDistrictAll)
                                    ->where('bonus_source', config('const.bonus_bonus_source_company'))
                                    ->sum('amount');

        $agenciesUuids = $agentProvinceAll->merge($agentCityAll, $agentDistrictAll);
        $result = DB::table('bonuses')
                    ->select(DB::raw("DATE_FORMAT(created_at,'%Y年%m月') months, sum(amount) sum, count(orders_uuid) count, bonus_source, agencies_uuid"))
                    ->whereIn('agencies_uuid', $agenciesUuids)
                    ->groupBy('months', 'bonus_source', 'agencies_uuid')
                    ->orderBy('agencies_uuid')
                    ->orderBy('months')
                    ->orderBy('bonus_source')
                    ->get()
                    ->groupBy('agencies_uuid');

        $data = [];
        foreach ($result as $value) {
            $tmp = [];
            $agencyTotal = 0;
            $companyTotal = 0;
            foreach ($value as $k => $v) {
                if (!isset($tmp[$v->months])) {
                    $tmp[$v->months] = [
                        'months' => $v->months,
                        'count' => 0,
                        'agency' => 0,
                        'company' => 0
                    ];
                }
                $tmp[$v->months][$v->bonus_source] += $v->sum;
                $tmp[$v->months]['count'] += $v->count;
                if ($v->bonus_source === config('const.bonus_bonus_source_agency')) {
                    $agencyTotal += $v->sum;
                } else {
                    $companyTotal += $v->sum;
                }
            }

            $agency = Agency::findOrFail($value->first()->agencies_uuid);
            $data[] = [
                'agencies_uuid' => $agency->uuid,
                'agent_type' => $agency->agent_type,
                'real_name' => $agency->real_name,
                'agent_started_at' => Carbon::parse($agency->agent_started_at)->format('Y年m月d日'),
                'agent_ended_at' => Carbon::parse($agency->agent_ended_at)->format('Y年m月d日'),
                'agency_total' => $agencyTotal,
                'company_total' => $companyTotal,
                'data' => array_values($tmp),
            ];
        }

        return view('stat.bonus', [ 'provinces' => $provinces, 'cities' => $cities, 'districts' => $districts, 'stat' => $stat, 'data' => $data ]);
    }

    /**
     * 获取分红订单列表
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $result = Bonus::where('agencies_uuid', $request->agencies_uuid)
                        ->orderBy('created_at', 'desc')
                        ->get();

        return output(0, '获取数据成功', $result->toArray());
    }

    /**
     * 获取提现列表
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function detail(Request $request)
    {
        $result = Withdrawal::where('agencies_uuid', $request->agencies_uuid)
                        ->orderBy('created_at', 'desc')
                        ->get();

        return output(0, '获取数据成功', $result->toArray());
    }

    /**
     * 显示提现页面
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function withdrawal(Request $request)
    {
        if (isset($request->pid)) {
            $pArea = Area::findOrFail($request->pid);
        } else {
            $pArea = Area::where('layout', 2)->orderBy('lft')->first();
        }

        $cities = Area::where('parent_uuid', $pArea->uuid)->orderBy('lft')->get();
        $provinces = Area::where('layout', 2)->orderBy('lft')->get();
        $districts = Area::where('parent_uuid', $request->cid ?? $cities->first()->uuid)->where('layout', 4)->orderBy('lft')->get();
        $stat = $this->base();

        $agentProvinceAll = Agency::where('areas_uuid', $pArea->uuid)
                                    ->pluck('uuid');
                                    
        $agentCityAll = Agency::where('areas_uuid', $request->cid ?? $cities->first()->uuid)
                                ->pluck('uuid');

        $agentDistrictAll = Agency::where('areas_uuid', $request->did ?? $districts->first()->uuid)->pluck('uuid');

        $stat['province_withdrawal'] = Bonus::whereIn('agencies_uuid', $agentProvinceAll)
                                    ->sum('amount');

        $stat['province_withdrawaled'] = Withdrawal::whereIn('agencies_uuid', $agentProvinceAll)
                                    ->where('status', config('const.withdrawals_status_yes'))
                                    ->sum('amount');

        $stat['province_withdrawal_freeze'] = 0;

        $stat['city_withdrawal'] = Bonus::whereIn('agencies_uuid', $agentCityAll)
                                    ->sum('amount');

        $stat['city_withdrawaled'] = Withdrawal::whereIn('agencies_uuid', $agentCityAll)
                                    ->where('status', config('const.withdrawals_status_yes'))
                                    ->sum('amount');

        $stat['city_withdrawal_freeze'] = 0;

        $stat['district_withdrawal'] = Bonus::whereIn('agencies_uuid', $agentDistrictAll)
                                    ->sum('amount');

        $stat['district_withdrawaled'] = Withdrawal::whereIn('agencies_uuid', $agentDistrictAll)
                                    ->where('status', config('const.withdrawals_status_yes'))
                                    ->sum('amount');

        $stat['district_withdrawal_freeze'] = 0;

        $agenciesUuids = $agentProvinceAll->merge($agentCityAll, $agentDistrictAll);

        $result = Withdrawal::where('status', config('const.withdrawals_status_yes'))
                            ->whereIn('agencies_uuid', $agenciesUuids)
                            ->orderBy('created_at', 'desc')
                            ->get()
                            ->groupBy('agencies_uuid');

        $data = [];
        foreach ($result as $k => $value) {
            $total = 0;
            foreach ($value as $v) {
                $total += $v->amount;
            }
            $data[] = [
                'withdrawal' => $total,
                'total' => Bonus::where('agencies_uuid', $k)->sum('amount'),
                'freeze' => 0,
                'agency' => Agency::findOrFail($k),
                'data' => $value
            ];
        }

        return view('stat.withdrawal', [ 'provinces' => $provinces, 'cities' => $cities, 'districts' => $districts, 'stat' => $stat, 'data' => $data ]);
    }

    /**
     * 获取公共显示信息
     *
     * @return array
     */
    protected function common()
    {
        $agentProvinceUuid = Area::where('layout', 2)->pluck('uuid');
        $agentProvinceCount = Agency::whereIn('areas_uuid', $agentProvinceUuid)
                    ->whereDate('agent_ended_at', '>=', Carbon::now()->format('Y-m-d'))
                    ->where('status', config('const.agencies_status_normal'))
                    ->count();
        $agentProvinceAll = Agency::whereIn('areas_uuid', $agentProvinceUuid)
                    ->pluck('uuid');

        $agentCityUuid = Area::where('layout', 3)->pluck('uuid');
        $agentCityCount = Agency::whereIn('areas_uuid', $agentCityUuid)
                    ->whereDate('agent_ended_at', '>=', Carbon::now()->format('Y-m-d'))
                    ->where('status', config('const.agencies_status_normal'))
                    ->count();
        $agentCityAll = Agency::whereIn('areas_uuid', $agentCityUuid)
                    ->pluck('uuid');

        $agentDistrictUuid = Area::where('layout', 4)->pluck('uuid');
        $agentDistrictCount = Agency::whereIn('areas_uuid', $agentDistrictUuid)
                    ->whereDate('agent_ended_at', '>=', Carbon::now()->format('Y-m-d'))
                    ->where('status', config('const.agencies_status_normal'))
                    ->count();
        $agentDistrictAll = Agency::whereIn('areas_uuid', $agentDistrictUuid)
                    ->pluck('uuid');

        $bonusAgencyProvinceSum = Bonus::whereIn('agencies_uuid', $agentProvinceAll)
                                    ->where('bonus_source', config('const.bonus_bonus_source_agency'))
                                    ->sum('amount');

        $bonusAgencyCitySum = Bonus::whereIn('agencies_uuid', $agentCityAll)
                                    ->where('bonus_source', config('const.bonus_bonus_source_agency'))
                                    ->sum('amount');

        $bonusAgencyDistrictSum = Bonus::whereIn('agencies_uuid', $agentDistrictAll)
                                    ->where('bonus_source', config('const.bonus_bonus_source_agency'))
                                    ->sum('amount');

        $bonusCompanyProvinceSum = Bonus::whereIn('agencies_uuid', $agentProvinceAll)
                                    ->where('bonus_source', config('const.bonus_bonus_source_company'))
                                    ->sum('amount');

        $bonusCompanyCitySum = Bonus::whereIn('agencies_uuid', $agentCityAll)
                                    ->where('bonus_source', config('const.bonus_bonus_source_company'))
                                    ->sum('amount');

        $bonusCompanyDistrictSum = Bonus::whereIn('agencies_uuid', $agentDistrictAll)
                                    ->where('bonus_source', config('const.bonus_bonus_source_company'))
                                    ->sum('amount');

        $stat = [];
        $stat['province_count'] = $agentProvinceUuid->count();
        $stat['agent_province'] = $agentProvinceCount;
        $stat['city_count'] = $agentCityUuid->count();
        $stat['agent_city'] = $agentCityCount;
        $stat['district_count'] = $agentDistrictUuid->count();
        $stat['agent_district'] = $agentDistrictCount;
        $stat['bonus_agency_province_sum'] = $bonusAgencyProvinceSum;
        $stat['bonus_agency_city_sum'] = $bonusAgencyCitySum;
        $stat['bonus_agency_district_sum'] = $bonusAgencyDistrictSum;
        $stat['bonus_company_province_sum'] = $bonusCompanyProvinceSum;
        $stat['bonus_company_city_sum'] = $bonusCompanyCitySum;
        $stat['bonus_company_district_sum'] = $bonusCompanyDistrictSum;
        $stat['diff_in_days'] = Carbon::parse(env('APP_RUNTIME'))
                                        ->diffInDays(Carbon::now());

        return $stat;
    }

    /**
     * 获取公共显示信息
     *
     * @return array
     */
    protected function base()
    {
        $agentProvinceUuid = Area::where('layout', 2)->pluck('uuid');
        $agentProvinceAll = Agency::whereIn('areas_uuid', $agentProvinceUuid)
                    ->pluck('uuid');
        $provinceWithdrawaledTotal = Withdrawal::whereIn('agencies_uuid', $agentProvinceAll)
                                    ->where('status', config('const.withdrawals_status_yes'))
                                    ->sum('amount');
        $provinceWithdrawalTotal = Bonus::whereIn('agencies_uuid', $agentProvinceAll)
                                    ->sum('amount');

        $agentCityUuid = Area::where('layout', 3)->pluck('uuid');
        $agentCityAll = Agency::whereIn('areas_uuid', $agentCityUuid)
                    ->pluck('uuid');
        $cityWithdrawaledTotal = Withdrawal::whereIn('agencies_uuid', $agentCityAll)
                                    ->where('status', config('const.withdrawals_status_yes'))
                                    ->sum('amount');
        $cityWithdrawalTotal = Bonus::whereIn('agencies_uuid', $agentCityAll)
                                    ->sum('amount');

        $agentDistrictUuid = Area::where('layout', 4)->pluck('uuid');
        $agentDistrictAll = Agency::whereIn('areas_uuid', $agentDistrictUuid)
                    ->pluck('uuid');
        $districtWithdrawaledTotal = Withdrawal::whereIn('agencies_uuid', $agentDistrictAll)
                                    ->where('status', config('const.withdrawals_status_yes'))
                                    ->sum('amount');
        $districtWithdrawalTotal = Bonus::whereIn('agencies_uuid', $agentDistrictAll)
                                    ->sum('amount');


        $stat = [];
        $stat['province_withdrawal_total'] = $provinceWithdrawalTotal;
        $stat['province_withdrawaled_total'] = $provinceWithdrawaledTotal;
        $stat['province_withdrawal_freeze_total'] = 0;
        $stat['city_withdrawal_total'] = $cityWithdrawalTotal;
        $stat['city_withdrawaled_total'] = $cityWithdrawaledTotal;
        $stat['city_withdrawal_freeze_total'] = 0;
        $stat['district_withdrawal_total'] = $districtWithdrawalTotal;
        $stat['district_withdrawaled_total'] = $districtWithdrawaledTotal;
        $stat['district_withdrawal_freeze_total'] = 0;
        $stat['diff_in_days'] = Carbon::parse(env('APP_RUNTIME'))
                                        ->diffInDays(Carbon::now());

        return $stat;
    }
}
