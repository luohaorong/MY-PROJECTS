@extends('layouts_member')
@section('CSS')
@parent
<link rel="stylesheet" type="text/css" href="/css/personal_center_lists.css"/>
@stop

@section('right')
<div class="content_common">
	<div class="box_h">文件下载
		<a class="box_h_sub" href="{{action('OrdersController@orderlist')}}">【返回我的订单】</a>
		<a class="box_h_sub box_h_sub_right" href="{{action('OrdersController@orderDetail',['orders_uuid'=>$orderUuid])}}">【返回订单详情】</a>
	</div>
	@foreach ($orderGoods as $og)
	<div class="order_download_nav">
		<h1>{{ $og->goods_chinese_name }}</h1>
		<p>温馨提示：由于批次不同，可能出现商品背标信息与下载文件不一致的情况，若有需要，请联系业务人员或客服为您更换。</p>
	</div>
	<div class="order_download_content">
	    @if (!empty($og->certification))
		@foreach ($og->certification as $cf)
		<p class="order_download_content_p">标题：{{ $cf['title'] }}
			<a href="{{ config('image.image_url').$cf['url'].'/'.basename($cf['url']) }}" class="download">下载</a>
		</p>
		@endforeach
		@endif
	</div>
	@endforeach
</div>
@stop 
