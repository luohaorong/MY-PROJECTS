@extends('layouts')
@section('CSS')
    <link rel="stylesheet" href="/css/personal_common.css" />
@stop

@section('content')
    <div id="main">
        <div id="main-container">
        	<div class="main_crowded"></div>
            <div class="main-left">
                <div class="personal"><div class="person"><img src="/img/person.png" /></div>个人中心</div>
                <div class="personal-container">
                    <div class="list-name">
                        会员中心
                    </div>
                    <ul class="listings list1">
                        <li id="my_personal_lists"><a href="{{action('OrdersController@orderlist')}}"><img class="inc" src="/img/order.png" /><img class="inc1" src="/img/order1.png" /><p class="words">我的订单</p><img class="icn_right" src="/img/rightarrow.png"/></a></li>

                        <li id="logistics_damage"><a href="{{action('MembersController@tranInfo')}}"><img class="inc" src="/img/damage.png" /><img class="inc1" src="/img/damage1.png" /><p class="words">物流破损处理</p><img class="icn_right" src="/img/rightarrow.png"/></a></li>
                        @if (session('type') === 'agency')
                        <li id="my_exclusive"><a href="{{action('ExclusivesController@myExclusive')}}"><img class="inc" src="/img/sole-agency.png" /><img class="inc1" src="/img/sole-agency1.png" /><p class="words">我的独家</p><img class="icn_right" src="/img/rightarrow.png"/></a></li>
                        @endif
                        <li id="personal_my_custom"><a href="{{action('OemsController@myOem')}}"><img class="inc" src="/img/my-customization.png" /><img class="inc1" src="/img/my-customization1.png" /><p class="words">我的定制</p><img class="icn_right" src="/img/rightarrow.png"/></a></li>
                    </ul>
                    <div class="list-name">
                        资金管理
                    </div>
                    <ul class="listings list2">
                        <li id="account_balance"><a href="{{action('MembersController@myblance')}}"><img class="inc" src="/img/balance.png" /><img class="inc1" src="/img/balance1.png" /><p class="words ">账户余额</p><img class="icn_right" src="/img/rightarrow.png"/></a></li>
                        <li id="pay_records"><a href="{{action('MembersController@consumeRecord',['from'=>'consumeRecord'])}}"><img class="inc" src="/img/Record.png" /><img class="inc1" src="/img/Record1.png" /><p class="words">消费记录</p><img class="icn_right" src="/img/rightarrow.png"/></a></li>
                        <li id="personal_recharge"><a href="{{action('MembersController@recharge')}}"><img class="inc" src="/img/recharge.png" /><img class="inc1" src="/img/recharge1.png" /><p class="words">充值</p><img class="icn_right" src="/img/rightarrow.png"/></a></li>
                        @if (session('type') === 'agency')
                        <li id="my_gold"><a href="{{action('MembersController@mycorns')}}"><img class="inc" src="/img/gold-coin.png" /><img class="inc1" src="/img/gold-coin1.png" /><p class="words">我的金币</p><img class="icn_right" src="/img/rightarrow.png"/></a></li>
                        @endif
                        <!-- <li id="my_sample_coupons"><a href="{{action('MembersController@mySampleCoupons')}}"><img class="inc" src="/img/simple.png" /><img class="inc1" src="/img/simple1.png" /><p class="words">我的样品券</p><img class="icn_right" src="/img/rightarrow.png"/></a></li> -->
                    </ul>
                    <div class="list-name">
                        账户管理
                    </div>
                    <ul class="listings list3">
                        <li id="account_information"><a href="{{action('MembersController@getInfo')}}"><img class="inc" src="/img/infor3.png" /><img class="inc1" src="/img/infor4.png" /><p class="words">账户信息</p><img class="icn_right" src="/img/rightarrow.png"/></a></li>
                        <li id="address_management"><a href="{{action('AddressController@addrList')}}"><img class="inc" src="/img/address.png" /><img class="inc1" src="/img/address1.png" /><p class="words">地址管理</p><img class="icn_right" src="/img/rightarrow.png"/></a></li>
                        <li id="my_personal_collection"><a href="{{action('MembersController@favorites')}}"><img class="inc" src="/img/collect.png" /><img class="inc1" src="/img/collect1.png" /><p class="words">我的收藏</p><img class="icn_right" src="/img/rightarrow.png"/></a></li>
                        <li id="personal_my_points"><a href="{{action('MembersController@mypoints')}}"><img class="inc" src="/img/integral.png" /><img class="inc1" src="/img/integral1.png" /><p class="words">我的积分</p><img class="icn_right" src="/img/rightarrow.png"/></a></li>
                        <li id="personal_brand_customization"><a href="{{action('OemsController@brandCustomizitionFirst')}}"><img class="inc" src="/img/Brand-customization.png" /><img class="inc1" src="/img/Brand-customization1.png" /><p class="words">品牌定制</p><img class="icn_right" src="/img/rightarrow.png"/></a></li>
                    </ul>
                </div>
            </div>
            <div class="main-right">
             @yield('right')
            </div>
            <div class='clear'></div>
        </div>
    </div>
@stop
@section('JS')
    <script type="text/javascript" src="/js/personal_center.js" ></script>
    <script type="text/javascript" src="/js/jquery.cookie.js" ></script>
    <script>
        window.global.del_addr = "{{action('AddressController@deleteAddr')}}";
        window.global.edit_addr = "{{action('AddressController@editAddr')}}";
        window.global.getProvince = "{{action('IndexController@getProvince')}}";
        window.global.getAreas = "{{action('IndexController@getAreas')}}";
        window.global.getCountrys = "{{action('IndexController@getCountrys')}}";
        window.global.save_account = "{{action('IndexController@login')}}";
        window.global.brandCustomizitionSecond = "{{action('OemsController@brandCustomizitionSecond', [ 'uuid' => '' ])}}";
        window.global.save_name = "{{action('IndexController@index')}}";
        window.global.addAddr =  "{{action('AddressController@addAddr')}}";
        window.global.deleteAddr =  "{{action('AddressController@deleteAddr')}}";
        window.global.editAddr =  "{{action('AddressController@editAddr')}}";
        window.global.edit_user = "{{action('MembersController@editUser')}}"
        window.global.orderlist = "{{action('OrdersController@orderlist')}}"
        window.global.myblance = "{{action('MembersController@myblance')}}"
		window.global.mycorns = "{{action('MembersController@mycorns')}}"
    </script>
@stop