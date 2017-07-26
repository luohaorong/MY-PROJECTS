$(function() {
	//轮播开始
	var opts = {
		boxh: 354, //轮播的高度
		w: 10000, //图片宽度
		h: 354, //图片高度
		isShow: true, //是否显示控制按钮
		isShowBtn: true, //是否显示左右按钮
		controltop: 0, //控制器按钮上下偏移距离 
		controlsW: 0, //控制按钮宽度
		controlsH: 0, //控制按钮高度
		radius: 4, //圆角度数
		speed: 3000,
		controlsColor: "#4b3b1b", //普通控制按钮的颜色
		controlsCurrentColor: "#7b1712" //当前控制按钮的颜色
	};
	$("#ppt").tyslide(opts);
	search();//搜索框效果
	navigation();//导航效果
	commodity_show();//商品列表展示效果
	aside();//   两侧效果
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
		//搜索框下面导航效果	
		$('#login_logo .nav_top').find('a').mouseenter(function() {
			$(this).addClass('first_list').parent().siblings().find('a').removeClass('first_list');
		});
		//采购导航效果
		$('#index_container').find('.nav_first').mouseenter(function() {
			$('#index_container').find('.nav_first').css('backgroundColor', '#FF0000');
			$('#index_container').find('.sub_list').stop(true, true).slideDown('fast');
		});
		$('#index_container').find('.nav_first').mouseleave(function() {
			$('#index_container').find('.nav_first').css('backgroundColor', '#661b18');
			$('#index_container').find('.sub_list').stop(true, true).slideUp('fast');
		});
		$('#index_container .sub_list').find('li').mouseenter(function() {
			$(this).addClass('purchase_sub').siblings().removeClass('purchase_sub');
			$(this).find('a').css('color', '#ffffff');
		});
		$('#index_container .sub_list').find('li').mouseleave(function() {
			$(this).find('a').css('color', '#ae221c');
			$(this).removeClass('purchase_sub');
		});
		//其他导航效果
//		$('#index_container .nav_list>li').not('.nav_first').mouseenter(function() {
//			$(this).find('a').addClass('nav_current').parent().siblings().find('a').removeClass('nav_current')
//		});
		var nav_li=$('#index_container .nav_list>li').not('.nav_first');
		
			var current_li=$('[data_current]');
		nav_li.hover(function() {
				$(this).find('a').addClass('nav_current').parent().siblings().find('a').not(current_li).removeClass('nav_current')
		},function(){
			$(this).find('a').not(current_li).removeClass('nav_current');
		});
	};
	//商品列表展示效果
	function commodity_show() {
		$('.commodity .right_show .right_top>li').hover(function() {
			$(this).find('.frame_price').stop(true, true).fadeIn('slow');
			$(this).find('.single_first img').stop(true, true).animate({
				width: '82%',
				height: '82%'
			}, 500);
			$(this).find('.single_first .price').stop(true, true).hide();

		}, function() {
			$(this).find('.frame_price').stop(true, true).fadeOut('slow');
			$(this).find('.single_first img').stop(true, true).animate({
				width: '156',
				height: '188'
			}, 500);
			$(this).find('.single_first .price').stop(true, true).show();
		});
		$('.commodity .right_show .right_sub li').hover(function() {
			$(this).find('.skin').stop(true, true).animate({
				top: '1'
			}, 500);
		}, function() {
			$(this).find('.skin').stop(true, true).animate({
				top: '90'
			}, 500);
		});
	};
	//楼层效果
	$('#floor li').hover(function() {
		$(this).find('.floor_current').stop(true, true).show();

	}, function() {
		$(this).find('.floor_current').hide();
	});
	$('#floor li').click(function() {
		var id = $(this).attr('data-id');
		var toph = $('#' + id).offset().top-150 ;
		$('html,body').animate({
			scrollTop: toph
		}, 300)
	});
//   两侧效果
	function aside() {
		$(window).scroll(function() {
			//分别获取每个模块相对于body左上角的垂直高度
			var new_wine = $("#new_wine").offset().top;
			var introduction = $("#introduction").offset().top;
			var sweet_wine = $("#sweet_wine").offset().top;
			var quality_wine = $("#quality_wine").offset().top;
			var licensed = $("#licensed").offset().top;
			var pink = $("#pink").offset().top;
			var beer = $("#beer").offset().top;
			var toolbar = $('#toolbar').offset().top;
			var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;//兼容各种浏览器
			var scrollHafter = scrollTop + 200; //滚动的高度
			//右边栏定位高度
			if(scrollHafter >= 500) {
				$('#toolbar').css('top', '350px')
			} else {
				$('#toolbar').css('top', '650px')
			};
			if(scrollHafter >= 4400) {
				$('#toolbar').css('top', '200px');
			}
			if(scrollHafter > new_wine && scrollHafter < introduction) {
				$('#floor li').eq(0).find('.floor_current').stop(true, true).show();
			} else {
				$('#floor li').eq(0).find('.floor_current').stop(true, true).hide();
			};
			$('#floor li').eq(0).hover(function() {
				$('#floor li').eq(0).find('.floor_current').stop(true, true).show();
			}, function() {
				if(scrollHafter > new_wine && scrollHafter < introduction) {
					$('#floor li').eq(0).find('.floor_current').stop(true, true).show();
				} else {
					$('#floor li').eq(0).find('.floor_current').stop(true, true).hide();
				};
			});
			if(scrollHafter > introduction && scrollHafter < sweet_wine) {
				$('#floor li').eq(1).find('.floor_current').stop(true, true).show();
			} else {
				$('#floor li').eq(1).find('.floor_current').stop(true, true).hide();
			};
			$('#floor li').eq(1).hover(function() {
				$('#floor li').eq(1).find('.floor_current').stop(true, true).show();
			}, function() {
				if(scrollHafter > introduction && scrollHafter < sweet_wine) {
					$('#floor li').eq(1).find('.floor_current').stop(true, true).show();
				} else {
					$('#floor li').eq(1).find('.floor_current').stop(true, true).hide();
				};
			});
			if(scrollHafter > sweet_wine && scrollHafter < quality_wine) {
				$('#floor li').eq(2).find('.floor_current').stop(true, true).show();
			} else {
				$('#floor li').eq(2).find('.floor_current').stop(true, true).hide();
			};
			$('#floor li').eq(2).hover(function() {
				$('#floor li').eq(2).find('.floor_current').stop(true, true).show();
			}, function() {
				if(scrollHafter > sweet_wine && scrollHafter < quality_wine) {
					$('#floor li').eq(2).find('.floor_current').stop(true, true).show();
				} else {
					$('#floor li').eq(2).find('.floor_current').stop(true, true).hide();
				};
			});
			if(scrollHafter > quality_wine && scrollHafter < licensed) {
				$('#floor li').eq(3).find('.floor_current').stop(true, true).show();
			} else {
				$('#floor li').eq(3).find('.floor_current').stop(true, true).hide();
			};
			$('#floor li').eq(3).hover(function() {
				$('#floor li').eq(3).find('.floor_current').stop(true, true).show();
			}, function() {
				if(scrollHafter > quality_wine && scrollHafter < licensed) {
					$('#floor li').eq(3).find('.floor_current').stop(true, true).show();
				} else {
					$('#floor li').eq(3).find('.floor_current').stop(true, true).hide();
				};
			});
			if(scrollHafter > licensed && scrollHafter < pink) {
				$('#floor li').eq(4).find('.floor_current').stop(true, true).show();
			} else {
				$('#floor li').eq(4).find('.floor_current').stop(true, true).hide();
			};
			$('#floor li').eq(4).hover(function() {
				$('#floor li').eq(4).find('.floor_current').stop(true, true).show();
			}, function() {
				if(scrollHafter > licensed && scrollHafter < pink) {
					$('#floor li').eq(4).find('.floor_current').stop(true, true).show();
				} else {
					$('#floor li').eq(4).find('.floor_current').stop(true, true).hide();
				};
			});
			if(scrollHafter > pink && scrollHafter < beer) {
				$('#floor li').eq(5).find('.floor_current').stop(true, true).show();
			} else {
				$('#floor li').eq(5).find('.floor_current').stop(true, true).hide();
			};
			$('#floor li').eq(5).hover(function() {
				$('#floor li').eq(5).find('.floor_current').stop(true, true).show();
			}, function() {
				if(scrollHafter > pink && scrollHafter < beer) {
					$('#floor li').eq(5).find('.floor_current').stop(true, true).show();
				} else {
					$('#floor li').eq(5).find('.floor_current').stop(true, true).hide();
				};
			});
			if(scrollHafter > beer) {
				$('#floor li').eq(6).find('.floor_current').stop(true, true).show();
			} else {
				$('#floor li').eq(6).find('.floor_current').stop(true, true).hide();
			};
			$('#floor li').eq(6).hover(function() {
				$('#floor li').eq(6).find('.floor_current').stop(true, true).show();
			}, function() {
				if(scrollHafter > beer) {
					$('#floor li').eq(6).find('.floor_current').stop(true, true).show();
				} else {
					$('#floor li').eq(6).find('.floor_current').stop(true, true).hide();
				};
			});

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
		});
		var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;//兼容各种浏览器
		var scrollHafter =scrollTop+ 200; //滚动的高度
		//判断滚动的高度
		if(scrollHafter <= 500) {
			$('#floor').hide();
		} else {
			$('#floor').show();
		};
		//回到顶部
		$('#gotop').click(function() {
			$('html,body').animate({
				scrollTop:0
			}, 300);
		});
	};
	//兼容
function isBrowser(){
	var Sys={};
	var ua=navigator.userAgent.toLowerCase();
	var s;
	(s=ua.match(/msie ([\d.]+)/))?Sys.ie=s[1]:
	(s=ua.match(/firefox\/([\d.]+)/))?Sys.firefox=s[1]:
//	(s=ua.match(/chrome\/([\d.]+)/))?Sys.chrome=s[1]:
	(s=ua.match(/opera.([\d.]+)/))?Sys.opera=s[1]:
	(s=ua.match(/version\/([\d.]+).*safari/))?Sys.safari=s[1]:0;
	
	if(Sys.firefox){//Js判断为火狐(firefox)浏览器
		$('.flag').css('bottom','6px');
        $('.second_line').css({
        	paddingBottom:'0px',
        	marginTop:'-8px'
        	});
        $('.skin_sub a').css('marginLeft','10px')
	}
//	if(Sys.chrome){//Js判断为谷歌chrome浏览器
//		alert('http://www.wangjinhai119.com'+Sys.chrome);
//	}
	if(Sys.opera){//Js判断为opera浏览器
		$('#wine_type').css('left','381px');
        $('#country').css('left','558px');
	}
	if(Sys.safari){//Js判断为苹果safari浏览器
		$('.skin_top').css('paddingTop','8px');
        $('.skin p').css('width','120px');
	}
};
isBrowser();
});