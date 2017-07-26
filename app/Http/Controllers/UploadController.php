<?php

namespace App\Http\Controllers;

use App\GoodsAttrNames;
use DB;
use Illuminate\Http\Request;
use Validator;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{

    /**
     *上传接口
     */
    public function upload(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'file' => 'required',
            'type' => 'required'//企业公章证明,企业营业执照,企业身份证
        ]);

        if ($validator->fails()) {
            return response()->json(configs('error_code.100'));
        }

        //上传图片
        $file = $request->file('file');
        $filename = '';
        if ($file->isValid()) {
            $ext = $file->getClientOriginalExtension();
            $realPath = $file->getRealPath();
            $filename = '/company/' . date('Y-m-d-H-i-s') . '-' . uniqid() . '.' . $ext;
            $bool = Storage::disk('ftp')->put($filename.'/'.'origin', file_get_contents($realPath));
            if (!$bool) {
                return response()->json(configs('error_code.10017'));
            }
        }
        return response()->json(configs('error_code.0',['url'=>$filename]));
    }


    /**
     * 计算左右值 & 整理左右值
     */
    public function reorganize( Request $request)
    {
//        $goods_attr_names = GoodsAttrNames::get()
//        ->toArray();
//
//       // print_r($goods_attr_names);exit;
//        foreach ($goods_attr_names as $k=>$v)
//        {
//           // $goods_attr_names[$k]['parent_uuid'] = $v['parent_goods_attr_values_uuid'];
//
//            if($goods_attr_names[$k]['parent_uuid'])
//            {
//                print_r($goods_attr_names[$k]['parent_uuid']);echo "<br>";
//                continue;
//            }
//        }
//
//
//
//
//       // print_r(array_to_tree($goods_attr_names));exit;
//       // print_r($goods_attr_names);exit;
//
//        $tree = new $this->model();
//        $tree->uuid = UUID::generate()->string;
//        $tree->name = $request->name;
//        $tree->parent_uuid = empty($request->parent_uuid) ? '' : $request->parent_uuid;
//
//        DB::beginTransaction();
//        if (empty($tree->parent_uuid)) {
//            $result = $tree::where('parent_uuid', '')->orderBy('rgt', 'desc')->first(['rgt']);
//            $tree->lft = is_null($result) ? 2 : $result->rgt + 1;
//            $tree->rgt = $tree->lft + 1;
//            $tree->layout = 2;
//        } else {
//            $result = $tree::where('uuid', $tree->parent_uuid)->first(['rgt', 'layout']);
//            if (is_null($result)) {
//                DB::rollBack();
//
//                return output(false, '创建失败');
//            }
//            $tree->lft = $result->rgt;
//            $tree->rgt = $tree->lft + 1;
//            $tree->layout = $result->layout + 1;
//            $tree::where('rgt', '>=', $result->rgt)->increment('rgt', 2);
//            $tree::where('lft', '>', $result->rgt)->increment('lft', 2);
//        }
//
//        $rs = $tree->save();
//        if ($rs) {
//            DB::commit();
//
//            return output(true, $tree->uuid);
//        }
//
//        DB::rollBack();
//
//        return output(false, '创建失败');
//
//
//        print_r($goods_attr_names->toArray());exit;

    }

}
