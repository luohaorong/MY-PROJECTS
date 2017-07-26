@extends('top') @section('CSS')
<link rel="stylesheet" href="/css/register1.css" />
<link rel="stylesheet" href="/css/register.css" />
<link rel="stylesheet" href="/css/registerNav.css" />
 @stop @section('content')
<div id="registerNav">
	<div class="registerNavContainer">
		<div class="registerNav_title">
			<p class="nav_cname">为了更好的购物体验，请确认您的身份</p>
			<p class="nav_egname">CONFIRM YOUR IDENTITY</p>
		</div>
		<div class="registerNav_box">
			<div class="nav_box_common nav_box_left">
				<img src="/images/nav_left.png" alt="">
				<div class="nav_box_title">
					<p class="nav_box_cname">我是经销商</p>
					<p class="nav_box_egname">BUSINESS</p>
				</div>
				<a class="nav_sure nav_sure_left" href="{{action('IndexController@register')}}"></a>
			</div>
			<div class="nav_box_common nav_box_right">
				<img src="/images/nav_right.png" alt="">
				<div class="nav_box_title">
					<p class="nav_box_cname">我是企业采购</p>
					<p class="nav_box_egname">PROCUREMENT</p>
				</div>
				<a class="nav_sure nav_sure_right" href="{{action('IndexController@enterpriseRegister')}}"></a>
			</div>
		</div>
	</div>
</div>
@stop