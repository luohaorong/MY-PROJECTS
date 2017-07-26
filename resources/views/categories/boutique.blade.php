@extends('layouts')

@section('CSS')
    <link rel="stylesheet" type="text/css" href="css/boutique_wine.css" />
	<link rel="stylesheet" type="text/css" href="css/slide.css" />
@stop

@section('list')
<!--轮播-->
<div class="slide_wapper">
<div class="index_slide">
	<div class="pptbox" id="ppt">
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
</div>
	<!--轮播结束-->
<!--商品展示-->
<div class="boutique_product">
	<ul class="product_list">
		@foreach ($boutiques as $boutique)
		<li>
			<div class="list_container">
				<div class="product_wap">
					<div class="product_left">
						<div class="right_describe">
							<div class="top_img">
								<img class="unload" data-src="@image([ $boutique->thumb, 134, 70])" />
							</div>
							<div class="sub_text">{{ $boutique->content }}</div>
						</div>
						<div class="left_wine">
							<a class="left_wine_img" target="_blank" href="{{ action('GoodsController@show', [ 'uuid' => $boutique->goods->uuid ]) }}">
								<img class="unload" data-src="@image([ $boutique->goods->thumb, 132, 188])" />
								<p class="wine_top">{{ $boutique->goods->chinese_name }}</p>
								<p class="wine_sub">{{ $boutique->goods->english_name }}</p>
							</a>
						</div>
					</div>
					<div class="product_right">
						<div class="top_title">
							<p>{{ $boutique->chateau_name }}</p>
							@foreach ($boutique->reputation as $reputation)
							<p>{{ $reputation }}</p>
							@endforeach
						</div>
						<div class="middle_text">
							{{ $boutique->goods->manufacturer }}
						</div>
						<div class="sub_price">
							<div class="price_sub">
								@currency($boutique->goods->lowest_price)
							</div>
							<div class="boutique_btn">
								<a target="_blank" href="{{ action('GoodsController@show', [ 'uuid' => $boutique->goods->uuid ]) }}">立即抢购</a>
							</div>
						</div>
					</div>
				</div>

			</div>
			<img class="falg" src="@image([ $boutique->goods->country->flag, 30, 20 ])" />
			<img class="flower_top flower_aside" src="images/boutique_wine/flower_top.png" />
			<img class="flower_sub flower_aside" src="images/boutique_wine/flower_sub.png" />
			<img class="flower_1 flower_aside" src="images/boutique_wine/flower_1.png" />
			<img class="flower3 flower_aside" src="images/boutique_wine/flower3.png" />
			<img class="flower4 flower_aside" src="images/boutique_wine/flower4.png" />
			<img class="flower_2 flower_aside" src="images/boutique_wine/flower_2.png" />
		</li>
		@endforeach
	</ul>
</div>
@stop
    
@section('JS')
	<script src="js/boutique_wine.js" type="text/javascript" charset="utf-8"></script>
    <script src="/js/slide.js" type="text/javascript" charset="utf-8"></script>
@stop
