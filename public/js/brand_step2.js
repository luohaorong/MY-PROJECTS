$(function(){
	/***********oem2第二步***************/
	
	
	
	var bottle=$.cookie('bottle');
	var label=$.cookie('label').split('|');
	var product_data=$.cookie('product_data');
	var wine_uuid=$.cookie('jiujiang_uuid');
	var wine_bottle_uuid=$.cookie('bottle_uuid');
	
	var data_arr=product_data.split(',');

	data_arr.map(function(i,j) {
		if(j<=9){
			$('.selected_wine_text').find('td').eq(j).text(i);
		}
		if(j===10){
			$('.oem_single').text(i);
		}
		if(j===11){
			$('.oem_moq').text(i);
		}
		
	});
	$('.design_bottom_left_group').text($('.oem_single').text());

	
	$('.empty_wine_bottle').attr('src','/images/imgoem/'+bottle);
	label.map(function(i,j){
		var data=JSON.parse(i);
		var box;
		if (j===0) {
			box=$('<div class="wine_label_check_box"  data_name='+data.name+' label_uuid='+data.label_uuid+'><img id="wine_lable_small" data_src="/images/imgoem/big/'+data.data_src+'" src="/images/imgoem/label/'+data.img+'" /><img class="wine_label_selected wine_label_selected_show" src="/img/wine_selected.png" /></div>')
			$('.empty_wine_label').attr('src','/images/imgoem/big/'+data.data_src);
			$('.label_name').text(data.name)
		}else{
			box=$('<div class="wine_label_check_box" data_name='+data.name+' label_uuid='+data.label_uuid+'><img id="wine_lable_small" data_src="/images/imgoem/big/'+data.data_src+'"  src="/images/imgoem/label/'+data.img+'" /><img class="wine_label_selected " src="/img/wine_selected.png" /></div>')
			
		}
		box.appendTo('.wine_label_check');
	})
	var wine_label_uuid=$('.wine_label_selected_show').parents('.wine_label_check_box').attr('label_uuid');
	$('.single_total').text('1800');
	$('.design_all_money').text(Number($('.oem_single').text())*1800);
	$('.combination_container').text($('.oem_single').text());
	$('.brand_order_quantity').text(parseInt($('.oem_moq').text())/6);
	$('.total_money_container').text($('.design_all_money').text());
	$('.brand_first_pay').text((Number($('.oem_single').text())*540).toFixed(2));
	// (function(){
	// 	//酒浆
	// 	var paste_uuid=$('.back_brand1').find('a').attr('data-uuid');
	// 	//酒瓶
	// 	var bottle_uuid=$('.wine_bottle_hidden li').first().attr('data-uuid');
	// 	var bottle_src=$('.wine_bottle_hidden li').first().attr('data-image');
	// 	$('.wine_bottle_check').attr('bottle_uuid',bottle_uuid);
	// 	$('.wine_bottle_check').attr('bottle_src',bottle_src);
	// 	//酒塞
	// 	var stopper_uuid=$('.wine_stopper_hidden li').first().attr('data-uuid');
	// 	var stopper_src=$('.wine_stopper_hidden li').first().attr('data-image');
	// 	$('.wine_stopper_check').attr('stopper_uuid',stopper_uuid);
	// 	$('.wine_stopper_check').attr('stopper_src',stopper_src);
	// 	//酒帽
	// 	var cap_uuid=$('.wine_cap_hidden li').first().attr('data-uuid');
	// 	var cap_src=$('.wine_cap_hidden li').first().attr('data-image');
	// 	$('.wine_cap_check').attr('cap_uuid',cap_uuid);
	// 	$('.wine_cap_check').attr('cap_src',cap_src);
	// 	//酒标
	// 	var label_uuid=$('.wine_label_check_box').find('.wine_label_selected_show').parent('.wine_label_check_box').attr('data-uuid');
	// 	var label_src=$('.wine_label_check_box').find('.wine_label_selected_show').prev('img').attr('src');
	// 	//酒标工艺
	// 	var technology_uuid=$('.wine_technology_check_common').find('.wine_label_selected_show').parent('.wine_technology_check_common').attr('data-uuid');
	// 	//酒箱
	// 	var box_uuid=$('.wine_box_check_common').find('.wine_label_selected_show').parent('.wine_box_check_common').attr('data-uuid');
	// 	//定制数量
	// 	var nums=parseInt($('.design_custom_amount').val());
	// 	//提交OEM按钮禁用
	// 	$('.brand_sub_right').attr('disabled',true);
	// 	//图片的切换
	// 	$('.empty_wine_bottle').attr('src',bottle_src);
	// 	$('.empty_wine_stopper').attr('src',stopper_src);
	// 	$('.empty_wine_cap').attr('src',cap_src);
	// 	$('.empty_wine_label').attr('src',label_src);
		
	// 	//一加载就请求一次
	// $.ajax({
	// 	type:"post",
	// 	url:window.global.oemFee,
	// 	async:true,
	// 	data:{
	// 		'oem_pastes_uuid':paste_uuid,
 //   			'oem_designs_uuid':[bottle_uuid,stopper_uuid,cap_uuid,label_uuid,technology_uuid,box_uuid],

	// 		 'nums':nums

	// 	},
	// 	success:function(data){
	// 		//组合价格填充
	// 		$('.design_bottom_left_group').text(parseInt(data.data.combination)/100);
	// 		//酒浆价格填充
	// 		$('.design_wine_price').text(parseInt(data.data.pasteFee)/100);
	// 		//设计价格填充
	// 		$('.design_bottom_left_design').text(parseInt(data.data.designFee)/100);
	// 		//共计价格填充
	// 		$('.design_all_container').text(parseInt(data.data.totalFee)/100);
	// 		//下面组合价格填充
	// 		$('.combination_container').text(parseInt(data.data.combination)/100);
	// 		//下面共计价格填充
	// 		$('.total_money_container').text(parseInt(data.data.totalFee)/100);
	// 		//首付价格填充
	// 		$('.brand_first_pay').text(parseInt(data.data.preFee)/100);
	// 		//支数填充
	// 		$('.single_total').text(parseInt(data.data.nums));
	// 		var single=parseInt($('.single').text());
	// 		$('.design_custom_amount').val(parseInt(data.data.nums)/single);
	// 	}
	// });
	// })();
	//封装每次请求
	function request(){
		// 酒浆
		// var paste_uuid=$('.back_brand1').find('a').attr('data-uuid');
		// 酒瓶
		// var bottle_uuid=$('.wine_bottle_check').attr('bottle_uuid');
		// var bottle_src=$('.wine_bottle_check').attr('bottle_src');
		//酒塞
		// var stopper_uuid=$('.wine_stopper_check').attr('stopper_uuid');
		// var stopper_src=$('.wine_stopper_check').attr('stopper_src');
		//酒帽
		// var cap_uuid=$('.wine_cap_check').attr('cap_uuid');
		// var cap_src=$('.wine_cap_check').attr('cap_src');
		// 酒标
		var label_uuid=$('.wine_label_check_box').find('.wine_label_selected_show').parent('.wine_label_check_box').attr('data-uuid');
		var label_src=$('.wine_label_check_box').find('.wine_label_selected_show').siblings('img').attr('data_src');
		var data_name=$('.wine_label_check_box').find('.wine_label_selected_show').parent('.wine_label_check_box').attr('data_name')
		var diy_src=$('.wine_label_check_box').find('.wine_label_selected_show').siblings('img').attr('src');
		//酒标工艺
		// var technology_uuid=$('.wine_technology_check_common').find('.wine_label_selected_show').parent('.wine_technology_check_common').attr('data-uuid');
		//酒箱
		// var box_uuid=$('.wine_box_check_common').find('.wine_label_selected_show').parent('.wine_box_check_common').attr('data-uuid');
		// 定制数量
		var nums=parseInt($('.design_custom_amount').val());
		if (nums>1000000) {
			nums=1000000;
			
		}
		// 几支装
		var single=parseInt($('.single').text());
		// 图片的切换
		// $('.empty_wine_bottle').attr('src',bottle_src);
		// $('.empty_wine_stopper').attr('src',stopper_src);
		// $('.empty_wine_cap').attr('src',cap_src);
		if (data_name==='自定义酒标') {
			$('.empty_wine_label').css({
				'width': '106px',
				'left':'0',
				'top':'0'

			})
			var hei=$('.empty_wine_label').height();
			$('.empty_wine_label_box').css({
					'width': '106px',
					'height':hei+'px',
					'left':'50%',
					'top':'240px',
					'position':'absolute'
					
				});
			
				var label_width=Number($('.empty_wine_label').width())*(-1);
				$('.empty_wine_label_box').css({
					'marginLeft':'-52px'
					
				});
			var browserVersion = window.navigator.userAgent.toUpperCase();
			if(browserVersion.indexOf("MSIE 9") > -1){
				// .append($('<img id="empty_wine_label"  src='+document.selection.createRange().text+ '/>'))
				// console.log(document.getElementsByClassName('shape_design_content_top_left')[0]);
				

				document.getElementsByClassName('empty_wine_label_box')[0].style.filter ="progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='image',src='"+document.selection.createRange().text+"')";  
				document.getElementsByClassName('empty_wine_label_box')[0].style.filter ="progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src='"+document.selection.createRange().text+"')";  
				

				$('.empty_wine_label').remove();
				// document.getElementById('empty_wine_label').src=document.selection.createRange().text ;
				
			}else{
				// $("<img class='empty_wine_label' src='"+diy_src+"/>'").appendTo($('.empty_wine_label_box'));
				$('.empty_wine_label').attr('src',diy_src);
			}

		
		}else{
			$('.empty_wine_label_box').css({
					'width': 'auto',
					'left':'0',
					'top':'0',
					'position':'absolute',
					'marginLeft':'0'
				});
			$('.empty_wine_label').css({
					'width': 'auto',
					'left':'0',
					'top':'0',
					'marginLeft':'0'
				});
			console.log($('.empty_wine_label'))
			if ($('.empty_wine_label').length==0) {
				
				$("<img class='empty_wine_label'/>").appendTo('.empty_wine_label_box');
			}
			 $('.empty_wine_label').attr('src',label_src);
		}
		// 一加载就请求一次
	// $.ajax({
	// 	type:"post",
	// 	url:window.global.oemFee,
	// 	async:true,
	// 	data:{
	// 		'oem_pastes_uuid':paste_uuid,
 //   			'oem_designs_uuid':[bottle_uuid,stopper_uuid,cap_uuid,label_uuid,technology_uuid,box_uuid],

	// 		 'nums':nums

	// 	},
	// 	success:function(data){
			
	// 		//组合价格填充
	// 		$('.design_bottom_left_group').text(parseInt(data.data.combination)/100);
	// 		//酒浆价格填充
	// 		$('.design_wine_price').text(parseInt(data.data.pasteFee)/100);
	// 		//设计价格填充
	// 		$('.design_bottom_left_design').text(parseInt(data.data.designFee)/100);
	// 		//共计价格填充
	// 		$('.design_all_container').text(parseInt(data.data.totalFee)/100);
	// 		//下面组合价格填充
	// 		$('.combination_container').text(parseInt(data.data.combination)/100);
	// 		//下面共计价格填充
	// 		$('.total_money_container').text(parseInt(data.data.totalFee)/100);
	// 		//首付价格填充
	// 		$('.brand_first_pay').text(parseInt(data.data.preFee)/100);
	// 		$('.design_already_amount').text(nums);
	// 		$('.brand_order_quantity').text(nums);
	// 		$('.design_custom_amount').val(nums);
	// 		$('.single_total').text(nums*single);
	// 	}
	// 	});
	}
	
	// //选择下拉条
	// 	$('.wine_check_common').click(function() {
	// 		if(!wineoff) {
	// 			$(this).find('.wine_check_situation1').hide();
	// 			$(this).find('.wine_check_situation2').show();
	// 			$(this).find('.wine_check_hidden').show();
	// 			wineoff = true;
	// 		} else {
	// 			$(this).find('.wine_check_situation1').show();
	// 			$(this).find('.wine_check_situation2').hide();
	// 			$(this).find('.wine_check_hidden').hide();
	// 			wineoff = false;
	// 		}
	// 	})

	// 	$(document.body).click(function() {
	// 		$(".wine_check_hidden").hide();
	// 		$('.wine_check_situation2').hide();
	// 		$('.wine_check_situation1').show();
	// 		wineoff = false;
	// 	});
	// 	$('.wine_check_common').click(function(e) {
	// 		e.stopPropagation();
	// 	});

	// 	$(".wine_check_hidden").click(function(e) {
	// 		e.stopPropagation();
	// 	});
	// 	//选择下拉条的内容
		
	// 		$('.wine_check_hidden_lis').hover(function(){
	// 			$(this).addClass('wine_check_hidden_add');
	// 			$(this).siblings('.wine_check_hidden_lis').removeClass('wine_check_hidden_add');
	// 		},function(){
	// 			$(this).removeClass('wine_check_hidden_add');
				
	// 		});
		
	// 	var wineoff = false;
	// 	//点击选择酒瓶下拉条
	// 	$('.bottle_lis').click(function(){
	// 		wineoff=false;
	// 		$(this).parents('.wine_check_common').find('.wine_check_common_container').text($(this).text());
	// 		$(this).parents('.wine_check_common').find('.wine_check_situation1').show();
	// 		$(this).parents('.wine_check_common').find('.wine_check_situation2').hide();
	// 		$(this).parents('.wine_check_common').find('.wine_check_hidden').hide();
	// 		var uuid=$(this).attr('data-uuid');
	// 		var src=$(this).attr('data-image');
	// 		$(this).parents('.wine_check_common').attr({
	// 			'bottle_uuid':uuid,
	// 			'bottle_src':src
	// 		});
	// 		request();
	// 	});
	// 	//点击选择酒塞下拉条
	// 	$('.stopper_lis').click(function(){
	// 		wineoff=false;
	// 		$(this).parents('.wine_check_common').find('.wine_check_common_container').text($(this).text());
	// 		$(this).parents('.wine_check_common').find('.wine_check_situation1').show();
	// 		$(this).parents('.wine_check_common').find('.wine_check_situation2').hide();
	// 		$(this).parents('.wine_check_common').find('.wine_check_hidden').hide();
	// 		var uuid=$(this).attr('data-uuid');
	// 		var src=$(this).attr('data-image');
	// 		$(this).parents('.wine_check_common').attr({
	// 			'stopper_uuid':uuid,
	// 			'stopper_src':src
	// 		});
	// 		request();
	// 	});
	// 	//点击选择酒帽下拉条
	// 	$('.cap_lis').click(function(){
	// 		wineoff=false;
	// 		$(this).parents('.wine_check_common').find('.wine_check_common_container').text($(this).text());
	// 		$(this).parents('.wine_check_common').find('.wine_check_situation1').show();
	// 		$(this).parents('.wine_check_common').find('.wine_check_situation2').hide();
	// 		$(this).parents('.wine_check_common').find('.wine_check_hidden').hide();
	// 		var uuid=$(this).attr('data-uuid');
	// 		var src=$(this).attr('data-image');
	// 		$(this).parents('.wine_check_common').attr({
	// 			'cap_uuid':uuid,
	// 			'cap_src':src
	// 		});
	// 		request();
	// 	});
		//选择酒标
		$('.wine_label_check').delegate('.wine_label_check_box', 'click', function() {

			$(this).children('.wine_label_selected').addClass('wine_label_selected_show');
			$(this).siblings('.wine_label_check_box').find('.wine_label_selected').removeClass('wine_label_selected_show');
			$('.label_name').text($(this).attr('data_name'));
			wine_label_uuid=$(this).attr('label_uuid');
			request();
			
		});
		//选择酒标工艺
		// $('.wine_technology_check_common').click(function() {
		// 	$(this).children('.wine_label_selected').addClass('wine_label_selected_show');
		// 	$(this).siblings('.wine_technology_check_common').find('.wine_label_selected').removeClass('wine_label_selected_show');
		// 	request();
		// });
		// //选择酒箱
		// $('.wine_box_check_common').click(function() {
		// 	$(this).children('.wine_label_selected').addClass('wine_label_selected_show');
		// 	$(this).siblings('.wine_box_check_common').find('.wine_label_selected').removeClass('wine_label_selected_show');
		// 	request();
		// });
		
		
		//定制数量减少
		$('.design_custom_minus').click(function() {
			var amount = parseInt($('.design_custom_amount').val());
			var start=parseInt($('.design_start_amount').text());
			if(amount > start) {
				amount--;
			} else {
				amount = start;
			}

			$('.design_custom_amount').val(amount);
			$('.design_already_amount').text(amount);
			$('.brand_order_quantity').text(amount);
			$('.single_total').text(amount*6);
			$('.design_all_money').text(Number($('.oem_single').text())*amount*6);
			$('.total_money_container').text($('.design_all_money').text());
			$('.brand_first_pay').text((Number($('.total_money_container').text())*0.3).toFixed(2));
			request();
			check_oem();
		});
		//定制数量增加
		$('.design_custom_add').click(function() {
			var amount = parseInt($('.design_custom_amount').val());
			if (amount<1000000) {
				amount++;
			}
			$('.design_custom_amount').val(amount);
			$('.design_already_amount').text(amount);
			$('.brand_order_quantity').text(amount);
			$('.single_total').text(amount*6);
			$('.design_all_money').text(Number($('.oem_single').text())*amount*6);
			$('.total_money_container').text($('.design_all_money').text());
			$('.brand_first_pay').text((Number($('.total_money_container').text())*0.3).toFixed(2));
			request();
			check_oem();
		});
		//数量输入数字
		$('.design_custom_amount').bind('input propretychange',function(){
				 var amount;
				 $('.design_custom_amount').val()==='0'?$('.design_custom_amount').val(''):""
			if ($('.design_custom_amount').val()) {
			    amount = parseInt($('.design_custom_amount').val());

			}else{
				 amount=0;
			}

			$('.single_total').text(amount*6);
			$('.design_all_money').text(Number($('.oem_single').text())*amount*6);
			$('.total_money_container').text($('.design_all_money').text());
			$('.brand_first_pay').text((Number($('.total_money_container').text())*0.3).toFixed(2));
			$('.design_already_amount').text(amount);
			$('.brand_order_quantity').text(amount);
			request();
			check_oem();
		});
		
		//输入框提示
		inpt($('.brand_product_cname'));
		inpt($('.brand_product_egname'));
		inpt($('.brand_product_remark'));

		function inpt(obj) {
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
		$('.brand_product_cname').bind('input propretychange',function(){
			var value=$(this).val();
			if (value.length>20) {
				return false;
			}
			check_oem();
		})
		$('.brand_product_egname').bind('input propretychange',function(){
			var value=$(this).val();
			if (value.length>50) {
				return false;
			}
		})
		//判断确认OEM按钮
		
		function check_oem(){
			var start=parseInt($('.design_start_amount').text());
			var amount=parseInt($('.design_custom_amount').val());
			var str=$('.brand_product_cname').val();
			if (str!=='请输入中文名称' &&str!=='' && amount>=start) {
				
				$('.brand_sub_right').addClass('add_sub_brand');
				$('.brand_sub_right').attr('disabled',false);
				$('.design_tip').hide();
			}else if(amount<start){
				$('.design_tip').show();
				$('.brand_sub_right').removeClass('add_sub_brand');
				$('.brand_sub_right').attr('disabled',true);
			}else {
				$('.brand_sub_right').removeClass('add_sub_brand');
				$('.brand_sub_right').attr('disabled',true);
				$('.design_tip').hide();
			}
		}
		$('.brand_sub_right').click(function(){
			// //酒浆
			// var paste_uuid=$('.back_brand1').find('a').attr('data-uuid');
			// //酒瓶
			// var bottle_uuid=$('.wine_bottle_check').attr('bottle_uuid');
			// var bottle_src=$('.wine_bottle_check').attr('bottle_src');
			// //酒塞
			// var stopper_uuid=$('.wine_stopper_check').attr('stopper_uuid');
			// var stopper_src=$('.wine_stopper_check').attr('stopper_src');
			// //酒帽
			// var cap_uuid=$('.wine_cap_check').attr('cap_uuid');
			// var cap_src=$('.wine_cap_check').attr('cap_src');
			// //酒标
			// var label_uuid=$('.wine_label_check_box').find('.wine_label_selected_show').parent('.wine_label_check_box').attr('data-uuid');
			// var label_src=$('.wine_label_check_box').find('.wine_label_selected_show').prev('img').attr('src');
			// //酒标工艺
			// var technology_uuid=$('.wine_technology_check_common').find('.wine_label_selected_show').parent('.wine_technology_check_common').attr('data-uuid');
			// //酒箱
			var box_uuid=$('.wine_box_check_common').find('.wine_label_selected_show').parent('.wine_box_check_common').attr('data-uuid');
			//定制数量
			var nums=parseInt($('.design_custom_amount').val());
			//中文名字
			var chinese_name=$('.brand_product_cname').val();
			//英文名字
			var english_name=$('.brand_product_egname').val();
			if (english_name=='请输入英文名称(50字符以内)') {
				english_name='';
			}else{
				english_name=$('.brand_product_egname').val();
			}
			// wine_uuid=$.cookie('jiujiang_uuid');
			// wine_bottle_uuid=$.cookie('bottle_uuid');
			// wine_label_uuid
			//备注
			var remark=$('.brand_product_remark').val();
			if (remark=='请填写您的特殊需求，比如风格、样式、尺寸等(100字以内)') {
				remark='';
			}else{
				remark=$('.brand_product_remark').val();
			}
			$.ajax({
				type:"post",
				url: '/oems/storeOem',
				async:true,
				data:{
					'oem_pastes_uuid':wine_uuid,
   					'oem_designs_uuid':[wine_label_uuid,wine_bottle_uuid],
					'nums':nums,
					'chinese_name':chinese_name,
					'english_name':english_name,
					'remark':remark
				},
				success:function(data){
					if(data.error){
						alert('OEM提交失败!');
					}else{
						$('.cover_layer').show();

						$('body,html').animate({
								scrollTop:0
						}, 300);
						$('.bomb_box').show();
					}
				}
			});
		})
});