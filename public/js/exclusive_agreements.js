$(function() {
	//一加载就请求一下
	//	$.ajax({
	//		type:"get",
	//		url:window.global.mainZone,
	//		async:true,
	//		success:function(data){
	//			console.log(data)
	//		}
	//	});
	//送至
	// var str_a=$('.ex_songhuodizhi_a').find('p').text().trim();
	
	// if (str_a=='') {
	// 	$('.ex_songhuodizhi_a').removeClass('.ex_songhuodizhi_a_add');
	// 	$('.ex_songhuodizhi_a').find('p').css('width','100%');
	// 	$('.ex_songhuodizhi_a').find('p').text('点击添加收货地址(再刷新)');
	// }
	//选择独家地区
	var ex_off1 = false;
	var bigoff = false;
	var moq;
	//点击主营地区
	$('.ex_regioncoom').click(function() {
		if(!$(this).find('.ck_name').hasClass('regret')) {
			ex_off1 = true;
			$(this).addClass('ex_afterclick').find('.ck_region').addClass('ex_change');
			$(this).siblings('.ex_regioncoom').removeClass('ex_afterclick').find('.ck_region').removeClass('ex_change');
			$(this).attr('data_select', '1');
			$(this).siblings('.ex_regioncoom').removeAttr('data_select');
			fill_in();
		}
	});

	//默认选中第一个地区和第一个独家时长
	if($('.ex_regioncoom')) {
		var first_region = $('.ex_regioncoom').find('.ck_name').not('.regret').parents('.ex_regioncoom:first');
		first_region.addClass('ex_afterclick').find('.ck_region').addClass('ex_change');

	}

	//选择独家时长
	$('.ex_time').click(function() {
		$(this).addClass('ex_time_add');
		$(this).siblings('.ex_time').removeClass('ex_time_add');

		time_show();
		fill_in();
	});
	if($('.ex_time')) {
		$('.ex_time').eq(2).addClass('ex_time_add');
	}

	//独家时长
	time_show();

	function time_show() {
		var mydate = new Date();
		var str1 = "" + mydate.getFullYear() + "年";
		str1 += (mydate.getMonth() + 1) + "月";
		str1 += mydate.getDate() + "日";

		$('.ex_data_start').text(str1);

		var mon_add = parseInt($('.ex_time_add').attr('data_month'));

		var mydate = new Date();
		var mon = parseInt(mydate.getMonth() + 1);

		var str = '';

		if(mon + mon_add > 12) {

			str = '';
			str = (mydate.getFullYear() + 1) + "年";
			str += (mon + mon_add - 12) + "月";
			str += mydate.getDate() + "日";
			$('.ex_data_end').text(str);
		} else {

			str = '';
			str = "" + mydate.getFullYear() + "年";
			str += (mon + mon_add) + "月";
			str += mydate.getDate() + "日";
			$('.ex_data_end').text(str);
		}
	}

	//加减订购数量
	$('.ex_add').on('click', function() {
		var amount = parseInt($('.ex_amount').val());
		var single = parseInt($('.ex_situation_single').text());
		if ($('.ex_amount').val()!=='') {
			amount++;

		}else{
			amount=0;
		}	
		$('.ex_situation_all').text(single * amount);
		$('.ex_amount').val(amount);
		changeColor();
		
		

	});
	$('.ex_minus').on('click', function() {
		var amount = parseInt($('.ex_amount').val());
		if (amount>0 && $('.ex_amount').val()!=='') {
			amount--
		}else{
			amount=0
		}
		var single = parseInt($('.ex_situation_single').text());
		$('.ex_situation_all').text(single * amount);
		$('.ex_amount').val(amount);
		changeColor();

	});
	//输入框的值改变

	$('.ex_amount').keyup(function() {

		var str1 = $('.ex_afterclick').attr('data-area-uuuid');

		var str2 = $('.ex_time_add').attr('data_time');

		var str3 = $('.station_check_add').parent('.station_container').attr('data-goods-extends-uuid');
		var str4 = str1 + '_' + str2 + '_' + str3;
		var moq = parseInt(data[str4].moq);
			$('.ex_situation_all').text(single * amount);
		//		rank_station();
		var min_val =moq;//起订量
		var max_val =parseInt($('.ex_situation_stock').text());//库存量
		var reg = /^[1-9]\d*$/gi;
		var single = parseInt($('.ex_situation_single').text());
		var amount = parseInt($('.ex_amount').val());
		if(reg.test($(this).val())) {
			
			if ($(this)!==' ') {
				$('.ex_situation_all').text(single * amount);
			}
			
			
			//			exclusive();
		}else{
			$(this).val('');
			$('.ex_situation_all').text('0');
		}
		changeColor();
	});

		
	

	//点击仓库修改
	$('.ex_sdrevision').click(function() {
		$('#layer').show();

		$.each($('.station_place'), function(index, item) {
			if($(this).text() == '境外') {
				$(this).css('marginRight', '32px');
			}
		});

		//		//起订量和库存的传值
		//		var start=parseInt($('.ex_afterclick').find('.start_num').text());
		//		var bigest=parseInt($('.ex_situation_stock').text());
		//		if (!start) {
		//			$('.ex_start_small').text(200)
		//		}else{
		//			$('.ex_start_small').text(start);
		//		}
		//		
		//		$('.ex_start_big').text(bigest);
		//		//对仓库开始排序并且填入数量
		//		rank_station();
		//		//计算出取货次数
		//		var station_time=$('.station_check_add').length;
		//		$('.pick_up').text(station_time);
		//		//计算总共多少订购量
		//		station_buy();
	});
	//修改仓库时候计算总订购量
	//	function station_buy(){
	//		var stations=$('.station_check_add');
	//		
	//		var num=0;
	//		for (var i=0;i<stations.length;i++) {
	//			num+=parseInt($(stations[i]).parent('.station_container').find('.station_txt').val());
	//		}
	//		if (!num) {
	//			$('.ex_intotal').text(0);
	//		}else{
	//			$('.ex_intotal').text(num);
	//		}
	//		
	//	}
	//对仓库开始排序并且填数目
	//	function rank_station(){
	//		var arr=$('.station_container');
	//		for (var i=0;i<arr.length-1;i++) {
	//			for (var j=i+1;j<arr.length;j++) {
	//				var station_bef=parseInt($(arr[i]).find('.stock_num').text());
	//				var station_aft=parseInt($(arr[j]).find('.stock_num').text());
	//				if (station_bef<station_aft) {
	//					var item=arr[i];
	//					arr[i]=arr[j];
	//					arr[j]=item;
	//				}
	//			}
	//		};
	//		//自动按每个仓库的库存添加货物
	//		$.each(arr, function(index,elem) {
	//			//定购量
	//			var ex_amount=parseInt($('.ex_amount').val());
	//			//仓库的库存量
	//			var station_num=parseInt($(elem).find('.stock_num').text());
	//			
	//			//第一次填充数量之后的结果
	//			var result_num=station_num-ex_amount;
	//			
	//			//除开最大仓库之外的其他仓库
	//			var after_station=$(arr[index+1]);
	//			
	//			//判断
	//			if (result_num>=0) {
	//				
	//				//填充第一个仓库填充，剩下的仓库被置零
	//				$(elem).find('.station_txt').val(ex_amount);
	//				$(elem).find('.station_check').addClass('station_check_add');
	//				after_station.find('.station_txt').val(0);
	//				after_station.find('.station_check').removeClass('station_check_add');
	//				return false;
	//			}else{
	//				//第一次填充剩余的订购数量
	//				var spare_num=(-result_num);
	//				
	//				for (var i=1;i<arr.length;i++) {
	//					//第二个仓库的库存量
	//					var next_station_num=parseInt($(arr[i]).find('.stock_num').text());
	//					//第二次填充剩余的订购数量
	//					var spare_num=next_station_num-spare_num;
	//					if (spare_num>=0) {
	//						//填充第一个仓库的input框
	//						
	//						
	//						$(elem).find('.station_txt').val(station_num);
	//						$(elem).find('.station_check').addClass('station_check_add');
	//						//填充第二个仓库
	//						$(arr[i]).find('.station_txt').val(-result_num);
	//						after_station.find('.station_check').addClass('station_check_add');
	//						return false;
	//					}else{
	//						//填充第一个仓库
	//						$(elem).find('.station_txt').val(ex_amount);
	//						$(elem).find('.station_check').addClass('station_check_add');
	//						//填充剩下的仓库且循环
	//						$(arr[i]).find('.station_txt').val(next_station_num);
	//						after_station.find('.station_check').addClass('station_check_add');
	//					}
	//				}
	//			}
	//		});
	//		
	//		
	//		//将添加好的仓库重新显示
	//		arr.each(function(i,t){
	//			//先克隆出来每个循环填充好数据的仓库
	//			var new_dom=$(t).clone(true);
	//			//再移除之前的所有没填充数据的仓库
	//			$(t).remove();
	//			//再重新把数据放入仓库
	//			new_dom.appendTo($('.layer_content_bottom'));
	//		});
	//	}
	//点击仓库的添加
	$('.station_add').click(function() {
		//简易添加功能
		var amount = $(this).prev().val();
		var station_stok = parseInt($(this).parent('.station_container').find('.stock_num').text());
		if(amount < station_stok) {
			amount++;
		} else {
			amount = station_stok;
		}

		$(this).prev().val(amount);

	});
	//点击仓库减少
	$('.station_minu').click(function() {
		//简易减少功能
		var amount = $(this).next().val();
		var str1 = $('.ex_afterclick').attr('data-area-uuuid');

		var str2 = $('.ex_time_add').attr('data_time');

		var str3 = $(this).parent('.station_container').attr('data-goods-extends-uuid');
		var str4 = str1 + '_' + str2 + '_' + str3;
		var moq = parseInt(data[str4].moq);
		if(amount <= moq) {
			amount = moq;
		} else {
			amount--;
		}

		$(this).next().val(amount);

	});
	//输入仓库数量
	$('.station_txt').keyup(function() {
			var amount = parseInt($(this).val());
			var station_stok = parseInt($(this).parent('.station_container').find('.stock_num').text());
			var str1 = $('.ex_afterclick').attr('data-area-uuuid');

			var str2 = $('.ex_time_add').attr('data_time');

			var str3 = $(this).parent('.station_container').attr('data-goods-extends-uuid');
			var str4 = str1 + '_' + str2 + '_' + str3;
			var moq = parseInt(data[str4].moq);
			if(amount > station_stok) {
				amount = station_stok;
				$(this).val(amount);
			}
			if($(this).val() == '') {
				$(this).val(moq)
			}

		})
		//点击仓库取消
	$('.station_cancel').click(function() {
			$('#layer').hide();
		})
		//点击选择仓库
	$('.station_check').click(function() {

		$(this).addClass('station_check_add');
		$(this).parent('.station_container').siblings('.station_container').find('.station_check').removeClass('station_check_add');
		fill_in();

	});
	//默认选中第一个仓库
	if($('.station_check')) {
		$('.station_check:first').addClass('station_check_add');
	}
	var str_dis = $('.ex_afterclick').attr('data-area-uuuid');
	if(str_dis !== undefined) {
		fill_in();
	}
	// show_kucun()
	// 	//判断库存与起订量
	// function show_kucun() {
	// 	var str1 = $('.ex_afterclick').attr('data-area-uuuid');
	// 	var str2 = $('.ex_time_add').attr('data_time');
	// 	var str3 = $('.station_check_add').parent('.station_container').attr('data-goods-extends-uuid');
	// 	var str4 = str1 + '_' + str2 + '_' + str3;
	// 	if(str1 !== undefined) {
	// 		var moq = data[str4].moq;
	// 		var stock =Number($('.station_check_add').parent('.station_container').find('.stock_num').text());
			
	// 		if(moq>stock){
	// 			$('.ex_situation').append($('<span style="color:#EA0000">库存不足！！</span>'))
	// 			$('.sure_agent').css({
	// 				backgroundColor:'#cccccc'
	// 			}).attr('disabled','disabled')
	// 		}
	// 	} else {
	// 		$('.exproduct_price').find('span').text('--');
	// 	}
	// }

	function fill_in() {
		var str1 = $('.ex_afterclick').attr('data-area-uuuid');

		var str2 = $('.ex_time_add').attr('data_time');

		var str3 = $('.station_check_add').parent('.station_container').attr('data-goods-extends-uuid');

		var str4 = str1 + '_' + str2 + '_' + str3;

		//		console.log(data[str4]);
		if(str1 !== undefined) {
			$('.exproduct_price').find('span').text(data[str4].price / 100);
			$('.ex_situation_single').text(parseInt(data[str4].stocking_pricing_ratio));
			$('.ex_amount').val(parseInt(data[str4].moq));
			moq = data[str4].moq;
			$('.ex_situation_all').text(parseInt(data[str4].stocking_pricing_ratio) * parseInt($('.ex_amount').val()));
			var stock = $('.station_check_add').parent('.station_container').find('.stock_num').text();
			$('.ex_situation_stock').text(parseInt(stock));
			$('.ex_start_small').text(parseInt(data[str4].moq));
			for(var i = 0; i < $('.station_container').length; i++) {
				var ele = $('.station_container')[i];
				var txt = $('.station_txt')[i];
				var str = $(ele).attr('data-goods-extends-uuid');
				var str5 = str1 + '_' + str2 + '_' + str;
				$(txt).val(data[str5].moq);

			}
		} else {
			$('.exproduct_price').find('span').text('--');

		}
		changeColor();
	}

	//点击确定仓库的选择之后
	$('.station_sure').click(function() {
		var str1 = $('.ex_afterclick').attr('data-area-uuuid');

		var str2 = $('.ex_time_add').attr('data_time');

		var str3 = $('.station_check_add').parent('.station_container').attr('data-goods-extends-uuid');

		var str4 = str1 + '_' + str2 + '_' + str3;
		if(str1 !== undefined) {
			var moq = data[str4].moq;
			var after_amount = parseInt($('.station_check_add').parent('.station_container').find('.station_txt').val());
			if(after_amount < moq) {
				after_amount = moq
				$('.station_check_add').parent('.station_container').find('.station_txt').val(after_amount);
			}

			$('.ex_amount').val(after_amount);
			$('.ex_situation_all').text(after_amount * $('.ex_situation_single').text());
		}

		$('#layer').hide();

	});

	//确认独家
	$('.sure_agent').on('click', function() {

		var str1 = $('.ex_afterclick').attr('data-area-uuuid');

		var str2 = $('.ex_time_add').attr('data_time');

		var str3 = $('.station_check_add').parent('.station_container').attr('data-goods-extends-uuid');

		var str4 = str1 + '_' + str2 + '_' + str3;
		var checks = $('.station_check_add');

		var data_exclusive_uuid = data[str4].uuid;
		var data_area_uuid = $('.ex_afterclick').attr('data-area-uuuid');
		var data_time = $('.ex_time_add').attr('data_time');
		var goods_num = $('.ex_amount').val();
		var data_station_name = $('.station_check_add').parent('.station_container').attr('data-station-name');
		var data_station_uuid = $('.station_check_add').parent('.station_container').attr('data-station-uuid');
		var data_station_alias = $('.station_check_add').parent('.station_container').attr('data-station-alias');
		var data_station_last = data_station_alias.trim();
		// $.cookie('exclusive_uuid', data_exclusive_uuid, {
		// 	expires: 3,
		// 	path: '/'
		// });
		$.post(window.global.addCarts, {
			'data_time': data_time,
			'areas_uuid': data_area_uuid,
			'exclusive_uuid': data_exclusive_uuid,
			'goods_extends_uuid': str3,
			'goods_num': goods_num,
			'station': data_station_name,
			'station_alias': data_station_last,
			'station_uuid': data_station_uuid,
			'activity_type': 'exclusive'
		}, function(data) {
			window.location.href = window.global.carts_list;
		});

	})

	function changeColor(){
		var str1 = $('.ex_afterclick').attr('data-area-uuuid');

		var str2 = $('.ex_time_add').attr('data_time');

		var str3 = $('.station_check_add').parent('.station_container').attr('data-goods-extends-uuid');
		var str4 = str1 + '_' + str2 + '_' + str3;
		var moq = parseInt(data[str4].moq);
		if (parseInt($('.ex_amount').val())>parseInt($('.ex_situation_stock').text())) {
			$('.sure_agent').css('backgroundColor','#ccc');
			$('.sure_agent').attr('disabled',true);
			$('.ex_error').text('购买量已超过库存！');
		}else if(parseInt($('.ex_amount').val())<moq || $('.ex_amount').val()==''){
			$('.sure_agent').css('backgroundColor','#ccc');
			$('.sure_agent').attr('disabled',true);
			$('.ex_error').text('购买量不能小于起订量！');
		}else{
			$('.sure_agent').css('backgroundColor','#f3554a');
			$('.sure_agent').attr('disabled',false);
			$('.ex_error').text('');
		}
		if(moq>parseInt($('.ex_situation_stock').text())){
			$('.sure_agent').css('backgroundColor','#ccc');
			$('.sure_agent').attr('disabled',true);
			$('.ex_error').text('库存不足！');
		}
	}

})