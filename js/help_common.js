$(function(){
	//公共的点击收放列表
	$('.help_big_ul>li').click(function(){
		$(this).find('.help_small_ul').slideToggle();
		if ($(this).find('.help_down').css('display')=='none') {
			$(this).find('.help_down').show();
		}else{
			$(this).find('.help_down').hide();
		}
	});
	$('.help_small_ul').click(function(e){
		e.stopPropagation();
	})
});