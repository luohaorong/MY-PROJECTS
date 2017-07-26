@extends('layouts.app')

@section('content')
<div class="head_left_inform">
<ul class="inform_list clearfix">
    <li class="inform_list_item first_item float_left">系统已运行{{ $stat['diff_in_days'] }}天</li>
    <li class="inform_list_item float_left">返利总额：@currency($stat['province_withdrawal_total'] + $stat['city_withdrawal_total'] + $stat['district_withdrawal_total'])</li>
    <li class="inform_list_item float_left">已提现：@currency($stat['province_withdrawaled_total'] + $stat['city_withdrawaled_total'] + $stat['district_withdrawaled_total'])</li>
    <li class="inform_list_item float_left">可提现：@currency($stat['province_withdrawal_total'] + $stat['city_withdrawal_total'] + $stat['district_withdrawal_total'] - $stat['province_withdrawaled_total'] - $stat['city_withdrawaled_total'] - $stat['district_withdrawaled_total'])</li>
    <li class="inform_list_item float_left">冻结：@currency($stat['province_withdrawal_freeze_total'] + $stat['city_withdrawal_freeze_total'] + $stat['district_withdrawal_freeze_total'])</li>
</ul>
</div>
<div class="table_left">
	<ul class="province_total">
		<li class="total_special">省代合计</li>
		<li style="text-indent: 12px">总：@currency($stat['province_withdrawal_total'])</li>
		<li>已提现：@currency($stat['province_withdrawaled_total'])</li>
		<li>可提现：@currency($stat['province_withdrawal_total'] - $stat['province_withdrawaled_total'])</li>
		<li>冻结：@currency($stat['province_withdrawal_freeze_total'])</li>
	</ul>
	<div class="province_single clearfix">
		<select id="province_select" class="province_select">
			@foreach ($provinces as $province)
			<option value="{{ $province->uuid }}" @if (\Request::get('pid') === $province->uuid) selected @endif>{{ $province->name }}</option>
			@endforeach
		</select>
		<ul class="province_to clearfix">
			<li style="text-indent: 12px">总：@currency($stat['province_withdrawal'])</li>
			<li>已提现：@currency($stat['province_withdrawaled'])</li>
			<li>可提现：@currency($stat['province_withdrawal'] - $stat['province_withdrawaled'])</li>
			<li>冻结：@currency($stat['province_withdrawal_freeze'])</li>
		</ul>
	</div>
	@foreach ($data as $dt)
	@if ($dt['agency']->agent_type === config('const.agencies_agent_type_province'))
	<div class="table_wrap">
		<p class="table_wrap_words">{{ $dt['agency']->real_name }}：<span>{{ \Carbon\Carbon::parse($dt['agency']->agent_started_at)->format('Y年m月d日') }} - {{ \Carbon\Carbon::parse($dt['agency']->agent_ended_at)->format('Y年m月d日') }}</span></p>
		<ul class="table_wrap_ul clearfix">
			<li>总：@currency($dt['total'])</li>
			<li>已提现：@currency($dt['withdrawal'])</li>
			<li>可提现：@currency($dt['total'] - $dt['withdrawal'])</li>
			<li>冻结：@currency($dt['freeze'])</li>
		</ul>
		<img class="table_arrow" src="/images/query_table/table_arrow.png" alt="" />
		<div class="table_container">
			<table class="query_tabs">
				<thead>
					<tr>
						<th>提现申请时间</th>
						<th>提现完成时间</th>
						<th>提现金额</th>
						<th>备注</th>
					</tr>
				</thead>
				<tbody>
				    @foreach ($dt['data'] as $v)
					<tr>
						<td>{{ \Carbon\Carbon::parse($v->created_at)->format('Y年m月d日 H:i') }}</td>
						<td>{{ \Carbon\Carbon::parse($v->updated_at)->format('Y年m月d日 H:i') }}</td>
						<td>@currency($v->amount)</td>
						<td>{{ $v->remark }}</td>
					</tr>
					@endforeach
				</tbody>
			</table>
			<div data-uuid="{{ $dt['agency']->uuid }}" class="check_orders">查看订单明细</div>
		</div>
	</div>
	@endif
	@endforeach
</div>
<div class="table_left">
	<ul class="province_total">
		<li class="total_special">市代合计</li>
		<li style="text-indent: 12px">总：@currency($stat['city_withdrawal_total'])</li>
		<li>已提现：@currency($stat['city_withdrawaled_total'])</li>
		<li>可提现：@currency($stat['city_withdrawal_total'] - $stat['city_withdrawaled_total'])</li>
		<li>冻结：@currency($stat['city_withdrawal_freeze_total'])</li>
	</ul>
	<div class="province_single clearfix">
		<select id="country_select" class="province_select">
			@foreach ($cities as $city)
			<option value="{{ $city->uuid }}" @if (\Request::get('cid') === $city->uuid) selected @endif>{{ $city->name }}</option>
			@endforeach
		</select>
		<ul class="province_to clearfix">
			<li style="text-indent: 12px">总：@currency($stat['city_withdrawal'])</li>
			<li>已提现：@currency($stat['city_withdrawaled'])</li>
			<li>可提现：@currency($stat['city_withdrawal'] - $stat['city_withdrawaled'])</li>
			<li>冻结：@currency($stat['city_withdrawal_freeze'])</li>
		</ul>
	</div>
	@foreach ($data as $dt)
	@if ($dt['agency']->agency_type === config('const.agencies_agent_type_city'))
	<div class="table_wrap">
		<p class="table_wrap_words">{{ $dt['agency']->real_name }}：<span>{{ \Carbon\Carbon::parse($dt['agency']->agent_started_at)->format('Y年m月d日') }} - {{ \Carbon\Carbon::parse($dt['agency']->agent_ended_at)->format('Y年m月d日') }}</span></p>
		<ul class="table_wrap_ul clearfix">
			<li>总：@currency($dt['total'])</li>
			<li>已提现：@currency($dt['withdrawal'])</li>
			<li>可提现：@currency($dt['total'] - $dt['withdrawal'])</li>
			<li>冻结：@currency($dt['freeze'])</li>
		</ul>
		<img class="table_arrow" src="/images/query_table/table_arrow.png" alt="" />
		<div class="table_container">
			<table class="query_tabs">
				<thead>
					<tr>
						<th>提现申请时间</th>
						<th>提现完成时间</th>
						<th>提现金额</th>
						<th>备注</th>
					</tr>
				</thead>
				<tbody>
				    @foreach ($dt['data'] as $v)
					<tr>
						<td>{{ \Carbon\Carbon::parse($v->created_at)->format('Y年m月d日 H:i') }}</td>
						<td>{{ \Carbon\Carbon::parse($v->updated_at)->format('Y年m月d日 H:i') }}</td>
						<td>@currency($v->amount)</td>
						<td>{{ $v->remark }}</td>
					</tr>
					@endforeach
				</tbody>
			</table>
			<div data-uuid="{{ $dt['agency']->uuid }}" class="check_orders">查看订单明细</div>
		</div>
	</div>
	@endif
	@endforeach
</div>
<div class="table_left table_right">
	<ul class="province_total">
		<li class="total_special">区代合计</li>
		<li style="text-indent: 12px">总：@currency($stat['district_withdrawal_total'])</li>
		<li>已提现：@currency($stat['district_withdrawaled_total'])</li>
		<li>可提现：@currency($stat['district_withdrawal_total'] - $stat['district_withdrawaled_total'])</li>
		<li>冻结：@currency($stat['district_withdrawal_freeze_total'])</li>
	</ul>
	<div class="province_single clearfix">
		<select id="district_select" class="province_select">
			@foreach ($districts as $district)
			<option value="{{ $district->uuid }}" @if (\Request::get('did') === $district->uuid) selected @endif>{{ $district->name }}</option>
			@endforeach
		</select>
		<ul class="province_to clearfix">
			<li style="text-indent: 12px">总：@currency($stat['district_withdrawal'])</li>
			<li>已提现：@currency($stat['district_withdrawaled'])</li>
			<li>可提现：@currency($stat['district_withdrawal'] - $stat['district_withdrawaled'])</li>
			<li>冻结：@currency($stat['district_withdrawal_freeze'])</li>
		</ul>
	</div>
	@foreach ($data as $dt)
	@if ($dt['agency']->agency_type === config('const.agencies_agent_type_district'))
	<div class="table_wrap">
		<p class="table_wrap_words">{{ $dt['agency']->real_name }}：<span>{{ \Carbon\Carbon::parse($dt['agency']->agent_started_at)->format('Y年m月d日') }} - {{ \Carbon\Carbon::parse($dt['agency']->agent_ended_at)->format('Y年m月d日') }}</span></p>
		<ul class="table_wrap_ul clearfix">
			<li>总：@currency($dt['total'])</li>
			<li>已提现：@currency($dt['withdrawal'])</li>
			<li>可提现：@currency($dt['total'] - $dt['withdrawal'])</li>
			<li>冻结：@currency($dt['freeze'])</li>
		</ul>
		<img class="table_arrow" src="/images/query_table/table_arrow.png" alt="" />
		<div class="table_container">
			<table class="query_tabs">
				<thead>
					<tr>
						<th>提现申请时间</th>
						<th>提现完成时间</th>
						<th>提现金额</th>
						<th>备注</th>
					</tr>
				</thead>
				<tbody>
				    @foreach ($dt['data'] as $v)
					<tr>
						<td>{{ \Carbon\Carbon::parse($v->created_at)->format('Y年m月d日 H:i') }}</td>
						<td>{{ \Carbon\Carbon::parse($v->updated_at)->format('Y年m月d日 H:i') }}</td>
						<td>@currency($v->amount)</td>
						<td>{{ $v->remark }}</td>
					</tr>
					@endforeach
				</tbody>
			</table>
			<div data-uuid="{{ $dt['agency']->uuid }}" class="check_orders">查看订单明细</div>
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
				<span></span>
			</p>
			<input class="export_excel" type="button" value="导出到Excel" name=""/>
			<img class="layer_cancel" src="/images/query_table/cancel.png" alt="" />
		</div>
		<table class="layer_tabs">
			<thead>
				<tr>
					<th>提现申请时间</th>
					<th>提现完成时间</th>
					<th>提现金额</th>
					<th>户名</th>
					<th>银行账号</th>
					<th>开户行</th>
					<th>备注</th>
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
<script type="text/javascript" src='/js/query_withdrawal.js'></script>
<script type="text/javascript" src='/js/layer.js'></script>
<script type="text/javascript">
    window.global.index = "{{ action('StatisticController@withdrawal') }}";
    window.global.detail = "{{ action('StatisticController@detail') }}";
    window.global.withdrawal = "{{ action('ExcelController@withdrawal') }}";
    window.global.data = {!! json_encode($data, true) !!};
</script>
@endsection
