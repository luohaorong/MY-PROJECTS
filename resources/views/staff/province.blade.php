@extends('layouts.app')

@section('content')
	<div class="configure_container clearfix">
		<div class="configure_left float_left">
			<div class="configure_left_head">
				<div class="configure_head_content clearfix">
					<div class="head_content_left float_left">
						省级经理总览：
					</div>
					<div class="head_content_right float_left">
						共设{{ $provinces->count() }}个区域，还有{{ $provinces->count() - $staffs->count() }}个无管理人员
					</div>
				</div>
			</div>
			<div class="configure_left_body">
				<table class="left_body_table">
					<thead>
						<tr class="tbabel_row">
							<td class="thead_title">编码</td>
							<td class="thead_title">省</td>
							<td class="thead_title">账号</td>
							<td class="thead_title">密码</td>
							<td class="thead_title">姓名</td>
							<td class="thead_title">业务电话</td>
							<td class="thead_title">业务邮箱</td>
							<td class="thead_title">上岗时间</td>							
						</tr>
					</thead>
					<tbody>
						@foreach ($provinces as $province)
						<tr class="tbabel_row" data-uuid="{{ $province->uuid }}">
							<td class="tbody_content">SP{{ $province->code }}</td>
							<td class="tbody_content">{{ $province->name }}</td>
							<td class="tbody_content">{{ $staffs->get($province->uuid)->name ?? '' }}</td>
							<td class="tbody_content">******</td>
							<td class="tbody_content">{{ $staffs->get($province->uuid)->real_name ?? '' }}</td>
							<td class="tbody_content">{{ $staffs->get($province->uuid)->mobile ?? '' }}</td>	
							<td class="tbody_content">{{ $staffs->get($province->uuid)->email ?? '' }}</td>
							<td class="tbody_content">{{ $staffs->has($province->uuid) ? \Carbon\Carbon::parse($staffs->get($province->uuid)->inducted_at)->format('Y年m月d日') : '' }}</td>	
						</tr>
						@endforeach
					</tbody>
				</table>
			</div>
		</div>
		<div class="configure_right float_left">
			<div class="configure_right_head">
				<div class="configure_head_content">
						属性修改器
				</div>
			</div>			
			<div class="configure_right_body">
				<div class="right_body_title">
					<span class="title"></span>
					<span class="code"></span>
				</div>
				<table>
					<tbody>
						<tr>
							<td>账号</td>
							<td><input class="into_box account" type="text" name="account"></td>
						</tr>
						<tr>
							<td>密码</td>
							<td><input class="into_box password" type="text" name="password"></td>
						</tr>						
						<tr>
							<td>姓名</td>
							<td><input class="into_box username" type="text" name="username"></td>
						</tr>						
						<tr>
							<td>业务电话</td>
							<td><input class="into_box tle" type="text" name="tle"></td>
						</tr>						
						<tr>
							<td>业务邮箱</td>
							<td><input class="into_box e-mail" type="text" name="e-mail"></td>
						</tr>						
						<tr>
							<td>上岗时间</td>
							<td class="inline laydate-icon vip_timebox datepicker" id="personal_test1">
							</td>
						</tr>
						<tr>
							<td>openId</td>
							<td><select class="into_box openId" name="openId">
							    <option value="">请选择</option>
								@foreach($wechatUsers as $wechatUser)
								<option value="{{ $wechatUser->openid }}">{{ $wechatUser->nickname }}（{{ $wechatUser->country }}{{ $wechatUser->province }}{{ $wechatUser->city }}）</option>
								@endforeach
							</select></td>
						</tr>			
					</tbody>
				</table>
				<div class="right_foot">
					<div class="right_foot_img unsave">保存修改
					</div>
				</div>
			</div>
		</div>
	</div>
@endsection

@section('css')
<link rel="stylesheet" type="text/css" href="/css/configure.css">
@endsection

@section('js')
<script type="text/javascript" src='/js/configure.js'></script>
<script type="text/javascript" src="/js/laydate.js"></script>
<script type="text/javascript" src="/js/click_date.js"></script>
<script type="text/javascript">
    window.global.areas = {!! $provinces->toJson() !!};
	window.global.staffs = {!! $staffs->toJson() !!};
	window.global.store = "{{ action('ProvinceStaffController@store') }}";
</script>
@endsection
