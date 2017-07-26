<?php

namespace App\Http\Controllers;

use App\MembersExclusives;
use Illuminate\Http\Request;
use App\Exclusives;
use App\Goods;
use App\GoodsExtends;
use App\Orders;
use App\OrderGoods;
use App\Areas;
use Validator;
use UUID;
use App\MembersAreas;

class ExclusivesController extends BaseController
{

    /**
     * 我的独家列表
     */
    public function myExclusive()
    {
        if (session('type') !== 'agency') {
            // 非经销商不允许独家代理
            return back();
        }

        $exclusive_uuid = MembersExclusives::where('members_uuid', session('uuid'))
            ->where('status', 'true')
            ->pluck('exclusives_uuid')
            ->toArray();

        $members_exclusive = MembersExclusives::where('members_uuid', session('uuid'))
            ->where('status', 'true')
            ->paginate(5);
        foreach ($members_exclusive as $k => $v) {
            //独家区域

            $areas = Areas::find($v['areas_uuid']);
            if (empty($areas)) {
                $members_exclusive[$k]['areas_name'] = '';
            } else {
                $members_exclusive[$k]['areas_name'] = $areas->name;
            }

            //独家商品和周期
            $exclusive = Exclusives::where('uuid', $v['exclusives_uuid'])
                ->first()
                ->toArray();
            $members_exclusive[$k]['exclusive'] =$exclusive;

            $goods = Goods::find($v['goods_uuid'])
                   ->toArray();
            $members_exclusive[$k]['goods'] = $goods;
        }
        return view('exclusive.myexclusive', ['members_exclusive'=>$members_exclusive]);
    }


    /**
     * 独家
     * 区域+周期+goods_extends_uuid确定唯一一条记录
     * 用户 区域  商品
     * 查找 此商品 在次地区 未被独家的
     */
    public function exclusive(Request $request)
    {
        if (session('type') !== 'agency') {
            // 非经销商不允许独家代理
            return back();
        }

        $goods = Goods::findOrFail($request->uuid);
        $goods->goods_extends = GoodsExtends::where('goods_uuid', $request->uuid)
            ->get();

        //计算用户可独家区域
        $areas_tmp = Exclusives::mainAreas();

        //计算可独家数据 独家时长
        $exclusive_tmp = Exclusives::exclusives($areas_tmp, $request);

        //默认发货地
        $addr = Exclusives::address();

        //仓库信息
        $station = Exclusives::station($exclusive_tmp['goods_extends_uuid']);

        return view('exclusive.exclusive', [
                'goods'=>$goods,
                'station'=>$station,
                'time'=>$exclusive_tmp['time'],
                'data'=>$exclusive_tmp['exclusive_tmp'],
                'members_areas'=>$exclusive_tmp['exclusived_areas'],
                'addr'=>$addr
            ]);
    }



    /**
     * 用户独家区域
     */
    public function mainZone()
    {
        if (session('type') !== 'agency') {
            // 非经销商不允许独家代理
            return response()->json(configs('error_code.-1'));
        }

        $members_areas = MembersAreas::where('members_uuid', session('uuid'))
            ->get();

        foreach ($members_areas as $k => $v) {
            $area = Areas::where('uuid', $v['areas_uuid'])->first();
            $members_areas[$k]['name'] = $area['name'];
        }

        return response()->json(configs('error_code.0', $members_areas));
    }
}
