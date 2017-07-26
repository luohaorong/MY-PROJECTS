@extends('layouts.app')

@section('content')
<div class="configure_container clearfix">
	<div class="configure_left float_left">
		<div class="configure_left_head">
			<div class="configure_head_content clearfix">
				<div class="head_content_left float_left">
					<select id="province_select" class="province_select">
						@foreach ($provinces as $province)
						<option value="{{ $province->uuid }}" @if (\Request::get('id') === $province->uuid) selected @endif>{{ $province->name }}</option>
						@endforeach
					</select>
				</div>
				<div class="head_content_left float_left">
					<select id="city_select" class="province_select">
						@foreach ($cities as $city)
						<option value="{{ $city->uuid }}" @if (\Request::get('cid') === $city->uuid) selected @endif>{{ $city->name }}</option>
						@endforeach
					</select>
				</div>
				<div class="head_content_right float_left">
					共设{{ $districts->count() }}个区域，还有{{ $districts->count() - $agencies->count() }}个无管理人员
				</div>
			</div>
		</div>
		<div class="configure_left_body">
			<table class="left_body_table">
				<thead>
					<tr class="tbabel_row">
						<td class="thead_title">编码</td>
						<td class="thead_title">区域</td>
						<td class="thead_title">账号</td>
						<td class="thead_title">密码</td>
						<td class="thead_title">代理商姓名</td>
						<td class="thead_title">代理商身份证号码</td>
						<td class="thead_title">代理商手机</td>
						<td class="thead_title">代理初始时间</td>
						<td class="thead_title">代理结束时间</td>							
						<td class="thead_title">状态</td>						
					</tr>
				</thead>
				<tbody>
					@foreach ($districts as $district)
					<tr class="tbabel_row" data-uuid="{{ $district->uuid }}">
						<td class="tbody_content">AD{{ $district->code }}</td>
						<td class="tbody_content">{{ $district->name }}</td>
						<td class="tbody_content">{{ $agencies->get($district->uuid)->name ?? '' }}</td>
						<td class="tbody_content">******</td>
						<td class="tbody_content">{{ $agencies->get($district->uuid)->real_name ?? '' }}</td>
						<td class="tbody_content">{{ $agencies->get($district->uuid)->id_card ?? '' }}</td>	
						<td class="tbody_content">{{ $agencies->get($district->uuid)->mobile ?? '' }}</td>
						<td class="tbody_content">{{ $agencies->has($district->uuid) ? \Carbon\Carbon::parse($agencies->get($district->uuid)->agent_started_at)->format('Y年m月d日') : '' }}</td>	
						<td class="tbody_content">{{ $agencies->has($district->uuid) ? \Carbon\Carbon::parse($agencies->get($district->uuid)->agent_ended_at)->format('Y年m月d日') : '' }}</td>	

						@if ($agencies->has($district->uuid) && $agencies->get($district->uuid)->status === config('const.agencies_status_normal'))
						<td class="tbody_content normal">正常</td>	
						@elseif ($agencies->has($district->uuid) && $agencies->get($district->uuid)->status === config('const.agencies_status_locked'))
						<td class="tbody_content stop">停用</td>
						@elseif (!$agencyAreas->has($district->uuid))
						<td class="tbody_content empty">空缺</td>
						@elseif ($agencyAreas->has($district->uuid) && is_null($agencyAreas->get($district->uuid)))
						<td class="tbody_content empty">已被代理</td>
						@elseif ($agencyAreas->has($district->uuid) && !is_null($agencyAreas->get($district->uuid)))
						<td class="tbody_content empty">曾被代理</td>
						@else
						<td class="tbody_content dateoff">过期</td>
						@endif

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
			<table>
				<thead>
			    	<tr>
			    		<th>编码</th>
			    		<th class="code"></th>
			    	</tr>
			    	<tr>
			    		<th>省</th>
			    		<th class="title"></th>
			    	</tr>
			    	<tr>
			    		<th>市</th>
			    		<th class="sub_title"></th>
			    	</tr>
			    	<tr>
			    		<th>区</th>
			    		<th class="last_title"></th>
			    	</tr>
			    </thead>
				<tbody>
					<tr>
						<td>账号</td>
						<td><input class="into_box account" type="text" name="name"></td>
					</tr>
					<tr>
						<td>密码</td>
						<td><input class="into_box password" type="text" name="password"></td>
					</tr>		
					<tr>
						<td>提现码</td>
						<td><input class="into_box pay_pwd" type="text" name="pay_pwd"></td>
					</tr>					
					<tr>
						<td>代理商姓名</td>
						<td><input class="into_box username" type="text" name="real_name"></td>
					</tr>						
					<tr>
						<td>身份证号码</td>
						<td><input class="into_box tle" type="text" name="id_card"></td>
					</tr>	
					<tr>
						<td>代理商手机</td>
						<td><input class="into_box tle" type="text" name="mobile"></td>
					</tr>					
					<tr>
						<td>代理初始时间</td>
						<td class="inline laydate-icon vip_timebox datepicker" id="agent_started_at">
						</td>
					</tr>						
					<tr>
						<td>代理结束时间</td>
						<td class="inline laydate-icon vip_timebox datepicker" id="agent_ended_at">
						</td>
					</tr>
					<tr>
						<td>openId</td>
						<td><select class="into_box openId" name="openid">
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
		<div class="agent_history">
			<div class="configure_right_head">
				<div class="configure_head_content">
						代理历史
				</div>
				<img class="configure_head_img" src="/images/agentHistory/open.png">
			</div>
			<div class="configure_right_body">
				<table>
					<thead>
						<tr>
							<td>姓名</td>
							<td>初始时间</td>
							<td>结束时间</td>
							<td>状态</td>
						</tr>
					</thead>
					<tbody>
						<tr style="display: none;">
							<td></td>
							<td></td>
							<td></td>
							<td></td>							
						</tr>					
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
@endsection

@section('layer')
<div class="query_table_layer">
	<div class="query_layer_container">
		<div class="layer_container_head">
			<p class="head_p">
				<span>代理历史</span>
			</p>
			<img class="layer_cancel" src="/images/query_table/cancel.png" alt="" />
		</div>
		<table class="layer_tabs">
			<thead>
				<tr>
					<th>账号</th>
					<th>密码</th>
					<th>姓名</th>
					<th>身份证号</th>
					<th>手机号</th>
					<th>初始时间</th>
					<th>结束时间</th>
					<th>状态</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody>
				<tr style="display: none;">
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
@endsection

@section('css')
<link rel="stylesheet" type="text/css" href="/css/configure.css">
<link rel="stylesheet" type="text/css" href="/css/layer.css">
<link rel="stylesheet" type="text/css" href="/css/agentHistory.css">
@endsection

@section('js')
<script type="text/javascript" src='/js/agency.js'></script>
<script type="text/javascript" src='/js/layer.js'></script>
<script type="text/javascript" src="/js/laydate.js"></script>
<script type="text/javascript" src="/js/click_date.js"></script>
<script type="text/javascript">
    window.global.areas = {!! $districts->toJson() !!};
	window.global.agencies = {!! $agencies->toJson() !!};
	window.global.index = "{{ action('DistrictAgencyController@index') }}";
	window.global.store = "{{ action('DistrictAgencyController@store') }}";
	window.global.history = "{{ action('DistrictAgencyController@history') }}";
	window.global.close = "{{ action('DistrictAgencyController@close') }}";
	window.global.open = "{{ action('DistrictAgencyController@open') }}";
</script>
@endsection
