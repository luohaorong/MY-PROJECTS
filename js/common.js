
$(function(){
	search();
navigation();

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
		var nav_li=$('#index_container .nav_list>li').not('.nav_first');
		
			var current_li=$('[data_current]');
		nav_li.hover(function() {
				$(this).find('a').addClass('nav_current').parent().siblings().find('a').not(current_li).removeClass('nav_current')
		},function(){
			$(this).find('a').not(current_li).removeClass('nav_current');
		});
	};
	$(window).scroll(function(){
		var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;//兼容各种浏览器
		var scrollHafter = scrollTop + 200; //滚动的高度
			//右边栏定位高度
			if(scrollHafter <= 300) {
				$('#toolbar').css('top', '200px')
			};
			if(scrollHafter >= 4400) {
				$('#toolbar').css('top', '200px');
			}
	});
	var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;//兼容各种浏览器
	//回到顶部
		$('#gotop').click(function() {
			$('html,body').animate({
				scrollTop: 0
			}, 300);
		});
	
});
