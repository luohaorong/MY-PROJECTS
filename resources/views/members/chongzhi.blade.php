@extends('layouts_member')
@section('CSS')
@parent
<link rel="stylesheet" type="text/css" href="/css/purchase_history.css" />
@stop
@section('right')
	<div class="box_h">消费/充值记录</div>
	<div class="history_records">
		<a href="{{action('MembersController@consumeRecord',['from'=>'consumeRecord'])}}"><div class="history_consume @if($from=='consumeRecord') add_history @endif history_common" data_hrf="from=consumeRecord">消费记录</div></a>
		<a href="{{action('RechargesController@rechargesRecord',['from'=>'rechargesRecord'])}}"><div class="history_recharge  @if($from=='rechargesRecord') add_history @endif  history_common" data_hrf="from=rechargesRecord">充值记录</div></a>

	</div>
	<!--时间筛选-->
	<div class="vip_time">
		<div class="vip_timleft">
			<p>起止时间：</p>
			<div id="personal_test1" name='recharge_start' class="inline laydate-icon vip_timebox" ></div>
			<div id="personal_test2" name='recharge_end' class="inline laydate-icon vip_timebox" ></div>
			<div class="vip_filter">筛选</div>
		</div>
		<ul class="vip_timright">
			<li>
				<a class="vip_timright_a" href="{{action('RechargesController@rechargesRecord',['begin_time' => \Carbon\Carbon::now()->toDateString(), 'end_time' => \Carbon\Carbon::now()->toDateString() ])}}">当天</a>
			</li>
			<li>
				<a class="vip_timright_a" href="{{action('RechargesController@rechargesRecord',['begin_time' => \Carbon\Carbon::now()->subDays(6)->toDateString(), 'end_time' => \Carbon\Carbon::now()->toDateString() ])}}">最近七天</a>
			</li>
			<li>
				<a class="vip_timright_a" href="{{action('RechargesController@rechargesRecord',['begin_time' => \Carbon\Carbon::now()->subMonths(1)->toDateString(), 'end_time' => \Carbon\Carbon::now()->toDateString() ])}}">最近一个月</a>
			</li>
			<li>
				<a class="vip_timright_a" href="{{action('RechargesController@rechargesRecord',['begin_time' => \Carbon\Carbon::now()->subMonths(3)->toDateString(), 'end_time' => \Carbon\Carbon::now()->toDateString() ])}}">最近三个月</a>
			</li>
			<li>
				<a class="vip_timright_a" href="{{action('RechargesController@rechargesRecord')}}">所有</a>
			</li>
		</ul>
	</div>
		<!--标题栏-->
		<ul class="purchase_history_headbar">
			<li class="purchase_history_ordernum">充值时间</li>
			<li class="purchase_history_ordertime">充值单号</li>
			<li class="purchase_history_ordermoney">充值金额</li>
			<li class="purchase_history_orderway">资金平台</li>
			<li class="purchase_history_orderemark">备注</li>
		</ul>

		<!--标题栏结束-->
		<!--消费或充值记录-->
		<div class="purchase_history_container">
			@if(count($recharge) === 0)
            <!--无订单生成显示-->
            <div class="no_order">
                 尊敬的荟酒网客户：您还没有充值记录！
            </div>
            @endif
			@foreach($recharge as $k=>$v)
			<ul class="purchase_record_list">
				<li class="purchase_number">{{$v['created_at']}}</li>
				<li class="purchase_time">{{json_decode($v['note'],true)['order_sn'] ?? ''}}</li>
				<li class="purchase_money">@currency($v['amount'])</li>
				<li class="purchase_payway"></li>
				<li class="purchase_r"></li>
			</ul>
			@endforeach
		</div>
		<!--消费或充值记录结束-->
		<!--分页开始-->
		{{$recharge->links()}}
		<!--分页结束-->
<!--账户余额结束-->
	@stop
@section('JS')
@parent
	<script type="text/javascript" src="/js/purchase_history.js" ></script>
	<script type="text/javascript" src="/js/laydate.js" ></script>
    <script type="text/javascript" src="/js/personal_date.js"></script>
@stop