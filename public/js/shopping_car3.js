$(function() {
	//选项卡
	(function() {
		//判断余额是否充足
		function judge_remainder(){
			var first_list = $('.list_title').eq(0).attr('data_active');
			if(first_list == '1') {
				var pay_str = $('.pay_num').text().replace(/^\s+|\s+$/g, "");
				var available_str = $('.available_num').text().replace(/^\s+|\s+$/g, "");
				var pay = pay_str.replace('¥', '');
				var pay_num = Number(pay.replace(',', ''));
				var available = available_str.replace('¥', '');
				var available_num = Number(available.replace(',', ''));
				if(available_num < pay_num) {
					$('.payment_foot').css({
						backgroundColor: '#cccccc'
					});
					return false;
				} else {
					$('.payment_foot').css({
						backgroundColor: '#f3554a'
					});
				}
			} else {
				$('.payment_foot').css({
					backgroundColor: '#f3554a'
				});
			};
		}
		judge_remainder();
		$('.list_title').click(function() {
			$(this).attr('data_active', '1').addClass('firs_list').parent().siblings().find('.list_title').removeAttr('data_active').removeClass('firs_list');
			$(this).siblings('.sub_content').fadeIn();
			$(this).parent().siblings().find('.sub_content').fadeOut();
			judge_remainder();
		});
		//选中按钮
		$('.sub_content ul').find('li:first-child').attr('data_active', '1').css('border', '1px solid #f3554a').find('.selected').show().siblings('.chk').hide();
		$('.sub_content ul li').click(function() {
			$(this).find('.chk').hide().siblings('.selected').show().parent().attr('data_active', '1').css('border', '1px solid #f3554a').siblings().removeAttr('data_active').css('border', '1px solid #E6E6E6').find('.selected').hide().siblings('.chk').show();
		});
		$('#psw').focus(function(){
			$(this).attr('type','password')
		})
		$('.payment_foot').click(function() {
			var pay_list = $('.pay_list').find('.other_list');
			var firs_list = $('.account_list').attr('data_active');
			var data_mode = '';
			var params_arr={
				order_id:$('.order_uuid').val()
			};
			var params_uuid= JSON.stringify(params_arr);//将字面量转换为JSON字符串，JSON.parse()是将字符串转换为JSON对象
			if(firs_list == '1') {
				var pay_str = $('.pay_num').text().replace(/^\s+|\s+$/g, "");
				var pay = pay_str.replace('¥', '');
				var pay_num = Number(pay.replace(',', ''));
				var available_str = $('.available_num').text().replace(/^\s+|\s+$/g, "");
				var available = available_str.replace('¥', '');
				var available_num = Number(available.replace(',', ''));
				if(available_num >= pay_num) {
					$('.layer').show();
				}
			} else {
				$('.wait_gif').show();
				$.each(pay_list, function(index, item) {
					var pay_active = $(item).attr('data_active');
					if(pay_active == '1') {
						data_mode = $(item).siblings('.sub_content').find('.back_list').find('[data_active="1"]').attr('data-method');
					}

				});
				$.post(window.global.sendPay, {
					pay_way: data_mode,
					attach: params_uuid,
					from:'order_pay'
				}, function(data) {
					$('.wait_gif').hide();
					if(data_mode === 'weixin') {
						$('.pay_layer').show();
						$('.pay_first').attr('src',data.data);
						timer = setInterval(function () {
							$.post(window.global.isPayed, {
								uuid: $('.order_uuid').val(),
								from:'order_pay'
							}, function(info) {
								if (info.data.is_payed) {
									$('.pay_layer .pay_first').hide();
									$('.pay_layer .pay_success').show();
									clearInterval(timer);
									setTimeout(function () {
										window.location.href = window.global.orderlist;
									}, 2000);
								}
							});
						}, 500);
							
					}else{
						if(data.data != null) {
							 window.location.href = data.data;
						} else {
							alert(data.message);
							$('.wait_gif').hide();
						}
					}
				});
				
			}
		});
		$('.ensure').click(function(){
			var pay_list = $('.pay_list').find('.other_list');
			var firs_list = $('.account_list').attr('data_active');
			var data_mode = '';
			var params_arr={
				order_id:$('.order_uuid').val()
			};
			var params_uuid= JSON.stringify(params_arr);//将字面量转换为JSON字符串，JSON.parse()是将字符串转换为JSON对象
			var pwd=$('#psw').val();
			var pwd_encrypt=$.md5(pwd);
			var password_chk = /^[a-zA-Z0-9]{6,12}$/;
			var chkpwd = password_chk.test(pwd);
			var code = $("#txt").val();
			if(chkpwd && $('#txt').val()!==''){
				$.post(window.global.passcheck, {
						password:pwd_encrypt,
						code :code
					}, function(data) {
							if(data.code == 0) {
								$.post(window.global.sendPay,{
									attach: params_uuid,
									pay_way: 'balance',
									from:'order_pay'
								},function(data){
									if(data.code===0){
										$('.layer').hide();
										$('.wait_gif').show()
										setTimeout(function(){
											$('.wait_gif').hide();
											window.location.href = data.data;
										},3000)
									}else{
										alert(data.message);
									}
								})
							} else {
								alert(data.message);
							}
		
						});
						
				
				
			}
			if(!chkpwd){
				var marked=$('.marked').length;
				if (marked==0) {
					$('<p class="marked">请输入6-12位（字母、数字或字母和数字组合）登录密码！</p>').css({
						color:'#ea0000',
						fontSize:'12px',
						paddingLeft:'180px'
					}).appendTo('.sub_wap')
				}
					
				
			}else{
				$('.marked').remove();
			}
			if ($('#txt').val()=='') {
				
				var marked1=$('.marked1').length;
				if (marked1==0) {
					$('<p class="marked1">请输入验证码！</p>').css({
						color:'#ea0000',
						fontSize:'12px',
						paddingLeft:'180px'
					}).appendTo('.sub_wap1')
				}
				
			}else{
				$('.marked1').remove();
			}
		});
		$('.cancel').click(function(){
			$('#psw').val('');
			$('#txt').val('');
			$('.marked,.marked1').remove();
			$('.layer').hide();
		});
		$('#psw').keydown(function(event){
			var key_num=event.which;
			if(key_num==13){
				$('.ensure').click()
			}
		})
		$('#psw').keyup(function(){
			if($(this).val()!==''){
				$('.marked').remove();
			}
		})
		$('#txt').keyup(function(){
			if ($(this).val()!=='') {
				$('.marked1').remove();
				$('.tip').text('');
			}
		})
		//关闭微信支付
		$('.pay_cancel').click(function(){
			$('.pay_layer').hide();
		})
		//点击获取支付验证码
		$('.get_ident').click(function(){
			$('.get_ident').attr("disabled", true);
			$('#txt').val('');
			var wait = 60;
			$.ajax({
				type: "post",
				url: window.global.send_secure,
				async: true,
				data: {
					
					'type': 'balance_pay'
				},
				success: function(res) {
					var str = res.message;
					if(str !== '发送短信失败') {
						time();
						$('.tip').text('发送短信成功');
						$('.tip').css('color', '#CCCCCC');
						
					} else {
						$('.get_ident').attr("disabled",false);
						$('.tip').text('发送短信失败');
						$('.tip').css('color', '#FF0000');
					}

				}
			});
			
						function time() {

							if(wait == 0) {
								$('.get_ident').attr("disabled",false);
								$('.get_ident').val( "点击获取验证码");
								wait = 60;
								$('.get_ident').css({
									'color': '#f3554a',
									'background': '#ffffff',
									'border': '1px solid #f3554a'
								});
							} else {
								$('.get_ident').css({
									'color': 'white',
									'background': '#cccccc',
									'border': '1px solid #cccccc'
								});
								$('.get_ident').attr("disabled", true);
								$('.get_ident').val("重新发送(" + wait + ")");
								wait--;
								setTimeout(function() {
									time();
								}, 1000);
							}

						}
		})
	})();
	
});