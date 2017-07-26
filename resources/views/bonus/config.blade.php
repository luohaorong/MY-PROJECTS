@extends('layouts.app')

@section('content')
<div class="configure_container clearfix">
	<div class="configure_right float_left" style="width: 100%;">
		<div class="configure_right_head">
			<div class="configure_head_content">
					分红方案配置
			</div>
		</div>			
		<div class="configure_right_body">
		    <div class="form-input">
				分红比例：<input class="input-control" type="text" name="bonus" value="{{ $bonus / 100 }}">%
			</div>
		</div>
	</div>
</div>
@endsection

@section('css')
<link rel="stylesheet" type="text/css" href="/css/configure.css">
@endsection

@section('js')
<script type="text/javascript" src='/js/config.js'></script>
<script type="text/javascript">
	window.global.store = "{{ action('BonusController@setting') }}";
</script>
@endsection
