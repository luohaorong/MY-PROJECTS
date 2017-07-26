$(function(){
	//顶部时间
	function getNowFormatDate() {
	    var date = new Date();
	    var seperator1 = "-";
	    var seperator2 = ":";
	    var month = date.getMonth() + 1;
	    var strDate = date.getDate();
	    if (month >= 1 && month <= 9) {
	        month = "0" + month;
	    }
	    if (strDate >= 0 && strDate <= 9) {
	        strDate = "0" + strDate;
	    }
	    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
	            + " " + date.getHours() + seperator2 + date.getMinutes()
	            + seperator2 + date.getSeconds();
	    return currentdate;
	}
	setInterval(function(){
		$('.head_left_date').text(getNowFormatDate())
	},1000);
	//点击列表title
	$('.list_title_wrap').click(function() {
		var data_active=$(this).attr('data_active');
		if(data_active==='0'){
			$(this).attr('data_active','1').find('.left_list_img').css({
				transform:'rotate(-90deg)',
				transition: 'transform 0.5s'
			}).parents('.list_title_wrap').siblings('.left_list').slideUp();
		}else {
			$(this).attr('data_active','0').find('.left_list_img').css({
				transform:'rotate(0deg)',
				transition: 'transform 0.5s'
			}).parents('.list_title_wrap').siblings('.left_list').slideDown();
		}
	});
})