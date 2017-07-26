@extends('layouts_member')
@section('CSS')
@parent
<link rel="stylesheet" type="text/css" href="/css/personal_center_lists.css"/>
@stop

@section('right')
	
		<div class="content_common">
			<div class="box_h">订单详情
				<a class="box_h_sub" href="{{action('OrdersController@orderlist')}}">【返回我的订单】</a>
			</div>
			<div class="order_detail_nav">
				<p class="order_detail_nav_sub">
					<span class="order_detail_subtitle">订单编号：<span class="order_detail_subtitle_left">{{$order['order_sn']}}</span></span>
					<span class="order_lists_subtitle padding_left">下单时间：</span> <span class="order_lists_time">{{$order['created_at']}} </span>
				</p>
				<p class="order_detail_nav_btn">
								<span class="order_detail_subtitle font_wight">收货地址：
                            <span class="order_detail_subtitle_left ">
                            <span class="order_detail_subtitle_margin">{{json_decode($order['address'],true)['real_name']}}</span> <span class="order_detail_subtitle_margin">{{json_decode($order['address'],true)['mobile']}}</span>{{json_decode($order['address'],true)['address']}}
								</span>
								</span>
				</p>
			</div>
			<h2 class="order_detail_title">商品详情</h2>
			@if (is_null($invoice) && $order['order_state'] === '已完成')
			<img class="application" src="/img/application.png"/>
			@elseif (!is_null($invoice) && $invoice->verify_pass === 'ing')
			<p class="application_words">发票审核中</p>
			@elseif (!is_null($invoice) && $invoice->verify_pass === 'no')
			<a class="application_deny" href="javascript:;">未通过审核</a>
			@elseif (!is_null($invoice) && $invoice->verify_pass === 'yes')
			<p class="application_yes">发票审核通过</p>
			@endif
			<ul class="order_lists1 clearfix order_lists_marTop">
				<h2 class="order_lists_title">
					<span class="nav_tetle_sub_span span_large">商品</span>
					<span class="nav_tetle_sub_span">类型</span>
					<span class="nav_tetle_sub_span">单价</span>
					<span class="nav_tetle_sub_span">数量（箱）</span>
					<span class="nav_tetle_sub_span">商品总金额</span>
					<span class="nav_tetle_sub_span span_state span_special">状态</span>
				</h2>
				<div class="order_follow order_follow_special" style="display: none;">
					<img class="order_follow_off" src="/img/no-pass.png">
					<!--跟踪订单的内容区域-->
					<div class="order_follow_container">
						<div class="order_follow_step0"></div>
						<!--第一步提交订单或者取消订单-->
						@if($order['order_state'] == "待支付"|$order['order_state'] == "已取消")
							<div class="order_follow_step1 order_follow_common">
								<div class="order_follow_circle"></div>
								<p class="order_follow_words follow_step1_words">
									订单提交成功，等待支付
								</p>
								<p class="follow_step_times follow_step1_times">
									{{$order['created_at']}}
								</p>
								
							</div>
						@endif
						@if($order['order_state'] == "已取消")
									<div class="order_follow_step2_off order_follow_common" style="display: block;">
										<div class="order_follow_circle"></div>
										<p class="order_follow_words follow_step2_words">
											您已取消订单
										</p>
										<p class="follow_step_times follow_step2_times">
											{{$order['canceled_at']}}
										</p>
									</div>
								@endif
					<!--第二步支付成功-->
						@if(($order['order_state'] == "已支付") || ($order['order_state'] == "待发货"))
							<div class="order_follow_step1 order_follow_common">
								<div class="order_follow_circle"></div>
								<p class="order_follow_words follow_step1_words">
									订单提交成功，等待支付
								</p>
								<p class="follow_step_times follow_step1_times">
									{{$order['created_at']}}
								</p>
							</div>
							<div class="order_follow_step2 order_follow_common">
								<div class="order_follow_circle"></div>
								<p class="order_follow_words follow_step2_words">
									您已支付成功，请等待酒庄确认
								</p>
								<p class="follow_step_times follow_step2_times">
									{{$order['payed_at']}}
								</p>
							</div>
							<div class="order_follow_step3 order_follow_common">
								<div class="order_follow_circle"></div>
								<p class="order_follow_words follow_step3_words">
									订单已确认，已通知物流尽快安排发货
								</p>
								<p class="follow_step_times follow_step3_times">
									{{$order['checked_at']}}
								</p>
							</div>
						@endif


					<!--第三步商品已发货-->
						@if($order['order_state'] == "已发货")
							<div class="order_follow_step1 order_follow_common">
								<div class="order_follow_circle"></div>
								<p class="order_follow_words follow_step1_words">
									订单提交成功，等待支付
								</p>
								<p class="follow_step_times follow_step1_times">
									{{$order['created_at']}}
								</p>
							</div>
							<div class="order_follow_step2 order_follow_common">
								<div class="order_follow_circle"></div>
								<p class="order_follow_words follow_step2_words">
									您已支付成功，请等待酒庄确认
								</p>
								<p class="follow_step_times follow_step2_times">
									{{$order['payed_at']}}
								</p>
							</div>
							<div class="order_follow_step3 order_follow_common">
								<div class="order_follow_circle"></div>
								<p class="order_follow_words follow_step3_words">
									订单已确认，已通知物流尽快安排发货
								</p>
								<p class="follow_step_times follow_step3_times">
									{{$order['checked_at']}}
								</p>
							</div>
							<div class="order_follow_step5 order_follow_common">
								<div class="order_follow_circle"></div>
								<p class="order_follow_words follow_step5_words">
									物流已发出，请等待收货
								</p>
								<p class="follow_step_times follow_step5_times">
									{{$order['send_at']}}
								</p>
							</div>

						@endif
					<!--第四步订单完成-->
						@if($order['order_state'] == "已完成")
							<div class="order_follow_step1 order_follow_common">
								<div class="order_follow_circle"></div>
								<p class="order_follow_words follow_step1_words">
									订单提交成功，等待支付
								</p>
								<p class="follow_step_times follow_step1_times">
									{{$order['created_at']}}
								</p>
							</div>
							<div class="order_follow_step2 order_follow_common">
								<div class="order_follow_circle"></div>
								<p class="order_follow_words follow_step2_words">
									您已支付成功，请等待酒庄确认
								</p>
								<p class="follow_step_times follow_step2_times">
									{{$order['payed_at']}}
								</p>
							</div>

							<div class="order_follow_step3 order_follow_common">
								<div class="order_follow_circle"></div>
								<p class="order_follow_words follow_step3_words">
									订单已确认，已通知物流尽快安排发货
								</p>
								<p class="follow_step_times follow_step3_times">
									{{$order['checked_at']}}
								</p>
							</div>
							<div class="order_follow_step4 order_follow_common">
								<div class="order_follow_circle"></div>
								<p class="order_follow_words follow_step4_words">
									商品已出库，将尽快安排国内物流
								</p>
								<p class="follow_step_times follow_step4_times">
									{{$order['output_at']}}
								</p>
							</div>

							<div class="order_follow_step5 order_follow_common">
								<div class="order_follow_circle"></div>
								<p class="order_follow_words follow_step5_words">
									物流已发出，请等待收货
								</p>
								<p class="follow_step_times follow_step5_times">
									{{$order['send_at']}}
								</p>
							</div>
							<div class="order_follow_step7 order_follow_common">
								<div class="order_follow_circle"></div>
								<p class="order_follow_words follow_step7_words">
									订单已完成
								</p>
								<p class="follow_step_times follow_step5_times">
									{{$order['finished_at']}}
								</p>
							</div>
					@endif
					<!--订单over-->
					</div>
					<!--跟踪订单的内容区域结束-->
				</div>
				<li>
					<ul class="order_lists_left">
						@foreach($orders_goods as $k=>$value )
						<li>
							<div class="order_lists_left_product clearfix">
								<a target="_blank" href="{{ action('GoodsController@show', [ 'uuid' => $value['goods_uuid'] ]) }}">
								<div class="order_lists_left_img">
									<img src="@image([$value['goods_image'], 132, 188])">
									@if (isset($value['goods_invalid']) && $value['goods_invalid'])
									<img class="unused" src="/images/shopping_car/unused.png">
									@endif
								</div>
								<div class="order_lists_left_text">
									<p class="wine_name">{{$value['goods_chinese_name']}}</p>
									<p>{{$value['stocking_pricing_ratio']}}支装</p>
								</div>
								</a>
							</div>
							<div class="order_lists_left_type">
								{{$value['sub_label']}}
							</div>
							<div class="order_lists_left_type">
                @currency($value['goods_price'])
							</div>
							<div class="order_lists_left_type type_area">
								<p class="margin-top">{{$value['goods_num']}}</p>
								<p class="area"></p>
							</div>
							<div class="order_lists_left_type order_lists_last">
                @currency($value['price_sum'])
							</div>
						</li>
						@endforeach
					</ul>
					<ul class="order_lists_right clearfix">
						<div class="order_lists_right_state type_area">
							<div class="vertical_align vertical_align_special">
								<p>{{$order['order_state']}}</p>
								{{--<a class="track">订单跟踪<img src="/img/dialogue.png"></a>--}}
							</div>
						</div>
						
					</ul>
				</li>

			</ul>
			<div class="order_detail_footer">
				<div class="order_detail_footer_right">
					<div class="order_detail_words_left">
						<p class="order_detail_footer_p">数量：</p>
						<p class="order_detail_footer_p">商品金额：</p>
						<p class="order_detail_footer_p">上门送货费：</p>
						<p class="order_detail_footer_p">运费：</p>
						<p class="order_detail_footer_p">金币：</p>
						<p class="order_detail_footer_p">订单金额：</p>
					</div>
					<div class="order_detail_words_right">
						<p class="order_detail_footer_p"><span class="order_detail_footer_span">{{$goods_amount}}箱，{{$goods_total}}瓶</span></p>
					<p class="order_detail_footer_p"><span class="order_detail_footer_span">
                @currency($price_num)</span></p>
					<p class="order_detail_footer_p"><span class="order_detail_footer_span">
							@currency($home_service)</span></p>
					<p class="order_detail_footer_p"><span class="order_detail_footer_span">
							@currency($order['shipping_fee'])</span></p>

					<p class="order_detail_footer_p"><span class="order_detail_footer_span">-{{$order['use_corns']}}</span></p>
					<p class="order_detail_footer_p"><span class="order_detail_footer_span">@currency($order_total)</span></p>
					</div>
					


				</div>
			</div>
		</div>
	
	@stop

@section('modal')
<form action="{{action('InvoiceController@apply')}}" method="post" enctype="multipart/form-data">
<div class="layer">
	<div class="layer_container">
		<form action="" method="post">
		<div class="layer_part1">
			<p>申请发票金额:
				<span class="application_money">@currency($order['payed_amount'])</span>
			</p>
			<img class="application_no" src="/img/no-pass.png"/>
			@if (!is_null($invoice))
			<input type="hidden" name="uuid" value="{{ $invoice->uuid }}">
			@endif
			<input type="hidden" name="orders_uuid" value="{{ $order['uuid'] }}">
		</div>
		<div class="layer_part2">
			<label for="company">
				<span>公司名称:</span>
				<input class="layer_name" type="text" id="company" name="company" data_please='请正确填写开票公司名称' data_click='0' value="{{ old('company') ?? ($invoice->company ?? '') }}" />
				@if ($errors->has('company'))
				<span class="layer_error">{{ $errors->first('company') }}</span>
				@endif
			</label>
			<label for="credit-code">
				<span>信用代码:</span>
				<input class="layer_code" type="text" id="credit-code" name="credit_code" data_please='请填写公司统一社会信用代码' data_click='0' value="{{ old('credit_code') ?? ($invoice->credit_code ?? '') }}" />
				@if ($errors->has('credit_code'))
				<span class="layer_error">{{ $errors->first('credit_code') }}</span>
				@endif
			</label>
			<label for="company-addr">
				<span>注册地址:</span>
				<input class="layer_dress" type="text" id="company-addr" name="company_addr" data_please='请填写公司注册地址' data_click='0' value="{{ old('company_addr') ?? ($invoice->company_addr ?? '') }}" />
				@if ($errors->has('company_addr'))
				<span class="layer_error">{{ $errors->first('company_addr') }}</span>
				@endif
			</label>
			<label for="bank-name">
				<span>开户银行:</span>
				<input class="layer_bank" type="text" id="bank-name" name="bank_name" data_please='请填写公司对公户行' data_click='0' value="{{ old('bank_name') ?? ($invoice->bank_name ?? '') }}" />
				@if ($errors->has('bank_name'))
				<span class="layer_error">{{ $errors->first('bank_name') }}</span>
				@endif
			</label>
			<label class="last_labe" for="bank-account">
				<span>银行账号:</span>
				<input class="layer_bank_account" type="text" id="bank-account" name="bank_account" data_please='请填写公司对公银行账号' data_click='0' value="{{ old('bank_account') ?? ($invoice->bank_account ?? '') }}" />
				@if ($errors->has('bank_account'))
				<span class="layer_error">{{ $errors->first('bank_account') }}</span>
				@endif
			</label>
		</div>
		<div class="layer_part3">
			<input type="file" name="license_img" class="input_file1" id='input_file1'/>
			<input type="file" name="tax_img" class="input_file2 " id='input_file2'/>
			<img src="/img/upload_idcard.png" class="idcard"/>
			<img src="/img/upload_p.png" class="upload_p"/>
		</div>
		<p class="tip_company"></p>
		<div class="imgWapper">
			<div class="img_id" id="img_id"></div>
			<div class="img_p" id="img_p"></div>
			<span class="layer_error"></span>
		</div>
		<div class="layer_part2">
			<label for="recipient-person">
				<span>收件人姓名:</span>
				<input class="layer_person_name" type="text" id="recipient-person" name="recipient_person" data_please='请填写收件人姓名' data_click='0' value="{{ old('recipient_person') ?? ($invoice->recipient_person ?? '') }}" />
				@if ($errors->has('recipient_person'))
				<span class="layer_error">{{ $errors->first('recipient_person') }}</span>
				@endif
			</label>
			<label for="recipient-addr">
				<span>收件人地址:</span>
				<input class="layer_person_adress" type="text" id="recipient-addr" name="recipient_addr" data_please='请填写收件人地址' data_click='0' value="{{ old('recipient_addr') ?? ($invoice->recipient_addr ?? '') }}" />
				@if ($errors->has('recipient_addr'))
				<span class="layer_error">{{ $errors->first('recipient_addr') }}</span>
				@endif
			</label>
			<label class="last_labe" for="recipient-phone">
				<span>收件人电话:</span>
				<input class="layer_person_number" type="text" id="recipient-phone" name="recipient_phone" data_please='请填写收件人电话' data_click='0' value="{{ old('recipient_phone') ?? ($invoice->recipient_phone ?? '') }}" />
				@if ($errors->has('recipient_phone'))
				<span class="layer_error">{{ $errors->first('recipient_phone') }}</span>
				@endif
			</label>
		</div>
		<div class="layer_part4">
			<input type="button" class="submit" value="提交申请" >
			<div class="cancel_li">取消</div>
		</div>
		</form>
	</div>
</div>
</form>
@endsection
	
@section('JS')
@parent
<script type="text/javascript" src="/js/personal_center_lists.js"></script>
<script type="text/javascript" src="/js/laydate.js"></script>
<!--<script type="text/javascript" src="/js/personal_date.js"></script>-->
<!--<script type="text/javascript" src="/js/personal_center.js"></script>-->

@stop
