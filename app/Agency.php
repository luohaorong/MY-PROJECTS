<?php

namespace App;

use UUID;
use DB;
use Carbon\Carbon;

class Agency extends Base
{
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
    ];
    
    /**
     * 获取可用余额
     *
     * @param  string $uuid   UUID
     * @return int
     */
    public static function getAvailableBalance($uuid)
    {
        $result = static::findOrFail($uuid);
        return (int) $result->balance - (int) $result->freeze_balance;
    }

    /**
     * 增加余额
     *
     * @param  string $uuid   UUID
     * @param  int $amount 金额
     * @param  string $remark 备注
     * @return boolean
     */
    public static function incrementBalance($uuid, $amount, $remark)
    {
        return static::changeBalance($uuid, $amount, $remark);
    }

    /**
     * 减少余额
     *
     * @param  string $uuid   UUID
     * @param  int $amount 金额
     * @param  string $remark 备注
     * @return boolean
     */
    public static function decrementBalance($uuid, $amount, $remark)
    {
        return static::changeBalance($uuid, $amount, $remark, false);
    }

    /**
     * 增加冻结余额
     *
     * @param  string $uuid   UUID
     * @param  int $amount 金额
     * @param  string $remark 备注
     * @return boolean
     */
    public static function incrementFreezeBalance($uuid, $amount, $remark)
    {
        return static::changeBalance($uuid, $amount, $remark, true, true);
    }

    /**
     * 减少冻结余额
     *
     * @param  string $uuid   UUID
     * @param  int $amount 金额
     * @param  string $remark 备注
     * @return boolean
     */
    public static function decrementFreezeBalance($uuid, $amount, $remark)
    {
        return static::changeBalance($uuid, $amount, $remark, false, true);
    }

    /**
     * 改变余额
     *
     * @param  string  $uuid   UUID
     * @param  int  $amount 金额
     * @param  string  $remark 备注
     * @param  boolean $incr   是否增加金额
     * @param  boolean $freeze 是否冻结
     * @return boolean
     */
    protected static function changeBalance($uuid, $amount, $remark, $incr = true, $freeze = false)
    {
        DB::beginTransaction();
        $model = static::where('uuid', $uuid);
        if ($incr) {
            $result = $model->increment('balance', $amount);
        } else {
            $result = $model->decrement('balance', $amount);
        }

        if (!$result) {
            DB::rollBack();
            return false;
        }

        if ($freeze && $incr) {
            $result = $model->increment('freeze_balance', $amount);
        } elseif ($freeze && !$incr) {
            $result = $model->decrement('freeze_balance', $amount);
        }

        if (!$result) {
            DB::rollBack();
            return false;
        }

        $flow = new Flow();
        $flow->uuid = UUID::generate()->string;
        $flow->agencies_uuid = $uuid;
        $flow->amount = $amount;
        $flow->type = $incr ? config('const.flows_type_income') : config('const.flows_type_outcome');
        $flow->category = config('const.flows_category_balance');
        $flow->status = $freeze ? config('const.flows_status_freeze') : config('const.flows_status_normal');
        $flow->remark = $remark;
        $result = $flow->save();

        if (!$result) {
            DB::rollBack();
            return false;
        }
        DB::commit();

        return true;
    }

    /**
     * 更新代理区域
     *
     * @param  string  $agenciesUuid  代理商UUID
     * @param  string  $areasUuid  地区UUID
     * @return boolean
     */
    public static function updateAgencyArea($agenciesUuid, $areasUuid)
    {
        $totalUuids = Area::getChildren($areasUuid);
        $areasUuids = AgencyArea::withTrashed()->pluck('areas_uuid');

        $diffUuids = $totalUuids->diff($areasUuids);

        if ($diffUuids->isEmpty()) {
            AgencyArea::clearTimeoutAgency();
            return true;
        }

        $time = Carbon::now();
        $data = $diffUuids->map(function ($item, $key) use ($agenciesUuid, $time) {
            $tmp = [];
            $tmp['uuid'] = UUID::generate()->string;
            $tmp['agencies_uuid'] = $agenciesUuid;
            $tmp['areas_uuid'] = $item;
            $tmp['updated_at'] = $time;
            $tmp['created_at'] = $time;
            return $tmp;
        });

        DB::beginTransaction();
        $result = AgencyArea::insert($data->toArray());

        if ($result) {
            AgencyArea::clearTimeoutAgency();
            DB::commit();
        } else {
            DB::rollBack();
        }

        return $result;
    }
}
