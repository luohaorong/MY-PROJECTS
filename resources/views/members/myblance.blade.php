@extends('layouts_member')
@section('CSS')
@parent
<link rel="stylesheet" type="text/css" href="/css/account_balance.css"/>
@stop
@section('right')
<!--账户余额-->
<div class=" content_common">
	<div class="box_h">
		账户余额
	</div>

	<div class="vip_level2">
		<div class="vip_leveleft">
			<div class="vip_letop">
				<p>
					账户余额:<span class="account_balance"> @currency($members['balance'])</span>
				</p>
			</div>
			<a href="{{action('MembersController@recharge',['from'=>'rechargesRecord'])}}" class="vip_lebottom">
				充值
			</a>
		</div>
		<div class="vip_levelright">
			<div class="vip_rigtop">
				安全等级：<span class="vip_safe">初级</span>
			</div>
			<ul class="vip_rigbottom">
				<li class="rigbottom1">
					已认证
				</li>
				<li class="rigbottom2">
					已安装
				</li>
				<li class="rigbottom3">
					已绑定
				</li>
			</ul>
		</div>
	</div>

	<ul class="vip_records">
		<a href="{{action('MembersController@consumeRecord',['from'=>'consumeRecord'])}}">
			<li class="recent_record" data_status='最近消费记录'>
				<div class="rencent_img">
					<img src="/img/vip_history1.png"/>
				</div>
				<p>
					最近消费记录
				</p>
			</li>
		</a>
		<a href="{{action('RechargesController@rechargesRecord',['from'=>'rechargesRecord'])}}">
			<li class="recharge_record" data_status='充值记录'>
				<div class="recharge_img">
					<img src="/img/vip_recharge1.png"/>
				</div>
				<p>
					充值记录
				</p>
			</li>
		</a>
	</ul>

	<div class="vip_time">
		<div class="vip_timleft">
			<p>
				起止时间：
			</p>
			<div id="personal_test1" name='blance_start'  class="inline laydate-icon vip_timebox" ></div>
			<div id="personal_test2" name='blance_end' class="inline laydate-icon vip_timebox" ></div>
			<div class="vip_filter1">
				筛选
			</div>
		</div>
		<ul class="vip_timright">
			<li>
				<a class="vip_timright_a" href="{{action('MembersController@myblance',['begin_time' => \Carbon\Carbon::now()->toDateString(), 'end_time' => \Carbon\Carbon::now()->toDateString() ])}}">
					当天
				</a>
			</li>
			<li>
				<a class="vip_timright_a" href="{{action('MembersController@myblance',['begin_time' => \Carbon\Carbon::now()->subDays(6)->toDateString(), 'end_time' => \Carbon\Carbon::now()->toDateString() ])}}">
					最近七天
				</a>
			</li>
			<li>
				<a class="vip_timright_a" href="{{action('MembersController@myblance',['begin_time' => \Carbon\Carbon::now()->subMonths(1)->toDateString(), 'end_time' => \Carbon\Carbon::now()->toDateString() ])}}">
					最近一个月
				</a>
			</li>
			<li>
				<a class="vip_timright_a" href="{{action('MembersController@myblance',['begin_time' => \Carbon\Carbon::now()->subMonths(3)->toDateString(), 'end_time' => \Carbon\Carbon::now()->toDateString() ])}}">
					最近三个月
				</a>
			</li>
			<li>
				<a class="vip_timright_a" href="{{action('MembersController@myblance')}}">
					所有
				</a>
			</li>
		</ul>
	</div>

	<ul class="vip_headbar">
		<li class="headbar1">
			交易时间
		</li>
		<li class="headbar2">
			详情
		</li>
		<li class="headbar3">
			交易金额
		</li>
		<li class="headbar4">
			资金平台
		</li>
		<li class="headbar5">
			备注
		</li>
	</ul>

	<div class="account_balance_container">
		<!--无交易生成显示-->
		@if(count($recharge)==0)
		<div class="no_deal">
			尊敬的荟酒网客户：您还没有充值记录！
		</div>
		@endif
		<!--有交易生成显示-->
		@foreach($recharge as $k=>$value)
		<div class="vip_orderlist">
			<div class="vip_deal_time">
				{{$value->created_at}}
			</div>
			<div class="vip_deal_detail">
				<div class="deal_detail">
					{{json_decode($value->note,true)['msg']}}
				</div>
				<div class="deal_number">
					{{json_decode($value->note,true)['order_sn'] ?? ''}}
				</div>
			</div>
			<div class="vip_deal_money">
				@currency($value['amount'])
			</div>
			<div class="vip_deal_platform"></div>
			<div class="vip_deal_remark"></div>
		</div>
		@endforeach

	</div>

</div>
{{$recharge->links()}}
<!--账户余额结束-->
@stop
@section('JS')
@parent
<script type="text/javascript" src="/js/account_balance.js" ></script>
<script type="text/javascript" src="/js/laydate.js" ></script>
<script type="text/javascript" src="/js/personal_date.js"></script>
@stop