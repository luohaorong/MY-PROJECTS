$(function() {
	ChangeList($('#account_balance'));

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
	$('.vip_timright_a').hover(function() {

			$(this).addClass('cur1');
		}, function() {
			$(this).removeClass('cur1');
		});
	//点击时间a标签切换页面的同时切换该a标签的样式
	$('.vip_timright_a').each(function(){
		var http_url=window.location.href;
	
		
		if (returnUrl($(this).attr('href'))==returnUrl(http_url)) {
			$(this).addClass('cur');
		}
	})

	function returnUrl(href){
        var number=href.lastIndexOf("?");
       
        return href.substring(number+1);
       
    }
		//		//点击切换记录
		//	$('.vip_records li').click(function() {
		//
		//		RecordsChange($(this));
		//
		//	});
		//切换tab封装
	function RecordsChange(obj) {

		obj.addClass('vip_add').children('p').addClass('vip_add');
		obj.parent('a').siblings('a').find('li').removeClass('vip_add').children('p').removeClass('vip_add');
		var src1 = obj.children('div').children('img').attr('src').replace(1, 2);
		obj.children('div').children('img').attr('src', src1);
		var obj1 = $(obj.parent('a').siblings('a').find('li')[0]);
		var obj2 = $(obj.parent('a').siblings('a').find('li')[1]);
		var src2 = obj1.children('div').children('img').attr('src').replace(2, 1);
		var src3 = obj2.children('div').children('img').attr('src').replace(2, 1);
		obj1.children('div').children('img').attr('src', src2);
		obj2.children('div').children('img').attr('src', src3);

	}
	//Enter按钮绑定点击事件
	$(document).keydown(function(event) {

			if(event.keyCode == 13) {
				
				$(".suer_btn").click(); 
			}
		
	});
	//分页
	$('.suer_btn').click(function() {
		var pages = $('.page_btn').children('li').length - 2;
		var num = $('#page_num').val();
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
		var arr1 = http_url.split('?')
		var arr = http_url.split('?');
		arr.splice(0, 1);
		var str = arr.join();
		if(arr1[1]) {
			var arr2 = str.split('&');
			arr2.splice(0, 1);
			var str1 = arr2.join();
			var str2=str1.replace(/,/gm,'&');
			if(str.indexOf('page') != -1) {
				
				$('.page_btn>li').find('a').each(function(index, elem) {
					var hrf = $(this).attr('href');
					var str3=hrf+'&'+str2;
					$(this).attr('href',str3);
				})
			}else{
				$('.page_btn>li').find('a').each(function(index, elem) {
					var hrf = $(this).attr('href');
					var str4=hrf+'&'+arr[0];
					$(this).attr('href',str4);
				})
			}

		}
	}
	//时间筛选
	$('.vip_filter1').click(function() {
		var start = $('#personal_test1').text();
		var end = $('#personal_test2').text();

		var http_url = window.global.myblance;
		http_url = http_url + '?' + 'begin_time=' + start + '&end_time=' + end;
		window.location.href = http_url;

	});
	//注册奖励样式
	$('.vip_orderlist').each(function(item,index){
		var str=$(this).find('.deal_number').text();
		if(str==''){
			$(this).find('.deal_detail').css('marginTop','36px');
		}else{
			$(this).find('.deal_detail').css('marginTop','20px');
		}
	})
});