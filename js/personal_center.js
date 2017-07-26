$(function(){
	
	//·················个人中心·················
	//鼠标移入移除
	$('.listings>li').hover(function(){
		
		$(this).addClass('after_hover');
		$(this).children('a').children('p').addClass('words1');
		$(this).find('.inc').hide();
		$(this).find('.inc1').show();
		
		
	},function(){
		$(this).removeClass('after_hover');
		$(this).children('a').children('p').removeClass('words1');
		$(this).find('.inc').show();
		$(this).find('.inc1').hide();
		
	});
	
	//点击列表
	
	
	

	ChangeList($('#account_balance'));
	ChangeList($('#account_information'));
	ChangeList($('#my_exclusive'));
	ChangeList($('#logistics_damage'));
	ChangeList($('#personal_recharge'));
	ChangeList($('#my_sample_coupons'));
	ChangeList($('#my_gold'));
	ChangeList($('#pay_records'));
	ChangeList($('#personal_my_points'));
	ChangeList($('#personal_my_custom'));
	ChangeList($('#personal_custom_detail'));
	ChangeList($('#my_personal_lists'));
	ChangeList($('#my_personal_collection'));
	ChangeList($('#address_management'));
	ChangeList($('#personal_brand_customization'));
	function ChangeList(obj){
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
	
	
	
});
$(function(){
	/******************我的独家******************************/
	//订单跟踪的移入移出
	$('.myex_order_follow').click(function(e){
		var that=$(this);
		$(this).parents('.myex_orderlists').find('.order_follow').show();
		e.stopPropagation();
	})
	$(document.body).click(function(){
   			 $(".order_follow").hide();
	});
	$(".order_follow").click(function(e){
		e.stopPropagation();
	})
	$('.order_follow_off').click(function(){
		$(this).parent('div').hide();
	})
	
		
	

	
	
	
	
	
	
	
	
	
	
	
	
	
});
$(function(){
	//----------------------消费记录--------------
	$('.history_common').click(function(){
		$(this).addClass('add_history').siblings('.history_common').removeClass('add_history');
	});
});
$(function(){
	//```````````````充值部分``````````````````````
	//确认提交充值
	var onoff_recharge1=false;
	var onoff_recharge2=false;
	$('.recharge_money').bind('input propertychange', function() {
		
 		if($('.recharge_money').val()>0){
 			onoff_recharge1=true;
 		}else{
 			onoff_recharge1=false;
 		}
 		recharge();
	});
	//充值：选择checkbox,只可选择一个,并且点击之后样式改变
	$('.bank_big').on('click',function(){
		onoff_recharge2=true;
		
		$(this).find('.checkbox_common ').addClass('checkbox_change');
		$(this).siblings('div').children('.checkbox_common').removeClass('checkbox_change');
		$(this).css('border','2px solid #57e6d3');
		$(this).siblings('div').not('.wangshang').css('border','1px solid #cccccc')
		recharge();
	});
	
	recharge();
	function recharge(){
		if (onoff_recharge1&&onoff_recharge2) {
			$('.sure').removeAttr("disabled");
			$('.sure').css({
				'background': '#57e6d3'
			});
		}else{
			$(".sure").attr({
				"disabled": "disabled"
			});
			$('.sure').css({
				'background': '#cccccc'
			});
		}
	}
	
	$('.sure').on('click',function(){
		
		
	});
	/*******************充值结束**********************************/
});
(function($){
	$.fn.extend({
	ChangeTab:function(obj1,ck,add_ck,situation,add_situation,obj2,container){
		
		obj1.find(ck).addClass(add_ck).next(situation).addClass(add_situation);
		obj1.siblings(obj2).find(ck).removeClass(add_ck)
		.next(situation).removeClass(add_situation);
		

		}
	});
})(jQuery)
$(function(){
	/***********我的金币开始******************/
	$('.gold_common').click(function(){
		$(this).ChangeTab($(this),'.gold_ck','add_gold_ck','.gold_situation','add_gold','.gold_common','.gold_container_common')
	})
	
	
	/***********我的金币结束*******************/
})
$(function(){
	/*************样品券开始*************************/
	$('.sample_common').click(function(){
		$(this).ChangeTab($(this),'.sample_ck','add_sample_ck','.sample_situation','add_sample','.sample_common','.sample_container_common');

	});
	
	
	
	
	
	
	
	
	
	/*************样品券结束*************************/
	
})










$(function(){
	/*****************账户信息***************************/
	//点击修改
	$('.info2_revise').on('click',function(){
		var val1=$(this).prev().text();
		$(this).prev().hide();
		$(this).next().show();
		$(this).next().val(val1);
		$(this).parent().children('.info2_save').show();
		
	});
	//点击保存账户姓名
	$('.info2_savename').on('click',function(){
		var reg1=new RegExp(/[\u4E00-\u9FA5]{2,4}/);
		
		if(reg1.test($(this).prev().val())){
			infoSave($(this));
			$(this).next().text('');
		}else{
			$(this).next().text('姓名格式不正确！');
		}
	});
	
	//点击保存绑定邮箱
	$('.info2_savemali').on('click',function(){
		var reg3= /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if(reg3.test($(this).prev().val())){
			infoSave($(this));
			$(this).next().text('');
		}else{
			$(this).next().text('您的邮箱格式不正确！');
		}
	});
	//保存的方法
	function infoSave(obj){
		
		var val2=obj.prev().val();
		
		obj.prev().hide();
		obj.parent().children().eq(1).show();
		obj.parent().children().eq(1).text(val2);
		obj.hide()
	}
	//点击送货地址
	var infoff=false;
	$('.info2_region').click(function(){
		if (!infoff) {
			$(this).find('.info2_img1').hide();
			$(this).find('.info2_img2').show();
			$('.info2_regionshow').show();
			infoff=true;
		}else{
			$(this).find('.info2_img1').show();
			$(this).find('.info2_img2').hide();
			$('.info2_regionshow').hide();
			infoff=false;
		}
	})
	 $(document.body).click(function () {
        $('.info2_regionshow').hide();
        $('.info2_img1').show();
        $('.info2_img2').hide();
        infoff=false;
    });
    $('.info2_region').click(function(e){
    	e.stopPropagation();
    });
    $('.info2_regionshow').click(function(e){
    	e.stopPropagation();
    });

	//密码验证
	var pwoff1=false;
	var pwoff2=false;
	SureResive();
	//当前密码
//	$('.info3_current').blur(function(){
//		var pw1=$(this).val();
//		
//	});
//	//新的密码
//	
	$('.info3_setpw').bind('blur',function(){
		
		var pw2=$(this).val();
		var reg3 = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
		if(reg3.test($(this).val())){
			pwoff1=true;
			
			$(this).next().text('');
			$(this).next().removeClass('fo3err_add');
		}else{
			$(this).next().text('密码格式不正确！');
			$(this).next().addClass('fo3err_add');
			pwoff1=false;
		}
		SureResive();
	});
	
	//确认密码
	
	$('.info3_surepw').bind('blur',function(){
		
		var pw3=$('.info3_setpw').val();
		var pw4=$(this).val();
		if (pw3!==pw4) {
			pwoff2=false;
			$(this).next().text('密码不一致！');
			$(this).next().addClass('fo3err_add');
		}else{
			pwoff2=true;
			
			$(this).next().text('');
			$(this).next().removeClass('fo3err_add');
		}
		SureResive();
	});
	$('.info3_setpw').bind('input propertychange',function(){
		var pw5=$(this).val();
		var reg3 = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
		if(reg3.test($(this).val())){
			pwoff1=true;
			
			
		}else{
			pwoff1=false;
		}
		SureResive();
	});
	$('.info3_surepw').bind('input propertychange',function(){
		var pw6=$('.info3_setpw').val();
		var pw7=$(this).val();
		if (pw6!==pw7) {
			pwoff2=false;
		}else{
			pwoff2=true;
			
			
		}
		SureResive();
	});
	
	//确认修改的提交按钮样式判断
	function SureResive(){
		
		
		if (pwoff1 && pwoff2) {
			
			$('.info3_ok').removeAttr("disabled");
			$('.info3_ok').css('background','#57E6D3')
			
		}else{
			
			$(".info3_ok").attr({
				"disabled": "disabled"
			});
			$('.info3_ok').css('background','#CCCCCC');
		}
	}
	
	
	
	
	/*****************账户信息结束***************************/
});
/***********地址管理***************/
$(function(){
	$('.address_common').click(function(){
		$(this).addClass('add_address').siblings('.address_common').removeClass('add_address');
	});
});
/************地址管理结束*****************/



/***********账户余额*****************/
$(function(){
	//点击充值
	$('.vip_lebottom').on('click',function(){
		window.location.href='personal_recharge.html';
	})
	//点击切换记录
	$('.vip_records li').click(function(){
		
		RecordsChange($(this));
		
	});
	
	//切换tab封装
	function RecordsChange(obj){
		
		
		obj.addClass('vip_add').children('p').addClass('vip_add');
		obj.siblings('li').removeClass('vip_add').children('p').removeClass('vip_add');
		var src1=obj.children('div').children('img').attr('src').replace(1,2);
		obj.children('div').children('img').attr('src',src1);
		var obj1=$(obj.siblings('li')[0]);
		var obj2=$(obj.siblings('li')[1]);
		var src2=obj1.children('div').children('img').attr('src').replace(2,1);
		var src3=obj2.children('div').children('img').attr('src').replace(2,1);
		obj1.children('div').children('img').attr('src',src2);
		obj2.children('div').children('img').attr('src',src3);
		
		
	}

	
});
/***********账户余额结束*****************/


/**********品牌定制第一步js***************/
$(function(){
	(function(){
		var varietyoff1=false;
	var varietyoff2=false
	//选择国家
	$('.brand_national_flag').click(function(){
		$(this).addClass('add_brand_national_flag');
		
		$(this).siblings('.brand_national_flag').removeClass('add_brand_national_flag')
		
		var country=$(this).attr('data_name');
		$('.brand_country_name').text(country);
		varietyoff1=true;
		varietynext();
	});
	//选择品种
	$(".variety_content").click(function(){
		varietyoff2=true;
		$(this).find('.variety_ck_box').addClass('checkbox_change').parents('.variety_content')
		.siblings('.variety_content').find('.variety_ck_box').removeClass('checkbox_change');
		
		varietynext();
	});
	//下一步
	$('.brand_nextstep').click(function(){
		window.location.href='brand_customization2.html';
	})
	function varietynext(){
		if (varietyoff1 && varietyoff2) {
			$('.brand_nextstep').removeAttr("disabled");
			$('.brand_nextstep').css({
				'background': '#57e6d3'
			});
		}else{
			$(".brand_nextstep").attr({
				"disabled": "disabled"
			});
			$('.brand_nextstep').css({
				'background': '#cccccc'
			});
		}
	}
	})();
	/***********oem2第二步***************/
	(function(){
		//选择下拉条
	var wineoff=false;
	$('.wine_check_common').click(function(){
		if (!wineoff) {
			$(this).find('.wine_check_situation1').hide();
			$(this).find('.wine_check_situation2').show();
			$(this).find('.wine_check_hidden').show();
			wineoff=true;
		}else{
			$(this).find('.wine_check_situation1').show();
			$(this).find('.wine_check_situation2').hide();
			$(this).find('.wine_check_hidden').hide();
			wineoff=false;
		}
	})
	
	$(document.body).click(function(){
   			 $(".wine_check_hidden").hide();
   			 $('.wine_check_situation2').hide();
   			 $('.wine_check_situation1').show();
   			 wineoff=false;
	});
	$('.wine_check_common').click(function(e){
		e.stopPropagation();
	});
	
	$(".wine_check_hidden").click(function(e){
		e.stopPropagation();
	});
	$('.wine_lable_small').attr('data_src');
	//选择酒标
	$('.wine_label_check').delegate('.wine_label_check_box','click',function(){
		
		$(this).children('.wine_label_selected').addClass('wine_label_selected_show');
		$(this).siblings('.wine_label_check_box').find('.wine_label_selected').removeClass('wine_label_selected_show');
		
		var str1=$(this).children('#wine_lable_small').attr('src');
		$(this).children('#wine_lable_small').attr('data_src',str1);
		
		$('.empty_wine_label').attr('src',str1);
	});
	
	//选择酒标工艺
	$('.wine_technology_check_common').click(function(){
		$(this).children('.wine_label_selected').addClass('wine_label_selected_show');
		$(this).siblings('.wine_technology_check_common').find('.wine_label_selected').removeClass('wine_label_selected_show');
	});
	//选择酒箱
	$('.wine_box_check_common').click(function(){
		$(this).children('.wine_label_selected').addClass('wine_label_selected_show');
		$(this).siblings('.wine_box_check_common').find('.wine_label_selected').removeClass('wine_label_selected_show');
	});
	//定制数量减少
	$('.design_custom_minus').click(function(){
		var amount=$('.design_custom_amount').val();
		if (amount>1000) {
			amount--;
		}else{
			amount=1000;
		}
		
		$('.design_custom_amount').val(amount);
	});
	//定制数量增加
	$('.design_custom_add').click(function(){
		var amount=$('.design_custom_amount').val();
		amount++;
		$('.design_custom_amount').val(amount);
	});
	})();
	


	
	
	
	
	//输入框提示
	inpt($('.brand_product_cname'));
	inpt($('.brand_product_egname'));
	inpt($('.brand_product_remark'));
	function inpt (obj){
		var data_please = obj.attr('data_please');
		obj.val(data_please).css('color', '#999');
		obj.focus(function() {
			var obj_val = obj.val();
			if(obj_val == data_please) {
				obj.val('').css('color', '#000');
			};
		});
		obj.blur(function() {
			var obj_val = obj.val();
			if(!obj_val) {
				obj.val(data_please).css('color', '#999');
			};
		});
	}
});
