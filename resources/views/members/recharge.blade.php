@extends('layouts_member')
@section('CSS')
@parent
<link rel="stylesheet" href="/css/personal_recharge.css" />
@stop

@section('right')
<div class="pay_layer">
	<div class="pay_box">
		<div class="pay_box_top">
			<p class="pay_cancel">关闭</p>
			<p class="pay_words">请使用微信手机端扫描下方二维码：</p>
			
		</div>
		<div class="pay_box_bottom">
			<img class="pay_first" src=""/>
			<img class="pay_success" src="/img/pay_recharge_success.png" />
			
		</div>
		
	</div>
</div>
<div class="content_common">
	<div class="box_h">
		充值
	</div>
	<div id="box_red">
		我们提供多种不同的付款方式，您可以在线充值或者银行转账/电汇!
	</div>
	<div class="please_tation">
		请注意:
	</div>
	<ul class="pay_attention">
		<li>
			1、为保障资金安全，充值金额在5000元以上的，建议采用银行汇款。
		</li>
		<li>
			2、由于银行支付限额不同，请选择在线充值前确认您银行卡允许的额度。
		</li>
		<li>
			3、荟酒网不允许从事无真实交易背景的虚假交易、信用卡套现或洗钱等禁止的交易行为，否则充值款项将不能提现。
		</li>
	</ul>
	<label><span class="recharge_word">*充值金额:</span>
	<input class="recharge_money" autocomplete="off" onkeyup="value=value.replace(/[^\d+(\.\d+)?$]/g,'')" type="text"/>
	</label>
	<div class="chose_pay">
		选择支付平台:<span class="alipay alipay1">支付宝</span>
	</div>
	<div class="alipay_way">

		<div class="pay_line1">
			<div class="zhifubao bank_big bank_big_add" data-method = "alipay" data_name='支付宝'>
				<div class="checkbox_common chose_alipay checkbox_change"></div>
			</div>
			<div class="wechat bank_big" data_name='微信' data-method = "weixin">
				<div class="checkbox_common chose_wechat"></div>
			</div>
		</div>

		<div class="pay_line1">
			<div class="bank_card gongshang bank_big" data_name='工商银行' data-method = "bank">
				<div class="checkbox_common chose_gongshang"></div>
			</div>
			<div class="bank_card nongye bank_big" data_name='农业银行' data-method = "ABC">
				<div class="checkbox_common chose_nongye"></div>
			</div>
			<div class="bank_card zhongguo bank_big" data_name='中国银行' data-method = "bank">
				<div class="checkbox_common chose_zhongguo"></div>
			</div>
			<div class="bank_card jianshe bank_big" data_name='建设银行' data-method = "bank">
				<div class="checkbox_common chose_jianshe"></div>
			</div>
		</div>

		<div class="pay_line1">
			<div class="bank_card jiaotong bank_big" data_name='交通银行' data-method = "bank">
				<div class="checkbox_common chose_jiaotong"></div>
			</div>
			<div class="bank_card zhaoshang bank_big" data_name='招商银行' data-method = "bank">
				<div class="checkbox_common chose_zhaoshang"></div>
			</div>
			<div class="bank_card zhongxin bank_big" data_name='中信银行' data-method = "bank">
				<div class="checkbox_common chose_zhongxin"></div>
			</div>
		</div>

	</div>
	<input class="sure" type="button" value="确   定" />
	<!-- <div class="chose_pay">
		其他支付方式:<span class="alipay">汇款</span>
	</div> -->
	<!--<div class="success_pay">
		成功汇款后，请发送凭证给荟酒网在线客服或业务人员，我们核对款项后会尽快充值到您的荟酒网账户。
	</div>-->
	<img class="bk_cards" src="/img/remit_money.png" />
</div>
<!--充值结束-->
<img class="wait_gif" src="/images/loading.gif" />
@stop

@section('JS')

@parent
<script>
window.global.sendPay = "{{action('PayController@sendPay')}}";
window.global.recharges = "{{action('RechargesController@recharges')}}";
window.global.isPayed = "{{action('PayController@isPayed')}}";
window.global.mybalance = "{{action('MembersController@myblance')}}";
</script>
<script type="text/javascript" src="/js/my_recharge.js" ></script>
@stop