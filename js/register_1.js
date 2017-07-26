$(function() {
	//经销商注册
	(function(){
		var onoff1 = false;
		var onoff2 = false;
		var onoff3 = false;
		var onoff4 = false;
		var onoff5 = false;
		var onoff6 = false;
		var onoff7 = false;
		init();

	function init() {
		if($('.tellphone').val() !== '') {
			tell();
		}
		if($('.pin1').val() !== '') {
			check_pin1();
		}
		if($('.company_name').val() !== '') {
			check_company();
		}
		if($('.business_license').val() !== '') {
			check_license();
		}
		
		
		check_district();
		save();
	}
	//手机号
		$('.tellphone').blur(function() {
			tell();
		})
	function tell() {

		$('.tip1').css("display", "none");
		var reg1 = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;

		if($('.tellphone').val() == "") {
			onoff1=false;
			$('.tip1_error1').css("display", "block");
			$('.tip1_error2').css("display", "none");
			$('.tip1_error3').css('display', 'none');
		} else if(reg1.test($('.tellphone').val()) != true) {
			onoff1=false;
			$('.tip1_error1').css("display", "none");
			$('.tip1_error2').css("display", "block");
			$('.tip1_error3').css('display', 'none');
		} else {
			onoff1 = true;
			$('.tip1_error1').css("display", "none");
			$('.tip1_error2').css("display", "none");
			$('.tip1_error3').css('display', 'block');
		}
	}
	//验证码
	$('.pin1').change(function() {
		
		check_pin1();
		save();
	});
	
	function check_pin1() {
		var reg2 = /^\d{4}$/;
		$('.tip2').css("display", "none");
		if($('.pin1').val() == "") {
			onoff2=false;
			$('.tip2_error1').css("display", "block");
			$('.tip2_error2').css("display", "none");
			$('.tip2_error3').css('display', 'none');
		} else if(!reg2.test($('.pin1').val())) {
			onoff2=false;
			$('.tip2_error1').css("display", "none");
			$('.tip2_error2').css("display", "block");
			$('.tip2_error3').css('display', 'none');
		} else {
			onoff2 = true;
			$('.tip2_error1').css("display", "none");
			$('.tip2_error2').css("display", "none");
			$('.tip2_error3').css('display', 'block');
		}
	}
	//点击获取验证码
	$('.send_pin1').click(function() {

		if(onoff1 == true) {
			var wait = 60;

			function time(obj) {

				if(wait == 0) {
					obj.removeAttribute("disabled");
					obj.value = "免费获取验证码";
					wait = 60;
					$('.send_pin1').css({
						'color': '#57e6d3',
						'background': '#ffffff',
						'border': '1px solid #57e6d3'
					});
				} else {
					$('.send_pin1').css({
						'color': 'white',
						'background': '#cccccc',
						'border': '1px solid #cccccc'
					});
					obj.setAttribute("disabled", true);
					obj.value = "重新发送(" + wait + ")";
					wait--;
					setTimeout(function() {
						time(obj)
					}, 1000);
				}

			}
			time(this)
		}
	});

	//公司名称
	$('.company_name').bind('input propertychange',function() {
		
		check_company();
		save();
	});

	function check_company() {
		var reg3 = /^[\u4e00-\u9fa5]{1,20}$/
		$('.tip3').css("display", "none");
		if($('.company_name').val() == "" || !reg3.test($('.company_name').val()) ){
			onoff3=false;
			$('.tip3_error1').css("display", "block");
			$('.tip3_error2').css("display", "none");
		}else {
			onoff3 = true;
			$('.tip3_error1').css("display", "none");
			$('.tip3_error2').css("display", "block");
		}
	}
	//营业执照号
	$('.business_license').bind('input propertychange',function() {
		check_license();
		save();
	});

	function check_license() {
		var reg4 = /\d{15}/;
		var reg5 =/\d{18}/;
		$('.tip4').css("display", "none");
		if($('.business_license').val() == "") {
			onoff4=false;
			$('.tip4_error1').css("display", "block");
			$('.tip4_error2').css("display", "none");
			$('.tip4_error3').css('display', 'none');
		} else if(reg4.test($('.business_license').val())==true) {
			onoff4 = true;
			$('.tip4_error1').css("display", "none");
			$('.tip4_error2').css("display", "none");
			$('.tip4_error3').css('display', 'block');
		} else{
			onoff4=false;
			$('.tip4_error1').css("display", "none");
			$('.tip4_error2').css("display", "block");
			$('.tip4_error3').css('display', 'none');
		}
	}

	//三级联动

	function check_district() {
		if($('.province').val() !== '请选择' && $('.city').val() !== '请选择' && $('.region').val() !== '请选择') {
			
			onoff5 = true;
			$('.tip5_error2').css('display', 'block');
		} else {
			onoff5 = false;
			$('.tip5_error2').css('display', 'none');
		}

	}
	//三级下拉框改变
	$('select').change(function(){
		check_district();
		save();
	});
	
		
	
	//密码
	$('.set_password').keyup(function() {
		
		check_setpassword();
		save();
	});

	function check_setpassword() {
		
		var reg6 = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
		$('.tip6').css("display", "none");
		if($('.set_password').val() == "") {
			onoff6=false;
			$('.tip6_error1').css("display", "block");
			$('.tip6_error2').css("display", "none");
			$('.tip6_error3').css('display', 'none');
		} else if(!reg6.test($('.set_password').val())) {
			onoff6=false;
			$('.tip6_error1').css("display", "none");
			$('.tip6_error2').css("display", "block");
			$('.tip6_error3').css('display', 'none');
		} else {
			onoff6 = true;

			$('.tip6_error1').css("display", "none");
			$('.tip6_error2').css("display", "none");
			$('.tip6_error3').css('display', 'block');
		}
		
	}
	//确认密码
	$('.check_password').bind('input propertychange',function() {
		check_confirmpassword();
		save();
	});

	function check_confirmpassword() {
		var pass = $('.set_password').val();
		$('.tip7').css("display", "none");
		if($('.check_password').val() == "") {
			onoff7=false;
			$('.tip7_error1').css("display", "block");
			$('.tip7_error2').css("display", "none");
			$('.tip7_error3').css('display', 'none');
		}
		if(pass == $('.check_password').val() && $('.check_password').val() !== "") {

			onoff7 = true;
			$('.tip7_error1').css("display", "none");
			$('.tip7_error2').css("display", "none");
			$('.tip7_error3').css("display", "block");
		}
		if(pass !== $('.check_password').val()) {
			onoff7=false;
			$('.tip7_error1').css("display", "none");
			$('.tip7_error2').css("display", "block");
			$('.tip7_error3').css('display', 'none');
		}
	}
	//保存并继续

	function save() {
		if(onoff1 && onoff2 && onoff3 && onoff4 && onoff5 && onoff6 && onoff7) {

			$('.save_go').css({
				'background': '#57e6d3'
			});
			$(".save_go").removeAttr("disabled")
		} else {
			$('.save_go').css({
				'background': '#cccccc'
			});
			$(".save_go").attr({
				"disabled": "disabled"
			});
		}
		
	}
	$('.save_go').click(function() {
		window.location.href = 'register_2.html';

	});

	

	//每次失去焦点都执行
	$('.change').on('blur', function() {
		save();
	});

	})();
	
});