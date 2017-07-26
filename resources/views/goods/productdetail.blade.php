@extends('layouts') @section('CSS')
<link rel="stylesheet" type="text/css" href="/css/product_details.css" />
<link rel="stylesheet" href="/css/fangdajing.css">
<link rel="stylesheet" href="/css/fangdajing2.css">
<link rel="stylesheet" href="/css/fangdajing3.css"> @stop @section('list') 
<div class="product_detail">
	<div class="product_detail_left">
		<div class="product_detail_left_title">
			<span class="nbsp">产自：</span><span class="Spain"> {{ $goods->country->chinese_abbreviation }}</span><img src="@image([ $goods->country->flag, 30, 20 ])">
		</div>
		<div class="nav_title" id="tab_id">
			<ul class="option tab">
				<li class="active">基本信息</li>
				<li>品鉴信息</li>
				<li>包装信息</li>
			</ul>
		</div>
		<ul class="tabcon_sy">
			<li class="product_detail_left_content tab_con">
				@foreach ($attrNames as $attrName) @if ($attrName['category'] === 'base')
				<p>{{ $attrName['name'] }}：{{ implode(', ', $attrName['string']) }}</p>
				@endif @endforeach
			</li>
			<li class="product_detail_left_content tab_hidden">
				@foreach ($attrNames as $attrName) @if ($attrName['category'] === 'tasty')
				<p>{{ $attrName['name'] }}：{{ implode(', ', $attrName['string']) }}</p>
				@endif @endforeach
			</li>
			<li class="product_detail_left_content tab_hidden">
				@foreach ($attrNames as $attrName) @if ($attrName['category'] === 'packing')
				<p>{{ $attrName['name'] }}：{{ implode(', ', $attrName['string']) }}</p>
				@endif @endforeach
			</li>
		</ul>
		<div class="product_detail_left_footer">
			<p>商品编号:{{ $goods->goods_code }}</p>
			<p>
				@if ($isFavorite)
				<span class="green favorite_wapper"><span class="letter_space_one" data_favorite='{{$check_favor ? 1 :0}}'>★已收藏</span><span class="favorite_num">（{{ $goods->favorite_num }}）</span></span>
				@else<span class="favorite_wapper"><span class="letter_space_one" data_favorite='{{$check_favor ? 1 :0}}'>☆加入收藏夹</span><span class="favorite_num">（{{ $goods->favorite_num }}）</span></span> @endif
			</p>
		</div>
	</div>
	<div class="right-extra">

		@foreach ($goods->goods_extends as $k => $goods_extend)
		<div id="{{ $goods_extend->uuid }}" style="{{ $k === 0 ? '' : 'display:none;' }}">
			<div class="examples">
				<ul class="etalage_wap">
					@foreach ($goods_extend->image as $image)
					<li>
						<img class="etalage_thumb_image" src="@image([ $image, 280, 400 ])" />
						<img class="etalage_source_image" src="@image([ $image, 840, 1200 ])" />
					</li>
					@endforeach
				</ul>
			</div>
		</div>
		@endforeach

	</div>
	<div class="product_detail_right">
		<div class="product_detail_right_title">
			<div class="product_detail_right_title_l">
				<div class="red_wine"><span class="bload_title">{{ $goods->chinese_name }}</span><span class="sin_title"> {{ $goods->english_name }}</span>
				</div>
				@if ('region' === $goods->agent_type)
				<img src="/images/dujia.png"> @elseif ('boutique' === $goods->agent_type)
				<img src="/images/boutique.png"> @endif
			</div>
			@if (!empty($goods->honor))
			<div class="product_detail_right_title_r">
				<div class="honor"><span class="honor_title">获奖荣誉</span><span class="honor_text"> HONOR</span></div>
				@foreach ($goods->honor as $honor)
				<img src="@image($honor['image'])" title="{{ $honor['honor_name'] }}">
				@endforeach
			</div>
			@endif
		</div>
		<div class="product_detail_right_content">
			<p class="tip">{{ $goods->warning }}</p>
		</div>
		<!--<div class="product_detail_right_content">
			<div class="content_name letter_space_two font_spancing">活动</div>
			<div class="content_details"><span class="content_details_free">运费减免</span> 
				<span class="details_free_text">
					10箱起拼，30箱起发，购买越多，物流费越低，同仓满130箱免物流费（不含送货上门费）！了解物流费用减免政策
				</span>
			</div>
		</div>-->
		<div class="product_detail_right_content quantitative">
			<div class="quantitative_content_name letter_space_three">起订量
			</div>
			<div class="quantitative_content_details"> 满{{ $goods->goods_extends[0]->moq }}{{ $goods->goods_extends[0]->stocking_unit }}起订(每{{ $goods->goods_extends[0]->stocking_unit }}{{ $goods->goods_extends[0]->stocking_pricing_ratio }}{{ $goods->goods_extends[0]->pricing_unit }})</div>
		</div>
		<div class="product_detail_right_content content_service service">
			<div class="content_service_content_name font_spancing">服务</div>
			<div class="content_service_content_details">
				@if (in_array('honest', $goods->service))
				<span class="inline_block"><img src="/images/pei.png" alt="" class="icon_logo">破损赔付</span> @endif @if (in_array('invoice', $goods->service))
				<span class="inline_block"><img src="/images/ticket.png" alt="" class="icon_logo">含税包票</span> @endif @if (in_array('compensation', $goods->service))
				<span class="inline_block"><img src="/images/zheng.png" alt="" class="icon_logo">正品三证</span> @endif
			</div>
		</div>
		@foreach ($saleAttrNames as $k => $saleAttrName) @if ($saleAttrName['is_warehouse'] === 'no')
		<div class="product_detail_right_content clearfix">
			<div class="content_name font_spancing">{{ $saleAttrName['name'] }}</div>
			<div class="content_details_hight">
				@if (isset($saleAttrName['value'])) @foreach ($saleAttrName['value'] as $m => $v)
				<div class="right_block {{ in_array($v['uuid'], $goods->goods_extends[0]->combination) ? 'ex_afterclick' : '' }}" {{ in_array($v[ 'uuid'], $goods->goods_extends[0]->combination) ? 'data-selected=1' : '' }} data-attr-value-uuid="{{ $v['uuid'] }}">
					<span class="ck_name">
						{{ $v['name'] }} 
						<span style="color:#ea0000;padding-right: 10px;">@currency($saleAttrName['price'][$m])
						<span style="color: #333">/瓶</span>
						</span>
						@foreach ($goods->goods_extends as $al)
							@if (in_array($v[ 'uuid'], $al->combination))
								{{ $al->attribute_label }}
								@break;
							@endif
						@endforeach
					</span>
					<div class="ck_region {{ in_array($v['uuid'], $goods->goods_extends[0]->combination) ? 'ex_change' : '' }}"></div>
				</div>
				@endforeach @endif
			</div>
		</div>
		@endif @endforeach
		<div class="product_detail_right_content  limit">
			<div class="content_name letter_space_two font_spancing">数量</div>
			<div class="content_details clearfix">
				<div class="ex_xiang">
					<div class="ex_minus total_minus">-</div>
					<input class="ex_amount total_amount" onkeyup="value=value.replace(/[^\d]/g,'') " value="{{ $goods->goods_extends[0]->moq }}" data_value='{{ $goods->goods_extends[0]->moq }}'>
					<div class="ex_add total_add">+</div>
				</div>
				<div class="ex_situation">
					{{ $goods->goods_extends[0]->stocking_unit }}
					<span class="number_details">（<span class="single">{{ $goods->goods_extends[0]->stocking_pricing_ratio }}</span>{{ $goods->goods_extends[0]->pricing_unit }}装，共<span class="ex_allo">{{ $goods->goods_extends[0]->moq * $goods->goods_extends[0]->stocking_pricing_ratio }}</span>{{ $goods->goods_extends[0]->pricing_unit }}）</span>
					<span class="layer_stock_num layer_total_stock" data_stock="{{ $goods->total_stock }}">库存（{{ $goods->stock_label }}）</span>
				</div>
			</div>
		</div>
		<div class="product_detail_right_content">
			<div class="content_name letter_space_two content_name_special font_spancing">送至</div>
			<div class="content_details">
				<div class="select_wap">
					<input type="hidden" name="uuid" value="">
					<select class="province select_common" name="province" id="province">
						<option value="请选择">请选择</option>
					</select><span class="deriction">省</span>

					<select class="city select_common" id="city" name="city">
						<option value="请选择">请选择</option>
					</select><span class="deriction ">市</span>
					<select class="region select_common" id="country" name="country">
						<option value="请选择">请选择</option>
					</select><span class="deriction ">区/县</span>
				</div>
				<div class="ex_sendgoods" style="visibility: hidden;">
					@foreach ($saleCombination as $value) @if ($value[0]['default_show'])
					<span class="default_st" data-attr-value-uuid="{{ $value[0]['warehouse']['uuid'] }}">{{ $value[0]['warehouse']['name'] }}发货</span> @break @endif @endforeach
					<span class="modefile">【修改】</span>
				</div>
			</div>
		</div>
		<div class="product_detail_right_content">
			{{--@if ('region' !== $goods->agent_type)--}}
			<button class="confirm_blue sure_agent">
				<img src="/images/gouwuche.png"> 加入采购车
			</button>
			{{--@endif--}}
			<div class="confirm_blue to_favorite" data_favorite='{{$check_favor ? 1 :0}}'>
				<img src="/images/favorite.png">
				<span class="join">
					@if($check_favor==1)取消收藏@else加入收藏夹@endif
					</span>
			</div>
			<a href="/" class="confirm_blue continue_buy">
				继续逛逛
			</a>
			@if ('region' === $goods->agent_type && session('type') === 'agency')
			<a class="items_r" href="{{ action('ExclusivesController@exclusive', [ 'uuid' => $goods->uuid ]) }}">区域独家</a> @endif
		</div>
	</div>
</div>
<div id="list_details">
	<div class="list_details_left">
		<div id="heat" data_state='1' class="left_first">
			<img id="add" class="first_ico" src="/images/commodity_list/add.png" />
			<img id="detract" class="first_ico current" src="/images/commodity_list/detract.png" />
			<p>产品热度榜</p>
		</div>
		<ul id="left_list_top" class="left_list">
			@foreach ($favoriteGoods as $favorite)
			<li class="product_list">
				<a target="_blank" href="{{ action('GoodsController@show', [ 'uuid' => $favorite->uuid ]) }}">
					<img class="unload" data-src="@image([$favorite->thumb, 60, 86])" />
					<p class="product_name">{{ $favorite->chinese_name }}</p>
					<p class="product_price">@currency($favorite->lowest_price)</p>
				</a>
			</li>
			@endforeach
		</ul>
		<div id="browse" data_state='1' class="left_first">
			<img id="add_sub" class="first_ico" src="/images/commodity_list/add.png" />
			<img id="detract_sub" class="first_ico current" src="/images/commodity_list/detract.png" />
			<p>最近浏览</p>
		</div>
		<ul id="left_list_sub" class="left_list">
			@foreach ($recentScanGoods as $recentScan)
			<li class="product_list">
				<a target="_blank" href="{{ action('GoodsController@show', [ 'uuid' => $recentScan->uuid ]) }}">
					<img class="unload" data-src="@image([$recentScan->thumb, 60, 86])" />
					<p class="product_name">{{ $recentScan->chinese_name }}</p>
					<p class="product_price">@currency($recentScan->lowest_price)</p>
				</a>
			</li>
			@endforeach
		</ul>
	</div>
	<div class="list_details_right">
		<div class="list_right_top">
			<span class="list_right_title">
			 厂家寄语：
             <span class="message">{{ $goods->manufacturer }}</span>
			</span>
		</div>
		<div class="list_right_sub first_hight">
			<div class="list_right_title">
				产品参数：
			</div>
			<div class="select_sub">
				<h2>基本信息</h2>
				<div class="container_fluid">
					<ul class="fluid_list">
						@foreach ($attrNames as $attrName) @if ($attrName['category'] === 'base')
						<li>
							<span class="fluid_list_title">{{ $attrName['name'] }}</span>
							<a title="{{ implode(', ', $attrName['string']) }}">{{ implode(', ', $attrName['string']) }}</a>
						</li>
						@endif @endforeach
					</ul>
				</div>
			</div>
			<div class="select_sub">
				<h2>品鉴信息</h2>
				<div class="container_fluid">
					<ul class="fluid_list">
						@foreach ($attrNames as $attrName) @if ($attrName['category'] === 'tasty')
						<li>
							<span class="fluid_list_title">{{ $attrName['name'] }}</span>
							<a title="{{ implode(', ', $attrName['string']) }}">{{ implode(', ', $attrName['string']) }}</a>
						</li>
						@endif @endforeach
					</ul>
				</div>
			</div>
			<div class="select_sub">
				<h2>包装信息</h2>
				<div class="container_fluid">
					<ul class="fluid_list">
						@foreach ($attrNames as $attrName) @if ($attrName['category'] === 'packing')
						<li>
							<span class="fluid_list_title">{{ $attrName['name'] }}</span>
							<a title="{{ implode(', ', $attrName['string']) }}">{{ implode(', ', $attrName['string']) }}</a>
						</li>
						@endif @endforeach
					</ul>
				</div>
			</div>
		</div>
		<div class="list_right_sub first_hight">
			<div class="list_right_title">
				购买流程：
			</div>
			@if (in_array('inside', $goods->purchase_process))
			<div class="list_right_img"><img src="/images/Territory.png" alt=""></div>
			@endif @if (in_array('outside', $goods->purchase_process))
			<div class="list_right_img"><img src="/images/Abroad.png" alt=""></div>
			@endif @if (in_array('region', $goods->purchase_process))
			<div class="list_right_img"><img src="/images/Region.png" alt=""></div>
			@endif
		</div>
		<div class="list_right_sub">
			<div class="list_right_title">
				图文详情：
			</div>
			<div class="img_block">
				{!! $goods->detail !!}
			</div>
		</div>
	</div>
</div>
@stop @section('modal')
<div class="layer">
	<div class="layer_container">
		<div class="layer_wap">
			<div class="container_title">
				<p class="layer_total">
					<span class="total_title">
	   				合计选择：
	   				<span class="title_num box_num">
	   					{{ $goods->goods_extends[0]->moq }}
	   				</span> {{ $goods->goods_extends[0]->stocking_unit }}
					</span>
					<!--<span class="max_shopping">
	   				起订量<span class="max_shopping_moq">{{ $goods->goods_extends[0]->moq }}</span>{{ $goods->goods_extends[0]->stocking_unit }}，最大购买量<span class="max_shopping_num">{{ $goods->goods_extends[0]->stock }}</span>{{ $goods->goods_extends[0]->stocking_unit }}
	   			</span>-->
				</p>
				<!--<p class="layer_time">
					<span class="total_title">
	   				取货次数：
	   				<span class="title_num time_num">
	   					1
	   				</span> 次
					</span>
				</p>-->
			</div>
			@foreach ($saleCombination as $key => $value)
			<div data-index="{{ $key }}" {{ $value[0][ 'default_show'] ? 'data-selected=1' : '' }} class="sub_wap" style="{{ $value[0]['default_show'] ? '' : 'display: none;' }}">
				@foreach ($value as $v)
				<div class="ex_xiang_wap limit">
					<span class="chk chk_1" style="{{ $v['default_show'] ? 'display: none;' : '' }}"></span>
					<span class="selected selected_1" style="{{ $v['default_show'] ? 'display: inline;' : '' }}"></span>
					<span class="depot" {{ $v[ 'default_show'] ? 'data-selected=1' : '' }} data-station-alias="@if(trim($v['warehouse']['name']==='境外')) jingwai @elseif($v['warehouse']['name']==='宁波仓') ningbo @elseif($v['warehouse']['name']==='上海仓') shanghai @elseif($v['warehouse']['name']==='成都仓') chengdu @endif" data-attr-value-uuid="{{ $v['warehouse']['uuid'] }}">
					{{ $v['warehouse']['name'] }}
				</span>
					<span class="maohao">:</span>
					<div class="ex_xiang layer_ex_xiang">
						<div class="ex_minus">-</div>
						<input class="ex_amount single_amount" value="{{ $v['moq'] }}" data_value="{{ $v['moq'] }}">
						<div class="ex_add">+</div>
					</div>
					<span class="layer_unit">{{ $v['stocking_unit'] }}</span>
					<span class="layer_stock layer_stock_num" data_stock="{{ $v['stock'] }}">（{{ $goods->stock_label }}）</span>
				</div>
				@endforeach
			</div>
			@endforeach
			<div class="bottom_btn">
				<div class="cancel">
					取消
				</div>
				<div class="ensure">
					确认
				</div>
			</div>

		</div>
	</div>
</div>

@endsection @section('JS')
<script src="/js/product_detail.js" type="text/javascript" charset="utf-8"></script>
<script src="/js/fangdajing.js"></script>
<script>
	window.global.goods_uuid = "{{ $goods->uuid }}";
	window.global.send_sms = "{{action('IndexController@smsSend')}}";
	window.global.getProvince = "{{action('IndexController@getProvince')}}";
	window.global.getAreas = "{{action('IndexController@getAreas')}}";
	window.global.getCountrys = "{{action('IndexController@getCountrys')}}";
	window.global.add_carts = "{{action('CartsController@addCarts')}}";
	window.global.add_favor = "{{action('FavoritesController@addCollection')}}";
	window.global.del_favor = "{{action('FavoritesController@delCollection')}}";
	var data = {!! json_encode($data, true) !!};
</script>

<script type="text/javascript">
	$(function() {
		
		$('.etalage_wap').etalage({
			thumb_image_width: 280,
			thumb_image_height: 400,
			source_image_width: 840,
			source_image_height: 1200,
			autoplay: true,
			speed: 50,
			small_img_size: '44x64',
			click_callback: function(image_anchor, instance_id) {
				alert('Callback example:\nYou clicked on an image with the anchor: "' + image_anchor + '"\n(in Etalage instance: "' + instance_id + '")');
			}
		});
		$('.dropdownlist').change(function() {
			etalage_show($(this).find('option:selected').attr('class'));
		});

		$('.select_sub').each(function () {
			if (!$(this).find('li').length) {
				$(this).remove();
			}
		});
		
	});
</script>
@stop