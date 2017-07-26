@if ($breadcrumbs)
    <div class="nav_router">
		<ul class="nav_router_list">
		@foreach ($breadcrumbs as $breadcrumb)
			<li>
				<a href="{{ $breadcrumb->url }}">{{ $breadcrumb->title }}</a>
			</li>
			@if (!$breadcrumb->last)
			<li class="nav_router_arrow">
				<img src="/images/rightarrow.png">
			</li>
			@endif
		@endforeach
		</ul>
	</div>
@endif
