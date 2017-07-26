$(function(){
	
//	if ($('.no_order').length==0) {
//		alert('您的定制已成功，荟酒网客服会尽快联系您（请保持电话畅通）。如有疑问请拨打客服电话！')
//	}
			ChangeList($('#personal_my_custom'));
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
					//Enter按钮绑定点击事件
	$(document).keydown(function(event) {

			if(event.keyCode == 13) {
				
				$(".suer_btn").click(); 
			}
		
	});
	$('.suer_btn').click(function() {
		var pages = $('.page_btn').children('li').length - 2;
		var num = $('#page_num').val();
		var num_test = /\d/;
		if(num_test.test(num) && num <= pages) {
			lookup('page', num);

			
		}

	});
    //分页
    function lookup(name, value) {
			var http_url = window.location.href;

			if(value) {
				var reg = new RegExp("(.*)(\\?|&)" + name + "=[a-z0-9A-Z-_]+(&|$)(.*)"); // 是否存在name，
				http_url = http_url.replace(reg, '$1$2' + name + '=' + value + '$3$4'); // 匹配并替换
				if(http_url.indexOf(name) === -1) {
					http_url += (http_url.indexOf('?') === -1 ? '?' : '&') + name + '=' + value;
				}
				window.location.href = http_url;
			}
		}
});