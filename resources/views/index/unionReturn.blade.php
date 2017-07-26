<!DOCTYPE html>
<html>

<head lang="zh-cn">
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="description" content="">
	<meta name="keywords" content="">
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<title>滕华国际</title>
	<meta name="renderer" content="webkit">
	<!-- No Baidu Siteapp-->
	<meta http-equiv="Cache-Control" content="no-siteapp">
	<link rel="alternate icon" type="image/png" href="logo.png">
	<link rel="apple-touch-icon-precomposed" href="i/app-icon72x72@2x.png">
	<meta name="apple-mobile-web-app-title" content="AMUI React">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<style type="text/css">
		.imgWrap{
			position: absolute;
			top: 20%;
			left: 50%;
			margin-left: -3.1rem;
		}
		.img{
			width: 6.125rem;
			height: 6.125rem;
		}
		.secsses{
			font-size: 1.5rem;
			color: #2ea025;
		}
		.btnWrap{
			width: 80%;
			height: 3rem;
			position: absolute;
			top: 62%;
			left: 50%;
			margin-left: -40%;
		}
		.index{

			color: #333333;
			font-size: 1.06rem;
			border-radius: 1.375rem;
			float: left;
			outline: none;
			border: 1px solid #e6e6e6;
			background-color: #FFFFFF;
			padding: 0.7rem 1.5rem;
		}
		.order{

			color: #FFFFFF;
			font-size: 1.06rem;
			border-radius: 1.375rem;
			float: right;
			outline: none;
			border: 1px solid #e6e6e6;
			background-color: #2ea025;
			padding: 0.7rem 1.5rem;
		}
	</style>
</head>

<body onload="javascript:webAc">
<div class="imgWrap">
	<img class="img" src="images/applay.png"/>
	<p class="secsses">支付成功！</p>
</div>
<div class="btnWrap">
	<div class='index' onclick="gotoHome()">返回首页</div>
	<div class="order" onclick="{{ $params === 'recharge' ? 'goonRecharge()' : 'checkOrder()' }}" data-from="{{$params}}">查看订单</div>
</div>
<script src="js/jquery.min.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript">
    var ua = navigator.userAgent;
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	var dataFrom=$('.order').attr('data-from');
    if(ua.indexOf('Android')>0){
        $('.index').click(function(){
            webAc.gotoHome()
        });
        $('.order').click(function(){
            if(dataFrom==='order_pay')
			{
				webAc.checkOrder()
            }else if(dataFrom==='recharge') {
                webAc.goonRecharge();

            }
        });
    }else{
        function gotoHome(){
            gotoHome();
        };
        function checkOrder(){
            checkOrder();
        };
        function goonRecharge(){
            goonRecharge();
        };
    }
</script>
</body>
</html>