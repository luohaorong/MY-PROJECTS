<?php

namespace App;

use Carbon\Carbon;

class AgencyArea extends Base
{
    /**
     * 清除过期代理区域
     *
     * @return boolean
     */
    public static function clearTimeoutAgency()
    {
        $uuids = Agency::whereDate('agent_ended_at', '<', Carbon::now()->format('Y-m-d'))->pluck('uuid');
        if (!$uuids->isEmpty()) {
            static::whereIn('agencies_uuid', $uuids)->delete();
        }
    }
}
