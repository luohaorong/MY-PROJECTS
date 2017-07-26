$(function() {
	//收货人信息点击事件
	$('.consignee_content').delegate('.consignee_list', 'click', function() {
		$(this).addClass('consignee_active').attr('data_active', '1').siblings().attr('data_active', '0').removeClass('consignee_active');
		$(this).find('.selected').show().stop(true, true).siblings('.chk').hide().parents('.consignee_list').siblings().find('.selected').hide().stop(true, true).siblings('.chk').show();
		$(this).find('.position').addClass('position_active').parents('.consignee_list').siblings().find('.position').removeClass('position_active');
		$(this).find('li').addClass('font_active').parents('.consignee_list').siblings().find('li').removeClass('font_active');
		$(this).find('.operation').show().parent().siblings().find('.operation').hide();
		getShipFee();
	});
	//收货地址改变后从服务器获取新的物流费用
	function getShipFee() {
		logistics_mode(); //获取物流方式
		$('.wait_gif').show();
		$.post(window.global.getShipFee, {
			delivery: delivery_json, //物流方式
			address_uuid: receiving_uuid //地址UUID
		}, function(data) {
			if(data.code === 0) {
				var depot_data = data.data.carts; //仓库信息
				var repertory = $('.repertory').find('.product_detail') //分库详情下的所有仓库
				var total_fee = data.data.data.ship_fee_amount/100 ; //总物流费用
				var payed_amount=data.data.data.payed_amount/100;//实际支付金额
				var goods_and_service=data.data.data.goods_and_service/100;//商品总金额(含上门服务费)
				var carts_deport=data.data.carts//获取单个仓库
				var carts_arr=[];
				var key_arr=[];
				for(i in carts_deport){
					carts_arr.push(carts_deport[i])//把键值放入数组
					key_arr.push(i)//把键名放入数组
				}
				for(var i=0;carts_arr[i];i++){
					var home_service=carts_arr[i].amount.home_service/100;//获取收货上门费用
					var station_alias=$('.product_detail').eq(i).attr('data-station-alias');//获取仓库名称
					if(key_arr[i]===station_alias){
						$('[data-station-alias='+station_alias+']').find('.go_home_num').text('¥'+home_service)	//找到对应仓库填写相应的送货上门费
					}
				}
				$('.total_logistics').text('¥' + total_fee);//填写物流费用
				$('.goods_total_num').text('¥'+goods_and_service)//填写商品总金额(含上门服务费)
				$('.actual_subtotal').text('¥'+payed_amount);//填写实际支付金额
				repertory.each(function(i, e) {
					var station_uuid = $(this).attr('data-station-alias');
					var depot_fee = depot_data[station_uuid].amount.ship_fee / 100;
					$(this).find('.logistics_num').attr('data_num', depot_fee * 100).text('¥' + depot_fee);
				});
				var total_logistics = Number(total_fee); //获取总运费
				single_depot_fee(); //计算每瓶酒的物流费用
				$('.wait_gif').hide();
			} else {
				$('.wait_gif').hide();
				alert(data.message)
			}
		});
	}
	//设置默认地址
	$('.default_address').click(function() {
		var data_uuid = $(this).parents('.consignee_active').attr('data-uuid');
		$.post(window.global.setDefault, {
			uuid: data_uuid
		}, function(data) {
			if(data.code == 0) {
				alert('默认地址设置成功！！！')
				location.reload();
			} else {
				alert('默认地址设置失败！')
				window.location.href = window.global.ordercheck;
			}
		});
		$(this).parents().siblings('.adress').find('.def').show().parents('.consignee_list').siblings('.consignee_list').find('.def').hide();
		$(this).text('').parents('.consignee_list').siblings().find('.default_address').text('设为默认地址');
		$(this).parents('.consignee_list').attr('data_default', 'default').siblings().removeAttr('data_default')
		var index_ul = $(this).parents('.consignee_list').index();
		var first_ul = $('.consignee_content').find('ul:first-child');
		if(index_ul >= 1) {
			$(this).parents('.consignee_list').insertBefore(first_ul);
		}

	});

	//编辑或新增功能
	function edit(item_id) {
		$(item_id).click(function() {
			//获取姓名、手机号码、详细地址添加到弹出框
			var username = $(this).parent().siblings('.chk_name').find('.name_text').attr('data_text');
			var mobile = $(this).parent().siblings('.tle').attr('data_text');
			var adress = $(this).parent().siblings('.adress').find('.detailed_adress').attr('data_text');
			var data_uuid = $(this).parents('.consignee_list').attr('data-uuid');
			$('.ensure').attr('data-uuid', data_uuid);
			$(this).attr('data_click', item_id);
			add_new = $(this).attr('data_click');
			This = this;
			$('#username').val(username);
			$('#explicit_adress').val(adress);
			$('#mobile').val(mobile);
			$('.layer').show();
			$('.select_common').val('请选择').find('.sub_select').remove();
			if(item_id === '.edit_ul') {
				var province_uuid = $(this).parents('.font_active').siblings('.adress').find('.probably').attr('data_province_uuid');
				var city_uuid = $(this).parents('.font_active').siblings('.adress').find('.probably').attr('data_city_uuid');
				var area_uuid = $(this).parents('.font_active').siblings('.adress').find('.probably').attr('data_area_uuid');
				$('#province').find('option[value=' + province_uuid + ']').attr('selected', true).siblings().removeAttr('selected');
				$('#province').find('option').not('[value=请选择]').remove();
				setTimeout(function() {
					//页面加载自动读出省
					$.ajax({
						type: "post",
						url: window.global.getProvince,
						dataType: 'json',
						async: true,
						success: function(res) {
							if(res && res.errcode === 0)
								var res = JSON.parse(data);
							//待定，稍后继续
							var str = "";
							$.each(res, function(index, item) {
								str += "<option value='" + item.uuid + "'>" + item.name + "</option>";
							});
							//将str添加到select为province的下拉列表中
							$('#province').append(str);
							$('#province').find('option[value=' + province_uuid + ']').attr('selected', true).siblings().removeAttr('selected');
						}
					});
				}, 1)
				$.ajax({
					type: "post",
					url: window.global.getAreas,
					async: true,
					dataType: 'json',
					data: {
						'uuid': province_uuid
					},
					success: function(res) {
						if(res && res.errcode === 0)
							var res = JSON.parse(data);
						var str = "";
						$.each(res, function(index, item) {
							str += "<option class='sub_select' value='" + item.uuid + "'>" + item.name + "</option>";
						});
						$('#city').append(str);
						$('#city').find('option[value=' + city_uuid + ']').attr('selected', true);
					}
				});
				$.ajax({
					type: "post",
					url: window.global.getCountrys,
					async: true,
					dataType: 'json',
					data: {
						'uuid': city_uuid
					},
					success: function(res) {
						if(res && res.errcode === 0)
							var res = JSON.parse(data);
						var str = "";
						$.each(res, function(index, item) {
							str += "<option class='sub_select' value='" + item.uuid + "'>" + item.name + "</option>";
						});
						$('#country').append(str);
						$('#country').find('option[value=' + area_uuid + ']').attr('selected', true);
					}
				});
			}

		});
	};
	edit('.edit_ul');
	//新增收货人信息
	edit('.add_ifo');
	//弹出框确定功能
	$('.ensure').click(function() {
		var username = $('#username').val();
		var adress = $('#explicit_adress').val();
		var mobile_num = $('#mobile').val();
		var explicit_adress = $('#explicit_adress').val();
		var data_id = $(this).parents('.consignee_list').attr('data_id');
		var province = $(".province").find("option:selected").text();
		var province_uuid = $(".province").find("option:selected").val();
		var city = $(".city").find("option:selected").text();
		var city_uuid = $(".city").find("option:selected").val();
		var county = $(".region").find("option:selected").text();
		var county_uuid = $(".region").find("option:selected").val();
		var phone = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9])\d{8}$/img;
		var chkphone = phone.test(mobile_num);
		var edit_uuid = $('.ensure').attr('data-uuid')
		if(username == '') {
			$('<span class="err">请输入收货人姓名</span>').appendTo('.receipt_man').css({
				color: '#ea0000',
				fontSize:'14px',
				display: 'block',
				height: '26px',
				marginTop: '5px'
			}).siblings('.err').remove();
			return false;
		} else {
			$('.receipt_man .err').remove();
		};
		if(province == '请选择') {
			$('<span class="err">请选择省份</span>').appendTo('.receiver_adress').css({
				color: '#ea0000',
				fontSize:'14px',
				display: 'block',
				height: '26px',
				marginTop: '5px'
			}).siblings('.err').remove();
			return false;
		} else {
			$('.receiver_adress .err').remove();
		};
		if(city == '请选择') {
			$('<span class="err">请选择城市</span>').appendTo('.receiver_adress').css({
				color: '#ea0000',
				fontSize:'14px',
				display: 'block',
				height: '26px',
				marginTop: '5px'
			}).siblings('.err').remove();
			return false;
		} else {
			$('.receiver_adress .err').remove();
		};
		if(county == '请选择') {
			$('<span class="err">请选择区/县</span>').appendTo('.receiver_adress').css({
				color: '#ea0000',
				fontSize:'14px',
				display: 'block',
				height: '26px',
				marginTop: '5px'
			}).siblings('.err').remove();
			return false;
		} else {
			$('.receiver_adress .err').remove();
		};
		if(adress == '') {
			$('<span class="err">请填写详细地址</span>').appendTo('.explicit').css({
				color: '#ea0000',
				fontSize:'14px',
				display: 'block',
				height: '26px',
				marginTop: '5px'
			}).siblings('.err').remove();
			return false;
		} else {
			$('.explicit .err').remove();
		}
		if(!chkphone) {
			$('<span class="err">请输入正确的手机号</span>').appendTo('.mobile_phone').css({
				color: '#ea0000',
				fontSize:'14px',
				paddingLeft: '162px'
			});
			return false;
		} else {
			$('.mobile_phone .err').remove();
		};
		if(add_new == '.add_ifo') {
			$.post(window.global.addAddr, {
				real_name: username,
				mobile: mobile_num,
				areas_uuid: county_uuid,
				detail: explicit_adress
			}, function(data) {
				if(data.code == 0) {
					$('.consignee_content').prepend($('.consignee_clone').clone(true));
					var first_ul = $('.consignee_content').find('ul:first-child');
					var sibling_ul = first_ul.siblings();
					first_ul.removeClass('consignee_clone');
					first_ul.find('.name_text').attr('data_text', username).text(username);
					first_ul.find('.tle').attr('data_text', mobile_num).text(mobile_num);
					first_ul.find('.probably').attr('data_text', province + city + county).text(province + city + county);
					first_ul.find('.detailed_adress').attr('data_text', adress).text(adress);
					sibling_ul.find('li').removeClass('font_active').find('.chk').show().siblings('.selected').hide();
					first_ul.find('.position').addClass('position_active').parent().siblings().find('.position').removeClass('position_active');
					first_ul.attr('data_active', '1').slideDown().addClass('consignee_active').siblings().attr('data_active', '0').removeClass('consignee_active')
					first_ul.find('.chk').hide().siblings('.selected').show();
					first_ul.find('li').addClass('font_active').parent().siblings().find('li').removeClass('font_active')
					first_ul.find('.operation').show().parent().siblings().find('.operation').hide();
					window.location.href = window.global.ordercheck;

				}
			});

		} else {
			$.post(window.global.editAddr, {
				real_name: username,
				mobile: mobile_num,
				areas_uuid: county_uuid,
				detail: explicit_adress,
				uuid: edit_uuid
			}, function(data) {
				if(data.code == 0) {
					$(This).parent().siblings('.chk_name').find('.name_text').attr('data_text', username).text(username);
					$(This).parent().siblings('.tle').attr('data_text', mobile_num).text(mobile_num);
					$(This).parent().siblings('.adress').find('.detailed_adress').attr('data_text', adress).text(adress);
					$(This).parent().siblings('.adress').find('.probably').attr({
						'data_text': province + city + county,
						'data_province_uuid': province_uuid,
						'data_city_uuid': city_uuid,
						'data_area_uuid': county_uuid
					}).text(province + city + county);
					$('#province').find('[value=' + province_uuid + ']').attr('selected', 'selected').siblings().removeAttr('selected');
					$('#city').find('[value=' + city_uuid + ']').attr('selected', 'selected').siblings().removeAttr('selected');
					$('#country').find('[value=' + county_uuid + ']').attr('selected', 'selected').siblings().removeAttr('selected');
					getShipFee();
					//					window.location.reload();
				}
			})
		}

		shrink();

	});
	//弹出框取消功能
	$('.cancel').click(function() {
		shrink();
	});
	//弹出框隐藏效果
	function shrink() {
		$('.layer').hide();
	}
	//删除功能
	$('.consignee_list').delegate('.delete_ul', 'click', function() {
		var ul_uuid = $(this).parents('.consignee_list ').attr('data-uuid');
		var username = $(this).parent().siblings('.chk_name').find('.name_text').attr('data_text');
		var mobile = $(this).parent().siblings('.tle').attr('data_text');
		var adress = $(this).parent().siblings('.adress').find('.detailed_adress').attr('data_text');
		var probably = $(this).parent().siblings('.adress').find('.probably').attr('data_text');
		var data_id = $(this).parents('.consignee_list').attr('data_id');
		var next_ul = $(this).parents('.consignee_list').siblings().eq(0);
		next_ul.addClass('consignee_active').attr('data_active', '1').siblings().attr('data_active', '0').removeClass('consignee_active');
		next_ul.find('.selected').show().stop(true, true).siblings('.chk').hide().parents('.consignee_list').siblings().find('.selected').hide().stop(true, true).siblings('.chk').show();
		next_ul.find('.position').addClass('position_active').parents('.consignee_list').siblings().find('.position').removeClass('position_active');
		next_ul.find('li').addClass('font_active').parents('.consignee_list').siblings().find('li').removeClass('font_active');
		next_ul.find('.operation').show();
		$(this).parents('.consignee_list').remove();
		$.post(window.global.delAddr, {
			uuid: ul_uuid
		}, function(data) {
			if(data.code == 0) {
				window.location.href = window.global.ordercheck;
			} else {
				alert('地址删除失败！！')
			}
		})

	});

	
		//改变配送方式
	$('.cloud_chk,.express,.cancel_chk').click(function() {
		$(this).hide().siblings('.selected').show();
		$(this).parents('.invoice_details').siblings('.invoice_details').find('.chk ').show().siblings('.selected').hide();
		$(this).parents('.distribution_content').find('.sub_mode').attr('data_select','0');
		$(this).parents('.invoice_details').attr('data_select','1').siblings('.invoice_details').attr('data_select','0');
		var receiving = $('.consignee_active').length;
		if(receiving!=0){
			getShipFee();
		}else{
			alert('请先添加收货地址！！')
		}
	})
		//选中不同的物流方式去后端获取获得数据

	$('.go_home').click(function() {
		$(this).hide().siblings('.chk').show().siblings('.careful_text').show().siblings('.sure').hide();
		$(this).parents('.sub_mode').attr('data_select', '0');
		var receiving = $('.consignee_active').length;
		if(receiving!=0){
			getShipFee();
		}else{
			alert('请先添加收货地址！！')
		}
	});
	$('.cancel_home').click(function() {
		$(this).hide().siblings('.selected').show().siblings('.sure').show().siblings('.careful_text').hide();
		$(this).siblings('.chk ').show();
		$(this).parents('.invoice_itme').find('.cloud_selected ').show().siblings('.cloud_chk ').hide();
		$(this).parents('.invoice_details').siblings('.invoice_details').find('.selected').hide().siblings('.chk').show();
		$(this).parent('.sub_mode').attr('data_select', '1');
		$(this).parents('.invoice_details').attr('data_select','1').siblings('.invoice_details').attr('data_select','0');
		var receiving = $('.consignee_active').length;
		if(receiving!=0){
			getShipFee();
		}else{
			alert('请先添加收货地址！！')
		}
	});
	$('.confirm').click(function() {
		$(this).parents('.distribution_content').slideUp();
		$(this).parents('.distribution').attr('data_sure', '1')
		$(this).parents('.distribution').prepend($('.transport_clone').clone(true));
		$(this).parents('.distribution').find('.transport_summary').removeClass('transport_clone');
		var select_mode = $(this).siblings('.invoice_details');
		$.each(select_mode, function(index, item) {
			var data_num = $(item).attr('data_select');
			if(data_num == 1) {
				var invoice_text = $(item).siblings('.invoice_outline').find('.invoice_num').text();
				var invoice_mode = $(item).siblings('.invoice_outline').find('.invoice_mode').text();
				var mode_name = $(item).find('.mode_name').text();
				var to_pay = $(item).find('.to_pay').text();
				var door_num = $(item).find('.sub_mode').attr('data_select');
				var href_id = $(item).siblings('.invoice_outline').find('.anchor').attr('href');
				var careful = $(item).find('.careful_text').text();
				$(this).parents('.distribution_content').siblings('.transport_summary').find('.summary_mode').text(invoice_text);
				$(this).parents('.distribution_content').siblings('.transport_summary').find('.depot').text(invoice_mode);
				$(this).parents('.distribution_content').siblings('.transport_summary').find('.express').text(mode_name);
				$(this).parents('.distribution_content').siblings('.transport_summary').find('.pay').text(to_pay);
				$(this).parents('.distribution_content').siblings('.transport_summary').find('.summary_product').attr('href', href_id);
				$(this).parents('.distribution_content').siblings('.transport_summary').find('.since').text(careful);
				if(door_num == 1) {
					var describe_mode = $(item).find('.describe_mode').text();
					var describe_sure = $(item).find('.sure').text();
					$(this).parents('.distribution_content').siblings('.transport_summary').find('.express').text(describe_mode);
					$(this).parents('.distribution_content').siblings('.transport_summary').find('.door').text(describe_sure).siblings('.since').text('');
				}

			};
		});

	});
	$('.summary_edite').click(function() {
		$(this).parents('.transport_summary').hide().siblings('.distribution_content').slideDown();
		$(this).parents('.distribution').removeAttr('data_sure');
	});
	//点击查看配送方式
	$('.look_goods').click(function(){
		var hrf=$(this).attr('href');
		if ($(hrf).css('display')=='none') {
			$(hrf).siblings('.transport_summary').hide().siblings('.distribution_content').slideDown();
			$(hrf).parents('.distribution').removeAttr('data_sure');
		}
	})

	//页面加载自动读出省
	$.ajax({
		type: "post",
		url: window.global.getProvince,
		dataType: 'json',
		async: true,
		success: function(res) {
			if(res && res.errcode === 0)
				var res = JSON.parse(data);
			//待定，稍后继续
			var str = "";
			$.each(res, function(index, item) {
				str += "<option value='" + item.uuid + "'>" + item.name + "</option>";
			});
			//将str添加到select为province的下拉列表中
			$('#province').append(str);
		}
	});

	//当触发省份的下拉框时，需要发送ajax请求，获取对应的市区
	$('.province').change(function() {
		var str = $(this).val();
		$('#city').find('option:gt(0)').remove();
		$('#country').find('option:gt(0)').remove();
		if(str == '请选择') {
			$('#city').val('请选择').find('.sub_select').remove();
		} else {
			$.ajax({
				type: "post",
				url: window.global.getAreas,
				async: true,
				dataType: 'json',
				data: {
					'uuid': str
				},
				success: function(res) {
					if(res && res.errcode === 0)
						var res = JSON.parse(data);
					var str = "";
					$.each(res, function(index, item) {
						str += "<option class='sub_select' value='" + item.uuid + "'>" + item.name + "</option>";
					});
					$('#city').append(str);

				}
			});

		}

		$('#city').val('请选择');
		$('#country').val('请选择').find('.sub_select').remove();
	});

	//当触发省份的下拉框时，需要发送ajax请求，获取对应的区县
	$('#city').change(function() {
		var str = $(this).val();
		$('#country').find('option:gt(0)').remove();
		if(str == '请选择') {
			$('this').find('.sub_select').remove();
			$('#country').val('请选择').find('.sub_select').remove();
		} else {
			$.ajax({
				type: "post",
				url: window.global.getCountrys,
				async: true,
				dataType: 'json',
				data: {
					'uuid': str
				},
				success: function(res) {
					if(res && res.errcode === 0)
						var res = JSON.parse(data);
					var str = "";
					$.each(res, function(index, item) {
						str += "<option class='sub_select' value='" + item.uuid + "'>" + item.name + "</option>";
					});
					$('#country').append(str);
				}
			});

		}
		$('#country').val('请选择');
	});

	
	//计算每瓶酒的物流费用
	function single_depot_fee() {
		$('.logistics_num').each(function(index, item) {
			var sigal_num = 0;
			var logistics_num = Number($(this).text().replace('¥', '').replace(/^\s+|\s+$/g, "")) * 100; //找到每个仓库物流费用总价并去掉'¥'、回车换行和空格;
			var total_num = $(this).parents('.product_detail').find('.total_num'); //找到每个仓库下面每个商品的瓶数
			var each_text = $(this).parents('.product_detail').find('.each_text') //找到每个仓库下面每个商品的物流费
			total_num.each(function(e, i) {
				var each_num = Number($(this).text()); //找到每个商品对应的瓶数
				sigal_num += each_num;
			})
			var each_price = logistics_num / sigal_num / 100;
			each_text.text('¥' + each_price.toFixed(2)); //保留两位小数
		});
	};
	single_depot_fee();

	//点击提交
	$('.order_btn').click(function() {
		logistics_mode();
		if(count_times == count_num && receiving == 1) {
			$('.wait_gif').show();
			$.post(window.global.writeOrder, {
				delivery: delivery_json, //物流方式
				address_uuid: receiving_uuid //地址UUID
			}, function(data) {
				if(data.code == 0) {
					window.location.href = window.global.pay + '?uuid=' + data.data.order_uuid + '&from=order_pay';
				} else {
					alert(data.message);
					$('.wait_gif').hide();
				}
			})
		} else {
			if(count_times != count_num) {
				$('html,body').animate({
					scrollTop: 0
				}, 200);
			setTimeout(function(){
				alert('请确认物流方式！！')
			},300);
			} else {
				if(receiving != 1) {
					$('html,body').animate({
						scrollTop: 0
					}, 200);
					setTimeout(function(){
						alert('请添加收货地址！！')
					},300);
				}
			}
		}

	});
	//计算物流方式和获取地址UUID
	function logistics_mode() {
		delivery_json = []; //用于储存物流方式
		count_times = 0; //用于计算配货单数量
		count_sure = [];
		count_num = 0;
		distribution = $('.distribution');
		$.each(distribution, function(index, item) {
			count_times++;
			var data_sure = parseInt($(item).attr('data_sure')); //确认配货单以后才会有data_sure
			count_sure.push(data_sure);
			var data_select = $(item).find('.sub_mode').attr('data_select');
			if(data_select == 1) {
				var ishome = 'yes';
			} else {
				var ishome = 'no';
			}
			var distribution_mode = $(item).find('.invoice_stock').text().replace(/^\s+|\s+$/g, ""); //去掉回车换行和空格        仓库
			var invoice_details = $(item).find('.invoice_details');
			$.each(invoice_details, function(index, item) {
				var isselect = $(item).attr('data_select');
				if(isselect == 1) {
					mode_name = $(item).find('.mode_name').attr('data_mode');
				}
			});
			delivery_order = {
				send_station: distribution_mode,
				method: mode_name,
				home_service: ishome
			};
			delivery_json.push(delivery_order);
		});
		delivery_json = JSON.stringify(delivery_json); //转换为json字符串
		$(count_sure).each(function(i, item) {
			count_num += item;
		});
		receiving = $('.consignee_active').length;
		receiving_uuid = $('.consignee_active').attr('data-uuid');
	}
});