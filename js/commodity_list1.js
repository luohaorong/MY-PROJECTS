$(function() {
	! function() {
		//鼠标移入效果
		$('.sub_item ul li').hover(function() {
			$(this).find('a').addClass('bg_crruten');
		}, function() {
			var data_sign = $(this).find('a').attr('data_sign');
			if(!data_sign) {
				$(this).find('a').removeClass('bg_crruten');
			}
		});
		//选中的效果
		var $unlimited=$('.sub_item ul li:first-child');
		$unlimited.click(function(){
			var $index_li = $(this).parent().parent().index();
			$('.show_describe ul li').eq($index_li).hide().find('.chk_content span').text('');
			$(this).find('a').attr('data_sign', '1').parent().siblings().find('a').removeAttr('data_sign').removeClass('bg_crruten');
		});
		$('.sub_item ul li').not($unlimited).click(function() {
			var $txt = $(this).find('a').text();
			var $index_li = $(this).parent().parent().index();
			$('.show_describe ul li').eq($index_li).show().find('.chk_content span').text($txt);
			$(this).find('a').attr('data_sign', '1').parent().siblings().find('a').removeAttr('data_sign').removeClass('bg_crruten');
		});
		$('.origin li:first-child').click(function(){
			$('.show_describe ul li').eq(1).hide().find('.chk_content span').text('');
			$('.show_describe ul li').eq(2).hide().find('.chk_content span').text('');
			console.log($(this).parent().parent().siblings().eq(0).find('li:first-child a'));
			$(this).parent().parent().siblings().eq(0).find('li:first-child a').attr('data_sign', '1').addClass('bg_crruten').parent().siblings().find('a').removeAttr('data_sign').removeClass('bg_crruten');
			$(this).parent().parent().siblings().eq(1).find('li:first-child a').attr('data_sign', '1').addClass('bg_crruten').parent().siblings().find('a').removeAttr('data_sign').removeClass('bg_crruten');
			$('.submenu').slideUp();
		});
		$('.origin li').not($('.origin li:first-child')).click(function(){
			$('.submenu').slideDown();
		});
		//点击删除图片的效果
		$('.show_describe .chk_content .delete_img').click(function() {
			$(this).parent().parent().hide();
			var $index = $(this).parent().parent().index();
			$('.sub_item ul li:first-child').eq($index).find('a').addClass('bg_crruten').attr('data_sign', '1').parent().siblings().find('a').removeAttr('data_sign').removeClass('bg_crruten');
		});
		//点击清空效果
		$('.empty').click(function(){
			$('.describe_list li').not('.active').hide();
			$('.sub_item ul li:first-child').find('a').addClass('bg_crruten').attr('data_sign', '1').parent().siblings().find('a').removeAttr('data_sign').removeClass('bg_crruten');
			$('.submenu').slideUp();
		})
	}();
	! function() {
		//包销选择
		$('.underwriting li').hover(function() {
			$(this).find('a').addClass('under_curent');
		}, function() {
			var data_sign = $(this).find('a').attr('data_sign');
			if(!data_sign) {
				$(this).find('a').removeClass('under_curent');
			}
		});
		$('.underwriting li').click(function() {
			var $index_curent = $(this).index();
			$('.package').eq($index_curent).addClass('package_active').stop(true, true).siblings('.package').removeClass('package_active');
			$(this).find('a').attr('data_sign', '1').parent().siblings().find('a').removeAttr('data_sign').removeClass('under_curent');
		});
	}();
});