<!DOCTYPE html>
<html>

	<head>
		<meta charset="utf-8" />
		<title>{{ \App\Setting::get('website_name') }}</title>
		<meta name="keyword" content="荟酒网,纵酒荟,法国红酒,进口葡萄酒,葡萄酒,红酒品牌,红酒代理,葡萄酒代理,红酒批发,葡萄酒批发,波尔多,波尔多红酒,拉菲葡萄酒,干红,智利葡萄酒,澳洲葡萄酒,葡萄酒品牌定制,葡萄酒oem,葡萄酒b2b平台" />
		<meta name="description" content="“荟酒网” 是进口酒水领域领先的跨境合作电子商务运营商，我们拥有多年的酒类管理经营经验和海外大型酒业集团、酒庄的合作优势，为进口批发采购商和世界各地葡萄酒生产厂家搭建可靠的直供直采平台。" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<!--IE=edge是什么版本 IE 就用什么版本的标准模式渲染，chrome=1强制IE用Google Frame渲染-->
		<meta name="renderer" content="webkit" />
		<!--代表用webkit内核 -->
		<meta http-equiv="Cache-Control" content="no-store" />
		<!--no-store  用于防止重要的信息被无意的发布。在请求消息中发送将使得请求和响应消息都不使用缓存。-->
		<meta http-equiv="Pragma" content="no-cache" />
		<!--浏览器不会缓存页面,而且浏览器无法脱机浏览-->
		<meta http-equiv="Expires" content="0" />
		<!--用来控制缓存的失效日期 -->
		<meta name="baidu-site-verification" content="8i63G6zyYQ" />
		<link rel="stylesheet" type="text/css" href="/css/common.css" />
		<link rel="stylesheet" type="text/css" href="/css/common2.css" />
		<link rel="stylesheet" type="text/css" href="/css/index.css" />
		<!--[if IE 6]>
			<link rel="stylesheet" type="text/css" href="/css/IE.css"/>
			<style>
				.logo_3d{
					display:none;
				}
				.browser{
					margin-left: 80px;
				}
				.android{
					padding-left:90px
				}
			</style>
		<![endif]-->
		<!--[if IE 7]>
			<link rel="stylesheet" type="text/css" href="/css/IE.css"/>
			<style>
				.browser{
					margin-left: 80px;
				}
			</style>
		<![endif]-->
		<!--[if IE 8]>
			<link rel="stylesheet" type="text/css" href="/css/IE.css"/>
			<style>
				.app_container{
					margin-top:-20px;
				}
			</style>
		<![endif]-->
		@yield('CSS')
		<script type="text/javascript">
			window.global = {
				orderlist: '{{ action('OrdersController@orderlist') }}'
			};
		</script>
	</head>

	<body>
		
		<!--隐藏域用于刷新页面-->
		<input type="hidden" id="refreshed" value="no">
		<!--在IE下的兼容性提示-->
		<div class="prompt_box" style="display: none;">
			<div class="text_wap">
				<p class="prompt_text">您当前的浏览器版本过低，可能存在安全风险</p>
				<p class="prompt_text">建议升级浏览器：</p>
			</div>
			<div class="browser">
				<a href="http://www.google.cn/intl/zh-CN/chrome/browser/desktop/index.html">谷歌Chrome</a>
				<a href="http://pc.uc.cn/">UC浏览器</a>
			</div>
			<div class="app_container">
				<p>或直接用荟酒网APP扫码预览：</p>
				<div class="android_ios android">
					<img src="/images/Android.png" />
					<p>Android</p>
				</div>
				<div class="android_ios ios">
					<img src="/images/Ios.png" />
					<p>IOS</p>
				</div>
			</div>
			<img class="logo_3d" src="/images/logo3D.png" />
		</div>
		<!--公共头部开始-->
		<div id="head">
			<div id="head-container">
				@if(!session('mobile'))
				<div class="not_login">
					<span class="welcome"> 您好，欢迎来到荟酒网！</span>
					<div class="work">
						<div class="work-left">
							<a href="{{action('IndexController@login')}}">账号登录</a>
						</div>
						<div class="work-right">
							<a href="{{action('IndexController@registerNav')}}">新手注册</a>
						</div>
					</div>
				</div>
				@else
				<ul class="head_list">
					<li>
						<a href="{{action('MembersController@getInfo')}}">@privacy_mobile(session('mobile'))</a>|</li>
					<li>
						<a href="{{action('IndexController@logout')}}">退出</a>|</li>
					<li>
						<a href="{{action('MembersController@getInfo')}}"> 我的荟酒</a>|</li>
					<li>
						<a href="{{action('MembersController@myblance')}}">账户余额: @currency(session('balance'))元
						</a>|</li>
					<li>
						<a href="{{action('MembersController@recharge')}}">充值</a>|</li>
					<li>
						<a href="{{action('OrdersController@orderlist',['state'=>'待支付'])}}">待支付订单:({{null ===(session('orders_count')) ? 0 :session('orders_count')}})</a>
					</li>
				</ul>
				@endif
				<ul id="head-left" style="list-style: none;">
					<li><span class="hotline">客服热线:</span><span class="number">{{ \App\Setting::get('phone') }}</span></li>
					<li>
						<a id="online1" class="online" href="javascript:;">在线客服</a>
					</li>
					<li id="help">
						<a class="help" href="{{ action('HelpController@show', [ 'uuid' => '550541c0-352c-11e7-b770-cbf619aa26a4' ]) }}">帮助中心</a>
					</li>
					<li class="cur phone_jiupinhui" onmouseover="$('.sa').show()" onmouseout="$('.sa').hide()">
						<a href="#">
							<div class="phone-img">
								<img src="/images/iphone.png" />
							</div>
							<span class="phone_login">手机登录</span>
							<div class="phone-img1">
								<img src="/images/jiantou1.png" />
							</div>
							<div class="sa" style="background: white; display: none;">
								<div class="phone-img">
									<img src="/images/iphone.png" />
								</div>
								<span class="phone_login">手机登录</span>
								<div class="phone-img1">
									<img src="/images/jiantou2.png" />
								</div>
								<div class="two">
									<div class="two_left">
										<p>扫码下载APP</p>
										<p>注册就送大礼包</p>
										<img src="/images/top_logo.png" />
									</div>
									<img class="two_right" src="/images/qrcode.png" />
								</div>
							</div>
						</a>
					</li>
				</ul>
			</div>
		</div>
		<!--头部结束-->
		<div id="login_container">
			<div id="login_logo">
				<div class="logo_container">
					<a href="{{action('IndexController@index')}}"><img class="logo_dark logo_img unload" data-src="/images/logo.png" /><img class="logo_light logo_img unload" style="display: none;" data-src="/images/logo-hover.png" />
						<span class="logo_text">
						一站式全球酒水直采直供平台
						</span>
					</a>
					@yield('search_bar') @yield('cart_bar')
				</div>
			</div>
			<!--logo结束-->
			@yield('login_bar')
		</div>
		@yield('nav_bar') @yield('content') @yield('tool_bar')

		<!--公共底部开始-->
		<div id="links">
			<div id="links-container">
				<div class="links-box">
					<div class="links_border">
						<div class="links-top">
							<span>荟酒平台</span>
							<span>购物指南</span>
							<span>付款方式</span>
							<span>物流配送</span>
							<span>专业特色</span>
							<span id="service">服务保障</span>
						</div>
					</div>
					<div class="links-bottom">
						<div class="links-a">
							<a href="{{ action('HelpController@show', [ 'uuid' => 'e1482170-3526-11e7-a10a-6f735f6ce294' ]) }}">公司简介</a>
							<a href="{{ action('HelpController@show', [ 'uuid' => '550541c0-352c-11e7-b770-cbf619aa26a4' ]) }}">账户注册</a>
							<a href="{{ action('HelpController@show', [ 'uuid' => '99008060-3533-11e7-90f7-9ba5adf5e8e9' ]) }}">优惠服务</a>
							<a href="{{ action('HelpController@show', [ 'uuid' => '98294100-3535-11e7-9f6c-233ba7c851fc' ]) }}">荟酒物流</a>
							<a href="{{ action('HelpController@show', [ 'uuid' => '0f01b9c0-3536-11e7-bcc1-07db78fb7a02' ]) }}">专业选酒</a>
							<a id="last" href="{{ action('HelpController@show', [ 'uuid' => '49219980-3536-11e7-b225-bd9ca961385b' ]) }}">正品保障</a>
						</div>
						<div class="links-a">
							<a href="{{ action('HelpController@show', [ 'uuid' => 'a46ab640-3527-11e7-82f8-6b76e581366d' ]) }}">联系我们</a>
							<a href="{{ action('HelpController@show', [ 'uuid' => '8c661f50-352d-11e7-a649-ff991df82c6c' ]) }}">购物流程</a>
							<a href="{{ action('HelpController@show', [ 'uuid' => '8b974bf0-3533-11e7-8fe6-e380c5bcf3fc' ]) }}">在线支付</a>
							<a href="{{ action('HelpController@show', [ 'uuid' => 'b12dbb00-3535-11e7-86b3-f9e9388da8cb' ]) }}">自提物流</a>
							<a href="{{ action('HelpController@show', [ 'uuid' => '1fff8920-3536-11e7-bedd-4ba40bb5a401' ]) }}">自有海运</a>
							<a id="last" href="{{ action('HelpController@show', [ 'uuid' => '6fa26e60-3536-11e7-aa0a-1b7b14ca06e7' ]) }}">正规进口</a>
						</div>
						<div class="links-a">
							<a target="_blank" href="http://weibo.com/6000313642/manage">官方微博</a>
							<a href="{{ action('HelpController@show', [ 'uuid' => 'a0f50d80-3532-11e7-bf4e-3d5339e30822' ]) }}">常见问题</a>
							<a href="{{ action('HelpController@show', [ 'uuid' => 'bd20f640-3533-11e7-b398-819ba268c35c' ]) }}">发票说明</a>
							<a href="{{ action('HelpController@show', [ 'uuid' => 'c99690b0-3535-11e7-9266-85376e552b2e' ]) }}">自选物流</a>
							<a href="{{ action('HelpController@show', [ 'uuid' => '3e942580-3536-11e7-8ac8-71a88d4fe496' ]) }}">价格保护</a>
							<a id="last" href="{{ action('HelpController@show', [ 'uuid' => '11261280-3537-11e7-be10-db62b85bccac' ]) }}">品质服务</a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="foot">
			<div id="foot-container">
				{{ \App\Setting::get('copyright') }} &copy; {{ \App\Setting::get('icp') }}
			</div>
		</div>
		
		<!--公共底部结束-->
		<div class="layer_wapper">
		<img class="wait_gif" src="/images/loading.gif"/>
		</div>
		@yield('modal')
		<script src="/js/jquery.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="/js/jquery.md5.js" type="text/javascript" charset="utf-8"></script>
		<script type="text/javascript">
			$(function() {
				$.ajaxSetup({
					dataFilter: function(data, type) {
						info = JSON.parse(data);
						if(info.code) {
							alert(info.message);
							this.fail && this.fail();
							$('.layer_wapper, .wait_gif').hide();
							if(info.code === 10027){
								window.location.href=window.global.orderlist;
							}
							return data;
						} else {
							$('.layer_wapper, .wait_gif').hide();
							return data;
						}
					}
				});
			});
		</script>
		<script src="/js/IE.js" type="text/javascript" charset="utf-8"></script>
		<script src="/js/common.js" type="text/javascript" charset="utf-8"></script>
		@yield('JS')
		<script type="text/javascript">
			$(document).ready(function() {
				// chrome 浏览器直接加上下面这个样式就行了，但是ff不识别
				$('body').css('zoom', 'reset');
				$(document).keydown(function(event) {

					if((event.ctrlKey === true || event.metaKey === true) &&
						(event.which === 61 || event.which === 107 ||
							event.which === 173 || event.which === 109 ||
							event.which === 187 || event.which === 189)) {
						event.preventDefault();
					}
				});

				$(window).bind('mousewheel DOMMouseScroll', function(event) {
					if(event.ctrlKey === true || event.metaKey) {
						event.preventDefault();
					}
				});

			})
		</script>
		<!-- <script>
			(function(m, ei, q, i, a, j, s) {
				m[i] = m[i] || function() {
					(m[i].a = m[i].a || []).push(arguments)
				};
				j = ei.createElement(q),
					s = ei.getElementsByTagName(q)[0];
				j.async = true;
				j.charset = 'UTF-8';
				j.src = '//static.meiqia.com/dist/meiqia.js';
				s.parentNode.insertBefore(j, s);
			})(window, document, 'script', '_MEIQIA');
			_MEIQIA('entId', '53800');
			_MEIQIA('withoutBtn');
			
			var _hmt = _hmt || [];
			(function() {
				var hm = document.createElement("script");
				hm.src = "https://hm.baidu.com/hm.js?a50e01cf49f4ccd2255ac90caf94f292";
				var s = document.getElementsByTagName("script")[0];
				s.parentNode.insertBefore(hm, s);
			})();
		</script> -->
		<div style="display: none;">
		<script src="http://wpa.b.qq.com/cgi/wpa.php?key=XzgwMDgyNDAyOF80NzAyODlfODAwODI0MDI4Xw" type="text/javascript" charset="utf-8"></script>
		<script type="text/javascript">
			BizQQWPA.addCustom([{aty: '0', nameAccount: '800824028', selector: 'online1'}, {aty: '0', nameAccount: '800824028', selector: 'online2'}]);
		</script>
		</div>
	</body>

</html>
