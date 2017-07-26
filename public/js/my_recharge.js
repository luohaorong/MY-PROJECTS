$(function() {
	ChangeList($('#personal_recharge'));

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
	//确认提交充值
	var onoff_recharge1 = false;

	function check_money() {
		var str = $('.recharge_money').val();
		if(str.slice(0, 1) == '.') {

			$('.recharge_money').css('border', '1px solid #EA0000');
			onoff_recharge1 = false;
		}

		if(str.slice(0, 1) == '0') {

			if(str.charAt(1) == '.') {

				if(str.charAt(2) !== '.') {
					if(str.charAt(2) == '') {
						$('.recharge_money').css('border', '1px solid #EA0000');
						onoff_recharge1 = false;
					}
					if(str.charAt(2) !== '0' && str.charAt(2) !== '') {
						onoff_recharge1 = true;
						$('.recharge_money').css('border', '1px solid #f3554a');
					} else {
						if(str.charAt(3) !== '0' && str.charAt(3) !== '.' && str.charAt(2) !== '' && str.charAt(3) !== '') {
							onoff_recharge1 = true;
							$('.recharge_money').css('border', '1px solid #f3554a');
						} else {
							$('.recharge_money').css('border', '1px solid #EA0000');
							onoff_recharge1 = false;
						}
					}
				} else {
					$('.recharge_money').css('border', '1px solid #EA0000');
					onoff_recharge1 = false;
				}

			} else {
				$('.recharge_money').css('border', '1px solid #EA0000');
				onoff_recharge1 = false;
			}
		}

		if(str.slice(0, 1) !== '.' && str.slice(0, 1) !== '0') {
			onoff_recharge1 = true;
			$('.recharge_money').css('border', '1px solid #f3554a');
		}
		if(str == '') {
			$('.recharge_money').css('border', '1px solid #EA0000');
			onoff_recharge1 = false;
		}
	}
	$('.recharge_money').keyup(function() {

		check_money();

		recharge();
	});
	//充值：选择checkbox,只可选择一个,并且点击之后样式改变
	$('.bank_big').on('click', function() {
		var name = $(this).attr('data_name');
		$('.alipay1').text(name);
		$(this).addClass('bank_big_add');
		$(this).parent('.pay_line1').siblings('.pay_line1').find('.bank_big').removeClass('bank_big_add');
		$(this).siblings('.bank_big').removeClass('bank_big_add')
		$(this).find('.checkbox_common ').addClass('checkbox_change');
		$(this).parent('.pay_line1').siblings('.pay_line1').find('.bank_big').find('.checkbox_common').removeClass('checkbox_change');
		$(this).siblings('.bank_big').find('.checkbox_common').removeClass('checkbox_change');

		//			if (parseInt($('.recharge_money').val()) > 0) {
		//				onoff_recharge1 = true;
		//			}else {
		//				onoff_recharge1 = false;
		//			}
		check_money();

		recharge();
	});

	recharge();

	function recharge() {
		if(onoff_recharge1) {
			$('.sure').removeAttr("disabled");
			$('.sure').css({
				'background': '#f3554a'
			});
		} else {
			$(".sure").attr({
				"disabled": "disabled"
			});
			$('.sure').css({
				'background': '#cccccc'
			});
		}
	}

	$('.sure').on('click', function() {
		$('.wait_gif').show();
		var data_mode = $('.checkbox_change').parent('div').attr('data-method');
		var money = $('.recharge_money').val();
		$.ajax({
			type: "post",
			url: window.global.recharges,
			async: true,
			data: {
				pay_way: data_mode,
				money: money,
			},
			success: function(data) {
//				console.log(data.data)
				var uuid = {
					uuid: data.data.uuid
				};
				var order_uuid=data.data.uuid;
				var data_from=data.data.from;
				$.ajax({
					type: "post",
					url: window.global.sendPay,
					async: true,
					data: {
						from: data.data.from,
						pay_way: data.data.method,
						attach: JSON.stringify(uuid)
					},
					success: function(res) {
//						console.log(res);
						if(data_mode == 'weixin') {
							$('.pay_layer').find('.pay_box_bottom').find('.pay_first').attr('src', res.data);
							$('.pay_layer').show();
							$('.wait_gif').hide();
//							console.log(data_from);
							function ask_pay(){
								$.ajax({
									type:"post",
									url:window.global.isPayed,
									async:true,
									data:{
										uuid:order_uuid,
										from:data_from
									},
									success:function(info){
										if (info.data.is_payed) {
											$('.pay_first').hide();
											$('.pay_success').show();
											clearInterval(interval);
											setTimeout(function(){
												window.location.href=window.global.mybalance;
											},2000);
										}
									}
								});
							}
							interval=setInterval(ask_pay, "500");
			
							
						} else {
							window.location.href=res.data;
	}

					}
				});
			}
		});
	});
	//点击关闭
	$('.pay_cancel').click(function() {
		$('.pay_layer').hide();
		$('.wait_gif').hide();
		clearInterval(interval)
	})
});