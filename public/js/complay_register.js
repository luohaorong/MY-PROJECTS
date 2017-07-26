$(function() {
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
					$('#city').find('.sub_select').remove();
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
					$('#country').find('.sub_select').remove();
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
			//验证用户注册信息
			(function input_ver() {
				//验证地址
				$('.address').blur(function() {
					verification_input({
						selector_input: '.address',
						selector_span: '.detail_ad ',
						regular: /^.{1,50}$/,
						text_err: '请输入50字以内的企业地址信息',
						text_right: '只能输入50字，输入超过不记录后续输入内容',
						icon_pass: '.icon_pass_1'
					});
					change_color()
				});
				$('.address').keyup(function() {
					verification_input({
						selector_input: '.address',
						selector_span: '.detail_ad ',
						regular: /^.{1,50}$/,
						text_err: '请输入50字以内的企业地址信息',
						text_right: '只能输入50字，输入超过不记录后续输入内容',
						icon_pass: '.icon_pass_1'
					});
					change_color()
				});
				//验证注册人姓名
				$('#username').blur(function() {
					verification_input({
						selector_input: '#username',
						selector_span: '.register_name',
						regular: /^.{1,20}$/,
						text_err: '请输入注册人姓名',
						text_right: '',
						icon_pass: '.icon_pass_2'
					});
					change_color()
				});
				$('#username').keyup(function() {
					verification_input({
						selector_input: '#username',
						selector_span: '.register_name',
						regular: /^.{1,20}$/,
						text_err: '请输入注册人姓名',
						text_right: '',
						icon_pass: '.icon_pass_2'
					});
					change_color()
				});
				//验证身份证
				$('#card').blur(function() {
					verification_input({
						selector_input: '#card',
						selector_span: '.register_card',
						regular: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/,
						text_err: '请输入15-18位正确的注册人身份证号码',
						text_right: '请输入15-18位身份证号码',
						icon_pass: '.icon_pass_3'
					});
					change_color()
				});
				$('#card').keyup(function() {
					verification_input({
						selector_input: '#card',
						selector_span: '.register_card',
						regular: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/,
						text_err: '请输入15-18位正确的注册人身份证号码',
						text_right: '请输入15-18位身份证号码',
						icon_pass: '.icon_pass_3'
					});
					change_color();
				});
				$('#card').bind('input propertychange',function(){
					verification_input({
						selector_input: '#card',
						selector_span: '.register_card',
						regular: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/,
						text_err: '请输入15-18位正确的注册人身份证号码',
						text_right: '请输入15-18位身份证号码',
						icon_pass: '.icon_pass_3'
					});
					change_color();
				});
					
				
				//验证部门职位
				$('#department').blur(function() {
					if($('#department').val() != '') {
						verification_input({
							selector_input: '#department',
							selector_span: '.register_dep',
							regular: /^.{2,10}$/,
							text_err: '请填写2-10个字的部门职位（非必填项）',
							text_right: ''
						});
					} else {
						$('.register_dep').text('');
					};
				});
				//验证座机号码
				$('#tel').blur(function() {
					
					if($('#tel').val() != '') {
						verification_input({
							selector_input: '#tel',
							selector_span: '.register_tel',
							regular: /^((\d{4})?(\-)?\d{7,8}|\d{3}\-\d{6}|(\d{3}\-\d{7}-\d{3}))$/,
							text_err: '请填写正确的座机号码（非必填项）',
							text_right: ''
						});
						
					} else {
						$('.register_tel').text('');
						$('.tel').show();
						$(this).css({
							backgroundColor:'transparent'
						})
					}

				});
				//区号验证
				$('#area').blur(function() {
					if($('#area').val() != '') {
						verification_input({
							selector_input: '#area',
							selector_span: '.register_tel',
							regular: /\d{3,4}/,
							text_err: '请填写正确的区号（非必填项）',
							text_right: ''
						});
						
					} else {
					
						$('.register_tel').text('');
						$('.area').show();
						$(this).css({
							backgroundColor:'transparent'
						})
					}

				});
				//验证邮箱
				$('#e-mail').blur(function() {
					if($('#e-mail').val() != '') {
						verification_input({
							selector_input: '#e-mail',
							selector_span: '.register_email',
							regular: /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/,
							text_err: '请填写正确的邮箱（非必填项）',
							text_right: '输入您的常用邮箱地址'
						});
					} else {
						$('.register_email').text('输入您的常用邮箱地址').css('color', '#999');
					}

				});
				//上传的图片显示到页面并验证图片格式和大小
				// var card_pec = document.getElementById('card_pec');
				// var Sys = {};
				// var ua = navigator.userAgent.toLowerCase();
				// var s;
				// (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1]: 0;
				// if(Sys.safari) { //Js判断为苹果safari浏览器
				// 	$('#inner_img').remove();
				// };
				// card_pec.onchange = function() {
				// 	PreviewImage(card_pec, 'inner_img');
				// 	change_color();
				// };
				// js本地图片预览          兼容ie[6-9]、火狐、Chrome17+、Opera11+、Maxthon3
				function PreviewImage(fileObj, divPreviewId) {
					$('.register_card_pre').attr('data-success', '1');
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
								$("#inner_img img").remove();
								$('.register_card_pre').removeAttr('data-success').text('图片过大（小于6M）,请重新选择！！').css('color', '#EA0000');
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
											newPreview.style.width = 100 + "px";
											newPreview.style.height = 100 + "px";
											newPreview.style.border = "dashed 1px #e6e6e6";
											newPreview.style.marginLeft='200px';
										};
									};
									newPreview.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src='" + document.selection.createRange().text + "')";
									var tempDivPreview = document.getElementById(divPreviewId);
									tempDivPreview.parentNode.insertBefore(newPreview, tempDivPreview);
									tempDivPreview.style.display = "none";
									
								}else{
									$("#inner_img img").remove();
									$('.register_card_pre').removeAttr('data-success').text('图片过大（小于6M）,请重新选择！！').css('color', '#EA0000');
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
							$("#inner_img img").remove();
							$('.register_card_pre').removeAttr('data-success').text('图片限于png,jpeg,jpg格式,请重新选择！！').css('color', '#EA0000');
								//fileObj.outerHTML = fileObj.outerHTML;
						};

					};
					var data_card_pec = $('.register_card_pre').attr('data-success');
					if(data_card_pec) {
						$('.icon_pass_4').show();
						$('.register_card_pre').text('');
					} else {
						$('.icon_pass_4').hide();
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
				//input框的提示语 为了兼容IE9 所以没有用placeholder
				(function placeholder() {
					var input = $('#area,#tel');
					$.each(input, function(index, item) {
						var title = $(item).attr('data-text');
						if($(item).val() == '')
						{
                            $(item).val(title).css('color', '#999');
						}
						$(item).focus(function() {
							$(this).css({
								color: "#000"
							});
							if($(this).val() == title) {
								$(this).val('');
							}
						});
						$(item).blur(function() {
							if(!($(this).val().length > 0)) {
								$(this).val(title).css({
									color: '#999'
								});
							}
						});
					});
					$('#area').focus(function(){
						$('.area').hide();
					$(this).css({
						backgroundColor:'#FFFFFF'
					});
					});
					$('#tel').focus(function(){
						$('.tel').hide();
					$(this).css({
						backgroundColor:'#FFFFFF'
					});
					});
				})();
				//是否同意《酒品荟购物注册协议》
				(function switch_Hook() {
					$('#chk').click(function() {
						$('#selected').attr('data-success', '1').show().parent().find('#chk').hide();
						change_color();
					});
					$('#selected').click(function() {
						$('#chk').show().parent().parent().find('#selected').attr('data-success', '0').hide();
						change_color();
					});
				})();

				//跳转到登录页面
				$('.rigth_list .to_login').click(function() {
					window.location.href = 'login.html';
				});
				//提交按键变颜色
				$('.required').blur(function() {
					change_color();
				});

				//加载完成后判断提交按钮是否变色
				function isChange() {
					var address_val = $('.address').val();
					var name_val = $('#username').val();
					var card_val = $('#card').val();
					var data_selected = $('#selected').prop('data-success');
					if(address_val || name_val || card_val || data_selected == 1) {
						all_ver()
						change_color();
					};
				};
				isChange();
				
				//点击logo跳转到首页
				$('#login_logo .logo_container img').click(function() {
					location.href = 'index.html';
				});
				//验证所有表单函数
				function all_ver() {
					verification_input({
						selector_input: '.address',
						selector_span: '.detail_ad ',
						regular: /^.{1,50}$/,
						text_err: '请输入50字以内的企业地址信息',
						text_right: '只能输入50字，输入超过不记录后续输入内容',
						icon_pass: '.icon_pass_1'
					});
					verification_input({
						selector_input: '#username',
						selector_span: '.register_name',
						regular: /^.{1,20}$/,
						text_err: '请输入注册人姓名',
						text_right: '',
						icon_pass: '.icon_pass_2'
					});
//					verification_input({
//						selector_input: '#card',
//						selector_span: '.register_card',
//						regular: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/,
//						text_err: '请输入15-18位正确的注册人身份证号码',
//						text_right: '请输入15-18位身份证号码',
//						icon_pass: '.icon_pass_3'
//					});
					if($('#department').val() != '') {
						verification_input({
							selector_input: '#department',
							selector_span: '.register_dep',
							regular: /^.{2,10}$/,
							text_err: '请填写2-10个字的部门职位（非必填项）',
							text_right: ''
						});
					} else {
						$('.register_dep').text('');
					};
					if($('#tel').val() != '' && $('#tel').val() != '座机号码') {
						verification_input({
							selector_input: '#tel',
							selector_span: '.register_tel',
							regular: /^((\d{4})?(\-)?\d{7,8}|\d{3}\-\d{6}|(\d{3}\-\d{7}-\d{3}))$/,
							text_err: '请填写正确的座机号码（非必填项）',
							text_right: ''
						});
					} else {
						$('.register_tel').text('');
					};
					if($('#e-mail').val() != '') {
						verification_input({
							selector_input: '#e-mail',
							selector_span: '.register_email',
							regular: /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/,
							text_err: '请填写正确的邮箱（非必填项）',
							text_right: '输入您的常用邮箱地址'
						});
					} else {
						$('.register_email').text('输入您的常用邮箱地址').css('color', '#999');
					}
				};
				//企业地址选择
				$('#province').change(function(){
					select_address();
					change_color();
				});
				$('#city').change(function(){
					select_address();
					change_color();
				});
				$('#country').change(function(){
					select_address();
					change_color();
				});
				function select_address(){
					var province=$('#province').val();
						var city=$('#city').val();
						var country=$('#country').val();
						if(province == '请选择') {
							$('.address_describe').text('请选择省份').css('color','#EA0000');
							$('.icon_pass_0').hide();
							$('.address_describe').show();
							$('.company_addrese').attr('data-success','0');
						} else{
							if(city == '请选择') {
								$('.address_describe').text('请选择城市').css('color','#EA0000');
								$('.icon_pass_0').hide();
								$('.address_describe').show();
								$('.company_addrese').attr('data-success','0');
							}else{
								if(country == '请选择') {
								$('.address_describe').text('请选择区县').css('color','#EA0000');
								$('.icon_pass_0').hide();
								$('.address_describe').show();
								$('.company_addrese').attr('data-success','0');
								}else{
									$('.icon_pass_0').show();
									$('.address_describe').hide();
									$('.company_addrese').attr('data-success','1');
								}
							}
						} 
				}
				//提交按钮变色函数
				function change_color() {
					var data_adr = $('.detail_ad ').attr('data-success');
					var data_name = $('.register_name').attr('data-success');
					var data_acar = $('.register_card').attr('data-success');
					var data_selected = $('#selected').attr('data-success');
					var data_card_pec = $('.register_card').attr('data-success');
					var company_addrese = $('.company_addrese').attr('data-success');
					if(data_adr == '1' && data_name == '1' && data_selected == '1' && data_card_pec == '1' &&company_addrese=='1') {
						$('.submit').css({
							backgroundColor: '#f3554a'
						}).removeAttr('disabled');
					} else {
						$('.submit').css({
							backgroundColor: '#ccc',
						}).attr('disabled', 'disabled');
					};
				};
				//表单验证函数
				function verification_input(variable) {
					var inp_val = $(variable.selector_input).val();
					var regular = variable.regular;
					var chk = regular.test(inp_val);
					if(!chk) {
						$(variable.selector_span).attr('data-success', '0').text(variable.text_err).css('color', '#ea0000');
						$(variable.icon_pass).hide().parent().find(variable.selector_span).show();
					} else {
						$(variable.selector_span).attr('data-success', '1').text(variable.text_right).css('color', '#999');
						$(variable.icon_pass).show().parent().find(variable.selector_span).hide();
					}
				};
				
				
			});
