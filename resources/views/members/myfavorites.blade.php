@extends('layouts_member')
@section('CSS')
@parent
<link rel="stylesheet" type="text/css" href="/css/personal_collection.css"/>
@stop
@section('right')
	
		<div class="box_h">我的收藏</div>
		<div class="nav_title">
			<div class="vip_timleft collection_right">
				<p>按时间查找：</p>
				<div id="personal_test1" name='collection_start' class="inline laydate-icon vip_timebox" ></div>
				<div id="personal_test2" name='collection_end' class="inline laydate-icon vip_timebox" ></div>
				<div class="vip_filter">查询</div>
			</div>
		</div>
		<div class="collection_title_sub">
			<span class="collection_title_sub_span collection_title_sub_item1">编号</span>
			<span class="collection_title_sub_span collection_title_sub_item2">商品图片</span>
			<span class="collection_title_sub_span collection_title_sub_item3">商品信息</span>
			<span class="collection_title_sub_span collection_title_sub_item4">收藏时间</span>
			<span class="collection_title_sub_span collection_title_sub_item5">操作</span>
		</div>
		<!--收藏内容-->
		<div class="collection_container">
			@if(count($favorites)==0)
				<div class="no_deal">
					尊敬的荟酒网客户：您还没有收藏过任何商品！
				</div>
			@endif

			@foreach($favorites as $k => $favorite)
			<ul class="order_lists clearfix">
				<li>
					<ul class="collection_lists_left">
						<li>
							<div class="collection_title_sub_item1 item_number item_left clearfix">
								{{$k+1}}
							</div>
							<div class="collection_title_sub_item2 item_product item_left">
								<div class="item_product_img">
									<a target="_blank" href="{{action('GoodsController@show',['uuid'=>$favorite->goods_uuid])}}">
										<img style="width: 70px;height: 100px;" src="@image([$favorite->goods_image, 132, 188])">
										@if (isset($favorite->goods_invalid) && $favorite->goods_invalid)
										<img class="unused" src="/images/shopping_car/unused.png">
										@endif
									</a>
								</div>
							</div>
							<div class="collection_title_sub_item3 item_time item_left">
								<a target="_blank" href="{{action('GoodsController@show',['uuid'=>$favorite->goods_uuid])}}">
									<p  style="color: #999999;" class="item_time_top">{{$favorite->goods_chinese_name}}</p>
								</a>
							</div>
							<div class="collection_title_sub_item4 item_operation item_left">
								{{$favorite->created_at}}
							</div>
						</li>
					</ul>

					<ul class="order_lists_right clearfix collection_title_sub_item5">
						<div class="order_lists_right_state collection_title_sub_item5">
							<div class="vertical_align">
								<a class="color_blue" target="_blank" href="{{action('GoodsController@show',['uuid'=>$favorite->goods_uuid])}}">查看</a>

								<div class="cancel" data-uuid ="{{$favorite->goods_uuid}}">取消收藏</div>

							</div>
						</div>
					</ul>
					
				</li>
			</ul>
			@endforeach
		</div>
		
	
	{{$favorites->links()}}
@stop
@section('JS')
@parent
	<script type="text/javascript" src="/js/my_collection.js" ></script>
	<script type="text/javascript" src="/js/laydate.js" ></script>
    <script type="text/javascript" src="/js/personal_date.js"></script>
	<script>
		window.global.fav_list = "{{action('MembersController@favorites')}}";
		//begin_time ,end_time
        window.global.del_favor = "{{action('FavoritesController@delCollection')}}";
	</script>
@stop
