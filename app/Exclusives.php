<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Base;

class Exclusives extends Base
{

    /**
     * 计算出用户独家区域
     */
    public static function mainAreas()
    {
        $members_areas = MembersAreas::where('members_uuid', session('uuid'))
            ->where('verify_pass', 'yes')
            ->pluck('areas_uuid')
            ->toArray();
        $areas = Areas::whereIn('uuid', $members_areas)
            ->get()
            ->toArray();
        $areas_tmp = [];
        foreach ($areas as $k => $v) {
             //直辖市
            if ($v['layout']==2) {
                $areas_tmp[$v['uuid']]=$v;
                continue;
            }

            //普通市
            $areas_tmp[$v['uuid']]=$v;
             $p_areas = Areas::find($v['parent_uuid']);
             $areas_tmp[$p_areas['uuid']]=$p_areas->toArray();
        }
        return $areas_tmp;
    }


    /**
     * 用户可独家数据
     */
    public static function exclusives($areas_tmp, $request)
    {
        //所有独家可能中 已被独家的记录
        $exclusived = MembersExclusives::where('goods_uuid', $request->uuid)
            ->whereIn('areas_uuid', array_keys($areas_tmp))
            ->where('status', 'true')
            ->pluck('exclusives_uuid')
            ->toArray();

        $exclusive = Exclusives::whereIn('areas_uuid', array_keys($areas_tmp))
            ->where('goods_uuid', $request->uuid)
            ->whereNotIn('uuid', $exclusived)
            ->get()
            ->groupBy('areas_uuid')
            ->toArray();


        //输出独家可选周期
        $exclusive_time = Exclusives::whereIn('areas_uuid', array_keys($areas_tmp))
            ->where('goods_uuid', $request->uuid)
            ->whereNotIn('uuid', $exclusived)
            ->get()
            ->groupBy('exclusive_time')
            ->toArray();
        $time = array_keys($exclusive_time);


        $exclusive_tmp = [];
        $goods_extends_uuid = [];
        foreach ($exclusive as $k => $v) {
            //数组按独家周期再分组
            $collection = collect($v);
            $grouped_by_time = $collection->groupBy('exclusive_time')->toArray();

            //数组按goods_extends_uuid再分组
            foreach ($grouped_by_time as $c => $d) {
                foreach ($d as $e => $f) {
                    $exclusive_tmp[$k.'_'.$c.'_'.$f['goods_extends_uuid']] = $f;
                    array_push($goods_extends_uuid, $f['goods_extends_uuid']);
                }
            }
        }
        $goods_extends_uuid =  array_unique($goods_extends_uuid);

        //已经被独家的区域
        $exclusived_areas = MembersExclusives::where('goods_uuid', $request->uuid)
            ->whereIn('areas_uuid', array_keys($areas_tmp))
            ->where('status', 'true')
            ->get()
            ->groupBy('areas_uuid')
            ->toArray();

        $exclusived_areas = Areas::whereIn('uuid', array_keys($exclusived_areas))
            ->get()
            ->toArray();

        $exclusived_key_value = [];
        foreach ($exclusived_areas as $k => $v) {
            $exclusived_key_value[$v['uuid']] = $v;
        }

        $areas_state = [];
        foreach ($areas_tmp as $k => $v) {
            if (in_array($k, array_keys($exclusived_key_value))) {
                $areas_state[$k]['state'] = 'forbidden';
                $areas_state[$k]['name'] = $v;
            } else {
                $areas_state[$k]['state'] = 'allow';
                $areas_state[$k]['name'] = $v;
            }
        }

        return ['exclusive_tmp'=>$exclusive_tmp,'goods_extends_uuid'=>$goods_extends_uuid,
            'time'=>$time,'exclusived_areas'=>$areas_state];
    }

    /**
     * 默认收获地址
     */

    public static function address()
    {
        //获取默认收货地址
        $address = Addresses::where('members_uuid', session('uuid'))
            ->first();
        if (!empty($address)) {
            $areas = Areas::where('uuid', $address['areas_uuid'])
                ->first();
            $areas_parents = Areas::where('lft', '<', $areas['lft'])
                ->where('rgt', '>', $areas['rgt'])
                ->get()
                ->toArray();
            $addr = '';
            foreach ($areas_parents as $k => $v) {
                $addr .= $v['name'];
            }
            $addr .=$areas['name'];
        } else {
            $addr = '';
        }

        return $addr;
    }


    /**
     * 根据goods_extends_uuid 获取仓库信息
     *
     */

    public static function station($goods_extends_uuid)
    {
        //拼接仓库信息
        $goods_extends_station = GoodsExtends::whereIn('uuid', $goods_extends_uuid)
                                                ->get()
                                                ->toArray();
        $station = [];
        foreach ($goods_extends_station as $k => $v) {
            $station[$v['uuid']] = $v;
        }
        foreach ($station as $k => $v) {
            $station[$k]['combination'] = json_decode($v['combination'], true);
            foreach ($station[$k]['combination'] as $c => $d) {
                $goods_attr_name = GoodsAttrNames::where('uuid', $c)
                                                    ->where('is_warehouse', 'yes')
                                                    ->first();
                if (!is_null($goods_attr_name)) {
                    $station[$k]['attr_name'] = $goods_attr_name->name;
                    $goods_attr_value = GoodsAttrValues::where('uuid', $d)->first();
                    $station[$k]['attr_value'] = $goods_attr_value->name;
                    $station[$k]['station_uuid'] = $d;
                }
            }
        }

        return $station;
    }
}
