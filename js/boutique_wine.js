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
			$('#index_container').find('.nav_first').addClass('img_crrent').find('.line').show();
			$('#index_container').find('.sub_list').stop(true, true).slideDown('fast');
		});
		$('#index_container').find('.nav_first').mouseleave(function() {
			$('#index_container').find('.nav_first').removeClass('img_crrent').find('.line').hide();
			$('#index_container').find('.sub_list').stop(true, true).slideUp('fast');
		});
		$('#index_container .sub_list').find('li').mouseenter(function() {
			$(this).addClass('purchase_sub').siblings().removeClass('purchase_sub');
			$(this).find('a').css('color', '#ffffff');
		});
		$('#index_container .sub_list').find('li').mouseleave(function() {
			$(this).find('a').css('color', '#333333');
			$(this).removeClass('purchase_sub');
		});
		//其他导航效果
		$('#index_container .nav_list>li').not('.nav_first').find('a').hover(function() {
			$(this).addClass('img_crrent').find('.line').show();
		},function(){
			$(this).not('.jingpin').removeClass('img_crrent').find('.line').hide();
		});
	};
	

//   两侧效果
	function aside() {
		//回到顶部
		$('#gotop').click(function() {
			$('html,body').animate({
				scrollTop:0
			}, 300);
		});
		
	};
	
	//鼠标移入移出效果
	$('.product_list>li').hover(function(){
		$(this).find('.product_wap').stop(true,true).animate({
			left:-322
		},1000);
		$(this).find('.flower_aside').stop(true,true).fadeIn();
		$(this).find('.list_container').addClass('li_border');
	},function(){
		$(this).find('.product_wap').stop(true,true).animate({
			left:0
		},300);
		$(this).find('.flower_aside').stop(true,true).fadeOut();
		$(this).find('.list_container').removeClass('li_border');
		
	});
	//兼容火狐
	(function(){
		var Sys={};
		var ua=navigator.userAgent.toLowerCase();
		var s;
		(s=ua.match(/firefox\/([\d.]+)/))?Sys.firefox=s[1]:0;
		if(Sys.firefox){//Js判断为火狐(firefox)浏览器
			$('.list_container').css('margin-top','18px')
		};
	})();
	

});