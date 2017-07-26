$(function() {

	ChangeList($('#account_information'));

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
	$('.info3_current').focus(function() {
		$(this).attr('type', 'password');
		
		
	})
	$('.info3_setpw').focus(function() {
		$(this).attr('type', 'password');
	})
	$('.info3_surepw').focus(function() {
			$(this).attr('type', 'password');
		})
		//点击修改
	$('.info2_revise').on('click', function() {
		var val1 = $(this).prev().text();
		$(this).prev().hide();
		$(this).next().show();
		$(this).next().val(val1);
		$(this).parent().children('.info2_save').show();

	});
	//点击保存账户姓名
	$('.info2_savename').on('click', function() {
		//			var reg1 = new RegExp(/[\u4E00-\u9FA5]{2,4}/);
		var name = $(this).prev().val();
		var email = $('.info2_email').text();
		if(name !== '') {
			infoSave($(this));
			$(this).next().text('');
			$.ajax({
				type: "post",
				url: window.global.edit_user,
				async: true,
				data: {
					'name': name,
					'email': email
				},
				success: function(res) {
					if(res && res.errcode === 0)
						var res = JSON.parse(data);
					window.location.reload();

				}
			});
		} else {
			$(this).next().text('姓名不能为空！');
		}
	});

	//点击保存绑定邮箱
	$('.info2_savemali').on('click', function() {
		var reg3 = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		var email = $(this).prev().val();
		var name = $('.info2_name').text();
		if(reg3.test(email)) {
			infoSave($(this));
			$(this).next().text('');
			$.ajax({
				type: "post",
				url: window.global.edit_user,
				async: true,
				data: {
					'name': name,
					'email': email
				},
				success: function(res) {
					if(res && res.errcode === 0)
						var res = JSON.parse(data);
					window.location.reload();
				}
			});
		} else {
			$(this).next().text('您的邮箱格式不正确！');
		}
	});
	//保存的方法
	function infoSave(obj) {

		var val2 = obj.prev().val();

		obj.prev().hide();
		obj.parent().children().eq(1).show();
		obj.parent().children().eq(1).text(val2);
		obj.hide()
	}

	//密码验证
	var pwoff1 = false;
	var pwoff2 = false;
	var pwoff3 = false;
	SureResive();
	//当前密码验证
	$('.info3_current').keyup(function() {
		
		if($(this).val() !== '') {
			pwoff3 = true;
		} else {
			pwoff3 = false;
		}
		SureResive();
	});
	
	$('.info3_setpw').bind('input propertychange', function() {

		var pw2 = $(this).val();
		var reg3 = /^[a-zA-Z0-9]{6,12}$/;
		if(reg3.test($(this).val())) {
			pwoff1 = true;

			$(this).next().text('');
			$(this).next().removeClass('fo3err_add');
		} else {
			$(this).next().text('密码格式不正确！');
			$(this).next().addClass('fo3err_add');
			pwoff1 = false;
		}

		var pw3 = $('.info3_setpw').val();
		var pw4 = $('.info3_surepw').val();
		if(pw3 !== pw4) {
			pwoff2 = false;

		} else {
			pwoff2 = true;

			$('.info3_surepw').next('.fo3err_common').text('');
			$('.info3_surepw').next('.fo3err_common').removeClass('fo3err_add');
		}
		SureResive();

	});

	//确认密码
	$('.info3_surepw').bind('input propertychange', function() {

		check_surepw();
		SureResive();
	});
	//点击获取验证码
	$('.get_ident').click(function() {
		$('.get_ident').attr("disabled", true);
		
		$('.indent_txt').val('');
		var wait = 60;
		$.ajax({
				type: "post",
				url: window.global.send_secure,
				async: true,
				data: {
					'type': 'reset_passwd'
				},
				success: function(res) {
					var str = res.message;
					if(str !== '发送短信失败') {
						time();
						$('.indent_txt').text(str);
						$('.indent_txt').css('color', '#CCCCCC');
						
					} else {
						$('.get_ident').attr("disabled", false);
						$('.indent_txt').text(str);
						$('.indent_txt').css('color', '#FF0000');
					}

				}
			});
		function time() {

			if(wait == 0) {
				$('.get_ident').attr("disabled", false);
				$('.get_ident').val("点击获取验证码");
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
	});

	function check_surepw() {

		var pw3 = $('.info3_setpw').val();
		var pw4 = $('.info3_surepw').val();
		if(pw3 !== pw4) {
			pwoff2 = false;
			$('.info3_surepw').next('.fo3err_common').text('密码不一致！');
			$('.info3_surepw').next('.fo3err_common').addClass('fo3err_add');
		} else {
			pwoff2 = true;

			$('.info3_surepw').next('.fo3err_common').text('');
			$('.info3_surepw').next('.fo3err_common').removeClass('fo3err_add');
		}

	}
	$('.indent_txt').keyup(function() {
		SureResive();
	});

	//确认修改的提交按钮样式判断
	function SureResive() {
		

		if(pwoff1 && pwoff2 && pwoff3 && $('.indent_txt').val() !== '') {

			$('.info3_ok').removeAttr("disabled");
			$('.info3_ok').css('background', '#f3554a')

		} else {

			$(".info3_ok").attr({
				"disabled": "disabled"
			});
			$('.info3_ok').css('background', '#CCCCCC');
		}
	}
	$('.info3_ok').click(function() {
		var reset_pass=$('.indent_txt').val();
		var current = $('.info3_current').val();
		var current_encrypt = $.md5(current);
			//			$('.info3_current').val(current_encrypt);
		var pass_new = $(".info3_setpw").val();
		var pass_new_encrypt = $.md5(pass_new);
		//			$(".info3_setpw").val(pass_new_encrypt);
		var confir_pass = $(".info3_surepw").val();
		var confir_pass_encrypt = $.md5(confir_pass);
		//			$(".info3_surepw").val(confir_pass_encrypt);
		$.ajax({
			type: "post",
			url: window.global.saveInfo,
			async: true,
			data: {
				old_passwd: current_encrypt,
				new_passwd: pass_new_encrypt,
				confirm_passwd: confir_pass_encrypt,
				code:reset_pass
			},
			success: function(res) {
				
				if(res.code !== 0) {
					$('.info3_current').next('.fo3err_common').text('密码输入错误！').css('color', '#FF0000');
				} else {
					alert('密码修改成功！')
					$('.info3_current').next('.fo3err_common').text('');
					window.location.reload();
				}
			}
		});
	});
});