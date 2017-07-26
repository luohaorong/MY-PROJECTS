$(function() {
	! function() {
		//选中的效果
		var $unlimited = $('.sub_item ul li:first-child');
		$unlimited.click(function() {
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
		$('.origin li:first-child').click(function() {
			$('.show_describe ul li').eq(1).hide().find('.chk_content span').text('');
			$('.show_describe ul li').eq(2).hide().find('.chk_content span').text('');
			console.log($(this).parent().parent().siblings().eq(0).find('li:first-child a'));
			$(this).parent().parent().siblings().eq(0).find('li:first-child a').attr('data_sign', '1').addClass('bg_crruten').parent().siblings().find('a').removeAttr('data_sign').removeClass('bg_crruten');
			$(this).parent().parent().siblings().eq(1).find('li:first-child a').attr('data_sign', '1').addClass('bg_crruten').parent().siblings().find('a').removeAttr('data_sign').removeClass('bg_crruten');
			$('.submenu').slideUp();
		});
		$('.origin li').not($('.origin li:first-child')).click(function() {
			$('.submenu').slideDown();
		});
	}();
	
});