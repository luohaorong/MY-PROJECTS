@extends('top') @section('CSS')
<link rel="stylesheet" href="/css/register1.css" />
<link rel="stylesheet" href="/css/register.css" /> @stop @section('content')
<div id="register_container">
	<div id="process">
		<div class="process-container">
			<img src="/img/process1.png" />
		</div>
		<div class="process-right"></div>
	</div>
	<divs class="step_container" style="display: none">
		<img class="step_img" src="/images/register/nav2.png" />
		<div class="left_side"></div>
		<div class="right_side"></div>
	</divs>
	<form action="{{action('IndexController@register')}}" method="post" enctype="multipart/form-data">

		<div id="register_first" style="display: block">
			<div id="content">
				<div class="content-container">
					<ul class="register1_list">
						<li class="register1_list1">会员信息注册</li>
						<li class="register1_list2">完善会员资料 </li>
						<li class="register1_list3">注册成功，等待审核</li>
					</ul>
					<div class="left">
						<label class="three"><span class="must">*</span><span class="names">手机号:</span><input class="change tellphone cur14 longest" id="mobile" type="text"  value="{{old('mobile')}}" name="mobile"/><span class="tip tip1">请输入11位手机号码</span>
                                <span class="tip1_error1 " style="display: none;" ><span class="error">请输入正确的电话号码！</span></span>
                            	
                            @if($errors->has('mobile'))
                                <span class="mobile_error " style="display: block;" ><span class="error">{{$errors->first('mobile')}}</span></span>
                                @else
                                <span class="tip1_error3 " style="display: none;"><img class="picture" src="/img/pass.png"/></span>
                                @endif
                            </label>
                        <label class="three"><span class="must">*</span><span class="names">验证码:</span><input class="change cur20 imgcode" id="imgcode1" style="width: 87px;height: 32px;border: 1px solid #e5e5e5;border-radius: 4px;" type="text" value="" name=""/><img class="img_box" style="height: 32px;position: absolute;" src="{!! captcha_src() !!}"/><a href="javascript:;" style="position: absolute;top: 5px;margin-left: 134px;" class="change_code">看不清，换一张？</a>
                        </label>
						<label class="five"><span class="must">*</span><span class="names">手机验证码:</span><input class="pin1 change cur20" type="text" value="{{old('code')}}" name="code"/><input class="send_pin1 cur14" type="button" value="点击获取验证码"/><span class="tip tip2">手机收到的4位数字验证码</span>
                                <span class="tip2_error1 " style="display: none;" ><span class="error" style="margin-left: 34px">验证码格式不正确</span></span>
                            @if($errors->has('code'))
                                <span class="mobile_error" style="display: block;"><span class="error">{{$errors->first('code')}}</span></span>
                                @else
                                <span class="tip2_error3" style="display: none;"><img class="picture" src="/img/pass.png" style="left:27px" />
                                @endif
                            </label>
						<label class="six"><span class="must">*</span><span class="names">企业名称:</span><input class="company_name change cur14 longest" value="{{old('company')}}" name="company" type="text"/><span class="tip tip3">必选字段</span>
                                <span class="tip3_error1 " style="display: none;" ><span class="error">请输入企业名称</span></span>
                            @if($errors->has('company'))
                                <span class="mobile_error" style="display: block;"><span class="error">{{$errors->first('company')}}</span></span>
                                @else
                                <span class="tip3_error2" style="display: none;"><img class="picture" src="/img/pass.png"/></span>
                                @endif
                            </label>
                        <label class="five"><span class="must">*</span><span class="names">营业执照号:</span><input class="change business_license cur14 longest" name="company_code" type="text"/><span class="tip tip4">请填写营业执照号码</span>
								<span class="tip4_error1" style="display: none;"><span class="error">请输入营业执照号</span></span>
								<span class="tip4_error3" style="display: none;"><img class="picture" src="img/pass.png"/>
						</label>
						<label class="four"><span class="must">*</span><span class="names">营业执照:</span><input id="files" name="file" value="{{old('file')}}"  type="file"/><span class="tip tip_company">图片文件最大6MB，支持jpg、jpeg、png的图片格式。</span>
                                @if($errors->has('file'))
                                <span class="mobile_error" style="display: block;">{{$errors->first('file')}}</span>
                                @else
                                    <span class="tip4_error2" style="display: none;"><img class="picture" src="/img/pass.png"/></span>
                                @endif
                            </label>
						<div id="company_box1"></div>
						<!--<label class="seven"><span class="must must_special">*</span><span class="names names_special">主营地区选择:</span>
                                
                                <div class="exclusive_city exclusive_common" region='市'>
                                    <div class="order_top checkbox_change"></div>
                                    <p class="province_words exclusive_words_common">市级代理</p>
                                </div>
                                <div class="exclusive_province exclusive_common" region='省'>
                                    <div class="order_top "></div>
                                    <p class="province_words exclusive_words_common">省级代理</p>
                                </div>
                            </label>-->
						<label class="four exclusive_content"><span class="must ">*</span><span class="names">主营地区:</span>
                                <span class="province_container">
                                	<input id="hid" type="hidden" name="areas_uuid" value=""/>
                    <select class="province select_common"  value="{{old('areas_uuid')}}"  id="province">
                        <option value="请选择">请选择</option>
                    </select><span class="deriction">省</span>
                                </span>
                                <span class="city_container">
                   <select class="city select_common" id="city"  value="{{old('areas_uuid')}}" >
                       <option value="请选择">请选择</option>
                       </select><span class="deriction ">市</span>
				</span>
                                @if($errors->has('areas_uuid'))
                                    <span class="mobile_error " style="display: block;"><span class="error">{{$errors->first('areas_uuid')}}</span></span>
                                @else
                                    <span class="tip5_error2" style="display: none;"><img class="picture" src="/img/pass.png"/>
                                @endif
                            </label>

						<label class="double"><span class="must">*</span><span class="names">密码:</span><input class="change set_password cur14 longest" name="passwd" value="" type="text"/><span class="tip tip6">密码6-12位，数字、字母或数字和字母的组合。</span>
                                <span class="tip6_error1 " style="display: none;" ><span class="error">密码格式不正确（6-12位，数字、字母或数字和字母组合）</span></span>
                            {{--@if($errors->has('passwd'))--}}
                                {{--<span class="mobile_error" style="display: block;"><span class="error">{{$errors->first('passwd')}}</span></span>--}}
                                {{--@else--}}
                                <span class="tip6_error3" style="display: none;" ><img class="picture" src="/img/pass.png"/>
                                {{--@endif--}}
                            </label>
						<label class="four"><span class="must">*</span><span class="names">确认密码:</span><input class="change check_password cur14 longest" name="confirm"  value="" type="text"/><span class="tip tip7">牢记密码，勿将密码告诉他人</span>
                                <span class="tip7_error1 " style="display: none;" ><span class="error">两次密码不一致！</span></span>
                                {{--@if($errors->has('confirm'))--}}
                                {{--<span class="mobile_error" style="display: block;"><span class="error">{{$errors->first('confirm')}}</span></span>--}}
                                {{--@else--}}
                                <span class="tip7_error3" style="display: none;"><img class="picture" src="/img/pass.png"/>
                                {{--@endif--}}
                            </label>
						<!--<label class="invisit"><span class="names">邀请码:</span><input class="visit_num cur14 longest" name="invited_code" type="text" value="{{old('invited_code')}}"/><span class="tip8">若无可不填写，输入邀请码加快您账户的审核进度</span></label>-->
						<input type="button" class="save_go" value="保存并继续→">

					</div>
					<div class="right">
						<span>注册荟酒网会员，即可享受</span>
						<ul class="list">
							<li>一手市场信息</li>
							<li>海量待选产品</li>
							<li>便捷采购管理</li>
							<li>安心价格保护</li>
							<li>更多高端服务</li>
						</ul>

						<a href="{{action('IndexController@login')}}" class="soon">已是会员，快速登录</a>
						<a href="{{action('IndexController@enterpriseRegister')}}" class="soon">企事业单位注册入口</a>
					</div>
				</div>
			</div>
		</div>
		<div id="register_sec" style="display: none;">
			<div class="register_mian">
				<ul class="step_nodes">
					<li>会员信息注册</li>
					<li>完善会员资料</li>
					<li class="last2">注册成功，等待审核</li>
				</ul>
				<div class="register_content">
					<div class="left_content">
						<div class="left_content_top">
							<p class="text_top">为了维护您自己的利益，请真实，详尽的填写以下信息</p>
							<p class="text_sub">我们的工作人员将在3个工作日联系您,以便与您完成认证信息</p>
						</div>
						<div class="left_content_middle">
							<p class="user_ad"><b class="first">*</b><span class="left_title first_title">企业详细地址:</span><textarea name="company_addr" value="{{old('company_addr')}}" class="address required">{{old('company_addr')}}</textarea></p>
							<span class="icon_pass_1"></span>
							<span class="describe  first_describe">只能输入50字，输入超过不记录后续输入内容</span>
							<p class="user_name"><b>*</b><span class="left_title">注册人姓名:</span><input type="text" name="real_name" id="username" value="{{old('real_name')}}" class="required" /><span class="icon_pass_2"></span>
								<span class="describe required register_name"></span>
							<p class="user_id"><b>*</b><span class="left_title">身份证号码:</span><input type="text" name="id_card" id="card" value="{{old('id_card')}}" class="required" /><span class="icon_pass_3"></span>
								<span class="describe register_card">请输入15-18位身份证号码</span></p>
							<p class="user_dept"><span class="left_title">部门职位:</span><input type="text" name="duty" value="{{old('duty')}}" id="department" />
								<span class="describe register_dep"></span>
							</p>
							<p class="user_tel"><span class="left_title">企业座机号码:</span><span class="area">区号</span><span class="tel">座机号码</span><input type="text" name="area" value="{{old('area')}}" id="area" data-text='' /><input type="text" name="tel_num" id="tel" value="{{old('tel_num')}}" data-text='' /><span class="describe register_tel error_tell"></span></p>
							<p class="user_email"><span class="left_title">邮箱:</span><input type="text" name="email" value="{{old('email')}}" id="e-mail" /><span class="describe register_email">输入您的常用邮箱地址</span></p>
						</div>
						<div class="left_content_bottom">
							<input class="submit" type="submit" value="提交资料→">
							<p><span id="chk"></span><span>我已阅读并同意</span>
								<a href="{{ action('HelpController@show', [ 'uuid' => '550541c0-352c-11e7-b770-cbf619aa26a4' ]) }}">《荟酒网购物注册协议》</a>
							</p>
							<span id="selected" data-success=1></span>
						</div>
					</div>
					<div class="right">
						<span>注册荟酒网会员，即可享受</span>
						<ul class="list">
							<li>一手市场信息</li>
							<li>海量待选产品</li>
							<li>便捷采购管理</li>
							<li>安心价格保护</li>
							<li>更多高端服务</li>
						</ul>

						<a href="{{action('IndexController@login')}}" class="soon">已是会员，快速登录</a>
						<a href="{{action('IndexController@enterpriseRegister')}}" class="soon">企事业单位注册入口</a>
					</div>
				</div>
			</div>

		</div>
	</form>

</div>

@stop @section('JS')
<script>
	window.global.send_sms = "{{action('IndexController@smsSend')}}";
	window.global.getProvince = "{{action('IndexController@getProvince')}}";
	window.global.getAreas = "{{action('IndexController@getAreas')}}";
	window.global.getCountrys = "{{action('IndexController@getCountrys')}}";
</script>

<script type="text/javascript" src="/js/register_1.js"></script>
<script type="text/javascript" src="/js/register.js"></script>
@stop