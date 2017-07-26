$(function() {
	//轮播开始
	var opts = {
		boxh: 78, //轮播的高度
		w: 1070, //图片宽度
		h: 78, //图片高度
		isShow: false, //是否显示控制按钮
		isShowBtn: false, //是否显示左右按钮
		controltop: 0, //控制器按钮上下偏移距离 
		controlsW: 0, //控制按钮宽度
		controlsH: 0, //控制按钮高度
		radius: 4, //圆角度数
		speed: 3000,
		controlsColor: "#4b3b1b", //普通控制按钮的颜色
		controlsCurrentColor: "#7b1712" //当前控制按钮的颜色
	};
	$("#ppt").tyslide(opts);
	//是否现货或独家
	switch_Hook(chk, selected);
	switch_Hook(right, next_right);
	slide_box(heat, add, detract, left_list_top);
	slide_box(browse, add_sub, detract_sub, left_list_sub);
	slide_box(slid_screen, add_sub, detract_sub, wine_type);
	slide_box(origin, add_sub, detract_sub, country);
	choice_item(wine_type, slid_screen);
	choice_item(country, origin);

	//选项卡
	! function() {
		$('.option li').click(function() {
			var index = $(this).index();
			if(index == 0) {
				$(this).addClass('option_first').siblings().removeClass();
			};
			if(index == 1) {
				$(this).addClass('option_seconte').siblings().removeClass();
			};
			if(index == 2) {
				$(this).addClass('option_thirde').siblings().removeClass();
			};
			var down_box=$('.select_sub');
			$('.product_wap>ul').eq(index+2).show().stop(true, true).siblings('ul').not(down_box).hide();
		});
	}();
	//分页效果
	! function() {
		$('.page_btn').find('li').click(function() {
			$(this).attr('data_click', '1').addClass('current_pages').siblings().attr('data_click', '2').removeClass('current_pages');
		});
		var ul_node = $('.no_option');
		var li_node = $('.page_btn').find('li').not(ul_node);
		li_node.click(function() {
			ul_node.removeAttr('data_sign');
		});

		$('.sub_pages').find('div').hover(function() {
			$(this).addClass('current_pages');
		}, function() {
			$(this).removeClass('current_pages');
		});
		$('.btn_pre').click(function() {
			var text_num = $('.package_active li.current_pages').text();
			if(text_num - 2 >= 0) {
				$('.package_active .sub_pages').find('li').eq(text_num - 2).attr('data_click', '1').addClass('current_pages').siblings().attr('data_click', '2').removeClass('current_pages');
			};
		});
		$('.btn_aft').click(function() {
			var text_num = $('.package_active .current_pages').text();
			$('.package_active .no_option').removeAttr('data_sign');
			$('.package_active .sub_pages').find('li').eq(text_num).attr('data_click', '1').addClass('current_pages').siblings().attr('data_click', '2').removeClass('current_pages');
		});
		$('.sub_pages').find('li').hover(function() {
			$(this).addClass('current_pages');
		}, function() {
			var data_click = $(this).attr('data_click');
			var data_sign = $(this).attr('data_sign');
			if(data_click == '1' || data_sign == '1') {
				$(this).addClass('current_pages');
			} else {
				$(this).removeClass('current_pages');
			}

		});
	}();

	//点击左侧显示或隐藏
	function slide_box(id_click, id_add, id_det, id_up) {
		$(id_click).click(function() {
			var data_state = $(this).attr('data_state');
			if(data_state == 1) {
				$(id_add).show().parent().find(id_det).hide();
				$(id_up).stop(true, true).slideUp();
				$(this).attr('data_state', '0');
			} else {
				$(id_det).show().parent().find(id_add).hide();
				$(id_up).stop(true, true).slideDown();
				$(this).attr('data_state', '1');
			}
		});
	};
	//选择产地或筛选子选项效果
	function choice_item(item_wap, data_wap) {
		$(item_wap).find('li').hover(function() {
			$(this).css({
				backgroundColor: '#661b18',
				color: '#ffffff'
			});
		}, function() {
			$(this).css({
				backgroundColor: '#ffffff',
				color: '#333'
			});
		});
		$(item_wap).find('li').click(function() {
			var text = $(this).text();
			$(this).parent().stop(true, true).slideUp();
			$(data_wap).val(text).attr('data_state', '0');
		});
	};

	//商品缩放效果
	(function product_zoom() {
		$('#list_details .product_show>li').hover(function() {
			$(this).find('.product_pic').stop(true, true).animate({
                width: '82%',
                height: '100%'
            }, 500);
		}, function() {
			$(this).find('.product_pic').stop(true, true).animate({
                width: 200,
                height:240
            }, 500);;
		});
	})();

	//切换效果函数
	function switch_Hook(id_pre, id_aft) {
		$(id_pre).click(function() {
			$(id_aft).show().parent().find(id_pre).hide();
		});
		$(id_aft).click(function() {
			$(id_pre).show().parent().parent().find(id_aft).hide();
		});
	};
//    兼容
function isBrowser(){
	var Sys={};
	var ua=navigator.userAgent.toLowerCase();
	var s;
//	(s=ua.match(/msie ([\d.]+)/))?Sys.ie=s[1]:
	(s=ua.match(/firefox\/([\d.]+)/))?Sys.firefox=s[1]:0;
//	(s=ua.match(/chrome\/([\d.]+)/))?Sys.chrome=s[1]:
//	(s=ua.match(/opera.([\d.]+)/))?Sys.opera=s[1]:
	(s=ua.match(/version\/([\d.]+).*safari/))?Sys.safari=s[1]:0;
	//判断是否为ie
	if (!!window.ActiveXObject || "ActiveXObject" in window){
		$('#wine_type').css('left','381px');
        $('#country').css('left','559px');
	}

	if(Sys.firefox){//Js判断为火狐(firefox)浏览器
		$('#wine_type').css('left','381px');
        $('#country').css('left','558px');
	};
   	if (navigator.userAgent.toLowerCase().indexOf('opr')>=0){
   		$('#wine_type').css('left','381px');
        $('#country').css('left','558px');
    };
	if(Sys.safari){//Js判断为苹果safari浏览器
		$('#wine_type').css('left','381px');
        $('#country').css('left','558px');
	};
};
isBrowser();



});