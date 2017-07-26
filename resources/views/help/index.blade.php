@extends('layouts')

@section('CSS')
@parent
<link rel="stylesheet" href="/css/help_common.css" />
@endsection

@section('content')
<div id="help_mains">
	<div id="help_mains_container">
		<!--左边部分-->
		<div class="help_main_left">
			<div class="help_question">
				<p>帮助中心</p>
			</div>
			<ul class="help_big_ul">
			    @foreach ($articalCategories as $articalCategory)
				<li>
					<img class="help_down" src="/img/help_downarrow.png" style="display: inline;" />
					<p class="help_big_words">{{ $articalCategory['name'] }}</p>
					@if (isset($articalCategory['sub']))
					<ul class="help_small_ul" style="display: block;">
						@foreach ($articalCategory['sub'] as $articalCategorySub)
						<li>
							<a href="{{ action('HelpController@show', [ 'uuid' => $articalCategorySub['uuid'] ]) }}">
								<p class="help_small_ul_words">{{ $articalCategorySub['name'] }}</p>
							</a>
							<img class="help_righ" src="/img/help_rightarrow.png" style="{{ isset($articalCategorySub['selected']) && $articalCategorySub['selected'] ? '' : 'display: none' }}" />
						</li>
						@endforeach
					</ul>
					@endif
				</li>
				@endforeach
			</ul>
		</div>
		<!--右边部分-->
		<div class="help_main_right">
			<!--标题-->
			<div class="help_title">
				{{ $artical->name }}
			</div>
			<div class="help_subtitle">{{ $artical->name }}</div>
			<!--内容-->
			<div class="help_explain">
				{!! $artical->content !!}
			</div>
		</div>
	</div>
</div>
@endsection

@section('JS')
<script type="text/javascript" src="/js/help_common.js"></script>
@endsection
