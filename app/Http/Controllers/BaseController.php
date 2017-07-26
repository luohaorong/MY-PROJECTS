<?php

namespace App\Http\Controllers;

use App\Carts;
use App\Members;
use App\Orders;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;

class BaseController extends Controller
{
    public function __construct(Request $request)
    {
        $url = $request->url();
        if (!session('uuid')) {
            header('location:'.action('IndexController@login',['redirect'=>$url]));
            exit;
        }

        $member = Members::where('uuid', session('uuid'))->first();
        $request->session()->put('balance', $member->balance);
        $request->session()->put('corns', ($member->corns-$member->freeze_corns));

        $orders_count = Orders::where('members_uuid', session('uuid'))
                ->where('order_state', '待支付')
             ->count();
        $request->session()->put('orders_count', $orders_count);

        $carts_count = Carts::where('members_uuid', session('uuid'))
            ->count();
        $request->session()->put('carts_count', $carts_count);
    }
}
