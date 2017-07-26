$(function() {
	//轮播开始
	var opts = {
		boxh: 306, //轮播的高度
		w: 1920, //图片宽度
		h: 306, //图片高度
		isShow: true, //是否显示控制按钮
		isShowBtn: true, //是否显示左右按钮
		controltop: 8, //控制器按钮上下偏移距离 
		controlsW: 8, //控制按钮宽度
		controlsH: 8, //控制按钮高度
		radius: 4, //圆角度数
		spacing:8,
		speed: 3000,
		controlsColor: "#ccc", //普通控制按钮的颜色
		controlsCurrentColor: "#ff9900" //当前控制按钮的颜色
	};
	$("#ppt").tyslide(opts);
	search(); //搜索框效果
	navigation(); //导航效果
	commodity_show(); //商品列表展示效果
	aside(); //   两侧效果
	//搜索框函数
	function search() {
		var data_content = $('#search_input').attr('data_content');
		$('#search_input').val(data_content).css('color', '#999');
		$('#search_input').focus(function() {
			var search_val = $('#search_input').val();
			if(search_val == data_content) {
				$('#search_input').val('').css('color', '#000');
			};
		});
		$('#search_input').blur(function() {
			var search_val = $('#search_input').val();
			if(!search_val) {
				$('#search_input').val(data_content).css('color', '#999');
			};
		});
	};
	//导航效果
	function navigation() {
		$('.sub_list').show();
		//采购导航效果
		$('#index_container').find('.nav_first').off('mouseenter');
		$('#index_container').find('.nav_first').off('mouseleave');
	};
	//商品列表展示效果
	function commodity_show() {
		$('.third_line').hover(function(){
			$(this).find('a').addClass('third_line_add').removeClass('three');
		},function(){
			$(this).find('a').removeClass('third_line_add').addClass('three');
		});
		$('.commodity .right_show .right_top>li').hover(function() {
			
			$(this).find('.frame_price').stop(true, true).fadeIn('slow');
			if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){  
		         $(this).find('.single_first .sole_last').stop(true, true).animate({
					width: '144px',
					height:'198px',
					top:'30px',
					left:'48%'
				}, 200);
		   }else{
				$(this).find('.single_first .sole_last').stop(true, true).animate({
					zoom: 1.05,
					top: '20px'
				}, 200);
		  };
			$(this).find('.single_first .price').stop(true, true).hide();

		}, function() {
			
			$(this).find('.frame_price').stop(true, true).fadeOut('slow');
			if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){  
		         $(this).find('.single_first .sole_last').stop(true, true).animate({
					width: '136px',
					height:'188px',
					top:'30px',
					left:'50%'
				}, 200);
		   }else{
			$(this).find('.single_first .sole_last').stop(true, true).animate({
				zoom: 1,
				top: '30px'
			}, 200);
		  };
			
			$(this).find('.single_first .price').stop(true, true).show();
		});
		$('.commodity .right_show .right_sub li').hover(function() {
			$(this).find('.skin_top,.skin_middle,.skin_sub').stop(true, true).animate({
				right: '24'
				
			}, 200);
			$(this).find('.sole_last').stop(true,true).animate({
				left:'0'
			},200);
		}, function() {
			$(this).find('.skin_top,.skin_middle,.skin_sub').stop(true, true).animate({
				right: '20'
			}, 200);
			$(this).find('.sole_last').stop(true,true).animate({
				left:'4'
			},200);
		});
	};
	//楼层效果
	$('#floor li').hover(function() {
		$(this).find('.floor_current').stop(true, true).show();

	}, function() {
		var data_current=$(this).find('.floor_current').attr('data_current');
		if(data_current!='1'){
			$(this).find('.floor_current').hide();
		}
	});
	$('#floor li').click(function() {
		var id = $(this).attr('data-id');
		var toph = $('#' + id).offset().top - 180;
		$('html,body').animate({
			scrollTop: toph
		}, 300)
	});

	//   两侧效果
	function aside() {
	    // var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
	    // console.log(clientHeight);
	    // var toolbarHeight = $('#toolbar').height();
	    // console.log(toolbarHeight);
	    // var toolbarTop = clientHeight - toolbarHeight -290;
		// $('#toolbar').css('top', toolbarTop);
		$(window).scroll(function() {

			floor_left();
		});
		function floor_left(){
			//分别获取每个模块相对于body左上角的垂直高度
			
			var module_arr = []
			$.each($('#floor li'), function(index, item) {
				var data_id = $(item).attr('data-id');
				var module_h = $("#" + data_id).offset().top;
				module_arr.push(module_h);
			});
			var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop; //兼容各种浏览器
			var scrollHafter = scrollTop + 220; //滚动的高度

			//右边栏定位高度
			// console.log(scrollHafter,toolbarTop)
			if(scrollHafter < 500) {
				$('#toolbar').css('top', '500px')
			}
			if (scrollHafter>=530) {
				
				$('#toolbar').css('top', '150px')
			}

			if(scrollHafter >= 4400) {
				$('#toolbar').css('top', '200px');
			}
			
			for(var i = 0; i < module_arr.length; i++) {
				if(i < module_arr.length - 1) {
					if(scrollHafter > module_arr[i] && scrollHafter < module_arr[i + 1]) {
						$('#floor li').eq(i).find('.floor_current').stop(true, true).show().attr('data_current','1');
					} else {
						$('#floor li').eq(i).find('.floor_current').stop(true, true).hide().removeAttr('data_current');
					};
				} else {
					if(scrollHafter > module_arr[module_arr.length - 1]) {
						$('#floor li').eq(module_arr.length - 1).find('.floor_current').stop(true, true).show();
					} else {
						$('#floor li').eq(module_arr.length - 1).find('.floor_current').stop(true, true).hide();
					};
					$('#floor li').eq(module_arr.length - 1).hover(function() {
						$('#floor li').eq(module_arr.length - 1).find('.floor_current').stop(true, true).show();
					}, function() {
						if(scrollHafter > module_arr[module_arr.length - 1]) {
							$('#floor li').eq(module_arr.length - 1).find('.floor_current').stop(true, true).show();
						} else {
							$('#floor li').eq(module_arr.length - 1).find('.floor_current').stop(true, true).hide();
						};
					});
				}

			};
			//判断左边栏滚动的高度
			
			if(scrollHafter <= 500) {
				
				$('#floor').hide();
			} else {
				$('#floor').show();
			};
			if(scrollHafter <= 750) {
				$('#floor').css('top', '200px');
			}
			if(scrollHafter >= 4300) {
				$('#floor').css('top', '100px');
			}
		};
		floor_left();
		var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop; //兼容各种浏览器
		var scrollHafter = scrollTop + 200; //滚动的高度
		//判断滚动的高度
		if(scrollHafter <= 500) {
			$('#floor').hide();
		} else {
			$('#floor').show();
		};
		//回到顶部
		$('#gotop').click(function() {
			$('html,body').animate({
				scrollTop: 0
			}, 300);
		});
	};
	//兼容
	function isBrowser() {
		var Sys = {};
		var ua = navigator.userAgent.toLowerCase();
		var s;
		(s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1]:
			(s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
			//	(s=ua.match(/chrome\/([\d.]+)/))?Sys.chrome=s[1]:
			(s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
			(s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

		if(Sys.firefox) { //Js判断为火狐(firefox)浏览器
			$('.flag').css('bottom', '16px');
			$('.second_line').css({
				paddingBottom: '0px',
				marginTop: '-8px'
			});
			$('.skin_sub a').css('marginLeft', '10px')
		}
		//	if(Sys.chrome){//Js判断为谷歌chrome浏览器
		//		alert('http://www.wangjinhai119.com'+Sys.chrome);
		//	}
		if(Sys.opera) { //Js判断为opera浏览器
			$('#wine_type').css('left', '381px');
			$('#country').css('left', '558px');
		}
		if(Sys.safari) { //Js判断为苹果safari浏览器
			$('.skin_top').css('paddingTop', '8px');
			$('.skin p').css('width', '120px');
		}
	};
	isBrowser();
});
