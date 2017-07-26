$(function(){
	//企事业单位注册
	
	
	(function(){
		var onoff1 = false;
		var onoff2 = false;
		var onoff3 = false;
		var onoff4 = false;
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
		
		//手机号
		$('.tellphone').blur(function() {
			tell();
		})
		save();
		
	}

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
	//上传文件
	(function(){
		var files = document.getElementById('files');
				var Sys = {};
				var ua = navigator.userAgent.toLowerCase();
				var s;
				(s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1]: 0;
				if(Sys.safari) { //Js判断为苹果safari浏览器
					$('#company_box').remove();
					save();
				};
				files.onchange = function() {
					PreviewImage(files, 'company_box');
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
											img.setAttribute("id", 'img_preview');
											img.setAttribute("src", e.target.result);
											tempDivPreview.appendChild(img);
										} else {
											tempDivPreview.removeChild(img_preview);
											var img = document.createElement("img");
											img.setAttribute("id", 'img_preview');
											img.setAttribute("src", e.target.result);
											tempDivPreview.appendChild(img);
										}

									}
									reader.readAsDataURL(fileObj.files[0]);
								}
							} else {
								$("#company_box img").remove();
								$('.tip_company').removeAttr('data-success').text('图片过大（小于6M）,请重新选择！！').css('color', '#EA0000');
							}

						} else if(browserVersion.indexOf("MSIE") > -1) {
							if(browserVersion.indexOf("MSIE 6") > -1) { //ie6
								var img = document.createElement("img");
								var tempDivPreview = document.getElementById(divPreviewId);
								img.setAttribute("src", fileObj.value);
								tempDivPreview.appendChild(img);
							} else { //ie[7-9]
								getFileSize(fileObj);
								if(filesize<=6){
									fileObj.select();
									if(browserVersion.indexOf("MSIE 9") > -1) {
										fileObj.blur(); //不加上document.selection.createRange().text在ie9会拒绝访问
										document.selection.createRange().text;
										var newPreview = document.getElementById(divPreviewId + "New");
										if(newPreview == null) {
											newPreview = document.createElement("div");
											newPreview.setAttribute("id", divPreviewId + "New");
											newPreview.style.width = 300 + "px";
											newPreview.style.height = 150 + "px";
											newPreview.style.border = "dashed 1px #cccccc";
//											newPreview.style.marginLeft='200px';
										};
									};
									newPreview.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src='" + document.selection.createRange().text + "')";
									var tempDivPreview = document.getElementById(divPreviewId);
									tempDivPreview.parentNode.insertBefore(newPreview, tempDivPreview);
									tempDivPreview.style.display = "none";
									
								}else{
									$("#company_box img").remove();
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
							$("#company_box img").remove();
							$('.tip_company').removeAttr('data-success').text('图片限于png,jpeg,jpg格式,请重新选择！！').css('color', '#EA0000');
								//fileObj.outerHTML = fileObj.outerHTML;
						};

					};
					var data_card_pec = $('.tip_company').attr('data-success');
					if(data_card_pec) {
						onoff4=true;
						$('.tip4_error3').show();
						$('.tip_company').text('');
					} else {
						$('.tip4_error3').hide();
						onoff4=false;
					};
				}
//兼容ie9，获取文件大小
				function getFileSize(obj) {
					try {
						var file = obj;
						file.select();
						file.blur();
						var path = document.selection.createRange().text;
						var fso = new ActiveXObject("Scripting.FileSystemObject");
						filesize = fso.GetFile(path).size/1024/1024;
						 }catch(e){ 
						 	alert(e+"\n"+"如果错误为：Error:Automation 服务器不能创建对象；"+"\n"+"请按以下方法配置浏览器："+"\n"+"请打开【Internet选项-安全-Internet-自定义级别-ActiveX控件和插件-对未标记为可安全执行脚本的ActiveX控件初始化并执行脚本（不安全）-点击启用-确定】"); 
						 	return window.location.reload(); 
						 };
				};
	})();
	
	
		
	
	//密码
	$('.set_password').bind('input propertychange',function() {
		
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
		if(onoff1 && onoff2 && onoff3 && onoff4 && onoff6 && onoff7) {

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
	

	

	//每次失去焦点都执行
	$('.change').on('blur', function() {
		save();
	});

	})();
})