<?php

namespace App\Http\Controllers;

use App\Favorites;
use App\Goods;
use Illuminate\Http\Request;
use UUID;
use Validator;
use DB;

class FavoritesController extends BaseController
{
    /**
     * 收藏接口
     */
    public function addCollection(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'goods_uuid' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(configs('error_code.100'));
        }

        //判断商品是否存在
        $good = Goods::where('uuid', $request->goods_uuid)->first();
        if (!$good) {
            return response()->json(configs('error_code.-1'));
        }

        //判断是否已经收藏
        $isFavorite = Favorites::where('members_uuid', session('uuid'))
                                ->where('goods_uuid', $request->goods_uuid)
                                ->exists();
        if ($isFavorite) {
            return response()->json(configs('error_code.10019', ['count'=>$good->favorite_num]));
        }

        //未收藏添加收藏
        $good = $good->toArray();
        $favorite = new Favorites();
        $favorite->uuid = UUID::generate()->string;
        $favorite->members_uuid = session('uuid');
        $favorite->goods_uuid = $good['uuid'];
        $favorite->goods_image = $good['thumb'];
        $favorite->goods_chinese_name = $good['chinese_name'];
        $favorite->goods_english_name = $good['english_name'];
        $result  =  $favorite->save();
        if (!$result) {
            return response()->json(configs('error_code.-1'));
        }

        Goods::where('uuid', $good['uuid'])->increment('favorite_num');

        return response()->json(configs('error_code.0', ['count'=>$good['favorite_num']+1]));
    }

    /**
     * 取消收藏
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse|mixed
     */
    public function delCollection(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'goods_uuid'=>'required'
        ]);

        if ($validator->fails()) {
            return response()->json(configs('error_code.100'));
        }

        DB::beginTransaction();
        $favorite = Favorites::where('goods_uuid', $request->goods_uuid)
                            ->where('members_uuid', session('uuid'))
                            ->first();

        if (is_null($favorite)) {
            DB::rollBack();
            return response()->json(configs('error_code.-1'));
        }
        
        $result = $favorite->delete();

        if (!$result) {
            DB::rollBack();
            return response()->json(configs('error_code.-1'));
        }

        //修改商品收藏次数
        $good = Goods::find($request->goods_uuid);
        if (is_null($good)) {
            DB::commit();
            return response()->json(configs('error_code.0', ['count'=>0]));
        }

        if ($good->favorite_num > 0) {
            $result = Goods::where('uuid', $request->goods_uuid)
                            ->decrement('favorite_num');
            if (!$result) {
                DB::rollBack();
                return response()->json(configs('error_code.-1'));
            }
        }
        DB::commit();

        return response()->json(configs('error_code.0', ['count'=>$good->favorite_num]));
    }
}
