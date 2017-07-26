$(function(){
	//选项卡
	(function(){
			//判断余额是否充足
		var first_list=$('.list_title').eq(0).attr('data_active');
		if(first_list=='1'){
			var pay_str=$('.pay_num').text();
			var available_str=$('.available_num').text();
			var pay= pay_str.replace('￥','');
			var pay_num=parseFloat(pay.replace(',',''));
			var available= available_str.replace('￥','');
			var available_num=parseFloat(available.replace(',',''));
			if(available_num<pay_num){
				$('.payment_foot').css({
					backgroundColor:'#cccccc'
				});
			}else{
					$('.payment_foot').css({
						backgroundColor:'#57E6D3'
					});
				}
		}else{
				$('.payment_foot').css({
					backgroundColor:'#57E6D3'
				});
		};
		$('.list_title').click(function() {
			$(this).attr('data_active','1').addClass('firs_list').parent().siblings().find('.list_title').removeAttr('data_active').removeClass('firs_list');
			$(this).siblings('.sub_content').fadeIn();
			$(this).parent().siblings().find('.sub_content').fadeOut();
			var first_list=$('.list_title').eq(0).attr('data_active');
			if(first_list=='1'){
				var pay_str=$('.pay_num').text();
				var available_str=$('.available_num').text();
				var pay= pay_str.replace('￥','');
				var pay_num=parseFloat(pay.replace(',',''));
				var available= available_str.replace('￥','');
				var available_num=parseFloat(available.replace(',',''));
				if(available_num<pay_num){
					$('.payment_foot').css({
						backgroundColor:'#cccccc'
					});
					return false;
				}
			}else{
					$('.payment_foot').css({
						backgroundColor:'#57E6D3'
					});
				};
		});
		//选中按钮
		$('.sub_content ul').find('li:first-child').attr('data_active','1').css('border','1px solid #57E6D3').find('.selected').show().siblings('.chk').hide();
		$('.sub_content ul li').click(function(){
			$(this).find('.chk').hide().siblings('.selected').show().parent().attr('data_active','1').css('border','1px solid #57E6D3').siblings().removeAttr('data_active').css('border','1px solid #E6E6E6').find('.selected').hide().siblings('.chk').show();
		});
	
		
	})();
	
	
	
	
	
	
	
	
	
	
	
	
	
});