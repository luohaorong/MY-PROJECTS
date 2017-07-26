$(function(){
			ChangeList($('#my_personal_collection'));
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
					
	//收藏的查询点击事件（起始时间）
	$('.vip_filter').click(function(){
    	var start=$('#personal_test1').text();
    	var end=$('#personal_test2').text();
    	
		var url = window.global.fav_list+'?begin_time='+start+'&end_time='+end;
        window.location.href = url;
    });
    //Enter按钮绑定点击事件
	$(document).keydown(function(event) {

		if(event.keyCode == 13) {

			$(".suer_btn").click();
		}

	})
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
		//点击取消收藏
		$('.cancel').click(function(){
			var uuid=$(this).attr('data-uuid');
			
			if(confirm("您确定取消收藏该商品吗？")){
      				$.ajax({
      					type:"post",
      					url:window.global.del_favor,
      					async:true,
      					data:{
      						goods_uuid:uuid
      					},
      					success:function(res){
      						window.location.reload();
      					}
      				});
   				}
		})
});