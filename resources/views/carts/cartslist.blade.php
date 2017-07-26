@extends('top')
@section('CSS')
<link rel="stylesheet" type="text/css" href="/css/login.css"/>
<link rel="stylesheet" href="/css/shopping_car.css"/>
<link rel="stylesheet" href="/css/register1.css"/>
@stop
@section('content')

<div id="shopping_container">
	<div id="process">
		<div class="process-container">
			<img src="/img/process1.png"/>
		</div>
		<div class="process-right"></div>
	</div>

	<ul class="step_nodes">
		<li>
			购物车
		</li>
		<li class="last2">
			核对订单
		</li>
		<li class="last2">
			确认订单
		</li>
	</ul>

	<!--购物车为空的时候显示-->
	<div class="carts_empty" style="height: 500px;{{ empty($carts) ? '' : 'display: none;' }}">
		<div class="img_empty">
			<img src="/images/shopping_car/empty.png"/>
			<p class="text_empty">
				<span class="em_content"> 空空如也， </span>
				<a href="/" class="stroll_empty">
					去逛逛！！
				</a>
			</p>
		</div>
	</div>

	<!--购物车不为空的时候显示-->
	<div class="shopping_main" style="{{ empty($carts) ? 'display: none;' : '' }}">
		<div class="shopping_thead">
			<ul>
				<li>
					全选
					<span class="chk_all select_all1"></span>
					<span class="select_all select_all2"></span>
				</li>
				<li>
					商品
				</li>
				<li>
					类型
				</li>
				<li>
					单价
				</li>
				<li>
					数量（箱）
				</li>
				<li>
					金额
				</li>
				<li>
					操作
				</li>
			</ul>
		</div>
		<div class="shopping_tbody">
			@php $count = 0 @endphp
			@if (count($carts) > (array_key_exists('jingwai', $carts) ? 1 : 0))
			<div class="logistics territory">
				<p class="logistics_title domestic wuliu">
					境内物流发货
					<span class="chk chk_1"></span>
					<span class="selected selected_1"></span>
				</p>
				@foreach($carts as $k=>$value)
				@if(trim($k) !== 'jingwai')
				<div class="logistics_wap">
					<div class="shopping_content tianjin">
						<p class="logistics_title title_bg">
							{{$value[0]['station']}}发货
							<span class="chk chk_1"></span>
							<span class="selected selected_1"></span>
						</p>
						<div class="shopping_details">
							@foreach($value as $c=>$d)
							@php $count++ @endphp
							<ul class="details_list" data_id="{{$d['uuid']}}" data_invalid="{{ (isset($d['goods_invalid']) && $d['goods_invalid']) ? 'yes' : 'no' }}">
								<li class="first_details">
									<span class="chk chk_2" data-success="{{ $d['selected'] === 'true' ? 0 : 1 }}"></span>
									<span class="selected selected_2" data-success="{{ $d['selected'] === 'true' ? 1 : 0 }}"></span>
									<a target="_blank" href="{{action('GoodsController@show',['uuid'=>$d['goods_uuid']])}}">
									<img class="pro_img" src="@image([$d['image_path'], 68, 96])"/>
									@if (isset($d['goods_invalid']) && $d['goods_invalid'])
									<img class="unused" src="/images/shopping_car/unused.png" />
									@endif
									</a>
									<div class="product_text">
										<p>
											<a class="product_name" target="_blank" href="{{action('GoodsController@show',['uuid'=>$d['goods_uuid']])}}">
												{{$d['goods_chinese_name']}}
											</a>
										</p>
										<p class="product_num">
											{{$d['stocking_pricing_ratio']}}只装
										</p>
									</div>
								</li>
								<li class="ordinary_text">
									{{ $d['sub_label'] }}
								</li>
								<li class="ordinary_text">
									@currency($d['goods_price'])
								</li>
								<li>
									<div class="amount">
										<p class="minus">
											-
										</p>
										<input type="text" name="shopping_number" class="shopping_number" value="{{$d['goods_num']}}" data_moq="{{$d['moq']}}" data_stock="{{$d['stock']}}"/>
										<p class="add">
											+
										</p>
									<span class="error_prompt"></span>
									</div>
								</li>
								<li class="ordinary_text sign_price">
									@currency($d['stocking_pricing_ratio']*$d['goods_num']*$d['goods_price'])
								</li>
								<li>
									<div class="operation_text">
										<p class="product_name del">
											删除
										</p>
										<p class="product_num favorites">
											移入收藏夹
										</p>
									</div>
								</li>
							</ul>
							@endforeach
						</div>
					</div>
				</div>
				@endif
				@endforeach
			</div>
			@endif
			@if (array_key_exists('jingwai', $carts))
			<div class="logistics abroad">
				<p class="logistics_title overseas wuliu">
					境外物流发货
					<span class="chk chk_1"></span>
					<span class="selected selected_1"></span>
				</p>
				@foreach($carts as $k=>$value)
				@if(trim($k) === 'jingwai')
				<div class="logistics_wap">
					<div class="shopping_content tianjin">
						<p class="logistics_title title_bg">
							{{$value[0]['station']}}发货
							<span class="chk chk_1"></span>
							<span class="selected selected_1"></span>
						</p>
						<div class="shopping_details">
							@foreach($value as $c=>$d)
							@php $count = 0 @endphp
							<ul class="details_list" data_id="{{$d['uuid']}}" data_invalid="{{ (isset($d['goods_invalid']) && $d['goods_invalid']) ? 'yes' : 'no' }}">
								<li class="first_details">
									<span class="chk chk_2"></span>
									<span class="selected selected_2"></span>
									<a target="_blank" href="{{action('GoodsController@show',['uuid'=>$d['goods_uuid']])}}">
									<img class="pro_img" src="@image([$d['image_path'], 68, 96])"/>
									@if (isset($d['goods_invalid']) && $d['goods_invalid'])
									<img class="unused" src="/images/shopping_car/unused.png" />
									@endif
									</a>
									<div class="product_text">
										<p>
											<a class="product_name" target="_blank" href="{{action('GoodsController@show',['uuid'=>$d['goods_uuid']])}}">
												{{$d['goods_chinese_name']}}
											</a>
										</p>
										<p class="product_num">
											{{$d['stocking_pricing_ratio']}}只装
										</p>
									</div>
								</li>
								<li class="ordinary_text">
									{{ $d['sub_label'] }}
								</li>
								<li class="ordinary_text">
									@currency($d['goods_price'])
								</li>
								<li>
									<div class="amount">
										<p class="minus">
											-
										</p>
										<input type="text" name="shopping_number" class="shopping_number" value="{{$d['goods_num']}}" data_moq="{{$d['moq']}}" data_stock="{{$d['stock']}}"/>
										<p class="add">
											+
										</p>
										<span class="error_prompt"></span>
									</div>
								</li>
								<li class="ordinary_text">
									@currency($d['stocking_pricing_ratio']*$d['goods_num']*$d['goods_price'])
								</li>
								<li>
									<div class="operation_text">
										<p class="product_name del">
											删除
										</p>
										<p class="product_num favorites">
											移入收藏夹
										</p>
									</div>
								</li>
							</ul>
							@endforeach
						</div>
					</div>
				</div>
				@endif
				@endforeach
			</div>
			@endif
		</div>
		<div class="shopping_tfoot">
			<div class="shopping_detailed">
				
				<div class="shopping_detailed_right">
					<p class="selected_goods_category">
						{{ $count }}件
					</p>
					<p class="selected_number">
						{{$goods_amount}}箱，{{$goods_total}}瓶
					</p>
					@if (session('type') === 'agency')
					<p style="color: #EA0000;">
						@currency($exchange_money)
					</p>
					@endif
					<p>
						<span class="shopping_price price_amount">@currency($price_amount)</span>
					</p>
				</div>
				<div class="shopping_detailed_left">
					<p>
						已选商品：
					</p>
					<p>
						产品数量：
					</p>
					@if (session('type') === 'agency')
					<p>
						1金币抵扣：
					</p>
					@endif
					<p>
						合计（不含运费）：
					</p>
				</div>
			</div>
			@if (session('type') === 'agency')
			<div class="gold_coin" data_id='000'>
				<span class="chk chk_3"></span>
				<span class="selected selected_3"></span>
				<div class="coin_wap">
					<p>
						您有<span class="shopping_price">{{session('corns')}}</span>枚金币，本次可用<span class="shopping_price allow_use">{{$useable_corns}}</span>枚抵扣货款
					</p>
					<p>
						使用金币：
						<input type="text" name="coin_num" class="coin_num" value="{{$useable_corns}}"/>
					</p>
				</div>
			</div>
			@endif
			<div class="settlement">
				<div class="sub_text">
					<div class="sub_select_all">
						<span class="chk_3 select_all1"></span>
						<span class="selected_3 select_all2" ></span>
						<span class="all"> 全选 </span>
					</div>
					<span class="del_wap"><span class="del_text del_all">删除</span></span>
					<span class="del_wap"><span class="del_text favorites_all">移入收藏夹</span></span>
					<span class="del_wap"><span class="del_text invalid">移除失效商品</span></span>
					<div class="selected_num">
						<div class="selected_num_left">
							<p class="select_product">
							已选商品<span class="selectProduct">{{ $count }}</span> 件 实际支付（不含运费）:
						    </p>
						    @if (session('type') === 'agency')
							<p class="surplus">
								剩余金币<span class="rest_corns">{{session('corns') - $useable_corns}}</span>,使用金币抵扣:
							</p>
							@endif
						</div>
						<div class="selected_num_right">
							<p class="select_product">
							<span class="fact_pay">@currency($price_amount - $useable_corns*$exchange_money)</span>
							</p>
							@if (session('type') === 'agency')
							<p class="surplus">
								<span class="deductible">@currency($useable_corns*$exchange_money)</span>
							</p>
							@endif
						</div>
						
					</div>
				</div>
				<div class="btn_payment">
					立即结算
				</div>
			</div>
		</div>
	</div>

	<div class="guess">
		<p class="you_like">
			猜你喜欢
		</p>
		<div class="product_wap">
			<ul id="sort" class="product_show">
				@foreach($scan as $k=>$value)
				<li>
					<a class="single_first" href="{{action('GoodsController@show',['uuid'=>$value['uuid']])}}">
						<img src="@image([$value['thumb'], 152, 220])" class="product_pic"/>
					</a>
					<img src="/images/commodity_list/Projection1.png" class="shadow_top"/>
					<div class="describe_pro">
						<ul class="describe_text">
							<li class="first_line">
								<a class="first" href="{{action('GoodsController@show',['uuid'=>$value['uuid']])}}">
									{{$value['chinese_name']}}
								</a>
							</li>
							<li class="second_line">
								<a class="second" href="{{action('GoodsController@show',['uuid'=>$value['uuid']])}}">
									{{$value['english_name']}}
								</a>
							</li>
							<li>
								<a class="three" href="{{action('GoodsController@show',['uuid'=>$value['uuid']])}}">
									{{$value['slogan']}}
								</a>
								<img class="flag" src="@image([ $value->country->flag, 30, 20 ])" />
							</li>
						</ul>
						<img src="/images/commodity_list/Projection2.png"/>
						<ul class="describe_price">
							<li class="price_list">
								@currency($value['lowest_price'])
							</li>
							<li class="price_sce">
								{{$value['label']}}
							</li>
							<li class="price_last">
								{{$value['sub_label']}}
							</li>
						</ul>
					</div>
				</li>
				@endforeach
			</ul>
		</div>
	</div>
</div>
@stop
@section('JS')
<script src="/js/shopping_car.js" type="text/javascript" charset="utf-8"></script>
<script>
window.global.ordercheck = "{{action('OrdersController@orderCheck')}}";
window.global.update_carts = "{{action('CartsController@updateCart')}}";
</script>
@stop

