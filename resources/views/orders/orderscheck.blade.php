@extends('top') @section('CSS')
<!-- <link rel="stylesheet" href="/css/register1.css" /> -->
<link rel="stylesheet" href="/css/shopping_car2.css" /> @stop
<!--logo开始-->
@section('content')


    <!--核对订单主要内容-->
    <div id="shopping_container">
    	<div id="process">
        <div class="process-container">
            <img src="/images/register/nav2.png"/>
        </div>
        <div class="process-right"></div>
    </div>

        <ul class="step_nodes">
            <li>购物车</li>
            <li class="last3">核对订单</li>
            <li class="last2">确认订单</li>
        </ul>
        <div class="check_order">
            <div class="consignee">
                <div class="consignee_title">
                    <span>收货人信息</span>
                    <input type="button" class="add_ifo" value="新增收货人信息">
                </div>
                <div class="consignee_content">
                    @foreach($addresses as $k=>$value)
                    <ul class="consignee_list {{$k==0 ? 'consignee_active' : ''}}"  data-uuid="{{$value['uuid']}}" data_active='1' data_id="0001">
					<li class="position {{$k==0 ? 'font_active position_active' : ''}}">
						<span class="position_ico">
									<img src="/images/shopping_car/position.png"/>
								</span>
						<span class="position_text">
									寄送至
								</span>
					</li>
					<li class="chk_name {{$k==0 ? 'font_active ' : ''}}">
						<!--未选中-->
						<span class="chk" style="{{$k===0 ? 'display: none;' : 'display:block'}}"></span>
						<!--选中-->
						<span class="selected" style="{{$k===0 ? 'display: block;' : 'display:none'}}"></span>
						<p class="name_text"  data_text='{{$value['real_name']}}'>{{$value['real_name']}}</p>
					</li>
					<li class="tle {{$k===0 ? 'font_active' : ''}}" data_text='{{$value['mobile']}}'>{{$value['mobile']}}</li>
					<li class="adress {{$k===0 ? 'font_active' : ''}}">
						<span class="probably"  data_detail='{{$value['detail']}}'  data_province_uuid="{{$value['address_tree'][0]['uuid']}}" data_city_uuid="{{$value['address_tree'][0]['sub'][0]['uuid']}}" data_area_uuid="{{$value['areas_uuid']}}" data_text='{{$value['add']}}'>{{$value['address_tree'][0]['name']}}{{$value['address_tree'][0]['sub'][0]['name']}}{{$value['zone']}}</span>
						<span class="detailed_adress" data_text='{{$value['detail']}}'>{{$value['detail']}}</span>
						<span class="def" style="{{($k===0&($value['is_default']=='true')) ? 'display:inline':'display:none'}}">默认地址</span>
					</li>
					<li class="operation  {{$k===0 ? 'font_active' : ''}}"  style="{{$k===0 ? 'display :block' :'display :none'}}">
						<span class="default_address" style="{{($k===0&($value['is_default']=='true')) ? 'display:none':'display:inline'}}" >
									设为默认地址
								</span>
						<span class="edit_ul">
									编辑
								</span>
						<span class="delete_ul">
									删除
						</span>
					</li>
				</ul>
				@endforeach
				<!--下面这个ul是新增地址时用来克隆的模板-->
				<ul class="consignee_clone consignee_list">
					<li class="position font_active position_active">
						<span class="position_ico">
									<img src="images/shopping_car/position.png"/>
								</span>
						<span class="position_text">
									寄送至
								</span>
					</li>
					<li class="chk_name font_active">
						<span class="chk"></span>
						<span class="selected"></span>
						<p class="name_text" data_text=''></p>
					</li>
					<li class="tle font_active" data_text=''></li>
					<li class="adress font_active">
						<span class="probably" data_text=''> </span>
						<span class="detailed_adress" data_text=''></span>
					</li>
					<li class="operation font_active">
						<span class="default_address">
									设为默认地址
								</span>
						<span class="edit_ul">
									编辑
								</span>
						<span class="delete_ul">
									删除
								</span>
					</li>
				</ul>
			</div>
		</div>
		<div class="distribution_mode">
			<p class="distribution_title">配送方式</p>

			<?php $i=1?> @foreach($carts as $k=>$v) @if($k !=='jingwai')
			<div class="distribution">
				<div @if(trim($k)=='shanghai')id="shanghai"@elseif(trim($k)=='chengdu')id="tianjin"@elseif(trim($k)=='ningbo')id="ningbo" @endif class="distribution_content">
					<div class="invoice_outline">
						<span class="invoice_num">
								配货单{{$i++}}：
							</span>
						<span class="invoice_mode">
								<span class="invoice_stock">{{$v[0]['station']}}</span>发货
							</span>
						<span class="see_details">
								<a class="anchor" @if(trim($k)=='shanghai')href="#shanghai_depot"@elseif(trim($k)=='chengdu')href="#tianjin_depot"@elseif(trim($k)=='ningbo')href="#ningbo_depot"@endif>查看分库详情</a>
							</span>
					</div>

					<div class="invoice_details" data_select='1'>
						<ul class="invoice_itme">
							<li class="invoice_option">
								<span class="chk cloud_chk chk_post"></span>
								<span class="selected cloud_selected"></span>
								<p class="mode_name" data_mode='freight'>
									荟酒物流
								</p>
							</li>
							<li>
								<!--<p class="describe">
									葡萄酒、烈酒产品同仓满130箱全国免物流费（新疆、西藏除外）
								</p>-->
								<p class="sub_mode" data_select='1'>
									<span class="chk chk_1 cancel_home chk_post"></span>
									<span class="selected selected_1 go_home"></span>
									<span class="describe_mode">
											送货上门
										</span>
									<span class="careful careful_text">
											注意：只配送到本市物流站，到货后需自提
										</span>
									<span class="careful sure">
											在原有运价的基础上，加50全国送货上门（新疆、西藏除外）
										</span>
								</p>

							</li>
						</ul>
					</div>

					<!-- <div class="invoice_details">
						<ul class="invoice_itme">
							<li class="invoice_option">
								<span class="chk express chk_post" style="display: block;"></span>
								<span class="selected" style="display: none;"></span>
								<p class="mode_name" data_mode='express'>
									普通快递
								</p>
							</li>
							<li>
								<p class="describe">
									<span class="prompt">
											送货上门，破损赔付，收货时请检查完整性；
										</span>
									<span class="to_pay">运费在线支付</span>
								</p>
							</li>
						</ul>
					</div> -->
					<div class="invoice_details">
						<ul class="invoice_itme">
							<li class="invoice_option">
								<span class="chk cancel_chk chk_post" style="display: block;"></span>
								<span class="selected" style="display: none;"></span>
								<p class="mode_name" data_mode='self'>
									仓库自提
								</p>
							</li>
							<li>
								<p class="describe">
									<span class="prompt">
											成都仓可上门自提，选择前请咨询
										</span>
									<span class="to_pay">客服028-87673828</span>
								</p>
							</li>
						</ul>
					</div>
					<div class="invoice_details">
						<ul class="invoice_itme">
							<li class="invoice_option">
								<span class="chk cancel_chk chk_post" style="display: block;"></span>
								<span class="selected" style="display: none;"></span>
								<p class="mode_name" data_mode='other'>
									其他方式
								</p>
							</li>
							<li>
								<p class="describe">
									<span class="prompt">
											下单后请保持电话畅通，我们的客服人员将与您沟通发货事宜；
										</span>
									<span class="to_pay">运费到付</span>不享受破损赔付！
								</p>
							</li>
						</ul>
					</div>
					<div class="confirm">
						确认物流方式
					</div>
				</div>
			</div>
			@else
			<div class="distribution">
				<div id="jingwai" class="distribution_content">
					<div class="invoice_outline">
						<span class="invoice_num">
								配货单{{$i++}}：
							</span>
						<span class="invoice_mode">
								{{$v[0]['station']}}发货 / 快递配送
							</span>
						<span class="see_details">
								<a class="anchor" href="#jingwai_depot">查看分库详情</a>
							</span>
					</div>
					<div class="invoice_details" data_select='1'>
						<ul class="invoice_itme">
							<li class="invoice_option">
								<span class="chk cloud_chk chk_post"></span>
								<span class="selected cloud_selected"></span>
								<p class="mode_name" data_mode='freight'>
									云酒物流
								</p>
							</li>
							<li>
								<p class="describe">
									葡萄酒、烈酒产品同仓满130箱全国免物流费（新疆、西藏除外）
								</p>
								<p class="sub_mode" data_select='1'>
									<span class="chk chk_1 cancel_home chk_post"></span>
									<span class="selected selected_1 go_home"></span>
									<span class="describe_mode">
											送货上门
										</span>
									<span class="careful careful_text">
											注意：只配送到本市物流站，到货后需自提
										</span>
									<span class="careful sure">
											在原有运价的基础上，加50元全国送货上门（新疆、西藏除外）
										</span>
								</p>

							</li>
						</ul>
					</div>

					<!-- <div class="invoice_details">
						<ul class="invoice_itme">
							<li class="invoice_option">
								<span class="chk express chk_post" style="display: block;"></span>
								<span class="selected" style="display: none;"></span>
								<p class="mode_name" data_mode='express'>
									普通快递
								</p>
							</li>
							<li>
								<p class="describe">
									<span class="prompt">
											送货上门，破损赔付，收货时请检查完整性；
										</span>
									<span class="to_pay">运费在线支付</span>
								</p>
							</li>
						</ul>
					</div> -->
					<div class="invoice_details">
						<ul class="invoice_itme">
							<li class="invoice_option">
								<span class="chk cancel_chk chk_post" style="display: block;"></span>
								<span class="selected" style="display: none;"></span>
								<p class="mode_name" data_mode='self'>
									仓库自提
								</p>
							</li>
							<li>
								<p class="describe">
									<span class="prompt">
											成都仓、上海仓、广州仓可上门自提，选择前请咨询
										</span>
									<span class="to_pay">客服400-800-5959</span>
								</p>
							</li>
						</ul>
					</div>
					<div class="invoice_details">
						<ul class="invoice_itme">
							<li class="invoice_option">
								<span class="chk cancel_chk chk_post" style="display: block;"></span>
								<span class="selected" style="display: none;"></span>
								<p class="mode_name" data_mode='other'>
									其他方式
								</p>
							</li>
							<li>
								<p class="describe">
									<span class="prompt">
											下单后请保持电话畅通，我们的客服人员将与您沟通发货事宜；
										</span>
									<span class="to_pay">运费到付</span>不享受破损赔付！
								</p>
							</li>
						</ul>
					</div>
					
					<div class="confirm">
						确认物流方式
					</div>
				</div>
			</div>
			@endif @endforeach
			<div class="transport_summary transport_clone">
				<div class="transport_content">
					<span class="summary_mode">

							</span>
					<span class="summary_text depot">

							</span>
					<span class="summary_text express">

							</span>
					<span class="door">

								</span>
					<span class="summary_text pay">

							</span>
					<span class="summary_text since">

							</span>
				</div>
				<div class="edit_content">
					<span class="summary_edite color_set">
								编辑
								</span>
					<a href="" class="summary_product color_set">
						查看商品详情
					</a>
				</div>

			</div>
		</div>
		<div class="repertory">
			<p class="repertory_title">分库详情</p>
			<ul class="thead">
				<li class="firs_list">产品</li>
				<li>类型</li>
				<li>单价</li>
				<li>数量（箱）</li>
				<li>金额</li>
				<li>单瓶/只 运费</li>
			</ul>

			<?php $j=1?> @foreach($carts as $k=>$v) @if($k !=='jingwai')
			<div data-station_uuid="{{$v[0]['station_uuid']}}" data-station-alias="{{$k}}" @if(trim($k)=='shanghai')id="shanghai_depot"@elseif(trim($k)=='chengdu')id="tianjin_depot"@elseif(trim($k)=='ningbo')id="ningbo_depot" @endif class="product_detail">
				<div class="invoice_general">
					<span class="general_num">
								配货单{{$j++}}：
							</span>
					<span class="invoice_mode">
								{{$v[0]['station']}} / 物流配送
							</span>
					<span class="see_details">
								<a class='look_goods'  @if(trim($k)=='shanghai') href="#shanghai"@elseif(trim($k)=='chengdu') href="#tianjin"@elseif(trim($k)=='ningbo') href="#ningbo" @endif>查看配送方式</a>
							</span>
				</div>
				@foreach($v as $c=>$d) @if($c !=='amount')
				<ul class="details_list">
					<li class="first_details">
						<a href="{{action('GoodsController@show',['uuid'=>$d['goods_uuid']])}}">
							<img class="pro_img" src="@image([$d['image_path'], 68, 96])" />
						</a>
						<div class="product_text">
							<p>
								<a class="product_name" href="{{action('GoodsController@show',['uuid'=>$d['goods_uuid']])}}">{{$d['goods_chinese_name']}}</a>
							</p>
							<p class="product_num">{{$d['stocking_pricing_ratio']}}只装</p>
						</div>
					</li>
					<li class="ordinary_text">{{$d['sub_label']}}</li>
					<li class="ordinary_text">
                @currency($d['goods_price'])</li>
					<li>
						<div class="amount">
							<p>{{$d['goods_num']}}</p>
							<p class="total">共<span class="total_num">{{$d['goods_num']*$d['stocking_pricing_ratio']}}</span>瓶</p>
						</div>

					</li>
					<li class="ordinary_text">
                @currency($d['goods_num']*$d['stocking_pricing_ratio']*$d['goods_price'])</li>
					<li>
						<div class="operation_text">
							<p class="product_name del each_text">&yen;
                1.5</p>

						</div>
					</li>
				</ul>
				@endif @endforeach
				<div class="subtotal">
					<div class="first_p">
						<p class="subtotal_name">
							酒产品数量：
						</p>
						<p class="subtotal_num">
							{{$v['amount']['goods_amount']}}箱， {{$v['amount']['goods_total']}}瓶
						</p>
					</div>
					<div>
						<p class="subtotal_name">
							酒周边产品数量：
						</p>
						<p class="subtotal_num">
							0箱，0只
						</p>
					</div>
					<div>
						<p class="subtotal_name">
							商品金额：
						</p>
						<p class="subtotal_num goods_subtotal">
                @currency($v['amount']['price_amount'])
						</p>
					</div>
					<div>
						<p class="subtotal_name">
							物流费：
						</p>
						<p class="subtotal_num logistics_num" data_logistics='1' data_num='{{$v['amount']['ship_fee']}}'>
							@currency($v['amount']['ship_fee'])
						</p>
					</div>
					<div>
						<p class="subtotal_name">
							送货上门费：
						</p>
						<p class="subtotal_num go_home_num">
							@currency($v['amount']['home_service'])
						</p>
					</div>
				</div>
			</div>
			@else
			<div id="jingwai_depot" class="product_detail"  data-station-alias="{{$k}}">
				<div class="invoice_general">
					<span class="general_num">
								配货单{{$j++}}：
							</span>
					<span class="invoice_mode">
								{{$v[0]['station']}} / 物流配送
							</span>
					<span class="see_details">
								<a href="#jingwai">查看配送方式</a>
							</span>
				</div>
				@foreach($v as $c=>$d) @if($c !=='amount')
				<ul class="details_list">
					<li class="first_details">
						<a href="{{action('GoodsController@show',['uuid'=>$d['goods_uuid']])}}">
							<img class="pro_img" src="@image([$d['image_path'], 68, 96])" />
						</a>
						<div class="product_text">
							<p>
								<a class="product_name" href="{{action('GoodsController@show',['uuid'=>$d['goods_uuid']])}}">{{$d['goods_chinese_name']}}</a>
							</p>
							<p class="product_num">{{$d['stocking_pricing_ratio']}}只装</p>
						</div>
					</li>
					<li class="ordinary_text">境外发货</li>
					<li class="ordinary_text">
                @currency($d['goods_price'])</li>
					<li>
						<div class="amount">
							<p>{{$d['goods_num']}}</p>
							<p class="total">共<span class="total_num">{{$d['goods_num']*$d['stocking_pricing_ratio']}}</span>瓶</p>
						</div>

					</li>
					<li class="ordinary_text">
                @currency($d['goods_num']*$d['stocking_pricing_ratio']*$d['goods_price'])</li>
					<li>
						<div class="operation_text">
							<p class="product_name del each_text">&yen;
                1.5</p>

						</div>
					</li>
				</ul>
				@endif @endforeach
				<div class="subtotal">
					<div class="first_p">
						<p class="subtotal_name">
							酒产品数量：
						</p>
						<p class="subtotal_num">
							{{$v['amount']['goods_amount']}}箱， {{$v['amount']['goods_total']}}瓶
						</p>
					</div>
					<div>
						<p class="subtotal_name">
							酒周边产品数量：
						</p>
						<p class="subtotal_num">
							0箱，0只
						</p>
					</div>
					<div>
						<p class="subtotal_name">
							商品金额：
						</p>
						<p class="subtotal_num goods_subtotal">
                @currency($v['amount']['price_amount'])
						</p>
					</div>
					<div>
						<p class="subtotal_name">
							物流费：
						</p>
						<p class="subtotal_num">
							&yen;
                0.00
						</p>
					</div>
					<div>
						<p class="subtotal_name">
							送货上门费：
						</p>
						<p class="subtotal_num">
							&yen;
                {{--@currency($v['amount']['home_service'])--}}
						</p>
					</div>
				</div>
			</div>
			@endif @endforeach

		</div>
		<div class="statistics ">
			<div class="subtotal bgcolor">
				<div class="first_p">
					<p class="subtotal_name">
						数量：
					</p>
					<p class="subtotal_num">
						{{$data['goods_amount']}}箱，{{$data['goods_total']}}瓶
					</p>
				</div>
				<div>
					<p class="subtotal_name">
						商品总价（含送货上门费）：
					</p>
					<p class="subtotal_num goods_total_num">
                @currency($data['goods_and_service'])
					</p>
				</div>
				<div>
					<p class="subtotal_name">
						运费（已为您节省00.00元运费）：
					</p>
					<p class="subtotal_num total_logistics">
				@currency($data['ship_fee_amount'])
					</p>
				</div>
				<div>
					<p class="subtotal_name">
						优惠金额：
					</p>
					<p class="subtotal_num discount">
						- 
				@currency($data['discount_amount'])
					</p>
				</div>
			</div>
		</div>
		<div class="submit_order">
			<a href="{{action('CartsController@cartsList')}}" class="return_car">
				返回购物车
			</a>
			<div class="order_btn">
				提交订单
			</div>
			<div class="actual">
				<span class="actual_text">
							本次实际支付：
						</span>
				<span class="actual_num actual_subtotal">
				@currency($data['payed_amount'])
						</span>
		</div>
	</div>
	<div class="layer">
		<div class="layer_container">
			<p class="container_title">编辑地址</p>
			<div class="sub_wap">
				<div class="receipt_man">
					<p class="itme_wap">
						<span class="star">*</span>
						<span class="edit_text">收货人姓名：</span>
					</p>
					<p class="input_wap"><input type="text" name="username" id="username" value="" /></p>
				</div>
				<div class="receiver_adress">
					<p class="itme_wap">
						<span class="star">*</span>
						<span class="edit_text">收货人地址：</span>
					</p>
					<p class="input_wap">
						<input type="hidden" name="uuid" value="">
						<select class="province select_common" name="province" id="province">
							<option value="请选择">请选择</option>
						</select><span class="deriction">省</span>
						<select class="city select_common" id="city" name="city">
							<option value="请选择">请选择</option>
						</select><span class="deriction ">市</span>
						<select class="region select_common" id="country" name="country">
							<option value="请选择">请选择</option>
						</select><span class="deriction ">区/县</span>
					</p>
				</div>
				<div class="explicit">
					<p class="itme_wap">
						<span class="star">*</span>
						<span class="edit_text">地址详情：</span>
					</p>
					<p class="input_wap ">
						<input type="text" name="explicit_adress" id="explicit_adress" value="" />
					</p>
				</div>
				<div>
					<p class="itme_wap">
						<span class="star">*</span>
						<span class="edit_text">手机号码：</span>
					</p>
					<p class="input_wap mobile_phone">
						<input type="text" name="mobile" id="mobile" value="" />
					</p>
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
</div>
<img class="wait_gif" src="/images/loading.gif"/>
@stop @section('JS') @parent
<script src="/js/shopping_car2.js" type="text/javascript" charset="utf-8"></script>
<script>
	 window.global.setDefault = "{{action('AddressController@setDefault')}}";
//      var uuid ="a0743450-feed-11e6-99f8-adfc6d5200ba";
     window.global.addAddr =  "{{action('AddressController@addAddr')}}";
//      var real_name,mobile,areas_uuid,detail;
     window.global.delAddr = "{{action('AddressController@deleteAddr')}}";
//        var uuid;
     window.global.editAddr =  "{{action('AddressController@editAddr')}}";
//   window.global.setDefault =  "{{action('AddressController@setDefault')}}";
//            var uuid ;
		window.global.getProvince = "{{action('IndexController@getProvince')}}";
        window.global.getAreas = "{{action('IndexController@getAreas')}}";
        window.global.getCountrys = "{{action('IndexController@getCountrys')}}";
        window.global.writeOrder = "{{action('OrdersController@writeOrder')}}";
	    window.global.ordercheck = "{{action('OrdersController@orderCheck')}}";
	    window.global.getShipFee = "{{action('OrdersController@getShipFee')}}";
   		window.global.pay = "{{action('PayController@pays')}}";
	 // var corns
	 // delivery=[{"send_station":"\u5929\u6d25\u4ed3","method":"\u4e91\u9152\u7269\u6d41","home_service":"yes"},{"send_station":"\u5e7f\u5dde\u4ed3","method":"\u4e91\u9152\u7269\u6d41","home_service":"yes"},{"send_station":"\u5883\u5916","method":"\u4e91\u9152\u7269\u6d41","home_service":"yes"}]

</script>
@stop