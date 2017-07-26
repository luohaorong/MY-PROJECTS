$(function(){
			ChangeList($('#my_sample_coupons'));
					function ChangeList(obj) {
			//文字样式的切换
			obj.children('a').children('p').addClass('words2').parents('li').siblings('li').children('a').find('p').removeClass('words2');
			//li背景样式的切换
			obj.addClass('after_hover1').siblings().removeClass('after_hover1');
			//左图标的样式切换
			//深色图标
			obj.children('a').children('.inc').removeClass('inc').addClass('inc3').parents('li').siblings('li').children('a').children('.inc3').addClass('inc').removeClass('inc3').show();
			//浅色图标
			obj.children('a').children('.inc1').addClass('inc2').removeClass('inc1').parents('li').siblings('li').children('a').children('.inc2').addClass('inc1').removeClass('inc2').hide();
			//右图标的样式切换
			obj.children('a').children('.icn_right').show().parents('li').siblings('li').children('a').find('.icn_right').hide();

			obj.parent('.listings').siblings('ul').children('li').children('a').find('p').removeClass('words2');

			obj.parent('.listings').siblings('ul').children('li').removeClass('after_hover1');

			obj.parent('ul').siblings('ul').children('li').children('a').children('.inc3').addClass('inc').removeClass('inc3').show();

			obj.parent('ul').siblings('ul').children('li').children('a').children('.inc2').addClass('inc1').removeClass('inc2').hide();

			obj.parent('ul').siblings('ul').children('li').children('a').find('.icn_right').hide();

		}
		$('.sample_common').click(function() {
			$(this).ChangeTab($(this), '.sample_ck', 'add_sample_ck', '.sample_situation', 'add_sample', '.sample_common', '.sample_container_common');
			
		});			
		(function($) {
		$.fn.extend({
			ChangeTab: function(obj1, ck, add_ck, situation, add_situation, obj2, container) {

				obj1.find(ck).addClass(add_ck).next(situation).addClass(add_situation);
				obj1.siblings(obj2).find(ck).removeClass(add_ck)
					.next(situation).removeClass(add_situation);

			}
		});
	})(jQuery)
});