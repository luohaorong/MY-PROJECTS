@extends('layouts')
<!--主体部分-->
@section('list')
    <!--轮播-->
    <div class="slide_wapper">
    <div class="index_slide">
        <div class="pptbox" id="ppt" style="height: 306px;">
            <ul class="innerwrapper">
                @foreach ($banners as $banner)
                <li>
                    <a href="{{ $banner['url'] }}"><img src="@image([ $banner['image'], 1920, 320 ])" /></a>
                </li>
                @endforeach
            </ul>
            <ul class="controls">
                @foreach ($banners as $i => $banner)
                <li class="{{ $i === 0 ? 'current' : '' }}">{{ $i + 1 }}</li>
                @endforeach
            </ul>
            <span class="btnleft"></span>
            <span class="btnright"></span>
        </div>
 </div>
        <!--轮播结束-->
    </div>
    <!--商品展示-->
    <div class="commodity">
        @foreach ($floors as $floor)
        <div id="{{ $floor['uuid'] }}" class="details">
            <div class="commodity_show">
                <div class="left_show">
                    <p class="left_show_title">{{ $floor['title'] }}</p>
                    <a href="{{ action('CategoriesController@floor', [ 'uuid' => $floor['uuid'] ]) }}"><img class="unload" data-src="@image([ $floor['image'], 204, 453])" /></a>
                    <a href="{{ action('CategoriesController@floor', [ 'uuid' => $floor['uuid'] ]) }}" class="more">查看更多</a>
                </div>
                <div class="right_show">
                    <ul class="right_top">
                        @for ($i = 0, $len = count($floor['goods']); $i < $len; $i++)
                        @if ($i > 4) 
                        @break;
                        @endif
                        <li class="single_pro">
                            <a class="single_first" href="{{ action('GoodsController@show', [ 'uuid' => $floor['goods'][$i]->uuid ]) }}" target="_blank">
                                <div class="sole">
                                    @if ($floor['goods'][$i]->agent_type === 'region' && session('type') === 'agency')
                                    <img src="/images/dujia.png" class="soleImg"/>
                                    @endif
                                    @if ($floor['goods'][$i]->is_presale === 'yes')
                                        <img src="/images/yushou.png" class="soleImg"/>
                                    @endif
                                    @if ($floor['goods'][$i]->is_new === 'yes')
                                    <img src="/images/xinpin.png" class="soleImg"/>
                                    @endif
                                </div>
                                @if (!empty($floor['goods'][$i]->honor))
                                <ul class="getwin_list">
                                    @foreach ($floor['goods'][$i]->honor as $honor)
                                    <li><img src="/images/huojiang.png" class="huojiangImg"/></li>
                                    @endforeach
                                </ul>
                                @endif
                                <img class="sole_last unload" data-src="@image([ $floor['goods'][$i]->thumb, 132, 188])" />
                            </a>
                            <div class="frame_price">
                            	<a target="_blank" href="{{ action('GoodsController@show', [ 'uuid' => $floor['goods'][$i]->uuid ]) }}">
                                <img class="frame" src="/images/index/flower_border.png" />
                                </a>
                                <!--<p class="price_fre price">@currency($floor['goods'][$i]->lowest_price)</p>-->
                            </div>
                            <div class="describe_pro" style="border-right: 1px solid #E6E6E6">
                                <!--<span class="describe_img"></span>-->
                                <ul>
                                    
                                    <li class="third_line">
                                        <a class="three" target="_blank" href="{{ action('GoodsController@show', [ 'uuid' => $floor['goods'][$i]->uuid ]) }}">{{ $floor['goods'][$i]->slogan }}</a>
                                    </li>
                                   
                                    <li class="first_line">
                                        <a class="first" target="_blank" href="{{ action('GoodsController@show', [ 'uuid' => $floor['goods'][$i]->uuid ]) }}">{{ $floor['goods'][$i]->chinese_name }}</a>
                                    </li>
                                    <li class="second_line">
                                        <a class="second" target="_blank" href="{{ action('GoodsController@show', [ 'uuid' => $floor['goods'][$i]->uuid ]) }}">{{ $floor['goods'][$i]->english_name }}</a>
                                    </li>
                                     <li>
                                        <p class="price1">@currency($floor['goods'][$i]->lowest_price)</p>
                                        <a class="fourth" target="_blank" href="{{ action('GoodsController@show', [ 'uuid' => $floor['goods'][$i]->uuid ]) }}">{{ $floor['goods'][$i]->sub_label }}</a>
                                    </li>
                                </ul>
                                <img class="flag" src="@image([ $floor['goods'][$i]->country->flag, 30, 20 ])" />
                            </div>
                        </li>
                        @endfor
                    </ul>
                    <ul class="right_sub">
                        @for ($i = 5, $len = count($floor['goods']); $i < $len; $i++)
                        @if ($i > 9) 
                        @break;
                        @endif
                        <li>
                            <a id="sub_img" class="single_first" target="_blank" href="{{ action('GoodsController@show', [ 'uuid' => $floor['goods'][$i]->uuid ]) }}">
                                <div class="sole">
                                @if ($floor['goods'][$i]->agent_type === 'region' && session('type') === 'agency')
                                    <img src="/images/dujia.png" class="soleImg"/>
                                @endif
                                @if ($floor['goods'][$i]->is_presale === 'yes')
                                    <img src="/images/yushou.png" class="soleImg"/>
                                @endif
                                @if ($floor['goods'][$i]->is_new === 'yes')
                                    <img src="/images/xinpin.png" class="soleImg"/>
                                @endif
                                @if (!empty($floor['goods'][$i]->honor))
                                @foreach ($floor['goods'][$i]->honor as $honor)
                                    <img src="/images/huojiang.png" class="huojiangImg"/>
                                    @break
                                @endforeach
                                @endif
                                </div>
                                <img class="sole_last unload" data-src="@image([ $floor['goods'][$i]->thumb, 68, 96])" />
                                <p class="skin_top">{{ $floor['goods'][$i]->chinese_name }}</p>
                                <p class="skin_middle">{{ $floor['goods'][$i]->english_name }}</p>
                                <p class="skin_sub">@currency($floor['goods'][$i]->lowest_price)</p>
                            </a>
                            <!--<div class="skin skin_first">-->
                                
                           <!-- </div>-->
                        </li>
                        @endfor
                    </ul>
                </div>
            </div>
        </div>
        @endforeach
    </div>
<!--左侧楼层开始-->
<ul id="floor">
    @foreach ($floors as $i => $floor)
    <li class="{{ $i === 0 ? 'floor_first' : '' }}" data-id="{{ $floor['uuid'] }}">
        <img src="@image($floor['thumb'])"/>
        <div class="floor_current">
            <span>{{ $floor['title'] }}</span>
        </div>
    </li>
    @endforeach
</ul>
<!--左侧楼层结束-->
@endSection

@section('CSS')
<link rel="stylesheet" type="text/css" href="/css/slide.css" />
@endsection

@section('JS')
    <script src="/js/slide.js" type="text/javascript" charset="utf-8"></script>
    <script src="/js/index.js" type="text/javascript" charset="utf-8"></script>
@stop
