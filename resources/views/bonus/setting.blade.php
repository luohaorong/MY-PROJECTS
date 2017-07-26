@extends('layouts.app')

@section('content')
<div class="configure_container clearfix">
	<div class="configure_right float_left">
		<div class="configure_right_head">
			<div class="configure_head_content">
					分红方案调整器
			</div>
		</div>			
		<div class="configure_right_body">
			<div class="right_body_title">
				<span class="province">经销商方案：</span>
			</div>
			<table>
				<thead>
					<tr>
						<td>编号</td>
						<td>方案</td>
						<td>省%</td>
						<td>区%</td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="bianhao">1</td>
						<td class="programme">独立省代</td>
						<td><input class="into_box account" type="text" name="agency_province_ip" value="@percent($settings['agency_province_ip'])"></td>
						<td><input class="into_box account" type="text" name="agency_city_ip" value="@percent($settings['agency_city_ip'])"></td>
					</tr>
					<tr>
						<td class="bianhao">2</td>
						<td class="programme">先省后区</td>
						<td><input class="into_box account" type="text" name="agency_province_pbc" value="@percent($settings['agency_province_pbc'])"></td>
						<td><input class="into_box account" type="text" name="agency_city_pbc" value="@percent($settings['agency_city_pbc'])"></td>
					</tr>
					<tr>
						<td class="bianhao">3</td>
						<td class="programme">独立区代</td>
						<td><input class="into_box account" type="text" name="agency_province_ic" value="@percent($settings['agency_province_ic'])"></td>
						<td><input class="into_box account" type="text" name="agency_city_ic" value="@percent($settings['agency_city_ic'])"></td>
					</tr>
					<tr>
						<td class="bianhao">4</td>
						<td class="programme">先区后省</td>
						<td><input class="into_box account" type="text" name="agency_province_cbp" value="@percent($settings['agency_province_cbp'])"></td>
						<td><input class="into_box account" type="text" name="agency_city_cbp" value="@percent($settings['agency_city_cbp'])"></td>
					</tr>
				</tbody>
			</table>
		</div>
		<hr class="dividor" />
		<div class="configure_right_body">
			<div class="right_body_title">
				<span class="province">企业方案：</span>
			</div>
			<table>
				<thead>
					<tr>
						<td>编号</td>
						<td>方案</td>
						<td>省%</td>
						<td>区%</td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="bianhao">1</td>
						<td class="programme">独立省代</td>
						<td><input class="into_box account" type="text" name="company_province_ip" value="@percent($settings['company_province_ip'])"></td>
						<td><input class="into_box account" type="text" name="company_city_ip" value="@percent($settings['company_city_ip'])"></td>
					</tr>
					<tr>
						<td class="bianhao">2</td>
						<td class="programme">先省后区</td>
						<td><input class="into_box account" type="text" name="company_province_pbc" value="@percent($settings['company_province_pbc'])"></td>
						<td><input class="into_box account" type="text" name="company_city_pbc" value="@percent($settings['company_city_pbc'])"></td>
					</tr>
					<tr>
						<td class="bianhao">3</td>
						<td class="programme">独立区代</td>
						<td><input class="into_box account" type="text" name="company_province_ic" value="@percent($settings['company_province_ic'])"></td>
						<td><input class="into_box account" type="text" name="company_city_ic" value="@percent($settings['company_city_ic'])"></td>
					</tr>
					<tr>
						<td class="bianhao">4</td>
						<td class="programme">先区后省</td>
						<td><input class="into_box account" type="text" name="company_province_cbp" value="@percent($settings['company_province_cbp'])"></td>
						<td><input class="into_box account" type="text" name="company_city_cbp" value="@percent($settings['company_city_cbp'])"></td>
					</tr>
				</tbody>
			</table>
			<div class="right_foot">
				<div class="right_foot_img unsave">保存修改
				</div>
			</div>
		</div>
	</div>
	<div class="configure_left float_right">
		<div class="configure_left_head">
			<div class="configure_head_content clearfix">
				<div class="head_content_left float_left">
					<select id="province_select" class="province_select">
						@foreach ($provinces as $province)
						<option value="{{ $province->uuid }}" @if (\Request::get('id') === $province->uuid) selected @endif>{{ $province->name }}</option>
						@endforeach
					</select>
				</div>
				@if ($agencies->get(\Request::get('id') ?? $provinces[0]->uuid))
				<ul class="province_to clearfix">
					<li style="text-indent: 12px">{{ $agencies->get(\Request::get('id') ?? $provinces[0]->uuid)->real_name ?? '' }}</li>
					<li>{{ $agencies->get(\Request::get('id') ?? $provinces[0]->uuid)->mobile ?? '' }}</li>
					<li>{{ $agencies->has(\Request::get('id') ?? $provinces[0]->uuid) ? \Carbon\Carbon::parse($agencies->get(\Request::get('id') ?? $provinces[0]->uuid)->agent_started_at)->format('Y年m月d日') : '' }} - {{ $agencies->has(\Request::get('id') ?? $provinces[0]->uuid) ? \Carbon\Carbon::parse($agencies->get(\Request::get('id') ?? $provinces[0]->uuid)->agent_ended_at)->format('Y年m月d日') : '' }}</li>
				</ul>
				@else
			    <div class="province_agency clearfix">该省暂无省代</div>
			    @endif
			</div>
		</div>
		<div class="configure_left_body">
			<table class="left_body_table">
				<thead>
					<tr class="tbabel_row">
						<td class="thead_title">编码</td>
						<td class="thead_title">区域</td>
						<td class="thead_title">代理商姓名</td>
						<td class="thead_title">代理商手机</td>
						<td class="thead_title">代理初始时间</td>
						<td class="thead_title">代理结束时间</td>							
						<td class="thead_title">经销商方案</td>						
						<td class="thead_title">企业用户方案</td>						
					</tr>
				</thead>
				<tbody>
					@foreach ($cities as $city)
					<tr class="tbabel_row" data-uuid="{{ $city->uuid }}">
						<td class="tbody_content">BS{{ $city->code }}</td>
						<td class="tbody_content">{{ $city->name }}</td>
						<td class="tbody_content">{{ $agencies->get($city->uuid)->real_name ?? '' }}</td>
						<td class="tbody_content">{{ $agencies->get($city->uuid)->mobile ?? '' }}</td>
						<td class="tbody_content">{{ $agencies->has($city->uuid) ? \Carbon\Carbon::parse($agencies->get($city->uuid)->agent_started_at)->format('Y年m月d日') : '' }}</td>	
						<td class="tbody_content">{{ $agencies->has($city->uuid) ? \Carbon\Carbon::parse($agencies->get($city->uuid)->agent_ended_at)->format('Y年m月d日') : '' }}</td>	
						<td class="tbody_content">
							@if (isset($agencies->get($city->uuid)->bonus_case))
								@if ($agencies->get($city->uuid)->bonus_case === 'ip')
								省：@percent($settings['agency_province_ip'])% 区：@percent($settings['agency_city_ip'])%
								@elseif ($agencies->get($city->uuid)->bonus_case === 'pbc')
								省：@percent($settings['agency_province_pbc'])% 区：@percent($settings['agency_city_pbc'])%
								@elseif ($agencies->get($city->uuid)->bonus_case === 'ic')
								省：@percent($settings['agency_province_ic'])% 区：@percent($settings['agency_city_ic'])%
								@elseif ($agencies->get($city->uuid)->bonus_case === 'cbp')
								省：@percent($settings['agency_province_cbp'])% 区：@percent($settings['agency_city_cbp'])%
								@endif
							@endif
						</td>
						<td class="tbody_content">
							@if (isset($agencies->get($city->uuid)->bonus_case))
								@if ($agencies->get($city->uuid)->bonus_case === 'ip')
								省：@percent($settings['company_province_ip'])% 区：@percent($settings['company_city_ip'])%
								@elseif ($agencies->get($city->uuid)->bonus_case === 'pbc')
								省：@percent($settings['company_province_pbc'])% 区：@percent($settings['company_city_pbc'])%
								@elseif ($agencies->get($city->uuid)->bonus_case === 'ic')
								省：@percent($settings['company_province_ic'])% 区：@percent($settings['company_city_ic'])%
								@elseif ($agencies->get($city->uuid)->bonus_case === 'cbp')
								省：@percent($settings['company_province_cbp'])% 区：@percent($settings['company_city_cbp'])%
								@endif
							@endif
						</td>
					</tr>
					@endforeach
				</tbody>
			</table>
		</div>
	</div>
</div>
@endsection

@section('css')
<link rel="stylesheet" type="text/css" href="/css/configure.css">
<link rel="stylesheet" type="text/css" href="/css/bonus_programme.css">
<link rel="stylesheet" type="text/css" href="/css/divided_table.css">
@endsection

@section('js')
<script type="text/javascript" src='/js/bonus_programme.js'></script>
<script type="text/javascript">
	window.global.index = "{{ action('BonusController@index') }}";
	window.global.store = "{{ action('BonusController@store') }}";
</script>
@endsection
