@extends('layouts.app')

@section('content')
<div class="configure_left">
	<div class="configure_left_head">
		<div class="configure_head_content clearfix">
			<div class="head_content_left float_left">
				提现审核：
			</div>
			<div class="head_content_right float_left">
				<label class="status"><input name="status" type="radio" value="" @if ((\Request::get('status') ?? "") === "") checked="" @endif />全部</label>
				<label class="status"><input name="status" type="radio" value="ing" @if (\Request::get('status') === "ing") checked="" @endif />审核中</label> 
				<label class="status"><input name="status" type="radio" value="no" @if (\Request::get('status') === "no") checked="" @endif />已取消</label> 
				<label class="status"><input name="status" type="radio" value="yes" @if (\Request::get('status') === "yes") checked="" @endif />已完成</label> 
			</div>
		</div>
	</div>
	<div class='status_table'>
		<table class="layer_tabs">
			<thead>
				<tr>
					<th>提现单号</th>
					<th>申请时间</th>
					<th>户名代理人</th>
					<th>申请人代理人身份证</th>
					<th>银行账号开户行</th>
					<th>申请金额</th>
					<th>代理商手机号</th>
					<th>状态</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody>
				@foreach ($withdrawals as $withdrawal)
				<tr>
					<td>{{ $withdrawal->withdrawal_sn }}</td>
					<td>{{ \Carbon\Carbon::parse($withdrawal->created_at)->format('Y年m月d日 H:i') }}</td>
					<td>{{ $withdrawal->real_name }}</td>
					<td>{{ $withdrawal->id_card }}</td>
					<td>
						<p>{{ $withdrawal->bank_name }}</p>
						<p>{{ $withdrawal->bank_account }}</p>
					</td>
					<td>@currency($withdrawal->amount)</td>
					<td>{{ is_null($withdrawal->agency) ? '' : $withdrawal->agency->mobile }}</td>
					@if ($withdrawal->status === 'ing')
						<td class="dateoff">审核中</td>
					@elseif ($withdrawal->status === 'yes')
						<td class="normal">已完成</td>
					@else
						<td class="stop">已取消</td>
					@endif
					<td>
						@if ($withdrawal->status === 'ing')
						<button data-uuid="{{ $withdrawal->uuid }}" class="cancel">取消</button>
						<button data-uuid="{{ $withdrawal->uuid }}" class="finish">完成</button>
						@endif
					</td>
				</tr>
				@endforeach
			</tbody>
		</table>
	</div>
</div>
@endsection

@section('css')
<link rel="stylesheet" type="text/css" href="/css/get_cash.css">
@endsection

@section('js')
<script type="text/javascript" src='/js/withdrawal.js'></script>
<script type="text/javascript">
	window.global.index = "{{ action('WithdrawalController@check') }}";
	window.global.pass = "{{ action('WithdrawalController@pass') }}";
	window.global.deny = "{{ action('WithdrawalController@deny') }}";
</script>
@endsection
