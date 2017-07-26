$(function(){
	//选择独家地区
	var ex_off1=false;
	
	exclusive();
//	$('.ck_city').on('click',function(){
//		if(!ex_off1){
//			
//			$(this).addClass('ex_change').parent('div').addClass('ex_afterclick');
//			$(this).parent('div').siblings('.ex_regioncoom')
//			.removeClass('ex_afterclick')
//			.children('.ck_region').removeClass('ex_change');
//			ex_off1=true;
//			ex_off2=false;
//		}else{
//			
//			$(this).removeClass('ex_change').parent('div').removeClass('ex_afterclick');
//			ex_off1=false;
//		}
//		exclusive();
//	});
//	$('.ck_province').on('click',function(){
//		if(!ex_off2){
//			
//			$(this).addClass('ex_change').parent('div').addClass('ex_afterclick');
//			$(this).parent('div').siblings('.ex_regioncoom')
//			.removeClass('ex_afterclick')
//			.children('.ck_region').removeClass('ex_change');
//			ex_off2=true;
//			ex_off1=false;
//		}else{
//			
//			$(this).removeClass('ex_change').parent('div').removeClass('ex_afterclick');
//			ex_off2=false;
//		}
//		exclusive();
//	});
		//点击主营地区
		$('.ex_regioncoom').click(function(){
			
			ex_off1=true;
			$(this).addClass('ex_afterclick').find('.ck_region').addClass('ex_change');
			$(this).siblings('.ex_regioncoom').removeClass('ex_afterclick').find('.ck_region').removeClass('ex_change');
			exclusive();
		});
	
	//加减订购数量
	$('.ex_add').on('click',function(){
		var amount=parseInt($('.ex_amount').val());
		amount++;
		$('.ex_amount').val(amount);
		exclusive();
	});
	$('.ex_minus').on('click',function(){
		
		var amount=parseInt($('.ex_amount').val());
		amount--;
		if (amount<=0) {
			amount=0;
		}
		
		$('.ex_amount').val(amount);
		exclusive();
	});
	//输入框的值改变
	$('.ex_amount').keyup(function(){
		if ($(this).val().substr(0,1)==0) {
			$(this).val('0');
			exclusive();
		}else{
			$(this).val()=$(this).val();
		}
	});
	$('.ex_amount').bind('input propertychange',function(){
		
		exclusive();
		
	});
	
	
	//送至的地区点击切换
	$('.ex_jiantou1').on('click',function(){
		$(this).hide();
		$('.ex_jiantou2').show();
		$('.ex_selectaddress').show();
	})
	$(document).click(function(){
		$('.ex_jiantou2').hide();
		$('.ex_selectaddress').hide();
		$('.ex_jiantou1').show();
	});
	$('.ex_jiantou1').click(function(e){
		e.stopPropagation();
	});
	$('.ex_selectaddress').click(function(e){
		e.stopPropagation();
	})
	$('.ex_jiantou2').on('click',function(){
		$(this).hide();
		$('.ex_jiantou1').show();
		$('.ex_selectaddress').hide();
	});
	//确认代理
	function exclusive(){
		
		if(ex_off1&&parseInt($('.ex_amount').val())>0){
			$('.sure_agent').removeAttr("disabled");
			$('.sure_agent').css({
				'background': '#57e6d3'
			});
			
			
		}else{
			$('.sure_agent').css({
				'background':'#cccccc'
			})
			$(".sure_agent").attr({
				"disabled": "disabled"
			});
		}
	}
	$('.sure_agent').on('click',function(){
		
	})
	
	
	
	
})