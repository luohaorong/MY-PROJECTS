@extends('layouts_member')
@section('CSS')
@parent
<link rel="stylesheet" type="text/css" href="/css/personal_center_lists.css"/>
@stop
@section('right')
<div id="input_file1" style="display: none;"></div>
<div id="input_file2" style="display: none;"></div>
<div class="content_common">

	<div class="box_h">
		我的订单
	</div>
	<div class="nav_title">
		<div class="inline_block clearfix">
			<a href="{{action('OrdersController@orderlist',['state'=>''])}}" class="order_state {{ empty($state) ? 'color_red' :''}}" data_status=''>
				<span class="order_top {{ empty($state) ? 'checkbox_change' :''}}"></span>全部
			</a>
			<a href="{{action('OrdersController@orderlist',['state'=>'待支付'])}}" class="order_state {{$state==='待支付'? 'color_red' :''}}" data_status='待支付'>
				<span class="order_top {{$state==='待支付'? 'checkbox_change' :''}}"></span>待支付
			</a>
			<a href="{{action('OrdersController@orderlist',['state'=>'已发货'])}}" class="order_state {{$state==='已发货'? 'color_red' :''}}" data_status='已发货'>
				<span class="order_top {{$state==='已发货'? 'checkbox_change' :''}}"></span>待收货
			</a>
			<a href="{{action('OrdersController@orderlist',['state'=>'已完成'])}}" class="order_state {{$state==='已完成'? 'color_red' :''}}" data_status='已完成'>
				<span class="order_top {{$state==='已完成' ? 'checkbox_change' :''}}"></span>已完成
			</a>
			<a href="{{action('OrdersController@orderlist',['state'=>'已取消'])}}" class="order_state {{$state==='已取消'? 'color_red' :''}}" data_status='已取消'>
				<span class="order_top {{$state==='已取消' ? 'checkbox_change' :''}}"></span>已取消
			</a>
		</div>

		<div class="vip_timleft">
			<p>
				按时间查找：
			</p>
			<div id="personal_test1" name='order_start' class="inline laydate-icon vip_timebox" ></div>
			<div id="personal_test2" name='order_end' class="inline laydate-icon vip_timebox" ></div>
			<div class="vip_filter">
				查询
			</div>
		</div>
	</div>
	<div class="nav_title_sub">
		<span class="nav_tetle_sub_span span_large">商品</span>
		<span class="nav_tetle_sub_span">类型</span>
		<span class="nav_tetle_sub_span">单价</span>
		<span class="nav_tetle_sub_span">数量（箱）</span>
		<span class="nav_tetle_sub_span">商品总金额</span>
		<span class="nav_tetle_sub_span span_state">全部状态</span>
		<span class="nav_tetle_sub_span span_small">操作</span>
	</div>
	<div class="order_lists_container">

	@if(count($orders)==0)
		<!--无订单生成显示-->
			<div class="no_order">
				尊敬的荟酒网客户：暂无相关信息，您可以返回<a class="no_order_list" href="/">首页</a>
			</div>
	@else
		@foreach($orders as $k=>$value)
		<!--有订单生成显示-->
		<ul class="order_lists clearfix">
		<h2 class="order_lists_title"><span class="order_lists_subtitle">订单编号：</span>{{$value['order_sn']}} <span class="order_lists_subtitle padding_left">下单时间：</span><span class="order_lists_time">{{$value['created_at']}}</span></h2>
		<div class="order_follow" style="display: none;">
			<img class="order_follow_off" src="/img/no-pass.png">
			<!--跟踪订单的内容区域-->
			<div class="order_follow_container">
				<div class="order_follow_step0"></div>
				<!--第一步提交订单或者取消订单-->
				@if($value['order_state'] == "待支付"|$value['order_state'] == "已取消")
				<div class="order_follow_step1 order_follow_common">
					<div class="order_follow_circle"></div>
					<p class="order_follow_words follow_step1_words">
						订单提交成功，等待支付
					</p>
					<p class="follow_step_times follow_step1_times">
						{{$value['created_at']}}
					</p>
					
				</div>
				
				@endif
				@if($value['order_state'] == "已取消")
						<div class="order_follow_step2_off order_follow_common" style="display: block;">
							<div class="order_follow_circle"></div>
							<p class="order_follow_words follow_step2_words">
								您已取消订单
							</p>
							<p class="follow_step_times follow_step2_times">
								{{$value['canceled_at']}}
							</p>
						</div>
					@endif
				<!--第二步支付成功-->
				@if(($value['order_state'] == "已支付") || ($value['order_state'] == "待发货"))
					<div class="order_follow_step1 order_follow_common">
						<div class="order_follow_circle"></div>
						<p class="order_follow_words follow_step1_words">
							订单提交成功，等待支付
						</p>
						<p class="follow_step_times follow_step1_times">
							{{$value['created_at']}}
						</p>
					</div>
				<div class="order_follow_step2 order_follow_common">
					<div class="order_follow_circle"></div>
					<p class="order_follow_words follow_step2_words">
						您已支付成功，请等待酒庄确认
					</p>
					<p class="follow_step_times follow_step2_times">
						{{$value['payed_at']}}
					</p>
				</div>
					<div class="order_follow_step3 order_follow_common">
						<div class="order_follow_circle"></div>
						<p class="order_follow_words follow_step3_words">
							订单已确认，已通知物流尽快安排发货
						</p>
						<p class="follow_step_times follow_step3_times">
							{{$value['checked_at']}}
						</p>
					</div>
				@endif


			<!--第三步商品已发货-->
				@if($value['order_state'] == "已发货")
					<div class="order_follow_step1 order_follow_common">
						<div class="order_follow_circle"></div>
						<p class="order_follow_words follow_step1_words">
							订单提交成功，等待支付
						</p>
						<p class="follow_step_times follow_step1_times">
							{{$value['created_at']}}
						</p>
					</div>
					<div class="order_follow_step2 order_follow_common">
						<div class="order_follow_circle"></div>
						<p class="order_follow_words follow_step2_words">
							您已支付成功，请等待酒庄确认
						</p>
						<p class="follow_step_times follow_step2_times">
							{{$value['payed_at']}}
						</p>
					</div>
					<div class="order_follow_step3 order_follow_common">
						<div class="order_follow_circle"></div>
						<p class="order_follow_words follow_step3_words">
							订单已确认，已通知物流尽快安排发货
						</p>
						<p class="follow_step_times follow_step3_times">
							{{$value['checked_at']}}
						</p>
					</div>
					<div class="order_follow_step5 order_follow_common">
						<div class="order_follow_circle"></div>
						<p class="order_follow_words follow_step5_words">
							物流已发出，请等待收货
						</p>
						<p class="follow_step_times follow_step5_times">
							{{$value['send_at']}}
						</p>
					</div>

			@endif
			<!--第四步订单完成-->
				@if($value['order_state'] == "已完成")
					<div class="order_follow_step1 order_follow_common">
						<div class="order_follow_circle"></div>
						<p class="order_follow_words follow_step1_words">
							订单提交成功，等待支付
						</p>
						<p class="follow_step_times follow_step1_times">
							{{$value['created_at']}}
						</p>
					</div>
					<div class="order_follow_step2 order_follow_common">
						<div class="order_follow_circle"></div>
						<p class="order_follow_words follow_step2_words">
							您已支付成功，请等待酒庄确认
						</p>
						<p class="follow_step_times follow_step2_times">
							{{$value['payed_at']}}
						</p>
					</div>

					<div class="order_follow_step3 order_follow_common">
						<div class="order_follow_circle"></div>
						<p class="order_follow_words follow_step3_words">
							订单已确认，已通知物流尽快安排发货
						</p>
						<p class="follow_step_times follow_step3_times">
							{{$value['checked_at']}}
						</p>
					</div>
					<div class="order_follow_step4 order_follow_common">
						<div class="order_follow_circle"></div>
						<p class="order_follow_words follow_step4_words">
							商品已出库，将尽快安排国内物流
						</p>
						<p class="follow_step_times follow_step4_times">
							{{$value['output_at']}}
						</p>
					</div>

					<div class="order_follow_step5 order_follow_common">
						<div class="order_follow_circle"></div>
						<p class="order_follow_words follow_step5_words">
							物流已发出，请等待收货
						</p>
						<p class="follow_step_times follow_step5_times">
							{{$value['send_at']}}
						</p>
					</div>
					<div class="order_follow_step7 order_follow_common">
						<div class="order_follow_circle"></div>
						<p class="order_follow_words follow_step7_words">
							订单已完成
						</p>
						<p class="follow_step_times follow_step5_times">
							{{$value['finished_at']}}
						</p>
					</div>
			@endif
			<!--订单over-->
			</div>
			<!--跟踪订单的内容区域结束-->
		</div>
		<li>
		　　　　@php $flag = false; @endphp
			@foreach($value['goods'] as $c=>$d)
			<ul class="order_lists_left">
				<li>
					<div class="order_lists_left_product clearfix">
						<div class="order_lists_left_img">
							<a target="_blank" href="{{ action('GoodsController@show', [ 'uuid' => $d['goods_uuid'] ]) }}">
								<img src="@image([$d['goods_image'], 132, 188])">
								@if (isset($d['goods_invalid']) && $d['goods_invalid'])
								@php $flag = true; @endphp
								<img class="unused" src="/images/shopping_car/unused.png">
								@endif
							</a>
						</div>
						<div class="order_lists_left_text">
							<a target="_blank" href="{{ action('GoodsController@show', [ 'uuid' => $d['goods_uuid'] ]) }}">
								<p class="wine_name">{{$d['goods_chinese_name']}}</p>
							<p>
								{{$d['stocking_pricing_ratio']}}支装
							</p>
							</a>
						</div>
					</div>
					<div class="order_lists_left_type">
						{{ $d['sub_label'] }}
					</div>
					<div class="order_lists_left_type">
                @currency($d['goods_price'])
					</div>
					<div class="order_lists_left_type type_area">
						<p class="margin-top">
							{{$d['goods_num']}}
						</p>
						<p class="area">
						</p>
					</div>
					<div class="order_lists_left_type order_lists_last">
						@currency($d['price_sum'])
				    </div>
				</li>
			</ul>
			@endforeach
			<ul class="clearfix" id="order_lists_right">
			     <div class="order_lists_right_state type_area">
			         <div class="vertical_align">
			             <p>
			                 {{$value['order_state']}}
			             </p>
			             <a class="track">
			                 订单跟踪
			                 <img src="/img/dialogue.png">
			             </a>
			         </div>
			     </div>
			     <div class="order_lists_right_state ">
			         <div class="vertical_align">
			             <a class="color_blue"
			                href="{{action('OrdersController@orderDetail',['orders_uuid'=>$value['uuid']])}}">
			                 查看订单
			             </a>
			             @if($value['order_state']==='已支付'||$value['order_state']==='待发货'
			             ||$value['order_state']==='已发货'||$value['order_state']==='已完成')
			             <a class="loaddown" href="{{ action('OrdersController@download', [ 'uuid' => $value['uuid'] ]) }}">
			                 文件下载
			             </a>
			             @endif
			             @if($value['order_state']==='待支付')
			                @if (!$flag)
			                <a class="color_blue" href="{{action('PayController@pays',['uuid'=>$value['uuid'],'from'=>'order_pay'])}}">立即支付</a>
			                @endif
			                <a class="color_blue order_cancel" href="{{action('OrdersController@orderCancel',['order_uuid'=>$value['uuid']])}}">取消订单</a>
			             @elseif($value['order_state']==='已发货')
			                <a class="color_blue" href="{{action('OrdersController@orderConfirm',['order_uuid'=>$value['uuid']])}}">确认收货</a>
			             @endif
			         </div>
			     </div>
			</ul>
		</li>
	</ul>
	@endforeach
@endif
</div>
</div>
{{$orders->links()}}
@stop
@section('JS')
@parent
<script type="text/javascript" src="/js/personal_center_lists.js"></script>
<script type="text/javascript" src="/js/laydate.js"></script>
<script type="text/javascript" src="/js/personal_date.js"></script>
@stop
