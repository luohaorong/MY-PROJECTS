$(function() {
	var onoff1 = false;
	var onoff2 = false;
	var onoff3 = false;
	var onoff4 = false;
	var onoff5 = false;
	var onoff6 = false;
	var onoff7 = false;
	var onoff8 = false;
	//	var off_click = true;
	$('.set_password').focus(function() {
		$(this).attr('type', 'password');
	});
	$('.check_password').focus(function() {
		$(this).attr('type', 'password');
	});
	$('body').keypress(function(e) {
		if(e.keyCode == 13) {
			e.preventDefault();
		}
	});
	init();

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

	//选择代理级别
	$('.exclusive_common').click(function() {

		$(this).find('.order_top').addClass('checkbox_change');
		$(this).siblings('.exclusive_common').find('.order_top').removeClass('checkbox_change');
		var region = $(this).attr('region');
		if(region == '省') {
			$('.left .exclusive_content').show();
			$('.city_container').hide();
			$('#hid1').val('');
			$('#province').val('请选择');
		} else {
			$('#city').val('请选择')
			$('.left .exclusive_content').show();
			$('.city_container').show();
		}
		check_district();
		save();
	});

	//当触发省份的下拉框时，需要发送ajax请求，获取对应的市区
	$('#province').change(function() {

		var str = $(this).val();
		$('#city').find('[value=请选择]').siblings().remove();
		if($(this).val() !== '请选择') {
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
					var str1 = "";
					$.each(res, function(index, item) {
						str1 += "<option value='" + item.uuid + "'class='sub_city'>" + item.name + "</option>";
					});
					$('#city').append(str1)
				}
			});
		} else {
			$('.sub_city').remove();
		}

		$('#city').val('请选择');

		check_district();
		save();

	});

	//当触发省份的下拉框时，需要发送ajax请求，获取对应的区县
	$('#city').change(function() {

		var str = $(this).val();

		check_district();
		save();
	});

	//三级联动
	function check_district() {
		var region = $('.checkbox_change').parent('.exclusive_common').attr('region');
		var province = $("#province").find("option:selected").text();
		var s = province.substr(province.length - 1, 1);
		var city = $("#city").find("option:selected").text();
		var str1 = $('#province').val();
		var str2 = $('#city').val();

		if(province !== '请选择' && city !== '请选择') {
			onoff5 = true;
			if(s == '市') {
				$('#hid').val(str1);
			} else{
				$('#hid').val(str2);
			}
		} else {
			onoff5 = false;

		}

	}

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
		if($('.set_password').val() !== '') {
			check_setpassword();
		}
		if($('.check_password').val() !== '') {
			check_confirmpassword();
		}

		check_district();
		save();
	}
	//手机号
	$('.tellphone').blur(function() {
		$(this).parents('label').find('.mobile_error').hide();
		tell();

	})
	$('.tellphone').bind('input propertychange',function() {
		$(this).parents('label').find('.mobile_error').hide();
		tell();
	});
	function tell() {

		$('.tip1').css("display", "none");
		var reg1 = /^1\d{10}$/;

		if($('.tellphone').val() == "") {
			onoff1 = false;
			$('.tip1_error1').show();

			$('.tip1_error3').css('display', 'none');
		} else if(reg1.test($('.tellphone').val()) != true) {
			onoff1 = false;
			$('.tip1_error1').css("display", "block");

			$('.tip1_error3').css('display', 'none');
		} else {
			onoff1 = true;
			$('.send_pin1').attr("disabled", false);
			$('.tip1_error1').css("display", "none");
			$('.tip1_error2').css("display", "none");
			$('.tip1_error3').css('display', 'block');
		}
	}
	//验证码
	$('.pin1').blur(function() {
		$(this).parents('label').find('.mobile_error').hide();
		check_pin1();

		save();
	});
	$('.pin1').bind('input propertychange',function(){
		$(this).parents('label').find('.mobile_error').hide();
		check_pin1();

		save();
	});
	function check_pin1() {
		var reg2 = /^\d{4}$/;
		$('.tip2').css("display", "none");
		if($('.pin1').val() == "") {
			onoff2 = false;
			$('.tip2_error1').css("display", "block");

			$('.tip2_error3').css('display', 'none');
		} else if(!reg2.test($('.pin1').val())) {
			onoff2 = false;
			$('.tip2_error1').css("display", "block");

			$('.tip2_error3').css('display', 'none');
		} else {
			onoff2 = true;
			$('.tip2_error1').css("display", "none");

			$('.tip2_error3').css('display', 'block');
		}
	}

	$('.change_code').click(function () {
		var src = $(this).siblings('.img_box').attr('src');
		var random = Math.random().toString(36).substr(2);
		src = src.replace(/\?.*$/g, '?' + random);
		$(this).siblings('.img_box').attr('src', src);
		$(this).siblings('.imgcode').val('');
		
	});

	//点击获取验证码
	$('.send_pin1').click(function() {
		var imgcode1=$('#imgcode1').val();
		$('.send_pin1').attr("disabled", true);
		if(onoff1 == true) {
			//发送注册短信验证码
			var mobile = $('#mobile').val();
			$.ajax({
				type: "post",
				url: window.global.send_sms,
				async: true,
				data: {
					'mobile': mobile,
					'type': 'register',
					'captcha':imgcode1
				},
				success: function(res) {
					var str = res.message;
					if(!res.code) {
						time();
						$('.tip2').text(str);
						$('.tip2').css('color', '#CCCCCC');
					} else {
						$('.send_pin1').attr("disabled", false);
						$('.tip2').text(str).show();
						$('.tip2_error3').hide();
						$('.tip2').css('color', '#FF0000');
						$('.change_code').trigger('click');
					}

				}
			});
			var wait = 60;

			function time() {

				if(wait == 0) {
					$('.send_pin1').attr("disabled", false);
					$('.send_pin1').val("点击获取验证码");
					$('.tip2').text('手机收到的4位数字验证码');
					wait = 60;
					$('.send_pin1').css({
						'color': '#f3554a',
						'background': '#ffffff',
						'border': '1px solid #f3554a'
					});
				} else {
					$('.send_pin1').css({
						'color': 'white',
						'background': '#cccccc',
						'border': '1px solid #cccccc'
					});
					$('.send_pin1').attr("disabled", true);
					$('.send_pin1').val("重新发送(" + wait + ")");
					wait--;
					setTimeout(function() {
						time();
					}, 1000);
				}

			}

		}
	});

	//公司名称
	$('.company_name').bind('input propertychange', function() {
		$(this).parents('label').find('.mobile_error').hide();
		check_company();

		save();
	});
	$('.company_name').blur(function() {
		$(this).parents('label').find('.mobile_error').hide();
		check_company();

		save();
	})

	function check_company() {
		//		var reg3 = /^[\u4e00-\u9fa5]{1,20}$/
		$('.tip3').css("display", "none");
		if($('.company_name').val() == "") {
			onoff3 = false;
			$('.tip3_error1').css("display", "block");
			$('.tip3_error2').css("display", "none");
		} else {
			onoff3 = true;
			$('.tip3_error1').css("display", "none");
			$('.tip3_error2').css("display", "block");
		}
	}

	//密码
	$('.set_password').keyup(function() {

		$(this).parents('label').find('.mobile_error').hide();
		check_setpassword();
		if($('.check_password').val() !== '') {
			check_confirmpassword();
		}

		save();
	});
	$('.set_password').blur(function() {
		$(this).parents('label').find('.mobile_error').hide();
		check_setpassword();
		check_confirmpassword();
		save();
	});

	function check_setpassword() {

		var reg6 = /^[a-zA-Z0-9]{6,12}$/;

		$('.tip6').css("display", "none");
		if($('.set_password').val() == "") {
			onoff6 = false;
			$('.tip6_error1').css("display", "block");

			$('.tip6_error3').css('display', 'none');
		} else if(!reg6.test($('.set_password').val())) {
			onoff6 = false;
			$('.tip6_error1').css("display", "block");

			$('.tip6_error3').css('display', 'none');
		} else {
			onoff6 = true;

			$('.tip6_error1').css("display", "none");

			$('.tip6_error3').css('display', 'block');
		}

	}
	//确认密码
	$('.check_password').bind('input propertychange', function() {
		$(this).parents('label').find('.mobile_error').hide();
		check_confirmpassword();
		save();
	});
	$('.check_password').blur(function() {
		$(this).parents('label').find('.mobile_error').hide();
		check_confirmpassword();
		save();
	});

	function check_confirmpassword() {
		var pass = $('.set_password').val();
		$('.tip7').css("display", "none");
		if($('.check_password').val() == "") {
			onoff7 = false;
			$('.tip7_error1').css("display", "block");

			$('.tip7_error3').css('display', 'none');
		}
		if(pass == $('.check_password').val() && $('.check_password').val() !== "") {

			onoff7 = true;
			$('.tip7_error1').css("display", "none");

			$('.tip7_error3').css("display", "block");
		}
		if(pass !== $('.check_password').val()) {
			onoff7 = false;
			$('.tip7_error1').css("display", "block");

			$('.tip7_error3').css('display', 'none');
		}
	}
	//保存并继续

	function save() {
		if(onoff1 && onoff2 && onoff3 && onoff4 && onoff5 && onoff6 && onoff7 && onoff8) {
			$('.save_go').css({
				'background': '#f3554a'
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

	//点击
	$('.save_go').click(function() {
			if(onoff1 && onoff2 && onoff3 && onoff4 && onoff5 && onoff6 && onoff7) {
				$('#register_first').hide().siblings('#register_sec').show();
				$('#process').hide().siblings('.step_container').show();
				//加密密码
				var pass1 = $('.set_password').val();
				var pass1_encrypt = $.md5(pass1);
				$('.set_password').val(pass1_encrypt);
				var pass2 = $('.check_password').val();
				var pass2_encrypt = $.md5(pass2);
				$('.check_password').val(pass2_encrypt);
				//			$('.set_password').val(md5($('.set_password').val()));
				//			$('.check_password').val(md5($('.check_password').val()));
				$('html,body').animate({
					scrollTop: 0
				}, 100);

			};
		})
		//营业执照号
	$('.business_license').bind('input propertychange', function() {
		check_license();
		save();
	});

	function check_license() {

		$('.tip4').css("display", "none");
		if($('.business_license').val() == "") {
			onoff8 = false;
			$('.tip4_error1').css("display", "block");

			$('.tip4_error3').css('display', 'none');
		} else {
			onoff8 = true;
			$('.tip4_error1').css("display", "none");

			$('.tip4_error3').css('display', 'block');
		}
	}
	//每次失去焦点都执行
	$('.change').blur(function() {

			save();

		})
		//文件上传

	var files = document.getElementById('files');
	var Sys = {};
	var ua = navigator.userAgent.toLowerCase();
	var s;
	(s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1]: 0;
	if(Sys.safari) { //Js判断为苹果safari浏览器
		$('#company_box1').remove();

	};
	files.onchange = function() {
		$(this).parents('label').find('.mobile_error').hide();

		PreviewImage(files, 'company_box1');
		if ($('.tip_company').text()=='') {
					$('#company_box1').css({
						width:'300px',
						height:'200px'
					});
				}else{
					$('#company_box1').css({
						width:'50px',
						height:'50px'
					});
				}
		
		save();
	};

	// js本地图片预览          兼容ie[6-9]、火狐、Chrome17+、Opera11+、Maxthon3
	function PreviewImage(fileObj, divPreviewId) {
		$('.tip_company').attr('data-success', '1');
		var allowExtention = ".jpg,.jpeg,.png"; //允许上传文件的后缀名document.getElementById("hfAllowPicSuffix").value;
		var extention = fileObj.value.substring(fileObj.value.lastIndexOf(".") + 1).toLowerCase();
		var browserVersion = window.navigator.userAgent.toUpperCase();
		if(allowExtention.indexOf(extention) > -1) {
			if(fileObj.files) { //HTML5实现预览，兼容chrome、火狐7+等
				var img_size = fileObj.files[0].size / 1024 / 1024;
				if(img_size <= 6) {
					if(window.FileReader) {
						var reader = new FileReader();
						reader.onload = function(e) {
							var img_preview = document.getElementById('img_preview');
							var tempDivPreview = document.getElementById(divPreviewId);
							if(img_preview == null) {
								var img = document.createElement("img");
								img.style.width = 300 + "px";
								img.style.height = 200 + "px";
								img.setAttribute("id", 'img_preview');
								img.setAttribute("src", e.target.result);
								tempDivPreview.appendChild(img);
							} else {
								tempDivPreview.removeChild(img_preview);
								var img = document.createElement("img");
								img.style.width = 300 + "px";
								img.style.height = 200 + "px";
								img.setAttribute("id", 'img_preview');
								img.setAttribute("src", e.target.result);
								tempDivPreview.appendChild(img);
							}

						}
						reader.readAsDataURL(fileObj.files[0]);
					}
				} else {
					$("#company_box1 img").remove();
					$('.tip_company').removeAttr('data-success').text('图片过大（小于6M）,请重新选择！！').css('color', '#EA0000');
				}

			} else if(browserVersion.indexOf("MSIE") > -1) {
				if(browserVersion.indexOf("MSIE 6") > -1) { //ie6
					var img = document.createElement("img");
					img.style.width = 300 + "px";
					img.style.height = 200 + "px";
					var tempDivPreview = document.getElementById(divPreviewId);
					img.setAttribute("src", fileObj.value);
					tempDivPreview.appendChild(img);
				} else { //ie[7-9]
					getFileSize(fileObj);
					if(filesize <= 6) {
						fileObj.select();
						if(browserVersion.indexOf("MSIE 9") > -1) {
							fileObj.blur(); //不加上document.selection.createRange().text在ie9会拒绝访问
							document.selection.createRange().text;
							var newPreview = document.getElementById(divPreviewId + "New");
							if(newPreview == null) {
								newPreview = document.createElement("div");
								newPreview.setAttribute("id", divPreviewId + "New");
								newPreview.style.width = 300 + "px";
								newPreview.style.height = 200 + "px";
								newPreview.style.marginLeft = 152 + "px";
							};
						};
						newPreview.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src='" + document.selection.createRange().text + "')";
						var tempDivPreview = document.getElementById(divPreviewId);
						tempDivPreview.parentNode.insertBefore(newPreview, tempDivPreview);
						tempDivPreview.style.display = "none";

					} else {
						$("#company_box1 img").remove();
						$('.tip_company').removeAttr('data-success').text('图片过大（小于6M）,请重新选择！！').css('color', '#EA0000');
					}
				}
			} else if(browserVersion.indexOf("FIREFOX") > -1) { //firefox
				var firefoxVersion = parseFloat(browserVersion.toLowerCase().match(/firefox\/([\d.]+)/)[1]);
				if(firefoxVersion < 7) { //firefox7以下版本
					document.getElementById(imgPreviewId).setAttribute("src", fileObj.files[0].getAsDataURL());
				} else { //firefox7.0+                    
					document.getElementById(imgPreviewId).setAttribute("src", window.URL.createObjectURL(fileObj.files[0]));
				}
			} else {
				document.getElementById(imgPreviewId).setAttribute("src", fileObj.value);
			}
		} else {
			if(allowExtention.indexOf(extention) <= -1) {
				$("#company_box1 img").remove();
				$('.tip_company').removeAttr('data-success').text('图片限于png,jpeg,jpg格式,请重新选择！！').css('color', '#EA0000');
				//fileObj.outerHTML = fileObj.outerHTML;
			}

		}
		var data_card_pec = $('.tip_company').attr('data-success');
		if(data_card_pec) {
			onoff4 = true;

			$('.tip_company').text('');
		} else {
			onoff4 = false;
		}
	}
	//兼容ie9，获取文件大小
	function getFileSize(obj) {
		try {
			var file = obj;
			file.select();
			file.blur();
			var path = document.selection.createRange().text;
			var fso = new ActiveXObject("Scripting.FileSystemObject");
			filesize = fso.GetFile(path).size / 1024 / 1024;
		} catch(e) {
			alert(e + "\n" + "如果错误为：Error:Automation 服务器不能创建对象；" + "\n" + "请按以下方法配置浏览器：" + "\n" + "请打开【Internet选项-安全-Internet-自定义级别-ActiveX控件和插件-对未标记为可安全执行脚本的ActiveX控件初始化并执行脚本（不安全）-点击启用-确定】");
			return window.location.reload();
		}
	}
});
