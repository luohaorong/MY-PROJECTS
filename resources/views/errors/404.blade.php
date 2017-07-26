<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>{{ \App\Setting::get('website_name') }}</title>
	</head>
	<style>* {
	padding: 0;
	margin: 0;
}

body {
	background-color: #52abd6;
}

a {
	text-decoration: none;
	color: #FFFFFF;
	font-size: 22px;
}

.container_notfound {
	width: 100%;
	height: 100%;
}

.container_notfound_container {
	width: 1280px;
	/*height: 100%;*/
	margin: 80px auto;
	position: relative;
}

.container_notfound_container .light {
	width: 1280px;
	/*height: 100%;*/
}

.container_notfound_container .computer {
	position: absolute;
	top: 20%;
	left: 50%;
	margin-left: -500px;
}

.container_notfound_container .sorry {
	position: absolute;
	top: 20%;
	left: 60%;
}

.tips {
	width: 540px;
	height: 180px;
	position: absolute;
	top: 270px;
	right: -30px;
}

.tips p {
	font-size: 22px;
	color: #FFFFFF;
	line-height: 34px;
}

.tips .back_pre {
	background-image: url(../img/go.png);
	background-repeat: no-repeat;
	background-position: 6px 6px;
	padding-left: 22px;
	width: 100px;
	height: 22px;
	margin-top: 30px;
}

.tips .go_index {
	margin-top: 20px;
	background-image: url(../img/go.png);
	background-repeat: no-repeat;
	background-position: 6px 6px;
	padding-left: 22px;
	width: 320px;
	height: 22px;
}

.tips .go_index span {
	font-size: 22px;
	color: #FFFFFF;
}

.tips .go_index .go_index_sec {
	margin-left: 10px;
	color: yellow;
}</style>
	<body>
		<div class="container_notfound">
			<div class="container_notfound_container">
				<img class="light" src="/img/light.png" alt="" />
				<img class="computer" src="/img/computer.png" alt="" />
				<img class="sorry" src="/img/sorry.png" alt="" />
				<div class="tips">
					<p>
						您访问的页面走丢啦，小伙伴们正在努力ing...
					</p>
					<p>
						点击以下链接继续浏览网站：
					</p>
					<div class="back_pre">
						<a href="javascript:history.go(-1);">
							返回上页
						</a>
					</div>
					<div class="go_index">
						<a href="/">
							返回首页
						</a>
						<span class="go_index_sec">3</span>
						<span>秒之后将自动跳转</span>
					</div>

				</div>
			</div>

		</div>
		<script type="text/javascript" src="/js/jquery.min.js" ></script>
		<script>
				$(function(){
			var sec=parseInt($('.go_index_sec').text());
			var time=setInterval(showtime,1000);
			function showtime(){
				sec--;
				$('.go_index_sec').text(sec);
				if (sec<=0) {
					clearInterval(time);
					window.location.href = '/';
				}
			}
		});
</script>
	</body>
</html>
