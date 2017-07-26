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
	/***********地址管理***************/
	ChangeList($('#address_management'));

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
	(function() {

		$('.address_consume').click(function() {
			$(this).addClass('add_address').siblings('.address_common').removeClass('add_address');
			$('.personal_address_container').show();
			$('.main_sale_container').hide();
		});
		$('.address_recharge').click(function() {

			$(this).addClass('add_address').siblings('.address_common').removeClass('add_address');
			$('.personal_address_container').hide();
			$('.main_sale_container').show();
		})
	})();

		//编辑或新增功能
		edit('.personal_address_edit');
		edit('.address_information_add');
		function edit(item_id) {
			$(item_id).click(function() {

				//获取姓名、手机号码、详细地址添加到弹出框
				var name = $(this).parents('.address_information').find('.personal_address_receiver').find('span').text();
				var num = $(this).parents('.address_information').find('.personal_address_number').find('span').text();
				var addre;
				
				var data_detail=$(this).parents('.address_information').find('.personal_address_content').attr('data_detail');
				var data_province_uuid=$(this).parents('.address_information').find('.personal_address_content').attr('data_province_uuid');
				var data_province= $(this).parents('.address_information').find('.personal_address_content').attr('data_province');
				var data_city_uuid=$(this).parents('.address_information').find('.personal_address_content').attr('data_city_uuid');
				var data_city=$(this).parents('.address_information').find('.personal_address_content').attr('data_city');
				var data_area_uuid=$(this).parents('.address_information').find('.personal_address_content').attr('data_area_uuid');
				var data_area=$(this).parents('.address_information').find('.personal_address_content').attr('data_area');
				var data_text=$(this).parents('.address_information').find('.personal_address_content').attr('data_text');

				
				

				
				if (item_id =='.personal_address_edit') {
					addre=data_detail;
//					$(this).parents('.address_information').find('.personal_address_content').attr('data_detail',);
					
					
					$('#province').find('[value=' + data_province_uuid + ']').attr('selected',true).siblings().removeAttr('selected');
					
					
				$('#province').find('option').not('[value=请选择]').remove();
				setTimeout(function() {
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
							$('#province').find('[value=' + data_province_uuid + ']').attr('selected',true).siblings().removeAttr('selected');
						}
					});
				}, 1)

					$.ajax({
					type: "post",
					url: window.global.getAreas,
					async: true,
					dataType: 'json',
					data: {
						'uuid': data_province_uuid
					},
					success: function(res) {
						if(res && res.errcode === 0)
							var res = JSON.parse(data);
						var str = "";
						$.each(res, function(index, item) {
							str += "<option class='sub_select' value='" + item.uuid + "'>" + item.name + "</option>";
						});
						$('#city').append(str);
						$('#city').find('[value=' + data_city_uuid + ']').attr('selected', true);
					}
				});
				$.ajax({
					type: "post",
					url: window.global.getCountrys,
					async: true,
					dataType: 'json',
					data: {
						'uuid': data_city_uuid
					},
					success: function(res) {
						if(res && res.errcode === 0)
							var res = JSON.parse(data);
						var str = "";
						$.each(res, function(index, item) {
							str += "<option class='sub_select' value='" + item.uuid + "'>" + item.name + "</option>";
						});
						$('#country').append(str);
						$('#country').find('[value=' + data_area_uuid + ']').attr('selected', true);
					}
				});
				
				}else {
					addre = '';
					$('#province').find('[value=请选择]').attr('selected',true).siblings().removeAttr('selected');
					$('#city').find('[value=请选择]').attr('selected',true).siblings().removeAttr('selected');
					$('#country').find('[value=请选择]').attr('selected',true).siblings().removeAttr('selected');
					
				
				}
				
				
				
				$('#username').val(name);
				$('#mobile').val(num);
				$('#explicit_adress').val(addre);
				$(this).attr('data_click', item_id);

				add_new = $(this).attr('class')

				This = this;
				$('.layer1').show();
				$('.layer_container1').animate({
					top: 230,
					opacity: 1
				}, 500);
				
				
				
				$('body,html').animate({scrollTop:0},300); 
			});
			

			
		};
		
	(function() {
		//弹出框确定功能
		$('.ensure1').click(function() {
			var username = $('#username').val();
			var adress = $('#explicit_adress').val();
			
			var data_detail=$('#explicit_adress').val();
			var data_province_uuid=$("#province").val();
			var data_city_uuid=$('#city').val();
			var data_area_uuid=$('#country').val();
			var data_province= $("#province").find("option:selected").text();
			var data_city=$("#city").find("option:selected").text();
			var data_area=$("#country").find("option:selected").text();
			var data_text=data_province+data_city+data_area;
			
			var mobile = $('#mobile').val();
			var data_id = $(this).parents('.consignee_list').attr('data_id');
			var province = $("#province").find("option:selected").text();
			
			var city = $("#city").find("option:selected").text();
			var county = $("#country").find("option:selected").text();
			var phone = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9])\d{8}$/img;
			var chkphone = phone.test(mobile);
			if(username == '') {
				$('<span class="err">请输入收货人姓名</span>').appendTo('.receipt_man').css({
					color: '#ea0000',
					fontSize:'14px',
					display: 'block',
					height: '26px',
					marginTop: '5px'
				}).siblings('.err').remove();
				return false;
			} else {
				$('.receipt_man .err').remove();
			}
			if(province == '请选择') {

				$('<span class="err">请选择省份</span>').appendTo('.receiver_adress').css({
					color: '#ea0000',
					fontSize:'14px',
					display: 'block',
					height: '26px',
					marginTop: '5px'
				}).siblings('.err').remove();
				return false;
			} else {
				$('.receiver_adress .err').remove();
			};
			if(city == '请选择') {
				$('<span class="err">请选择城市</span>').appendTo('.receiver_adress').css({
					color: '#ea0000',
					fontSize:'14px',
					display: 'block',
					height: '26px',
					marginTop: '5px'
				}).siblings('.err').remove();
				return false;
			} else {
				$('.receiver_adress .err').remove();
			};
			if(county == '请选择') {
				$('<span class="err">请选择区/县</span>').appendTo('.receiver_adress').css({
					color: '#ea0000',
					fontSize:'14px',
					display: 'block',
					height: '26px',
					marginTop: '5px'
				}).siblings('.err').remove();
				return false;
			} else {
				$('.receiver_adress .err').remove();
			};
			if(adress == '') {
				$('<span class="err">请填写详细地址</span>').appendTo('.explicit').css({
					color: '#ea0000',
					fontSize:'14px',
					display: 'block',
					height: '26px',
					marginTop: '5px'
				}).siblings('.err').remove();
				return false;
			} else {
				$('.explicit .err').remove();
			}
			if(!chkphone) {
				$('<span class="err">请输入正确的手机号</span>').appendTo('.mobile_phone').css({
					color: '#ea0000',
					fontSize:'14px',
					paddingLeft: '240px'
				}).siblings('.err').remove();
				return false;
			} else {
				$('.mobile_phone .err').remove();
			};
			if(add_new === 'address_information_add') {
				
				$('.personal_address_container').prepend($('.templete').clone(true));

				var first_div = $('.personal_address_container').children(':first');
				first_div.removeClass('templete').addClass('address_information');
				first_div.find('.personal_address_receiver').find('span').text(username);
				first_div.find('.personal_address_number').find('span').text(mobile);
				
				first_div.find('.personal_address_content').find('span').text(adress);
				first_div.find('.personal_address_content').attr('data_detail',data_detail);
				first_div.find('.personal_address_content').attr('data_province_uuid',data_province_uuid);
				first_div.find('.personal_address_content').attr('data_city_uuid',data_city_uuid);
				first_div.find('.personal_address_content').attr('data_area_uuid',data_area_uuid);
				first_div.find('.personal_address_content').attr('data_province',data_province);
				first_div.find('.personal_address_content').attr('data_city',data_city);
				first_div.find('.personal_address_content').attr('data_area',data_area);
				first_div.find('.personal_address_content').attr('data_text',data_text);
				var username = $(this).parents('.layer_container1').find('#username').val();
				var num = $(this).parents('.layer_container1').find('#mobile').val();

				var country = $(this).parents('.layer_container1').find('#country').val();
				var address = $(this).parents('.layer_container1').find('#explicit_adress').val();
				
				$.ajax({
					type: "post",
					url: window.global.addAddr,
					dataType: 'json',
					async: true,
					data: {

						'real_name': username,
						'mobile': num,
						'areas_uuid': country,
						'detail': address
					},
					success: function(res) {
						if(res && res.errcode === 0)
							var res = JSON.parse(data);
							console.log(res);
							
						window.location.href = window.global.addList;
						
					}
				});
			} else {
				
				
				$(This).parents('.address_information').find('.personal_address_receiver').find('span').text(username);
				$(This).parents('.address_information').find('.personal_address_number').find('span').text(mobile);
				$(This).parents('.address_information').find('.personal_address_content').find('span').text(data_text+data_detail);
				$(This).parents('.address_information').find('.personal_address_content').attr('data_detail',data_detail);
				$(This).parents('.address_information').find('.personal_address_content').attr('data_province_uuid',data_province_uuid);
				$(This).parents('.address_information').find('.personal_address_content').attr('data_province',data_province);
				$(This).parents('.address_information').find('.personal_address_content').attr('data_city_uuid',data_city_uuid);
				$(This).parents('.address_information').find('.personal_address_content').attr('data_city',data_city);
				$(This).parents('.address_information').find('.personal_address_content').attr('data_area_uuid',data_area_uuid);
				$(This).parents('.address_information').find('.personal_address_content').attr('data_area',data_area);
				$(This).parents('.address_information').find('.personal_address_content').attr('data_text',data_text);
				var username = $(this).parents('.layer_container1').find('#username').val();

				var num = $(this).parents('.layer_container1').find('#mobile').val();

				var country = $(this).parents('.layer_container1').find('#country').val();
				var address = $(this).parents('.layer_container1').find('#explicit_adress').val();
				var uuid = $(This).parents('.address_information').attr('data-add');
				$.ajax({
					type: "post",
					url: window.global.editAddr,
					dataType: 'json',
					async: true,
					data: {
						'uuid': uuid,
						'real_name': username,
						'mobile': num,
						'areas_uuid': country,
						'detail': address
					},
					success: function(res) {
						if(res && res.errcode === 0)
							var res = JSON.parse(data);
						console.log(res);

					}
				});
			}

			shrink();

//			window.location.reload();
		});
		$('.province').change(function() {

			var str = $(this).val();
			$('#city').find('option').not('[value=请选择]').remove();
		$('#country').find('option').not('[value=请选择]').remove();

	if ($(this).val()!=='请选择') {
      	$.ajax({
            type:"post",
            url:window.global.getAreas,
            async:true,
            dataType: 'json',
            data:{'uuid':str},
            success: function (res) {
            	
                if (res && res.errcode === 0)
                    var res = JSON.parse(data);
                	var str = "";
              		$.each(res,function(index,item){
              		 str += "<option value='"+item.uuid+"'class='sub_city'>"+item.name+"</option>";
              });
                $('#city').append(str);
            }
        });
      }else{
      	$('.sub_city').remove();
      	$('.sub_country').remove();
      }
			$('#city').val('请选择');
			$('#country').val('请选择');

		});
		$('#city').change(function() {
				var str = $(this).val();
				$('#country').find('option:gt(0)').remove();
				if(str!=='请选择'){
					$.ajax({
					type: "post",
					url: window.global.getCountrys,
					async: true,
					dataType: 'json',
					data: {
						'uuid': str
					},
					success: function(res) {
						if(res && res.errcode === 0)
							var res = JSON.parse(data);
						var str = "";
						$.each(res, function(index, item) {
							str += "<option value='" + item.uuid + "' class='sub_country'>" + item.name + "</option>";
						});
						$('#country').append(str);
						

					}
				});
			}else{
				$('.sub_country').remove();
			}
				
				$('#country').val('请选择');

			})
			//弹出框取消功能
		$('.cancel1').click(function() {
			shrink();

		});
		//弹出框隐藏效果
		function shrink() {
			$('.layer_container1').animate({
				top: 250,
				opacity: 0
			}, 500);
//			$('#province').val('');
//			$('#city').val('');
//			$('#country').val('');
			setTimeout("$('.layer1').hide()", 1000);
		}
		//删除地址信息
		$('.personal_address_delete').click(function() {
			if(confirm('确定删除收货地址？')){
				var uuid = $(this).parents('.address_information').attr('data-add')
			$.ajax({
				type: "post",
				url: window.global.deleteAddr,
				dataType: 'json',
				async: true,
				data: {
					'uuid': uuid,
					'real_name': '',
					'mobile': '',
					'areas_uuid': '',
					'detail': ''
				},
				success: function(res) {
					if(res && res.errcode === 0)
						var res = JSON.parse(data);

				}
			});
			$(this).parents('.address_information').remove();
			}else{
				return false;
			}
			
			
		});

		//切换默认地址
		$('.address_information_top1').click(function() {

			var uuid = $(this).parent('.address_information').attr('data-add');
			console.log(uuid);
			var This = $(this);
			$.ajax({
				type: "post",
				url: window.global.setDefault,
				async: true,
				data: {
					'uuid': uuid
				},
				success: function(res) {
					console.log(res);

					This.find('.personal_address_select').show();
					This.parent('div').siblings('div').find('.personal_address_select').hide();
										window.location.href=window.global.addList;
				}
			});
		});
	})();

	//添加主营地区的js
	(function() {
		var onoff_district = false;
		var onoff_sanji = false;

		function edit1(item_id) {
			
			$(item_id).click(function() {
				
				var addre = '';

				$('#explicit_adress1').val('');
				$('#explicit_adress').val(addre);
				$(this).attr('data_click', item_id);
				
				add_new = $(this).attr('class')
				
				This = this;
				$('.layer2').show();
				$('.layer_container2').animate({
					top: 230,
					opacity: 1
				}, 500);

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
						$('#province1').append(str);
						

					}
				});
				$('body,html').animate({scrollTop:0},300); 
			});
			

		
		};
		
		edit1('.address_main_address');

		//弹出框确定功能
		$('.ensure2').click(function() {
			

			var adress = $('#explicit_adress1').val();
//			var company=$('.company_txt').val();
//			var data_id = $(this).parents('.consignee_list').attr('data_id');
			var province = $("#province1").find("option:selected").text();
			var city = $("#city1").find("option:selected").text();
			var region = $('.checkbox_change').parent('.exclusive_common').attr('region');

			
				
			
				if (province == '请选择' || city=='请选择') {
					$('<span class="err">请选择省市!</span>').appendTo('.receiver_adress').css({
						color: '#ea0000',
						fontSize:'14px',
						display: 'block',
						height: '26px',
						marginTop: '5px'
					}).siblings('.err').remove();
					onoff_sanji=false;
					return false;
				
				
				} else {
					$('.receiver_adress .err').remove();
					onoff_sanji=true;
				};


			
			if(adress == '') {
				$('<span class="err">请填写详细地址!</span>').appendTo('.explicit').css({
					color: '#ea0000',
					fontSize:'14px',
					display: 'block',
					height: '26px',
					marginTop: '5px'
				}).siblings('.err').remove();
				onoff_district=false;
				return false;
			} else {
				$('.explicit .err').remove();
				onoff_district=true;
			}
			var str = $('#city1').val();
			var str1=$('#province1').val();
			var str2= $("#province1 option:selected").text();;
			var s=str2.substr(str2.length-1,1);
			var distri='';
			
			if (s=='市') {
				distri=str1;
			}else{
				distri=str;
			}
			
			if (onoff_sanji && onoff_district) {
				$.ajax({
				type:"post",
				url:window.global.addAreas,
				async:true,
				data:{
					uuid:distri,
					detail:adress,
				},
				success:function(res){
					var i=$('.address_information1').length+1;
					var city1=$("#city1").find("option:selected").text();
					var province1=$('#province1').find("option:selected").text();
					var p=province1.substr(province1.length-1,1);
					var adrs=$('#explicit_adress1').val();
					$('.address_main_address').before($('.templete1').clone(true));
					var last_div = $('.address_main_address').prev();
					last_div.removeClass('templete1').addClass('address_information1');
					last_div.find('.personal_main_address').find('span').text(i);
					if (p=='市') {
						last_div.find('.personal_address_content').find('span').text(province1+'--'+adrs);
					}else{
						last_div.find('.personal_address_content').find('span').text(city1+'--'+adrs);
					}
					
					shrink2();
				}
				});
				
				
				
			
			}
			
			

		});
		
		$('#province1').change(function() {
			$('#city1').find('option:gt(0)').remove();
			var str = $(this).val();
			if(str!=='请选择'){
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
					var str = "";

					$.each(res, function(index, item) {
						str += "<option value='" + item.uuid + "' class='sub_city1'>" + item.name + "</option>";
					});
					$('#city1').append(str);
					
				}
			});
			}else{
				$('.sub_city1').remove();
			}
			
			$('#city1').val('请选择');
//			$('#hid1').val(str);


		});
		


		//取消添加主营地区
		$('.cancel2').click(function() {
			shrink2();
		})

		function shrink2() {
			$('.layer_container2').animate({
				top: 250,
				opacity: 0
			}, 500);
			$('#province1').find('option:gt(0)').remove();
			$('#city1').find('option:gt(0)').remove();
			
			setTimeout("$('.layer2').hide()", 1000);
		}


})();

});