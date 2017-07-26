$(function() {
	//选项卡功能
	function login_tab() {
		$('#login_input .login_title li').click(function() {
			$(this).addClass('title_current').siblings().removeClass('title_current')
			var $index = $(this).index();
			$('#login_input div.login_tab').hide().eq($index).stop(true, true).show();
			if($index == 0) {
				$('#login_input img.underline').animate({
					left: '28px'
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
	//登录框验证
	$('#login_input .btn_account').click(function() {
		account_verification();
	});
	//用户名输入框键盘事件
	$('#username').keyup(function(){
		var username = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9])\d{8}$/img;;
		var name_val = $('#username').val();
		var chkuser = username.test(name_val);
		if(!chkuser || name_val == "请输入用户名") {
			$('#login_input .user_chk').css({
				visibility: 'visible'
			});
			$('.btn_account').attr('disabled','disabled');
		} else {
			$('#login_input .user_chk').css({
				visibility: 'hidden'
			});
			$('.btn_account').removeAttr('disabled');
		};
	});
	//用户名输入框失去焦点
	$('#username').blur(function(){
		var username = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9])\d{8}$/img;;
		var name_val = $('#username').val();
		var chkuser = username.test(name_val);
		if(!chkuser || name_val == "请输入用户名") {
			$('#login_input .user_chk').css({
				visibility: 'visible'
			});
			$('.btn_account').attr('disabled','disabled');
		} else {
			$('#login_input .user_chk').css({
				visibility: 'hidden'
			});
			$('.btn_account').removeAttr('disabled');
		};
	});
	//密码输入框键盘事件
	$('#pwd').keyup(function(){
		var password_chk= /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
		var pwd_val = $('#pwd').val();
		var chkpwd = password_chk.test(pwd_val);
			if(!chkpwd || pwd_val == "请输入密码") {
				$('#login_input .pwd_prompt').css({
					display: 'block'
				});
				$('.btn_account').attr('disabled','disabled');
				return false;
				
			} else {
				$('#login_input .pwd_prompt').css({
					display: 'none'
				});
				$('.btn_account').removeAttr('disabled');
			}
		
	});
	//手机快速登录点击事件
	$('#login_input .btn_phone').click(function(){
		phone_verification();
	});
	//手机号码输入框键盘事件
	$('#phone').keyup(function(){
		var phone = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9])\d{8}$/img;
		var phone_val = $('#phone').val();
		var chkphone = phone.test(phone_val);
		if(!chkphone || phone_val == "请输入手机号") {
			$('#login_input .phone_chk').css({
				visibility: 'visible'
			});
			$('.btn_phone').attr('disabled','disabled');
		} else {
			$('#login_input .phone_chk').css({
				visibility: 'hidden'
			});
			$('.btn_phone').removeAttr('disabled');
		};
	});
	//手机号码输入框失去焦点事件
	$('#phone').blur(function(){
		var phone = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9])\d{8}$/img;
		var phone_val = $('#phone').val();
		var chkphone = phone.test(phone_val);
		if(!chkphone || phone_val == "请输入手机号") {
			$('#login_input .phone_chk').css({
				visibility: 'visible'
			});
			$('.btn_phone').attr('disabled','disabled');
		} else {
			$('#login_input .phone_chk').css({
				visibility: 'hidden'
			});
			$('.btn_phone').removeAttr('disabled');
		};
	});
	//验证码输入框键盘事件
	$('#verification').keyup(function(){
		var verification_val = $('#verification').val();
		if(verification_val=='请输入动态码'||verification_val=='') {
				$('#login_input .verification_prompt').css({
					display: 'block'
				});
				$('.btn_phone').attr('disabled','disabled');
			}else{
				$('#login_input .verification_prompt').css({
					display: 'none'
				});
				$('.btn_phone').removeAttr('disabled');
			}
	});
	//验证码倒计时效果
	$("#btnoption").click(function() {
		var phone_val = $('#phone').val();

		Count_verification()
			
	});

	function account_verification() {
		var username = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9])\d{8}$/img;
		var password_chk= /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
		var name_val = $('#username').val();
		var pwd_val = $('#pwd').val();
		var chkuser = username.test(name_val);
		var chkpwd = password_chk.test(pwd_val);
		if(!chkuser || name_val == "请输入用户名") {
			$('#login_input .user_chk').css({
				visibility: 'visible'
			});
			$('.btn_account').attr('disabled','disabled');
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
				$('.btn_account').attr('disabled','disabled');
				return false;
				
			} else {
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
				$('.btn_phone').attr('disabled','disabled');
			return false;
		} else {
			$('#login_input .phone_chk').css({
				visibility: 'hidden'
			});
			$('.btn_phone').removeAttr('disabled');
			if(verification_val=='请输入动态码'||verification_val=='') {
				$('#login_input .verification_prompt').css({
					display: 'block'
				});
				$('.btn_phone').attr('disabled','disabled');
				return false;
			}else{
				$('.btn_phone').removeAttr('disabled');
			}
		};
	}

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
			$('#login_input .phone_chk').css({
				visibility: 'hidden'
			});
			//解决多次点击重复出发bug
			var nowTime = new Date().getTime();
			var clickTime = $(this).attr("ctime");
			if(clickTime != 'undefined' && (nowTime - clickTime < 60000)) {
				//	        alert('操作过于频繁，稍后再试');
				return false;
			} else {
				$(this).attr("ctime", nowTime);
				Count_down();
			}
		};
	}

	function Count_down() {
		var count = 60;
		var timer1 = setInterval(function() {
			count--;
			$("#btnoption").html(count + "s").css({
				color: '#999999',
				backgroundColor: '#eeeeee',
				border: 0
			});
			if(count == 0) {
				$("#btnoption").html("重新获取验证码");
				clearInterval(timer1);
			};
		}, 1000)
	};
	//input框的提示语 为了兼容IE9 所以没有用placeholder
	var input = $('#login_input input');
	$.each(input, function(index, item) {
		var title = $(item).attr('data-prompt');
		$(item).val(title).css('color', '#999');
		$(item).focus(function() {
			$(this).css({
				"color": "#000"
			});
			if($(this).val() == title) {
				$(this).val('');
			}
		});
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
		var val = $('#pwd').val();
		if(val == '' || val == "请输入密码") {
			$('#pwd').attr('type', 'text');
		} else {
			$('#pwd').attr('type', 'password');
		}
	});
	//跳转到注册页面
	$('.login_register').click(function() {
		window.location.href = 'register_1.html';
	});
	//点击logo跳转到首页
	$('#login_logo .logo_container img').click(function() {
		location.href = 'index.html';
	});
});