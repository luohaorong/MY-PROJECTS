@extends('layouts_member')
@section('CSS')
@parent
<link rel="stylesheet" href="/css/address_management.css" />
@stop

@section('right')
<div class="content_common">
	<div class="box_h">
		地址管理
	</div>
	<div class="address_records">
		<div class="address_consume {{ $main_zone ? '' : 'add_address'}} address_common">
			收货地址
		</div>
		@if (session('type') === 'agency')
		<div class="address_recharge address_common {{ $main_zone ? 'add_address' : ''}} ">
			主营地区
		</div>
		@endif
	</div>
	<!---地址管理的内容区-->

	<!--收货地址-->
	<div class="personal_address_container" style="{{$main_zone ? 'display:none' :'display:block'}}">
		<!--克隆地址的模板-->
		<div class="templete">
			<div class="address_information_top address_information_top1">
				<p class="personal_address_receiver">
					收货人：<span></span>
				</p>
				<p class="personal_address_number">
					电话：<span></span>
				</p>
				<img class="personal_address_select" style="display: none;" src="/img/selected.png" />
			</div>
			<div class="address_information_bottom">
				<p class="personal_address_content">
					地址:<span></span>
				</p>
				<img class="personal_address_edit" src="/img/edit.png" alt="编辑" />
				<img class="personal_address_delete" src="/img/delete.png" alt="删除" />
			</div>
		</div>

		<!--收货人、地址等信息-->
		@foreach($addresses as $k=>$value)
		<div class="address_information" data-add="{{$value['uuid']}}">
			<div class="address_information_top address_information_top1">
				<p class="personal_address_receiver">
					收货人：<span>{{$value['real_name']}}</span>
				</p>
				<p class="personal_address_number">
					电话：<span>{{$value['mobile']}}</span>
				</p>
				<img class="personal_address_select {{$value['is_default']==='true' ? 'add_select':'' }}"  src="/img/selected.png" />
			</div>
			<div class="address_information_bottom">
				<p class="personal_address_content"  data_detail='{{$value['detail']}}'  data_province_uuid="{{$value['address_tree'][0]['uuid']}}" data_province="{{$value['address_tree'][0]['name']}}" data_city_uuid="{{$value['address_tree'][0]['sub'][0]['uuid']}}" data_city="{{$value['address_tree'][0]['sub'][0]['name']}}" data_area_uuid="{{$value['areas_uuid']}}" data_area="{{$value['zone']}}"  data_text="{{$value['add']}}" >
					地址：<span>{{$value['add']}}{{$value['detail']}}</span>
				</p>
				<img class="personal_address_edit"  src="/img/edit.png" alt="编辑" />
				<img class="personal_address_delete" src="/img/delete.png" alt="删除" />
			</div>
		</div>
		@endforeach
		<!--收货人、地址等信息结束-->
		<!--添加收货人或信息的按钮-->
		<div class="address_information_add">
			新增地址
		</div>

		<!--添加收货人或信息的按钮结束-->
	</div>

	@if (session('type') === 'agency')
	<!--主营地区-->
	<div class="main_sale_container" style="{{$main_zone ? 'display:block' :'display:none'}}">
		<!--克隆主营地区的模板-->
		<div class="templete1">
			<div class="address_information_top">
				<p class="personal_main_address">
					主营地区<span></span>
				</p>
				<p class="personal_address_status">
					状态：<span class="status_check">审核中</span>
				</p>
				<img class="personal_address_select" src="/img/selected.png" />
			</div>
			<div class="address_information_bottom">
				<p class="personal_address_content">
					地址：<span></span>
				</p>

			</div>
		</div>
		<!--主营地区地址、状态信息-->
		@foreach($members_areas as $k=>$value)
		<div class="address_information1"  data-uuid="{{$value['uuid']}}">
			<div class="address_information_top">
				<p class="personal_main_address">
					主营地区<span>{{$k+1}}</span>
				</p>
				<p class="personal_address_status">
					状态：@if($value['verify_pass']=='yes')<span>可用</span>
						   @elseif($value['verify_pass']=='ing')
						<span class="status_check">审核中</span>
						   @endif
				</p>
				<img class="personal_address_select" src="/img/selected.png" />
			</div>
			<div class="address_information_bottom">
				<p class="personal_address_content">
					地址：<span>{{$value['name']}}--{{$value['detail']}}</span>
				</p>
			</div>
		</div>
		
		@endforeach
		
		<div class="address_main_address">
			新增主营地区
		</div>
	</div>
	@endif
</div>

<!--收货地址编辑弹出层开始-->
<div class="layer layer1">
	<div class="layer_container_common layer_container1">
		<p class="container_title">
			编辑地址
		</p>
		<div class="sub_wap">
			<div class="receipt_man">
				<p class="itme_wap">
					<span class="star">*</span>
					<span class="edit_text">收货人姓名：</span>
				</p>
				<p class="input_wap">
					<input type="text" name="username" id="username" value=""/>
				</p>
			</div>
			<div class="receiver_adress">
				<p class="itme_wap">
					<span class="star">*</span>
					<span class="edit_text">收货人地址：</span>
				</p>
				<p class="input_wap">
					<input type="hidden" name="uuid" value="">
					<select name="province" class="province" id="province" value="">
						<option value="请选择">请选择</option>

					</select>
					<span class="select_text"> 省 </span>
					<select name="city" class="city" id="city" value="">
						<option value="请选择">请选择</option>

					</select>
					<span class="select_text"> 市 </span>
					<select name="country" class="county" id="country" value="">
						<option value="请选择">请选择</option>

					</select>
					<span class="select_text"> 区/县 </span>
				</p>
			</div>
			<div class="explicit">
				<p class="itme_wap">
					<span class="star">*</span>
					<span class="edit_text">地址详情：</span>
				</p>
				<p class="input_wap ">
					<input type="text" name="explicit_adress" id="explicit_adress" value=""/>
				</p>
			</div>
			<div class="num_wap">
				<p class="itme_wap">
					<span class="star">*</span>
					<span class="edit_text">手机号码：</span>
				</p>
				<p class="input_wap mobile_phone">
					<input type="text" name="mobile" id="mobile" value=""/>
				</p>
			</div>
		</div>
		<div class="bottom_btn">
			<div class="ensure1 ensure_common">
				确认
			</div>
			<div class="cancel1 cancel_common">
				取消
			</div>
		</div>
	</div>
</div>
<!--主营地区弹出层开始-->
<div class="layer layer2">
	<div class="layer_container2 layer_container_common">
		<p class="container_title">
			提交新的主营地区
		</p>
		<!--<form name='' action="{{action('AddressController@addAreas')}}" class="sub_wap" enctype="multipart/form-data" method="post">-->
			<!--<div class="licence_wap">
				<p class="itme_wap">
					<span class="star">*</span>
					<span class="edit_text">营业执照：</span>
				</p>
				<input type="file" name="file" id="files" />
				<span class="tip tip_company">图片文件最大6MB，支持jpg、jpeg、png格式</span>
				<div class="company_box" id="company_box"></div>
			</div>-->
			<!--<div class="company_name">
				<p class="itme_wap">
					<span class="star">*</span>
					<span class="edit_text">公司或企业名称：</span>
				</p>
				<p class="input_wap">
					<input class="company_txt" type="text"  />
				</p>
			</div>-->
			<!--<div class="regions_exclusive">
				<p class="itme_wap">
					<span class="star">*</span>
					<span class="edit_text">主营地区选择：</span>
				</p>
				
				<div class="city_exclusive exclusive_common" region='市'>
					<div class="order_top checkbox_change"></div>
					<p class="province_words exclusive_words_common">
						市级独家
					</p>
				</div>
				<div class="province_exclusive exclusive_common" region='省'>
					<div class="order_top"></div>
					<p class="province_words exclusive_words_common">
						省级独家
					</p>
				</div>

			</div>-->
			<div class="receiver_adress">
				<p class="itme_wap">
					<span class="star">*</span>
					<span class="edit_text">主营地区：</span>
				</p>
				<p class="input_wap">
					<input id="hid1" type="hidden" name="uuid" value="">
					<span class="province_container">
					<select name="province" class="province" id="province1" value="">
						<option value="请选择">请选择</option>

					</select> <span class="select_text"> 省 </span> </span>
					<span class="city_container">
					<select name="city" class="city" id="city1">
						<option value="请选择">请选择</option>

					</select> <span class="select_text"> 市 </span> </span>
					<!--<select name="country" class="county" id="country1">
					<option value="请选择">请选择</option>

					</select>
					<span class="select_text">
					区/县
					</span>-->
				</p>
			</div>
			<div class="explicit">
				<p class="itme_wap">
					<span class="star">*</span>
					<span class="edit_text">地址详情：</span>
				</p>
				<p class="input_wap ">
					<input type="text" name="detail" id="explicit_adress1" value=""/>
				</p>
			</div>
			<div class="bottom_btn">
				<input type="submit" class="ensure2 ensure_common" value="确认"/>

				<div class="cancel2 cancel_common">
					取消
				</div>
			</div>
		<!--</form>-->

	</div>
</div>

@stop

@section('JS')
@parent
<script type="text/javascript" src="/js/address_management.js" ></script>
<script type="text/javascript" src="/js/jquery.cookie.js" ></script>
<script>window.global.send_sms = "{{action('IndexController@smsSend')}}";
window.global.getProvince = "{{action('IndexController@getProvince')}}";
window.global.getAreas = "{{action('IndexController@getAreas')}}";
window.global.getCountrys = "{{action('IndexController@getCountrys')}}";
window.global.save_account = "{{action('IndexController@login')}}";
window.global.save_name = "{{action('IndexController@index')}}";
window.global.addAddr = "{{action('AddressController@addAddr')}}";
//    var   real_name,mobile,areas_uuid,members_uuid;
window.global.addList = "{{action('AddressController@addrList')}}";

window.global.deleteAddr = "{{action('AddressController@deleteAddr')}}";
//  var uuid;

window.global.editAddr = "{{action('AddressController@editAddr')}}";
// var  uuid  ; real_name;mobile; areas_uuid,  detail

window.global.setDefault = "{{action('AddressController@setDefault')}}";

//添加主营区域
window.global.addAreas = "{{action('AddressController@addAreas')}}";
// var  uuid; file;detail;</script>

@stop

