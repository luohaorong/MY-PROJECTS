@extends('layouts_member')
@section('CSS')
    @parent
    <link rel="stylesheet" href="/css/brand_customization2.css"/>
@stop

@section('right')
<div class="box_h">品牌定制</div>
<!--已选品种-->
<div class="already_selected_wine">
	<p class="already_selected_wine_words">已选OEM：</p>
	<table class="selected_wine_container"  cellspacing="0" cellpadding="0">
		<tr class="selected_wine_headbar">
			<td class="selected_wine_country">国家</td>
			<td class="selected_wine_rank">等级</td>
			<td class="selected_wine_type">类型</td>
			<td class="selected_wine_area">产区</td>
			<td class="selected_wine_price">葡萄种类</td>
			<td class="selected_wine_capacity">年份</td>
			<td class="selected_wine_remark">酒精度</td>
			<td class="selected_wine_start">容量</td>
			<td class="selected_wine_capacity">瓶型</td>
			<td class="selected_wine_remark">酒帽</td>
			<td class="selected_wine_start">酒塞</td>
			<td class="selected_wine_price">酒箱</td>
			
		</tr>
		<tr class="selected_wine_container selected_wine_text">
			<td>西班牙</td>
			<td>DO</td>
			<td>干红</td>
			<td style="width: 100px">卡斯蒂利亚-拉曼恰</td>
			<td>2013</td>
			<td>12.5%vol</td>
			<td>750ML</td>
			<td style="width: 120px">赤霞珠、美乐、西拉、歌海娜</td>
			<td>波尔多瓶</td>
			<td>酒红色</td>
			<td>天然软木塞</td>
			<td>6支装纸箱</td>
		</tr>
		<tr class="selected_wine_container">
		<td colspan="10">
			此款OEM酒<span class="oem_moq" style="color: #ea0000">1800</span>瓶起订，单价：<span class="oem_single" style="color: #ea0000">￥15.50</span> 元/瓶
		</td>
		<td class="selected_wine_back" colspan="2">
				<div class="back_brand1">
					<a data-uuid="asa" href="/oems/brandCustomizition">返回修改</a>
				</div>
		</td>
		</tr>
	</table>
</div>
<!--已选品种结束-->
<!--外形物料-->
<div class="shape_design_container">
	<p class="already_selected_wine_words">贴标：</p>
	<p class="shape_design_prompt">提示：系统已经根据你所选择的酒浆，默认基础物料选项，你可依据自身要求，调整物料选项，可能会产生额外的费用和起订量的变化。</p>
	<div class="shape_design_content">
		<!--外形物料上半部分-->
		<div class="shape_design_content_top">
			<div class="shape_design_content_top_left">
					<img class="empty_wine_bottle" src="" />
				<div class="empty_wine_label_box">
					<img id="empty_wine_label" class="empty_wine_label" src="" />
				</div>
			</div>
			<!--外形物料右边选择区-->
			<div class="shape_design_content_top_right">
				<!--酒标选择-->		
				<div class="wine_label_container">
					<p>酒标:<span class="label_name" style="color: #333;margin-left: 12px">001号烫金酒标</span></p>
					<div id="wine_label_check" class="wine_label_check">
						
					</div>
					<a class="upload_wine_label" href="javascript:;">
						上传酒标<input class="wine_file_upload" id="files" name="files" type="file" value="浏览" />
					</a>
					<p class="upload_wine_label_limit">酒标尺寸：750*1334px，大小不超过6M</p>
				</div>
			</div>
		</div>
		<!--外形物料下半部分-->
		<div class="shape_design_content_bottom">
			<div class="design_bottom_left">
				<p>当前组合单价：<span class="design_bottom_left_group">0.00</span>元/瓶</p>
				<p class="design_bottom_left_wine">酒标价：<span class="design_bottom_left_design">最终价格以实际为准</span></p>
			</div>
			<div class="design_bottom_right">
				<div class="design_bottom_right_top">
					<p>定制数量：</p>
					<div class="design_custom_minus">
						
					</div>
					<input class="design_custom_amount" type="text" value="300" onkeyup="value=value.replace(/[^\d]/g,'') "/>
					<div class="design_custom_add">
						
					</div>
					
					<p><b>箱</b><span class="design_bottled">(<span class="single">6</span>支装，共<span class="single_total">6000</span>瓶)</span></p>
					<p class="design_tip">不能低于起订量！</p>
				</div>
				<div class="design_bottom_right_bottom">
					<p>
						当前组合起订量为<span class="design_start_amount">300</span>箱，您的订购量为<span class="design_already_amount">300</span>箱，共计<span class="design_all_money">&yen;<span class="design_all_container"></span></span>元
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
<!--外形物料结束-->	
<!--产品名字和备注-->
<div class="brand_product_name_container">
	<div class="brand_product_name_left">
		<p>产品名称:</p>
		<div class="brand_product_left_top">
			<p class="brand_cname_word"><span>*</span>中文名称:</p>
			<input class="brand_product_cname brand_name_common" data_please='请输入中文名称(20字以内)'  type="text" name="" id=""/>
		</div>
		<div class="brand_product_left_bottom">
			<p class="brand_egname_word ">英文名称:(选填)</p>
			<input class="brand_product_egname brand_name_common" data_please='请输入英文名称(50字符以内)' type="text" name="" />
		</div>
	</div>
	<div class="brand_product_name_right">
		<p>备注:</p>
		<textarea class="brand_product_remark brand_name_common" data_please='请填写您的特殊需求，比如风格、样式、尺寸等(100字以内)' ></textarea>
	</div>
</div>
<!--提交OEM开始-->	
<div class="brand_sub_container ">
	<div class="brand_sub_left">
		<p class="brand_sub_words">
			当前组合单价为
			<span class="brand_combination_price">&yen;<span class="combination_container">0.00</span></span>元/瓶，您的订购量为
			<span class="brand_order_quantity">999999</span>箱（6支装），共计
			<span class="brand_total_money">&yen;<span class="total_money_container">0.00</span></span>元，需首付
			<span class="brand_downpayment">&yen;<span class="brand_first_pay">0.00</span></span>元
		</p>
	</div>
	<input class="brand_sub_right" disabled="disabled"  type="submit" value="提交OEM定制" />
</div>

<!--第三步遮罩层-->
<div class="cover_layer"></div>
<!--弹框-->
<div class="bomb_box">
	<p class="bomb_box_word">提交后将生成<span class="oem_book">OEM意向书</span>，同时<span class="bomb_box_name">荟酒网</span>将安排专人与您对接OEM相关事宜</p>
	<a href ="/oems/myOem">确定</a>
	<a class="back_index" href="/">返回首页</a>
</div>
@stop
	
@section('JS')
	@parent
	<script type="text/javascript" src="/js/brand_step2.js"></script>
	<script type="text/javascript" src="/js/file_loadup.js" ></script>
@stop
