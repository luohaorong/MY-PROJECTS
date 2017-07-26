@extends('top')

@section('search_bar')
<div class="nav_search">
    @php 
    $tmp = []; 
    foreach (\App\Setting::get('hotword') as $hotword) {
        if ($hotword['category'] === 'search') {
            $tmp[] = $hotword['name'];
        }
    }
    $tmp = implode(' ', $tmp);
    @endphp
    <input type="text" name="search_input" id="search_input" data_keywords="{{ preg_replace('/\+/', ' ', $keyword ?? '') }}" data_content="{{ $tmp }}" />
    <div id="seach_inco_wap">
	    <div id="seach_inco"></div>
    </div>
    <ul class="nav_top">
    @php $flag = true; @endphp
    @foreach (\App\Setting::get('hotword') as $hotword)
        @if ($hotword['category'] === 'recommend')
        <li>
            @if ($flag)
            <a href="{{ $hotword['url'] }}" class="first_list">{{ $hotword['name'] }}</a>
            @php $flag = false; @endphp
            @else
             <a href="{{ $hotword['url'] }}">{{ $hotword['name'] }}</a>
            @endif
        </li>
        @endif
    @endforeach
    </ul>
</div>
@endsection

@section('cart_bar')
<ul class="shoping">
    <li class="shoping_car">
        <a href="{{action('CartsController@cartsList')}}"></a>
    </li>
    <li class="shoping_num">
        @if (session('id'))
        <a href="{{action('CartsController@cartsList')}}"></a>
        @else
        <a href="{{action('CartsController@cartsList')}}" class="cart_count">{{null ===(session('carts_count')) ?  0 :session('carts_count')}}</a>
        @endif
    </li>
</ul>
@endsection

@section('nav_bar')
<!--导航-->
<div id="index_container">
    <div class="nav_wrap">
        <ul class="nav_list">
            <li id="nav_first" class="nav_first">
            	<span class="nav_first_text">
            		采购导航
            	</span>
                <ul class="sub_list">
                @foreach (\App\Floors::getFloorBar() as $k => $floor)
                    <li>
                        <a href="{{ action('CategoriesController@floor', [ 'uuid' => $floor['uuid'] ]) }}">{{ $k + 1 }}F {{ $floor['title'] }}</a>
                    </li>
                @endforeach
                </ul>
            </li>
            @foreach (\App\Setting::get('navbar') as $navbar)
            <li class="{{ \Request::getRequestUri() === parse_url($navbar['url'])['path'] ? 'active' : '' }}">
                @if ($navbar['category'] === 'web')
                <a  class="{{ \Request::getRequestUri() === parse_url($navbar['url'])['path'] ? 'active' : '' }} nav_other" href="{{ $navbar['url'] }}">{{ $navbar['name'] }}</a>
                @endif
            </li>
            @endforeach
        </ul>
    </div>
    @yield('list')
</div>
@endsection

@section('tool_bar')
<!--右侧边栏开始-->
<ul id="toolbar">
@if (session('uuid') && session('type') === 'agency')
<li class="toolbar_saler">
    <a href="javascript:;">
        <img src="/images/call15.png">
        <p>营销顾问</p>
    </a>
    <div class="toolbar_show_box_big">
        <div class="toolbar_show_box">
            <div class="toolbar_cancel_box">
                <img class="toolbar_cancel" src="/images/close.png">
            </div>
            <img class="toolbar_saler_people" src="/images/customer_service.png">
            <div class="toolbar_show_box_top">
                <p class="my_only_saler">我的专属顾问</p>
                <p>姓名：<span>丹丹</span></p>
                <p>职位：<span>高级顾问</span></p>
                <p>电话：<span>17308031175</span></p>
                <p>huijiukefu@163.com</p>
            </div>
        </div>
    </div>
</li>
@endif
<li><a id="online2" href="javascript:;" class="online">
    <img src="/images/index/SpeechBubble_ More.png"/>
    <p>在线客服</p></a>
</li>
@if (session('uuid'))
<li class="toolbar_saler"><a href="{{action('MembersController@getInfo')}}">
    <img src="/images/index/Money.png"/>
    <p>我的账户</p></a>
    <div class="toolbar_show_box_big">
    <div class="toolbar_show_box">
         <div class="toolbar_cancel_box">
            <img class="toolbar_cancel" src="/images/close.png">
        </div>
        <div class="toolbar_show_box_top">
            <p class="my_only_saler">尊敬的@privacy_mobile(session('mobile'))：您好！</p>
            <p>账户余额：<span class="my_only_saler_special">@currency(session('balance'))</span>元</p>
            <p>会员积分：<span class="my_only_saler_special">0</span>分</p>
            <p>待处理交易：<span class="my_only_saler_special">{{session('orders_count') ?? 0}}</span>笔</p>
        </div>
        <div class="toolbar_show_box_bottom">
            <p>您还可以：<a target="_blank" href="{{action('MembersController@recharge')}}">快捷充值→</a></p>
        </div>
    </div>
    </div>
    </li>
@if (session('type') === 'agency')
<li><a href="/categories/0b7b8100-2958-11e7-9ab4-e337f0fad04a?agent=yes"><img src="/images/index/Profile.png"/>
    <p>独家体验</p></a></li>
@endif
@endif
<li id="gotop"><img src="/images/index/top.png"/>
    <p>回顶端</p></li>
</ul>
<!--右侧边栏结束-->
@endsection
