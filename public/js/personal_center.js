$(function() {

	//·················个人中心·················
	(function() {
		//鼠标移入移除
		$('.listings>li').hover(function() {

			$(this).addClass('after_hover');
			$(this).children('a').children('p').addClass('words1');
			$(this).find('.inc').hide();
			$(this).find('.inc1').show();

		}, function() {
			$(this).removeClass('after_hover');
			$(this).children('a').children('p').removeClass('words1');
			$(this).find('.inc').show();
			$(this).find('.inc1').hide();

		});

		//筛选时间的填充
	
		$('.vip_filter,.vip_filter1,.gold_filter').click(function() {
			
			var name1=$('.laydate-icon')[0];
			var name_start=$(name1).attr('name');
			var start=$(name1).text();
			var name2=$('.laydate-icon')[1];
			var name_end=$(name2).attr('name');
			var end=$(name2).text();
			$.cookie(name_start,start,{expires:1});
			$.cookie(name_end,end,{expires:1});
//				setCookie(name_start, start, 172800);
//				setCookie(name_end, end, 172800);
//			var times_star = getCookie(name1); //取得cookie的值
//		var times_end = getCookie(name2);
//		$('#personal_test1').text(times_star);
//		$('#personal_test2').text(times_end);
			
			

			

		});
		
		var name1=$('.laydate-icon')[0];
		var name_start=$(name1).attr('name');
		var times_star = $.cookie(name_start);
		var name2=$('.laydate-icon')[1];
		var name_end=$(name2).attr('name');
		var times_end = $.cookie(name_end);
		$('#personal_test1').text(times_star);
		$('#personal_test2').text(times_end);
		$('a').click(function(){
			$.cookie(name_start,times_star, {expires:-1});
			$.cookie(name_end,times_end, {expires:-1});
		});
//		function setCookie(name, value, seconds) { 
//			seconds = seconds || 0; //seconds有值就直接赋值，没有为0，这个根php不一样。
//			var expires = ''; 
//			if(seconds != 0) { //设置cookie生存时间
//				var date = new Date(); 
//				date.setTime(date.getTime() + (seconds * 1000)); 
//				expires = '; expires=' + date.toGMTString(); 
//			} 
//			document.cookie = name + '=' + escape(value) + expires + '; path=/'; //转码并赋值
//		};
//
//		function getCookie(name) {
//			var nameEQ = name + "=";
//			var ca = document.cookie.split(';'); //把cookie分割成组
//			for(var i = 0; i < ca.length; i++) {
//				var c = ca[i]; //取得字符串
//				while(c.charAt(0) == ' ') { //判断一下字符串有没有前导空格
//					c = c.substring(1, c.length); //有的话，从第二位开始取
//				}
//				if(c.indexOf(nameEQ) == 0) { //如果含有我们要的name
//					return unescape(c.substring(nameEQ.length, c.length)); //解码并截取我们要值
//				}
//			}
//			return false;
//		}
		
	})();

});