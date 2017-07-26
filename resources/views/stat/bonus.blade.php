@extends('layouts.app')

@section('content')
<div class="head_left_inform">
<ul class="inform_list clearfix">
    <li class="inform_list_item first_item float_left">系统已运行{{ $stat['diff_in_days'] }}天</li>
    <li class="inform_list_item float_left">{{ $stat['province_count'] }}个省代（{{ $stat['province_count'] - $stat['agent_province'] }}空缺）</li>
    <li class="inform_list_item float_left">{{ $stat['city_count'] }}个市代（{{ $stat['city_count'] - $stat['agent_city'] }}空缺）</li>
    <li class="inform_list_item float_left">{{ $stat['district_count'] }}个区代（{{ $stat['district_count'] - $stat['agent_district'] }}空缺）</li>
    <li class="inform_list_item float_left">返利总额：@currency($stat['bonus_agency_province_sum'] + $stat['bonus_agency_city_sum'] + $stat['bonus_company_province_sum'] + $stat['bonus_company_city_sum'])</li>
    <li class="inform_list_item float_left">经销商返利：@currency($stat['bonus_agency_province_sum'] + $stat['bonus_agency_city_sum'])</li>
    <li class="inform_list_item float_left">企业返利：@currency($stat['bonus_company_province_sum'] + $stat['bonus_company_city_sum'])</li>
</ul>
</div>
<div class="table_left">
	<ul class="province_total">
		<li class="total_special">省代合计</li>
		<li style="text-indent: 12px">总：@currency($stat['bonus_agency_province_sum'] + $stat['bonus_company_province_sum'])</li>
		<li>经销商返利：@currency($stat['bonus_agency_province_sum'])</li>
		<li>企业返利：@currency($stat['bonus_company_province_sum'])</li>
	</ul>
	<div class="province_single clearfix">
		<select id="province_select" class="province_select">
			@foreach ($provinces as $province)
			<option value="{{ $province->uuid }}" @if (\Request::get('pid') === $province->uuid) selected @endif>{{ $province->name }}</option>
			@endforeach
		</select>
		<ul class="province_to clearfix">
			<li style="text-indent: 12px">总：@currency($stat['baps'] + $stat['bcps'])</li>
			<li>经销商返利：@currency($stat['baps'])</li>
			<li>企业返利：@currency($stat['bcps'])</li>
		</ul>
	</div>
	@foreach ($data as $dt)
	@if ($dt['agent_type'] === config('const.agencies_agent_type_province'))
	<div class="table_wrap">
		<p class="table_wrap_words">{{ $dt['real_name'] }}：<span>{{ $dt['agent_started_at'] }} - {{ $dt['agent_ended_at'] }}</span></p>
		<ul class="table_wrap_ul clearfix">
			<li>总：@currency($dt['agency_total'] + $dt['company_total'])</li>
			<li>经销商返利：@currency($dt['agency_total'])</li>
			<li>企业返利：@currency($dt['company_total'])</li>
		</ul>
		<img class="table_arrow" src="/images/query_table/table_arrow.png" alt="" />
		<div class="table_container">
			<table class="query_tabs">
				<thead>
					<tr>
						<th>统计时段</th>
						<th>合计</th>
						<th>经销商返利</th>
						<th>企业返利</th>
						<th>订单数</th>
					</tr>
				</thead>
				<tbody>
				    @foreach ($dt['data'] as $v)
					<tr>
						<td>{{ $v['months'] }}</td>
						<td>@currency($v['agency'] + $v['company'])</td>
						<td>@currency($v['agency'])</td>
						<td>@currency($v['company'])</td>
						<td>{{ $v['count'] }}</td>
					</tr>
					@endforeach
				</tbody>
			</table>
			<div data-uuid="{{ $dt['agencies_uuid'] }}" class="check_orders">查看订单明细</div>
		</div>
	</div>
	@endif
	@endforeach
</div>
<div class="table_left">
	<ul class="province_total">
		<li class="total_special">市代合计</li>
		<li style="text-indent: 12px">总：@currency($stat['bonus_agency_city_sum'] + $stat['bonus_company_city_sum'])</li>
		<li>经销商返利：@currency($stat['bonus_agency_city_sum'])</li>
		<li>企业返利：@currency($stat['bonus_company_city_sum'])</li>
	</ul>
	<div class="province_single clearfix">
		<select id="country_select" class="province_select">
			@foreach ($cities as $city)
			<option value="{{ $city->uuid }}" @if (\Request::get('cid') === $city->uuid) selected @endif>{{ $city->name }}</option>
			@endforeach
		</select>
		<ul class="province_to clearfix">
			<li style="text-indent: 12px">总：@currency($stat['bacs'] + $stat['bccs'])</li>
			<li>经销商返利：@currency($stat['bacs'])</li>
			<li>企业返利：@currency($stat['bccs'])</li>
		</ul>
	</div>
	@foreach ($data as $dt)
	@if ($dt['agent_type'] === config('const.agencies_agent_type_city'))
	<div class="table_wrap">
		<p class="table_wrap_words">{{ $dt['real_name'] }}：<span>{{ $dt['agent_started_at'] }} - {{ $dt['agent_ended_at'] }}</span></p>
		<ul class="table_wrap_ul clearfix">
			<li>总：@currency($dt['agency_total'] + $dt['company_total'])</li>
			<li>经销商返利：@currency($dt['agency_total'])</li>
			<li>企业返利：@currency($dt['company_total'])</li>
		</ul>
		<img class="table_arrow" src="/images/query_table/table_arrow.png" alt="" />
		<div class="table_container">
			<table class="query_tabs">
				<thead>
					<tr>
						<th>统计时段</th>
						<th>合计</th>
						<th>经销商返利</th>
						<th>企业返利</th>
						<th>订单数</th>
					</tr>
				</thead>
				<tbody>
				    @foreach ($dt['data'] as $v)
					<tr>
						<td>{{ $v['months'] }}</td>
						<td>@currency($v['agency'] + $v['company'])</td>
						<td>@currency($v['agency'])</td>
						<td>@currency($v['company'])</td>
						<td>{{ $v['count'] }}</td>
					</tr>
					@endforeach
				</tbody>
			</table>
			<div data-uuid="{{ $dt['agencies_uuid'] }}" class="check_orders">查看订单明细</div>
		</div>
	</div>
	@endif
	@endforeach
</div>
<div class="table_left table_right">
	<ul class="province_total">
		<li class="total_special">区代合计</li>
		<li style="text-indent: 12px">总：@currency($stat['bonus_agency_district_sum'] + $stat['bonus_company_district_sum'])</li>
		<li>经销商返利：@currency($stat['bonus_agency_district_sum'])</li>
		<li>企业返利：@currency($stat['bonus_company_district_sum'])</li>
	</ul>
	<div class="province_single clearfix">
		<select id="district_select" class="province_select">
			@foreach ($districts as $district)
			<option value="{{ $district->uuid }}" @if (\Request::get('did') === $district->uuid) selected @endif>{{ $district->name }}</option>
			@endforeach
		</select>
		<ul class="province_to clearfix">
			<li style="text-indent: 12px">总：@currency($stat['bads'] + $stat['bcds'])</li>
			<li>经销商返利：@currency($stat['bads'])</li>
			<li>企业返利：@currency($stat['bcds'])</li>
		</ul>
	</div>
	@foreach ($data as $dt)
	@if ($dt['agent_type'] === config('const.agencies_agent_type_district'))
	<div class="table_wrap">
		<p class="table_wrap_words">{{ $dt['real_name'] }}：<span>{{ $dt['agent_started_at'] }} - {{ $dt['agent_ended_at'] }}</span></p>
		<ul class="table_wrap_ul clearfix">
			<li>总：@currency($dt['agency_total'] + $dt['company_total'])</li>
			<li>经销商返利：@currency($dt['agency_total'])</li>
			<li>企业返利：@currency($dt['company_total'])</li>
		</ul>
		<img class="table_arrow" src="/images/query_table/table_arrow.png" alt="" />
		<div class="table_container">
			<table class="query_tabs">
				<thead>
					<tr>
						<th>统计时段</th>
						<th>合计</th>
						<th>经销商返利</th>
						<th>企业返利</th>
						<th>订单数</th>
					</tr>
				</thead>
				<tbody>
				    @foreach ($dt['data'] as $v)
					<tr>
						<td>{{ $v['months'] }}</td>
						<td>@currency($v['agency'] + $v['company'])</td>
						<td>@currency($v['agency'])</td>
						<td>@currency($v['company'])</td>
						<td>{{ $v['count'] }}</td>
					</tr>
					@endforeach
				</tbody>
			</table>
			<div data-uuid="{{ $dt['agencies_uuid'] }}" class="check_orders">查看订单明细</div>
		</div>
	</div>
	@endif
	@endforeach
</div>
@endsection

@section('layer')
<div class="query_table_layer">
	<div class="query_layer_container">
		<div class="layer_container_head">
			<p class="head_p">
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</p>
			<input class="export_excel" type="button" value="导出到Excel" name=""/>
			<img class="layer_cancel" src="/images/query_table/cancel.png" alt="" />
		</div>
		<table class="layer_tabs">
			<thead>
				<tr>
					<th>日期</th>
					<th>时间</th>
					<th>订单号</th>
					<th>商家</th>
					<th>商户类型</th>
					<th>订单成交额</th>
					<th>返利</th>
					<th>返利比例</th>
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
				</tr>
			</tbody>
		</table>
	</div>
</div>
@endsection

@section('css')
<link rel="stylesheet" type="text/css" href="/css/query_table.css">
<link rel="stylesheet" type="text/css" href="/css/layer.css">
@endsection

@section('js')
<script type="text/javascript" src='/js/query_table.js'></script>
<script type="text/javascript" src='/js/layer.js'></script>
<script type="text/javascript">
    window.global.index = "{{ action('StatisticController@bonus') }}";
    window.global.order = "{{ action('StatisticController@show') }}";
    window.global.bonus = "{{ action('ExcelController@bonus') }}";
    window.global.data = {!! json_encode($data, true) !!};
</script>
@endsection
