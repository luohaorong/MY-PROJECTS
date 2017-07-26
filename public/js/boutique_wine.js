$(function() {
	$('.product_list li').each(function(index,item){
		if ((index+1)%2!==0) {
			$(this).css({
				'marginLeft':'30px',
				'marginRight':'2px'
			});
		}
	})
	//轮播开始
	var opts = {
		boxh: 306, //轮播的高度
		w: 1903, //图片宽度
		h: 306, //图片高度
		isShow: true, //是否显示控制按钮
		isShowBtn: true, //是否显示左右按钮
		controltop: 10, //控制器按钮上下偏移距离 
		controlsW: 10, //控制按钮宽度
		controlsH: 10, //控制按钮高度
		radius: 5, //圆角度数
		speed: 3000,
		controlsColor: "#4b3b1b", //普通控制按钮的颜色
		controlsCurrentColor: "#ff9900" //当前控制按钮的颜色
	};
	$("#ppt").tyslide(opts);
	search(); //搜索框效果
	navigation(); //导航效果
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
	$('<span class="shape"></span>').css({
		display: 'block',
		width: '40px',
		height: '50px',
		position: 'absolute',
		left: '18px',
		top: '-5px',
		backgroundImage: 'url(images/boutique_wine/shape.png)',
		backgroundPosition: '0 17px',
		backgroundRepeat: 'no-repeat'
	}).appendTo('.nav_first');
	$('#nav_first').css({
		paddingLeft: '50px',
		paddingRight: '54px',
		color: '#b7885a',
		cursor: 'pointer',
		position:' relative',
		marginLeft: '33px',
		backgroundColor: ''
	}).removeClass('nav_first');
	$('<img class="line_left line" src="images/boutique_wine/line_1_03.png" /><img class="line_right line" src="images/boutique_wine/line_1_03.png" />').appendTo('.nav_list>li').css({
		display:'none'
	});
	$('.active').addClass('img_crrent').siblings('.line').show();
	function navigation() {
		//搜索框下面导航效果	
		$('#login_logo .nav_top').find('a').mouseenter(function() {
			$(this).addClass('first_list').parent().siblings().find('a').removeClass('first_list');
		});
		//采购导航效果
		$('#index_container').find('#nav_first').mouseenter(function() {
			$(this).addClass('img_crrent').find('.line').show();
			$('#index_container').find('.sub_list').stop(true, true).slideDown('fast');
		});
		$('#index_container').find('#nav_first').mouseleave(function() {
			$(this).removeClass('img_crrent').find('.line').hide();
			$('#index_container').find('.sub_list').stop(true, true).slideUp('fast');
		});
		$('#index_container .sub_list').find('li').mouseenter(function() {
			$(this).addClass('purchase_sub1').siblings().removeClass('purchase_sub1');
			
		});
		$('#index_container .sub_list').find('li').mouseleave(function() {
			
			$(this).removeClass('purchase_sub1');
		});
		//其他导航效果
		$('#index_container .nav_list>li').not('#nav_first').find('a').hover(function() {
			$(this).addClass('img_crrent').siblings('.line').css({
				display:'inline'
			});
		}, function() {
			$(this).not('.active').removeClass('img_crrent').siblings('.line').css({
				display:'none'
			});
		});
	};

	//   两侧效果
	function aside() {
		//回到顶部
		$('#gotop').click(function() {
			$('html,body').animate({
				scrollTop: 0
			}, 300);
		});

	};

	//鼠标移入移出效果
	$('.product_list>li').hover(function() {
		$(this).find('.product_wap').stop(true, true).animate({
			left: -322
		}, 1000);
		$(this).find('.flower_aside').stop(true, true).fadeIn();
		$(this).find('.list_container').addClass('li_border');
	}, function() {
		$(this).find('.product_wap').stop(true, true).animate({
			left: 0
		}, 300);
		$(this).find('.flower_aside').stop(true, true).fadeOut();
		$(this).find('.list_container').removeClass('li_border');

	});

	//兼容火狐
	(function() {
		var Sys = {};
		var ua = navigator.userAgent.toLowerCase();
		var s;
		(s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1]: 0;
		if(Sys.firefox) { //Js判断为火狐(firefox)浏览器
			$('.list_container').css('margin-top', '18px');
			$('.flower_top').css({
				top:0
			});
			$('.flower_sub').css({
				top:239
			})
		};
	})();

});