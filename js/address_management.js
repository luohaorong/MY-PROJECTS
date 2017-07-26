$(function() {
	(function() {
		//编辑或新增功能
		function edit(item_id) {

			$(item_id).click(function() {
				//获取姓名、手机号码、详细地址添加到弹出框
				var name = $(this).parents('.address_information').find('.personal_address_receiver').find('span').text();
				var num = $(this).parents('.address_information').find('.personal_address_number').find('span').text();
				var addre;
				if (item_id='.address_information_add') {
					addre=$(this).parents('.address_information').find('.personal_address_content').find('span').text();
				}else{
					addre='';
				}
				
				$('#username').val(name);
				$('#mobile').val(num);
				$('#explicit_adress').val(addre);
				$(this).attr('data_click',item_id);
				
				add_new=$(this).attr('class')
				
				This=this;
				$('.layer').show();
				$('.layer_container').animate({
					top: 230
				}, 500, function() {
					$('.layer_container').animate({
						top: 200
					}, 600);
				});
			})

		};
		edit('.personal_address_edit');
		edit('.address_information_add');
		//弹出框确定功能
		$('.ensure').click(function() {
			var username = $('#username').val();
			var adress = $('#explicit_adress').val();
			var mobile = $('#mobile').val();
			var data_id = $(this).parents('.consignee_list').attr('data_id');
			var province = $(".province").find("option:selected").text();
			var city = $(".city").find("option:selected").text();
			var county = $(".county").find("option:selected").text();
			var phone = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9])\d{8}$/img;
			var chkphone = phone.test(mobile);
			if(username == '') {
				$('<span class="err">请输入收货人姓名</span>').appendTo('.receipt_man').css({
					color: '#ea0000',
					fontWeight: 'bold',
					display: 'block',
					height: '26px',
					marginTop: '5px'
				}).siblings('err').remove();
				return false;
			} else {
				$('.receipt_man .err').remove();
			}
			if(province == '请选择') {
				$('<span class="err">请选择省份</span>').appendTo('.receiver_adress').css({
					color: '#ea0000',
					fontWeight: 'bold',
					display: 'block',
					height: '26px',
					marginTop: '5px'
				}).siblings('err').remove();
				return false;
			} else {
				$('.receiver_adress .err').remove();
			};
			if(city == '请选择') {
				$('<span class="err">请选择城市</span>').appendTo('.receiver_adress').css({
					color: '#ea0000',
					fontWeight: 'bold',
					display: 'block',
					height: '26px',
					marginTop: '5px'
				}).siblings('err').remove();
				return false;
			} else {
				$('.receiver_adress .err').remove();
			};
			if(county == '请选择') {
				$('<span class="err">请选择区/县</span>').appendTo('.receiver_adress').css({
					color: '#ea0000',
					fontWeight: 'bold',
					display: 'block',
					height: '26px',
					marginTop: '5px'
				}).siblings('err').remove();
				return false;
			} else {
				$('.receiver_adress .err').remove();
			};
			if(adress == '') {
				$('<span class="err">请填写详细地址</span>').appendTo('.explicit').css({
					color: '#ea0000',
					fontWeight: 'bold',
					display: 'block',
					height: '26px',
					marginTop: '5px'
				}).siblings('err').remove();
				return false;
			} else {
				$('.explicit .err').remove();
			}
			if(!chkphone) {
				$('<span class="err">请输入正确的手机号</span>').appendTo('.mobile_phone').css({
					color: '#ea0000',
					fontWeight: 'bold',
					paddingLeft: '162px'
				});
				return false;
			} else {
				$('.mobile_phone .err').remove();
			};
			if(add_new==='address_information_add'){
				console.log(111);
				$('.personal_address_container').prepend($('.templete').clone(true));
				
				var first_div=$('.personal_address_container').children(':first');
				first_div.removeClass('templete').addClass('address_information');
				first_div.find('.personal_address_receiver').find('span').text(username);
				first_div.find('.personal_address_number').find('span').text(mobile);
				first_div.find('.personal_address_content').find('span').text(adress);
			}else{
				$(This).parents('.address_information').find('.personal_address_receiver').find('span').text(username);
				$(This).parents('.address_information').find('.personal_address_number').find('span').text(mobile);
				$(This).parents('.address_information').find('.personal_address_content').find('span').text(adress);
			}
			
			shrink();
		});
		
		//弹出框取消功能
		$('.cancel').click(function() {
			shrink();
		});
		//弹出框隐藏效果
		function shrink() {
			$('.layer_container').animate({
				top: 250
			}, 600, function() {
				$('.layer_container').animate({
					top: -2000
				}, 500)
			});
			setTimeout("$('.layer').hide()", 1000);
		}
		//删除地址信息
		$('.personal_address_delete').click(function(){
			$(this).parents('.address_information').remove();
			
		});
		//切换默认地址
		$('.address_information_top').click(function(){
			$(this).find('.personal_address_select').show();
			$(this).parent('.address_information').siblings('.address_information').find('.personal_address_select').hide();
		});
	})();

});