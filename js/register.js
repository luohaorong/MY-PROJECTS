$(function() {
			//验证用户注册信息
			(function input_ver() {
				//验证地址
				$('.address').blur(function() {
					verification_input({
						selector_input: '.address',
						selector_span: '.first_describe',
						regular: /^.{1,50}$/,
						text_err: '请输入50字以内的企业地址信息',
						text_right: '只能输入50字，输入超过不记录后续输入内容',
						icon_pass: '.icon_pass_1'
					});
				});
				$('.address').keyup(function() {
					verification_input({
						selector_input: '.address',
						selector_span: '.first_describe',
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
				$('#card').bind('input propertychange',function(){
					verification_input({
						selector_input: '#card',
						selector_span: '.register_card',
						regular: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
						text_err: '请输入15-18位正确的注册人身份证号码',
						text_right: '请输入15-18位身份证号码',
						icon_pass: '.icon_pass_3'
					});
					change_color();
				});
				//验证身份证
				$('#card').blur(function() {
					verification_input({
						selector_input: '#card',
						selector_span: '.register_card',
						regular: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
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
						regular: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
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
	})();
				//input框的提示语 为了兼容IE9 所以没有用placeholder
				(function placeholder() {
					var input = $('#area,#tel');
					$.each(input, function(index, item) {
						var title = $(item).attr('data-text');
						$(item).val(title).css('color', '#999');
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
						selector_span: '.first_describe',
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
					verification_input({
						selector_input: '#card',
						selector_span: '.register_card',
						regular: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
						text_err: '请输入15-18位正确的注册人身份证号码',
						text_right: '请输入15-18位身份证号码',
						icon_pass: '.icon_pass_3'
					});
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
				//提交按钮变色函数
				function change_color() {
					var data_adr = $('.first_describe').prop('data-success');
					var data_name = $('.register_name').prop('data-success');
					var data_acar = $('.register_card').prop('data-success');
					var data_selected = $('#selected').attr('data-success');
					if(data_adr == 1 && data_name == 1 && data_acar == 1 && data_selected == 1) {
						$('.submit').css({
							backgroundColor: '#57E6D3'
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
						$(variable.selector_span).prop('data-success', '0').text(variable.text_err).css('color', '#ea0000');
						$(variable.icon_pass).hide().parent().find(variable.selector_span).show();
					} else {
						$(variable.selector_span).prop('data-success', '1').text(variable.text_right).css('color', '#999');
						$(variable.icon_pass).show().parent().find(variable.selector_span).hide();
					}
				};
			});