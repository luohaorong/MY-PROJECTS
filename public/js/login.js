$(function() {
	
	//选项卡功能
	function login_tab() {
		$('#login_input .login_title li').click(function() {
			$(this).addClass('title_current').siblings().removeClass('title_current')
			var $index = $(this).index();
			$('#login_input div.login_tab').hide().eq($index).stop(true, true).show();
			if($index == 0) {
				$('#login_input img.underline').animate({
					left: '34px'
				}, 100);
			};
			if($index == 1) {
				$('#login_input img.underline').animate({
					left: '178px'
				}, 100);
			};
		});
	};
	login_tab();
	$('#username').val('');
	//登录框的自适应高度居中
	login_height();
	function login_height(){
		
		var hei=$('#login_input_container').height();
		$('#login_input_container').css({
			marginTop:-hei/2
		});
	}
	//用户名输入框键盘事件
	$('#username').keyup(function() {
		var username = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9])\d{8}$/img;;
		var name_val = $('#username').val();
		var chkuser = username.test(name_val);
		if(!chkuser || name_val == "请输入用户名") {
			$('#login_input .user_chk').css({
				visibility: 'visible'
			});
			$('.btn_account').attr('disabled', 'disabled');
		} else {
			$('#login_input .user_chk').css({
				visibility: 'hidden'
			});
			$('.btn_account').removeAttr('disabled');
		};
	});
	//用户名输入框失去焦点
	$('#username').blur(function() {
		var username = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9])\d{8}$/img;;
		var name_val = $('#username').val();
		var chkuser = username.test(name_val);
		if(!chkuser || name_val == "请输入用户名") {
			$('#login_input .user_chk').css({
				visibility: 'visible'
			});
			$('.pwd_chk').css({
				visibility: 'hidden'
			});
			$('.btn_account').attr('disabled', 'disabled');
		} else {
			$('#login_input .user_chk').css({
				visibility: 'hidden'
			});
			$('.btn_account').removeAttr('disabled');
		};
	});
	//密码输入框键盘事件
	$('#pwd').keyup(function() {
		login_height();
		$('.login_error').hide();
		var password_chk = /^[a-zA-Z0-9]{6,12}$/;
		var pwd_val = $('#pwd').val();
		var chkpwd = password_chk.test(pwd_val);
		if(!chkpwd || pwd_val == "请输入密码") {
			$('#login_input .pwd_prompt').css({
				display: 'block'
			});
			$('.pwd_chk').css({
				visibility: 'hidden'
			});
			$('.btn_account').attr('disabled', 'disabled');
			return false;

		} else {
			$('#login_input .pwd_prompt').css({
				display: 'none'
			});
			$('.btn_account').removeAttr('disabled');
		}

	});
	$("body").bind('keyup', function(event) {
		if(event.keyCode =='13') {
			$('.login_error').hide();
		account_verification();
		}
	});

	//登录框验证
	$('#login_input .btn_account').click(function() {

		$('.login_error').hide();
		account_verification();
	});
	//手机快速登录点击事件
	$('#login_input .btn_phone').click(function() {

	});
	//手机号码输入框键盘事件
	$('#phone').keyup(function() {
		var phone = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9])\d{8}$/img;
		var phone_val = $('#phone').val();
		var chkphone = phone.test(phone_val);
		if(!chkphone || phone_val == "请输入手机号") {
			$('#login_input .phone_chk').css({
				visibility: 'visible'
			});
			$('.btn_phone').attr('disabled', 'disabled');
		} else {
			$('#login_input .phone_chk').css({
				visibility: 'hidden'
			});
			$('.btn_phone').removeAttr('disabled');
		};
	});
	//手机号码输入框失去焦点事件
	$('#phone').blur(function() {
		var phone = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9])\d{8}$/img;
		var phone_val = $('#phone').val();
		var chkphone = phone.test(phone_val);
		if(!chkphone || phone_val == "请输入手机号") {
			$('#login_input .phone_chk').css({
				visibility: 'visible'
			});
			$('.btn_phone').attr('disabled', 'disabled');
		} else {
			$('#login_input .phone_chk').css({
				visibility: 'hidden'
			});
			$('.btn_phone').removeAttr('disabled');
		};
	});
	//验证码输入框键盘事件
	$('#verification').keyup(function() {
		var verification_val = $('#verification').val();
		$('.login_error').hide();
		if(verification_val == '请输入动态码' || verification_val == '') {
			$('#login_input .verification_prompt').css({
				display: 'block'
			});
			$('.btn_phone').attr('disabled', 'disabled');
		} else {
			$('#login_input .verification_prompt').css({
				display: 'none'
			});
			$('.btn_phone').removeAttr('disabled');
		}
	});
	//验证码倒计时效果
	$("#btnoption").click(function() {
		Count_verification();
	});

	function account_verification() {
		var username = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9])\d{8}$/img;
		var password_chk = /^[a-zA-Z0-9]{6,12}$/;
		var name_val = $('#username').val();
		var pwd_val = $('#pwd').val();
		var chkuser = username.test(name_val);
		var chkpwd = password_chk.test(pwd_val);
		if(!chkuser || name_val == "请输入用户名") {
			$('#login_input .user_chk').css({
				visibility: 'visible'
			});
			$('.pwd_chk').css({
				visibility: 'hidden'
			});
			$('.btn_account').attr('disabled', 'disabled');
			return false;
		} else {
			$('#login_input .user_chk').css({
				visibility: 'hidden'
			});
			$('.btn_account').removeAttr('disabled');
			if(!chkpwd || pwd_val == "请输入密码") {
				$('#login_input .pwd_prompt').css({
					display: 'block'
				});
				$('.btn_account').attr('disabled', 'disabled');
				return false;

			} else {

				$('#pwd').val($.md5($('#pwd').val()));

				$('#login_input .pwd_prompt').css({
					display: 'none'
				});

				$('.btn_account').removeAttr('disabled');

			}
		};
	};

	function phone_verification() {
		var phone = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9])\d{8}$/img;
		var phone_val = $('#phone').val();
		var verification_val = $('#verification').val();
		var chkphone = phone.test(phone_val);
		if(!chkphone || phone_val == "请输入手机号") {
			$('#login_input .phone_chk').css({
				visibility: 'visible'
			});
			$('.btn_phone').attr('disabled', 'disabled');
			return false;
		} else {
			$('#login_input .phone_chk').css({
				visibility: 'hidden'
			});
			$('.btn_phone').removeAttr('disabled');
			if(verification_val == '请输入动态码' || verification_val == '') {
				$('#login_input .verification_prompt').css({
					display: 'block'
				});
				$('.login_error').hide();
				$('.btn_phone').attr('disabled', 'disabled');
				return false;
			} else {
				$('.btn_phone').removeAttr('disabled');
			}
		};
	}
	//验证电话号码并发送请求
	function Count_verification() {
		var phone = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9])\d{8}$/img;
		var phone_val = $('#phone').val();
		var verification_val = $('#verification').val();
		var chkphone = phone.test(phone_val);
		if(!chkphone || phone_val == "请输入手机号") {
			$('#login_input .phone_chk').css({
				visibility: 'visible'
			});
			return false;
		} else {
			var phone_val = $('#phone').val();
			//解决多次点击重复出发bug
			Count_down();
			$.ajax({
				type: "post",
				url: window.global.send_sms,
				async: true,
				data: {
					'mobile': phone_val,
					'type': 'fast_login'
				},
				success: function(res) {
					$('#login_input .phone_chk').css({
						visibility: 'hidden'
					});

				}
			});
		};
	}
	//获取验证码倒计时并防止重复点击
	function Count_down() {
		var count = 91;
		count--;
		$("#btnoption").html(count + "s").css({
			color: '#999999',
			backgroundColor: '#eeeeee',
			border: 0
		});
		if(count == 0) {
			$("#btnoption").html("重新获取验证码").css({
				color: '#661B18',
				backgroundColor: '#ffffff',
				border: '1px solid #661B18'
			});
			$("#btnoption").attr('disabled', false);
			clearInterval(timer1);
		} else {
			$("#btnoption").attr('disabled', true);
		}
		var timer1 = setInterval(function() {
			count--;
			$("#btnoption").html(count + "s").css({
				color: '#999999',
				backgroundColor: '#eeeeee',
				border: 0
			});
			if(count == 0) {
				$("#btnoption").html("重新获取验证码").css({
					color: '#661B18',
					backgroundColor: '#ffffff',
					border: '1px solid #661B18'
				});
				$("#btnoption").attr('disabled', false);
				clearInterval(timer1);
			} else {
				$("#btnoption").attr('disabled', true);
			}
		}, 1000);
	};
	//input框的提示语 为了兼容IE9 所以没有用placeholder
	var input = $('#login_input input').not('.not');
	$.each(input, function(index, item) {
		var title = $(item).attr('data-prompt');
		var reg = /\d{11}/;
		var phone_num = $(this).val();
		var chk_num = reg.test(phone_num);
            if(!chk_num) {
                $(item).val(title).css('color', '#999');
                $(item).focus(function() {
                    $(this).css({
                        "color": "#000"
                    });
                    if($(this).val() == title) {
                        $(this).val('');
                    }
                });
            }

            $(item).blur(function() {
                if(!($(this).val().length > 0)) {
                    $(this).val(title).css('color', '#999');
                }
            });

	});

	//设置密码输入框的类型
	function input_compatible(id_input) {
		$(id_input).focus(function() {
			$(id_input).css({
				paddingLeft: 50,
				width: 245,
				textIndent: 0
			});
		});
	};

	input_compatible('#username');
	input_compatible('#phone');
	$('#verification').focus(function() {
		$('#verification').css({
			paddingLeft: 50,
			width: 138,
			textIndent: 0
		});
	});
	$('#pwd').focus(function() {
		$('#pwd').attr('type', 'password').css({
			paddingLeft: 50,
			width: 245,
			textIndent: 0
		});
	});
	$('#pwd').blur(function() {
		$('.login_error').hide();
		var val = $('#pwd').val();
		if(val == '' || val == "请输入密码") {
			$('#pwd').attr('type', 'text');
		} else {
			$('#pwd').attr('type', 'password');
		}
	});

	$('body').on('click', '.change_code', function () {
		
		var src = $(this).siblings('.img_box').attr('src');
		var random = Math.random().toString(36).substr(2);
		src = src.replace(/\?.*$/g, '?' + random);
		$(this).siblings('.img_box').attr('src', src);
	});

});