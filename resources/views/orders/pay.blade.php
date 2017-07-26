@extends('top') @section('CSS') @parent
<link rel="stylesheet" type="text/css" href="/css/common.css" />
<link rel="stylesheet" type="text/css" href="/css/shopping_car3.css" /> @stop @section('content')
<!--购物车确认付款开始-->
<input class="order_uuid" type="hidden" name="order_uuid" value="{{$uuid}}">
<!--微信支付二维码-->
<div class="pay_layer" style="display: none;">
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
<div id="shopping_container">
	<div class="step_container">
		<img class="step_img" src="/images/register/nav3.png" />
		<div class="left_side"></div>
		<div class="right_side"></div>
	</div>
	<div class="register_mian">
		<ul class="step_nodes">
			<li class="last3">购物车</li>
			<li>核对订单</li>
			<li>确认付款</li>
		</ul>
	</div>
	<div class="payment_main">
		<div class="payment_head">
			<div class="pay_money">
				<p class="pay_wap">
					<span class="pay_text">
							支付金额：
							</span>
					<span class="pay_num">
                <span class="pay_number">@currency($order_amount)</span>
					</span>
				</p>

			</div>
			<p class="pay_explain">请您尽快完成支付以免库存不足。待支付订单将在24小时后自动取消。</p>
		</div>
		<div class="payment_body">
			<div class="body_title">
				<p class="title_text">支付方式：</p>
			</div>
			<ul class="pay_list">
				<li class="mode_list">
					<div class="list_title firs_list account_list" data_active="1">
						账户余额
					</div>
					<div class="list_content sub_content">
						<div class="available">
							<p class="available_text">
								可用余额：
								<span class="available_num">
                <span class="balance_num">@currency($balance)</span>
								</span>
							</p>
							<a target="_blank" href="{{action('MembersController@recharge')}}" class="recharge">前往充值</a>
						</div>
					</div>
				</li>
				<li class="mode_list">
					<div class="list_title other_list">
						网上银行
					</div>
					<div class="e_bank sub_content" style="display: none;">
						<ul class="e_bank_list back_list">
							<li data-method="bank">
								<span class="chk"></span>
								<span class="selected"></span>
								<img class="eback_img" src="/images/shopping_car/acbc.png" />
							</li>
							<li data-method="ABC">
								<span class="chk"></span>
								<span class="selected"></span>
								<img class="eback_img" src="/images/shopping_car/aboc.png" />
							</li>
							<li data-method="bank">
								<span class="chk"></span>
								<span class="selected"></span>
								<img class="eback_img" src="/images/shopping_car/boc(2).png" />
							</li>
							<li data-method="bank">
								<span class="chk"></span>
								<span class="selected"></span>
								<img class="eback_img" src="/images/shopping_car/boc.png" />
							</li>
							<li data-method="bank">
								<span class="chk"></span>
								<span class="selected"></span>
								<img class="eback_img" src="/images/shopping_car/ccb (2).png" />
							</li>
							<li data-method="bank">
								<span class="chk"></span>
								<span class="selected"></span>
								<img class="eback_img" src="/images/shopping_car/ccb.png" />
							</li>
							<li data-method="bank">
								<span class="chk"></span>
								<span class="selected"></span>
								<img class="eback_img" src="/images/shopping_car/cmb.png" />
							</li>
						</ul>
					</div>
				</li>
				<li class="mode_list">
					<div class="list_title other_list">
						第三方支付
					</div>
					<div class="third_pay sub_content" style="display: none;">
						<ul class="third_pay_list back_list">
							<li data-method="alipay">
								<span class="chk"></span>
								<span class="selected"></span>
								<img class="eback_img" src="/images/shopping_car/pay.png" />
							</li>
							<li data-method="weixin">
								<span class="chk"></span>
								<span class="selected"></span>
								<img class="eback_img" src="/images/shopping_car/weichart.png" />
							</li>
						</ul>
					</div>
				</li>
			</ul>
		</div>
		<div class="payment_foot">
			<a class="sure_agent">立即支付</a>
		</div>
	</div>
</div>
<!--编辑弹出层开始-->
<div class="layer">
	<div class="layer_container">
		<div class="sub_wap">
			<div class="receipt_man">
				<p class="itme_wap">
					<span class="star">*</span>
					<span class="edit_text">登录密码：</span>
				</p>
				<p class="input_wap"><input type="text" name="psw" id="psw" /></p>
			</div>
		</div>
		<div class="sub_wap1">
			<div class="receipt_man">
				<p class="itme_wap">
					<span class="star">*</span>
					<span class="edit_text">验证码：</span>
				</p>
				<p class="input_wap">
					<input type="text" name="" id="txt" />
					<input class="get_ident" type="button" value="点击获取验证码"/>
					
				</p>
				<p class="tip"></p>
			</div>
			
		</div>
		
		<div class="bottom_btn">
			<div class="ensure">
				确认
			</div>
			<div class="cancel">
				取消
			</div>
		</div>
	</div>
</div>
<!--编辑弹出层结束-->
<img class="wait_gif" src="/images/loading.gif" /> @stop @section('JS') @parent
<script>
	window.global.send_secure = "{{action('IndexController@smsSecure')}}";
    window.global.sendPay = "{{action('PayController@sendPay')}}";
    window.global.passcheck = "{{action('IndexController@passCheck')}}";
    window.global.isPayed = "{{action('PayController@isPayed')}}";
    window.global.orderlist = "{{action('OrdersController@orderlist')}}";
</script>

<script src="/js/shopping_car3.js" type="text/javascript" charset="utf-8"></script>
@stop
