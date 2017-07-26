<?php

namespace App;

use App\Area;
use Carbon\Carbon;
use App\Agency;
use App\Setting;

class Bonus extends Base
{
    /**
     * 计算分红金额
     *
     */
    public static function calcBonusAmount($areaUuid, $amount)
    {
        $agencyArea = AgencyArea::where('areas_uuid', $areaUuid)->first();
        if (is_null($agencyArea)) {
            return null;
        }

        $bonus = Setting::get('bonus');
        $bs = (int) floor(intval($bonus) * $amount / 10000);

        if ($bs < 1) {
            return null;
        }

        $data = [];
        $data['agencies_uuid'] = $agencyArea->agencies_uuid;
        $data['amount'] = $bs;

        return $data;
    }
}
