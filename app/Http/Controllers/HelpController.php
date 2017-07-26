<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Articals;
use App\ArticalCategories;

class HelpController extends BaseController
{

    /**
     *
     * 显示文章内容
     *
     * @param  string $uuid UUID
     * @return Response
     */
    public function show($uuid = null)
    {
        if (is_null($uuid)) {
            $artical = Articals::first();
            if (is_null($artical)) {
                abort(404);
            }
        } else {
            $artical = Articals::findOrFail($uuid);
        }

        $articalCategories = ArticalCategories::all()->toArray();

        $articles = Articals::orderBy('sort')->get()->toArray();
        foreach ($articles as $key => $value) {
            if ($value['uuid'] === $artical->uuid) {
                $articles[$key]['selected'] = true;
            }
            $articles[$key]['parent_uuid'] = $value['artical_categories_uuid'];
        }

        $articalCategories = array_merge($articalCategories, $articles);
        $articalCategories = array_to_tree($articalCategories);

        return view('help.index', [ 'artical' => $artical, 'articalCategories' => $articalCategories ]);
    }
}
