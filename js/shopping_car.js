$(function(){
	//仓库最后一行删除底边
	$('.shopping_details').children('ul:last-child').css('border-bottom','0');
	//是否选中
	$('.chk').attr('data-success','0');
	$('.selected').attr('data-success','1');
	(function switch_Hook() {
		//境内外物流
		var $wuliu=$('.logistics .wuliu');
		$.each($wuliu, function(index,item) {
			$(item).find('.chk_1').click(function(){
				$(this).parent().siblings().find('.selected').attr('data-success','1').show();
				$(this).parent().siblings().find('.chk').attr('data-success','0').hide();
			});
			$(item).find('.selected_1').click(function(){
				$(this).parent().siblings().find('.chk').attr('data-success','1').show();
				$(this).parent().siblings().find('.selected').attr('data-success','0').hide();
			});
		});
		//境内仓库
		var $warehouse=$('.logistics .title_bg');
		$.each($warehouse, function(index,item) {
			$(item).find('.chk_1').click(function(){
			$(this).parent().siblings().find('.selected').attr('data-success','1').show();
			$(this).parent().siblings().find('.chk').attr('data-success','0').hide();
			var selected=$('.territory .title_bg .selected');
			var arr1=[];
			$.each(selected, function(index, item){
				var data_selected=$(item).attr('data-success');
				arr1.push(data_selected);
			});
			var choose1= $.grep(arr1,function(value){
				return value==0;
			});
			if(choose1==''){
				$('.territory .domestic .selected_1').attr('data-success','1').show();
				$('.territory .domestic .chk_1').attr('data-success','0').hide();
			}
			
		});
		$(item).find('.selected_1').click(function(){
			$(this).parent().siblings().find('.chk').show().attr('data-success','1');
			$(this).parent().siblings().find('.selected').hide().attr('data-success','0');
			$(this).parent().parent().parent().siblings('.domestic').find('.chk').attr('data-success','1').show();
			$(this).parent().parent().parent().siblings('.domestic').find('.selected').hide().attr('data-success','0');
			
		});
		});
		//每个商品
		$('.chk').click(function() {
			$(this).parent().find('.selected').attr('data-success','1').show().parent().find('.chk').attr('data-success','0').hide();
			//如果每个仓里的所有商品都选中，那么仓库选中
			var logistics_btn=$(this).parent().parent().siblings();
			var arr2=[];
			$.each(logistics_btn, function(index,item) {
				var data_selected=$(item).find('.selected').attr('data-success');
				arr2.push(data_selected);
			});
			var choose2= $.grep(arr2,function(value){
				return value==0;
			});
			if(choose2==''){
				$(this).parents('.shopping_details').siblings('.title_bg').find('.selected').attr('data-success','1').show();
				$(this).parents('.shopping_details').siblings('.title_bg').find('.chk').attr('data-success','0').hide();
				$(this).parents('.logistics_wap').siblings('.overseas').find('.selected').attr('data-success','1').show();
				$(this).parents('.logistics_wap').siblings('.overseas').find('.chk').attr('data-success','0').hide();
			}
			//如果所有仓库选中那么境内选中
			var $warehouse=$('.logistics .title_bg');
			var arr3=[];
			$.each($warehouse, function(index,item) {
				var data_selected=$(item).find('.selected').attr('data-success');
				arr3.push(data_selected);
			});
			var choose3= $.grep(arr3,function(value){
				return value==0;
			});
			if(choose3==''){
				$('.domestic .selected_1').attr('data-success','1').show();
				$('.domestic .chk_1').attr('data-success','0').hide();
			}
			//如果境内外都选中那么全选显示选中
			var selected=$('.wuliu .selected');
			var arr=[];
			$.each(selected, function(index, item){
				var data_selected=$(item).attr('data-success');
				arr.push(data_selected);
			});
			var choose= $.grep(arr,function(value){
				return value==0;
			});
			if(choose==''){
				$('.select_all2').show().attr('data-success','1');
				$('.select_all1').hide().attr('data-success','0');
			}
		});
		$('.selected').click(function() {
			$(this).parent().find('.chk').attr('data-success','1').show().parent().find('.selected').attr('data-success','0').hide();
			$('.select_all2').hide().attr('data-success','0');
			$('.select_all1').show().attr('data-success','1');
			var logistics=$(this).parent().parent().parent().siblings('.title_bg').find('.chk');
			var abroad=$(this).parent().parent().parent().parent().parent().siblings('.wuliu').find('.chk');
			logistics.show().parent().find('.selected').attr('data-success','0').hide();
			abroad.attr('data-success','1').show().parent().find('.selected').attr('data-success','0').hide();
		});
		//全选
		$('.select_all2').click(function(){
			$('.selected,.select_all2').hide().attr('data-success','0');
			$('.chk,.select_all1').show().attr('data-success','1');
		});
		$('.select_all1').click(function(){
			$('.chk,.select_all1').hide().attr('data-success','0');
			$('.selected,.select_all2').show().attr('data-success','1');
		});
	})();
	//商品数量加减功能
	$.each($('.minus'),function(index,item){
		$(this).click(function(){
		var shopping_number = $(this).siblings('.shopping_number').val();
		shopping_number--;
		$(this).siblings('.shopping_number').val(shopping_number);
//		$.post('',shopping_number,function(data,status){
//			if(data=='1'){
//				$(this).siblings('.shopping_number').val(shopping_number);
//			}
//		});
		});
	});
	$.each($('.add'),function(index,item){
		$(this).click(function(){
		var shopping_number = $(this).siblings('.shopping_number').val();
		shopping_number++;
		$(this).siblings('.shopping_number').val(shopping_number);
//		$.post('',shopping_number,function(data,status){
//			if(data=='1'){
//				$(this).siblings('.shopping_number').val(shopping_number);
//			}
//		});
		});
	});
	//单项删除功能
	$.each($('.del'), function(index,item) {
		$(this).hover(function(){
			$(this).css('color','#57E6D3')
		},function(){
			$(this).css('color','#333333')
		});
		$(this).click(function(){
			var detail_ul = $(this).parent().parent().parent();
			var data_id=detail_ul.attr('data_id');
			var del_id={delete_id:data_id};
			var del_ul=$(this).parent().parent().parent();
			del_ul.slideUp();
			setTimeout(function(){
//			$.post('',del_id,function(data,err){
//				if(data==1){
//					del_ul.remove();;
//				}
//			})
				del_ul.remove();
				//仓库最后一行删除底边
				$('.shopping_details').children('ul:last-child').css('border-bottom','0');
				},500);
			

		});
	});
	//多项删除
	$('.del_all').click(function(){
		var del_data=$('.shopping_details .selected');
		$.each(del_data, function(index,item) {
			var del_selected=$(item).attr('data-success');
				if(del_selected=='1'){
					var del_all_ul=$(this).parent().parent();
					var delete_data=del_all_ul.attr('data_id');
					del_all_ul.slideUp();
					setTimeout(function(){
//			$.post('',del_id,function(data,err){
//				if(data==1){
//					del_ul.remove();;
//				}
//			})
						del_all_ul.remove();
						//仓库最后一行删除底边
						$('.shopping_details').children('ul:last-child').css('border-bottom','0');
						},500);
				};
		});
					

	});
	//多项移入收藏夹
	$('.favorites_all').click(function(){
		var del_data=$('.shopping_details .selected');
		$.each(del_data, function(index,item) {
			var del_selected=$(item).attr('data-success');
				if(del_selected=='1'){
					var del_all_ul=$(this).parent().parent();
					del_all_ul.slideUp();
					setTimeout(function(){
//			$.post('',del_id,function(data,err){
//				if(data==1){
//					del_ul.remove();;
//				}
//			})
						del_all_ul.remove();
						//仓库最后一行删除底边
						$('.shopping_details').children('ul:last-child').css('border-bottom','0');
						},500);
				};
		});

	});
	//收藏夹
	$.each($('.favorites'),function(index,item){
		$(this).hover(function(){
			$(this).css('color','#57E6D3')
		},function(){
			$(this).css('color','#999999')
		})
		$(item).click(function(){
			var detail_ul = $(this).parent().parent().parent();
			var data_id=detail_ul.attr('data_id');
			var favorites_id={favorites_id:data_id};
			var favorites_ul=$(this).parent().parent().parent();
			favorites_ul.slideUp();
			setTimeout(function(){
//			$.post('',del_id,function(data,err){
//				if(data==1){
//					favorites_ul.remove();;
//				}
//			})
				favorites_ul.remove();
				//仓库最后一行删除底边
				$('.shopping_details').children('ul:last-child').css('border-bottom','0');
				},500);
			

		});
	});
	//点击结算
	$('.btn_payment').click(function(){
		var payul=$('.logistics_wap .selected').not('.title_bg .selected');
		var coin_data=$('.gold_coin .selected').attr('data-success');
		var pay_arr=[];
		$.each(payul, function(index,item) {
			var pay_data=$(item).attr('data-success');
			if(pay_data=='1'){
				var pay_id=$(this).parents('.details_list').attr('data_id');
				var pay_val=$(this).parents('.details_list').find('.shopping_number').val();;
				var pay_product={
					pay_id:pay_id,
					pay_val:pay_val
				};
				pay_arr.push(pay_product);
			};
			
		});
		if(coin_data=='1'){
			var coin_num=$('.coin_num').val();
			var coin_id=$('.gold_coin').attr('data_id');
			var pay_coin={
				coin_id:coin_id,
				coin_num:coin_num
			};
			pay_arr.push(pay_coin);
		}
		window.location.href='shopping_car2.html';
		$.post('',pay_arr,function(data,status){
			if(data){
				window.location.href='shopping_car2.html'
			}else{
				alert('结算失败！！请重试。。。');
			}
		})
	});
	//猜你喜欢轮播功能
	(function(){
		var guess=$('.product_show>li').length;
		var count=0;
		var timer=setInterval(function(){
			count++;
			ppt();
		},3000);
		function ppt(){
			$('.product_show').animate({
				left:-310*count
			});
			if(count==guess-4){
				count=-1;
			};
		}
		$('.product_show>li').hover(function(){
			clearInterval(timer);
			$(this).css("opacity", "1").find('.product_pic').stop(true, true).animate({
	                width: '82%',
	                height: '100%'
	            }, 500);;
		},function(){
			$(this).css("opacity", "0.8").find('.product_pic').stop(true, true).animate({
	                width: 200,
	                height: 240
	            }, 500);;
				timer=setInterval(function(){
				count++;
				ppt();
			},3000);
		});
	})();
	
	
});
