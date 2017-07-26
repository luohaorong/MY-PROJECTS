<?php

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::any('unionReturn', ['uses' => 'IndexController@unionReturn']);
Route::any('aboutUs', ['uses' => 'IndexController@aboutUs']);
Route::any('agreement', ['uses' => 'IndexController@agreement']);

Route::any('checkAccount', ['uses' => 'IndexController@checkAccount']);
Route::any('upload', ['uses' => 'UploadController@upload']);

/**
 * 地区路由
 */
Route::any('getAreas', ['uses' => 'IndexController@getAreas']);
Route::any('getProvice', ['uses' => 'IndexController@getProvince']);
Route::any('getCountrys', ['uses' => 'IndexController@getCountrys']);
Route::any('setDefault', ['uses' => 'IndexController@setDefault']);

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/

Route::group(['middleware' => ['web']], function () {
    /**
     * 短信路由
     */
    Route::any('smsSend', ['uses' => 'IndexController@smsSend']);

    /**
     * 会话路由
     */
    Route::any('/', ['uses' => 'IndexController@index']);
    Route::any('logout', ['uses' => 'IndexController@logout']);
    Route::any('login', ['uses' => 'IndexController@login']);
    Route::any('register', ['uses' => 'IndexController@register']);
    Route::any('fastLogin', ['uses' => 'IndexController@fastLogin']);
    Route::any('registerfinish', ['uses' => 'IndexController@registerfinish']);
    Route::any('addr', ['uses' => 'IndexController@addr']);
    Route::any('enterpriseRegister', ['uses'=>'IndexController@enterpriseRegister']);
    Route::any('registerNav', ['uses' => 'IndexController@registerNav']);

    /**
     * 收货地址路由
     */
    Route::group([ 'prefix' => 'address' ], function () {
        Route::any('addAddr', ['uses' => 'AddressController@addAddr']);
        Route::any('deleteAddr', ['uses' => 'AddressController@deleteAddr']);
        Route::any('editAddr', ['uses' => 'AddressController@editAddr']);
        Route::any('setDefault', ['uses' => 'AddressController@setDefault']);
        Route::any('addrList', ['uses' => 'AddressController@addrList']);
        Route::any('oem', ['uses' => 'AddressController@oem']);
    });
    Route::any('areasList', ['uses' => 'AddressController@areasList']);
    Route::any('addAreas', ['uses' => 'AddressController@addAreas']);


    /**
     * 个人中心路由
     */
    Route::group([ 'prefix' => 'members' ], function () {
        Route::any('getInfo', ['uses' => 'MembersController@getInfo']);
        Route::any('saveInfo', ['uses' => 'MembersController@saveInfo']);
        Route::any('editUser', ['uses' => 'MembersController@editUser']);
        Route::any('mySampleCoupons', ['uses' => 'MembersController@mySampleCoupons']);
        Route::any('tranInfo', ['uses' => 'MembersController@tranInfo']);
        Route::any('myblance', ['uses' => 'MembersController@myblance']);
        Route::any('mypoints', ['uses' => 'MembersController@mypoints']);
        Route::any('mycorns', ['uses' => 'MembersController@mycorns']);
        Route::any('favorites', ['uses' => 'MembersController@favorites']);
        Route::any('recharge', ['uses' => 'MembersController@recharge']);
        Route::any('consumeRecord', ['uses' => 'MembersController@consumeRecord']);
        Route::any('rechargesRecord', ['uses' => 'RechargesController@rechargesRecord']);
    });

    /**
     * 定制路由
     */
    Route::group([ 'prefix' => 'oems' ], function () {
        Route::any('myOem', ['uses' => 'OemsController@myOem']);
        Route::any('brandCustomizition', ['uses' => 'OemsController@brandCustomizitionFirst']);
        Route::any('brandCustomizitionSecond/{uuid}', ['uses'=>'OemsController@brandCustomizitionSecond']);
        Route::post('calcOemFee', ['uses' => 'OemsController@calcOemFee']);
        Route::post('storeOem', ['uses' => 'OemsController@storeOem']);
        Route::any('oemDetail', ['uses' => 'OemsController@oemDetail']);
    });

    /**
     * 收藏路由
     */
    Route::group([ 'prefix' => 'favorites' ], function () {
        Route::any('addCollection', ['uses' => 'FavoritesController@addCollection']);
        Route::any('delCollection', ['uses' => 'FavoritesController@delCollection']);
    });

    /**
     * 订单路由
     */
    Route::group([ 'prefix' => 'orders' ], function () {
        Route::any('orderlist', ['uses' => 'OrdersController@orderlist']);
        Route::any('orderDetail', ['uses' => 'OrdersController@orderDetail']);
        Route::any('orderCheck', ['uses' => 'OrdersController@orderCheck']);
        Route::any('download/{uuid}', ['uses' => 'OrdersController@download']);
        Route::any('getShipFee', ['uses' => 'OrdersController@getShipFee']);
        Route::any('writeOrder', ['uses' => 'OrdersController@writeOrder']);
        Route::any('orderCancel', ['uses' => 'OrdersController@orderCancel']);
        Route::any('orderConfirm', ['uses' => 'OrdersController@orderConfirm']);
        Route::any('recharges', ['uses' => 'RechargesController@recharges']);
        Route::any('smsSecure', ['uses' => 'IndexController@smsSecure']);
        Route::any('applyInvoice', ['uses' => 'InvoiceController@apply']);
    });

    /**
     * 购物车路由
     */
    Route::group([ 'prefix' => 'carts' ], function () {
        Route::post('addCarts', ['uses' => 'CartsController@addCarts']);
        Route::post('updateCart', ['uses' => 'CartsController@updateCart']);
        Route::get('cartsList', ['uses' => 'CartsController@cartsList']);
    });


    /**
     * 支付路由
     */
    Route::group([ 'prefix' => 'pay' ], function () {
        Route::any('pays', ['uses' => 'PayController@pays']);
        Route::any('isPayed', ['uses' => 'PayController@isPayed']);
        Route::any('notify', ['uses' =>'PayController@notify']);
        Route::any('sendPay', ['uses' =>'PayController@sendPay']);
        Route::any('queue', ['uses' =>'PayController@queue']);
        Route::any('passCheck', ['uses' =>'IndexController@passCheck']);
    });

    /**
     * 独家路由
     */
    Route::group([ 'prefix' => 'exclusives' ], function () {
        Route::any('myExclusive', ['uses' => 'ExclusivesController@myExclusive']);
        Route::any('exclusive', ['uses' => 'ExclusivesController@exclusive']);
        Route::any('mainZone', ['uses' => 'ExclusivesController@mainZone']);
    });

    
    /**
     * 帮助中心路由
     */
    Route::get('help/{uuid?}', ['uses' => 'HelpController@show']);
    Route::get('goods/{uuid}', ['uses' => 'GoodsController@show']);
    Route::get('search/{keyword}', ['uses' => 'SearchController@index']);
    Route::get('exclusive/{uuid}', ['uses' => 'GoodsController@exclusive']);
    Route::get('categories/{uuid}/{filter?}', ['uses' => 'CategoriesController@show']);
    Route::get('floor/{uuid}', ['uses' => 'CategoriesController@floor']);
    Route::get('boutique', ['uses' => 'BoutiqueController@index']);
    Route::get('rpcClient', ['uses' => 'NotifyController@rpcClient']);
});

Route::any('reorganize', ['uses' => 'UploadController@reorganize']);
Route::get('qrcode', ['uses' => 'QrCodeController@index']);

// Route::get('test', function () {
//     $bonus = [];
//     for ($i = 0; $i < 50; $i++) {
//         $bonus[] = [
//             'areas_uuid' => '05dada00-dd25-11e6-86bf-371fac825466',
//             'trade_amount' => 1000000,
//             'bonus_source' => $i % 2 === 0 ? 'agency' : 'company',
//             'orders_uuid' => '05daca80-dd25-11e6-a69d-'.$i,
//             'order_sn' => 'O'.$i,
//             'merchant_name' => $i % 2 === 0 ? '四川鑫亚泰贸易有限公司' : '深圳滕华国际有限公司',
//             'members_uuid' => '25daca80-dd25-11e6-a69d-'.$i,
//         ];
//     }
//     httpPost(env('DISTRIBUTION_URL').'/bonus/calculate', $bonus);
//     return 1;
// });
