$(function(){
			ChangeList($('#my_gold'));
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
		$('.gold_common').click(function() {
		$(this).ChangeTab($(this), '.gold_ck', 'add_gold_ck', '.gold_situation', 'add_gold', '.gold_common', '.gold_container_common')
	});	
	(function($) {
		$.fn.extend({
			ChangeTab: function(obj1, ck, add_ck, situation, add_situation, obj2, container) {

				obj1.find(ck).addClass(add_ck).next(situation).addClass(add_situation);
				obj1.siblings(obj2).find(ck).removeClass(add_ck)
					.next(situation).removeClass(add_situation);

			}
		});
	})(jQuery);
	//筛选
	$('.gold_filter').click(function(){
		var status=$('.add_gold_ck').attr('data_status');
		if (status==undefined) {
			status='';
		}
		console.log(status)
		var start=$('#personal_test1').text();
		var end=$('#personal_test2').text();
		var url = window.global.mycorns+'?inout='+status+'&begin_time='+start+'&end_time='+end;
	
        window.location.href = url;
		
	});
	//Enter按钮绑定点击事件
	$(document).keydown(function(event) {

			if(event.keyCode == 13) {
				
				$(".suer_btn").click(); 
			}
		
	});
	 //分页
    $('.suer_btn').click(function() {
    		var pages=$('.page_btn').children('li').length-2;
    		var num=$('#page_num').val();
    		var num_test = /\d/;
    	if(num_test.test(num) && num <= pages) {
			lookup(num);

		}
			
			
		});
   
    //分页
	function lookup(num) {
		var http_url = window.location.href;

		var arr = http_url.split('?');
		var str1 = arr[0];

		arr.splice(0, 1)
		var str2 = arr.join();

		var arr1 = str2.split('&');

		arr1.splice(0, 1);

		var str3 = arr1.join();
		var str4 = str3.replace(/,/gm, '&');

		var url_str = str1 + '?' + 'page=' + num + '&' + str4;

		if(http_url.indexOf('?') == -1) {
			window.location.href = http_url + '?' + 'page=' + num;
		}
		if(http_url.indexOf('?') !== -1 && http_url.indexOf('page') == -1) {

			window.location.href = str1 + '?' + 'page=' + num + '&' + str2;
		}
		if(http_url.indexOf('?') !== -1 && http_url.indexOf('page') !== -1) {
			window.location.href = url_str;
		}

	}
    
     //一加载就把分页的a标签里的href值给赋值

	hrf_change();

	function hrf_change() {
		var http_url = window.location.href;
		
		var reg = $('.add_gold_ck').attr('data_status');
		var arr=http_url.split('&');
		arr.splice(0,1)
		var str2=arr.join();
		var str3=str2.replace(/,/gm,'&');
		
		
		if(http_url.indexOf(reg)!=-1) {
			
			if (str3.indexOf('inout')==-1) {
				$('.page_btn>li').find('a').each(function(index, elem) {

				var hrf = $(this).attr('href');

				var str = hrf +'&'+'inout='+reg+'&'+str3;
				$(this).attr('href', str);
			});
			}else{
				$('.page_btn>li').find('a').each(function(index, elem) {

				var hrf = $(this).attr('href');

				var str = hrf +'&'+str3;
				$(this).attr('href', str);
			});
			}
			

		}

	}
});