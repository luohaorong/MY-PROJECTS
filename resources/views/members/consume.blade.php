@extends('layouts_member')
@section('CSS')
@parent
<link rel="stylesheet" type="text/css" href="/css/purchase_history.css" />
@stop
@section('right')
<div class="box_h">消费/充值记录</div>
<div class="history_records">
	<a href="{{action('MembersController@consumeRecord',['from'=>'consumeRecord'])}}"><div class="history_consume @if($from=='consumeRecord') add_history @endif  history_common" data_hrf="from=consumeRecord" >消费记录</div></a>
	<a href="{{action('RechargesController@rechargesRecord',['from'=>'rechargesRecord'])}}"><div class="history_recharge @if($from=='rechargesRecord') add_history @endif history_common" data_hrf="from=rechargesRecord">充值记录</div></a>

</div>
<!--时间筛选-->
<div class="vip_time">
	<div class="vip_timleft">
		<p>起止时间：</p>
		<div id="personal_test1" name='consu_start' class="inline laydate-icon vip_timebox" ></div>
		<div id="personal_test2" name='consu_end' class="inline laydate-icon vip_timebox" ></div>
		<div class="vip_filter">筛选</div>
	</div>
	<ul class="vip_timright">
		<li>
			<a class="vip_timright_a" href="{{action('MembersController@consumeRecord',['begin_time' => \Carbon\Carbon::now()->toDateString(), 'end_time' => \Carbon\Carbon::now()->toDateString() ])}}">当天</a>
		</li>
		<li>
			<a class="vip_timright_a" href="{{action('MembersController@consumeRecord',['begin_time' => \Carbon\Carbon::now()->subDays(6)->toDateString(), 'end_time' => \Carbon\Carbon::now()->toDateString() ])}}">最近七天</a>
		</li>
		<li>
			<a class="vip_timright_a" href="{{action('MembersController@consumeRecord',['begin_time' => \Carbon\Carbon::now()->subMonths(1)->toDateString(), 'end_time' => \Carbon\Carbon::now()->toDateString() ])}}">最近一个月</a>
		</li>
		<li>
			<a class="vip_timright_a" href="{{action('MembersController@consumeRecord',['begin_time' => \Carbon\Carbon::now()->subMonths(3)->toDateString(), 'end_time' => \Carbon\Carbon::now()->toDateString() ])}}">最近三个月</a>
		</li>
		<li>
			<a class="vip_timright_a" href="{{action('MembersController@consumeRecord')}}">所有</a>
		</li>
	</ul>
</div>
		<!--标题栏-->
		<ul class="purchase_history_headbar">
			<li class="purchase_history_ordernum">订单号</li>
			<li class="purchase_history_ordertime">时间</li>
			<li class="purchase_history_ordermoney">支付金额</li>
			<li class="purchase_history_orderway">支付方式</li>
			<li class="purchase_history_orderemark">备注</li>
		</ul>

		<!--标题栏结束-->
		<!--消费或充值记录-->
		<div class="purchase_history_container">
			@if(count($pays) === 0)
            <!--无订单生成显示-->
            <div class="no_order">
                 尊敬的荟酒网客户：您还没有消费记录！
            </div>
            @endif
			@foreach($pays as $k=>$v)
			<ul class="purchase_record_list">
				<li class="purchase_number">{{$v['order_no']}}</li>
				<li class="purchase_time">{{$v['created_at']}}</li>
				<li class="purchase_money">@currency($v['money'])</li>
				<li class="purchase_payway">
				@if ($v['pay_way'] === 'alipay')
				支付宝
				@elseif ($v['pay_way'] === 'weixin')
				微信
				@elseif ($v['pay_way'] === 'balance')
				余额
				@elseif ($v['pay_way'] === 'ABC')
				农行
				@else
				银联
				@endif
				</li>
				<li class="purchase_r"></li>
			</ul>
			@endforeach
		</div>
		<!--消费或充值记录结束-->
		<!--分页开始-->
		{{$pays->links()}}
		<!--分页结束-->
		<!--账户余额结束-->
	@stop
@section('JS')
@parent
	<script type="text/javascript" src="/js/purchase_history.js" ></script>
	<script type="text/javascript" src="/js/laydate.js" ></script>
    <script type="text/javascript" src="/js/personal_date.js"></script>
@stop