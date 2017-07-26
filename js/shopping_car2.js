$(function(){
	//收货人信息点击事件
	(function(){
		$('.consignee_content').delegate('.consignee_list','click',function(){
		$(this).addClass('consignee_active').attr('data_active','1').siblings().attr('data_active','0').removeClass('consignee_active');
		$(this).find('.selected').show().stop(true,true).siblings('.chk').hide().parents('.consignee_list').siblings().find('.selected').hide().stop(true,true).siblings('.chk').show();
		$(this).find('.position').addClass('position_active').parents('.consignee_list').siblings().find('.position').removeClass('position_active');
		$(this).find('li').addClass('font_active').parents('.consignee_list').siblings().find('li').removeClass('font_active');
		$(this).find('.operation').show().parent().siblings().find('.operation').hide();
		});
		//设置默认地址
		$('.default_address').click(function(){
		var adress_li=$(this).parent().siblings('.adress');
			$('<span class="def">默认地址</span>').appendTo(adress_li).css({
				color:'#999',
				fontWeight:'bold'
			});
			adress_li.parent().siblings().find('.adress .def').text('');
			$(this).text('').parents('.consignee_list').siblings().find('.default_address').text('设为默认地址');
			$(this).parents('.consignee_list').attr('data_default','default').siblings().removeAttr('data_default')
			var index_ul=$(this).parents('.consignee_list').index();
			var first_ul=$('.consignee_content').find('ul:first-child');
			if(index_ul>=1){
				$(this).parents('.consignee_list').insertBefore(first_ul);
			}
			
		});
		//编辑或新增功能
		function edit(item_id){
				$(item_id).click(function(){
				//获取姓名、手机号码、详细地址添加到弹出框
				var username=$(this).parent().siblings('.chk_name').find('.name_text').attr('data_text');
				var mobile=$(this).parent().siblings('.tle').attr('data_text');
				var adress=$(this).parent().siblings('.adress').find('.detailed_adress').attr('data_text');
				$(this).attr('data_click',item_id);
					add_new= $(this).attr('data_click');
				    This=this;
				$('#username').val(username);
				$('#explicit_adress').val(adress);
				$('#mobile').val(mobile);
				$('.layer').show();
				$('.layer_container').animate({
					top:230
				},500,function(){
					$('.layer_container').animate({
					top:200
				},600);
				});
			});
		};
		edit('.edit_ul');
		//弹出框确定功能
		$('.ensure').click(function(){
			var username=$('#username').val();
			var adress=$('#explicit_adress').val();
			var mobile=$('#mobile').val();
			var data_id=$(this).parents('.consignee_list').attr('data_id');
			var province=$(".province").find("option:selected").text();
			var city=$(".city").find("option:selected").text();
			var county=$(".county").find("option:selected").text();
			var phone = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9])\d{8}$/img;
			var chkphone = phone.test(mobile);
			if(username==''){
				$('<span class="err">请输入收货人姓名</span>').appendTo('.receipt_man').css({
						color:'#ea0000',
						fontWeight:'bold',
						display:'block',
						height:'26px',
						marginTop:'5px'
					}).siblings('err').remove();
						return false;
			}else{
				 $('.receipt_man .err').remove();
			}
			if(province=='请选择'){
				$('<span class="err">请选择省份</span>').appendTo('.receiver_adress').css({
				color:'#ea0000',
				fontWeight:'bold',
				display:'block',
				height:'26px',
				marginTop:'5px'
			}).siblings('err').remove();
				return false;
			} else {
				  $('.receiver_adress .err').remove();
			};
			if(city=='请选择'){
				$('<span class="err">请选择城市</span>').appendTo('.receiver_adress').css({
				color:'#ea0000',
				fontWeight:'bold',
				display:'block',
				height:'26px',
				marginTop:'5px'
			}).siblings('err').remove();
				return false;
			} else {
				  $('.receiver_adress .err').remove();
			};
			if(county=='请选择'){
				$('<span class="err">请选择区/县</span>').appendTo('.receiver_adress').css({
				color:'#ea0000',
				fontWeight:'bold',
				display:'block',
				height:'26px',
				marginTop:'5px'
			}).siblings('err').remove();
				return false;
			} else {
				  $('.receiver_adress .err').remove();
			};
			if(adress==''){
				$('<span class="err">请填写详细地址</span>').appendTo('.explicit').css({
				color:'#ea0000',
				fontWeight:'bold',
				display:'block',
				height:'26px',
				marginTop:'5px'
			}).siblings('err').remove();
				return false;
			}else{
				$('.explicit .err').remove();
			}
			if(!chkphone) {
			$('<span class="err">请输入正确的手机号</span>').appendTo('.mobile_phone').css({
				color:'#ea0000',
				fontWeight:'bold',
				paddingLeft:'162px'
			});
				return false;
			} else {
				  $('.mobile_phone .err').remove();
			};
			if(add_new=='.add_ifo'){
			$('.consignee_content').prepend($('.consignee_clone').clone(true));
			var first_ul=$('.consignee_content').find('ul:first-child');
			var sibling_ul=first_ul.siblings();
			first_ul.removeClass('consignee_clone');
			first_ul.find('.name_text').attr('data_text',username).text(username);
			first_ul.find('.tle').attr('data_text',mobile).text(mobile);
			first_ul.find('.probably').attr('data_text',province+city+county).text(province+city+county);
			first_ul.find('.detailed_adress').attr('data_text',adress).text(adress);
			sibling_ul.find('li').removeClass('font_active').find('.chk').show().siblings('.selected').hide();
			first_ul.find('.position').addClass('position_active').parent().siblings().find('.position').removeClass('position_active');
			first_ul.attr('data_active','1').slideDown().addClass('consignee_active').siblings().attr('data_active','0').removeClass('consignee_active')
			first_ul.find('.chk').hide().siblings('.selected').show();
			first_ul.find('li').addClass('font_active').parent().siblings().find('li').removeClass('font_active')
			first_ul.find('.operation').show().parent().siblings().find('.operation').hide();
			}
			$(This).parent().siblings('.chk_name').find('.name_text').attr('data_text',username).text(username);
			$(This).parent().siblings('.tle').attr('data_text',mobile).text(mobile);
			$(This).parent().siblings('.adress').find('.detailed_adress').attr('data_text',adress).text(adress);
			$(This).parent().siblings('.adress').find('.probably').attr('data_text',province+city+county).text(province+city+county)
			shrink();
			
		});
		//弹出框取消功能
		$('.cancel').click(function(){
			shrink();
		});
		//弹出框隐藏效果
		function shrink(){
			$('.layer_container').animate({
				top:250
			},600,function(){
				$('.layer_container').animate({
				top:-2000
			},500)
			});
			setTimeout("$('.layer').hide()",1000);
		}
		//删除功能
		$('.consignee_list').delegate('.delete_ul','click',function(){
			var username=$(this).parent().siblings('.chk_name').find('.name_text').attr('data_text');
			var mobile=$(this).parent().siblings('.tle').attr('data_text');
			var adress=$(this).parent().siblings('.adress').find('.detailed_adress').attr('data_text');
			var probably=$(this).parent().siblings('.adress').find('.probably').attr('data_text');
			var data_id=$(this).parents('.consignee_list').attr('data_id');
			var next_ul=$(this).parents('.consignee_list').siblings().eq(0);
			next_ul.addClass('consignee_active').attr('data_active','1').siblings().attr('data_active','0').removeClass('consignee_active');
			next_ul.find('.selected').show().stop(true,true).siblings('.chk').hide().parents('.consignee_list').siblings().find('.selected').hide().stop(true,true).siblings('.chk').show();
			next_ul.find('.position').addClass('position_active').parents('.consignee_list').siblings().find('.position').removeClass('position_active');
			next_ul.find('li').addClass('font_active').parents('.consignee_list').siblings().find('li').removeClass('font_active');
			next_ul.find('.operation').show();
			$(this).parents('.consignee_list').remove()
		});
		//新增收货人信息
		edit('.add_ifo');
		
	})();
	//配送方式选择
	(function(){
		$('.distribution_mode').find('.chk').click(function(){
			$(this).hide().siblings('.selected').show().parents('.invoice_details').attr('data_select','1').siblings().attr('data_select','0').find('.selected').hide().siblings('.chk').show();
		});
		$('.sub_mode .selected').click(function(){
			$(this).hide().siblings('.chk').show().siblings('.careful_text').show().siblings('.sure').hide();
			$(this).parent().attr('data_select','0');
		});
		$('.sub_mode .chk').click(function(){
			$(this).siblings('.sure').show().siblings('.careful_text').hide()
			$(this).parent().attr('data_select','1');
		});
		$('.confirm').click(function(){
			$(this).parents('.distribution_content').slideUp();
			$(this).parents('.distribution').prepend($('.transport_clone').clone(true));
			$(this).parents('.distribution').find('.transport_summary').removeClass('transport_clone');
			var select_mode=$(this).siblings('.invoice_details');
			$.each(select_mode, function(index,item) {
				var data_num=$(item).attr('data_select');
				if(data_num==1){
				var invoice_text=$(item).siblings('.invoice_outline').find('.invoice_num').text();
				var invoice_mode=$(item).siblings('.invoice_outline').find('.invoice_mode').text();
				var mode_name=$(item).find('.mode_name').text();
				var to_pay=$(item).find('.to_pay').text();
				var door_num=$(item).find('.sub_mode').attr('data_select');
				var href_id=$(item).siblings('.invoice_outline').find('.anchor').attr('href');
				var careful=$(item).find('.careful_text').text();
				$(this).parents('.distribution_content').siblings('.transport_summary').find('.summary_mode').text(invoice_text);
				$(this).parents('.distribution_content').siblings('.transport_summary').find('.depot').text(invoice_mode);
				$(this).parents('.distribution_content').siblings('.transport_summary').find('.express').text(mode_name);
				$(this).parents('.distribution_content').siblings('.transport_summary').find('.pay').text(to_pay);
				$(this).parents('.distribution_content').siblings('.transport_summary').find('.summary_product').attr('href',href_id);
				$(this).parents('.distribution_content').siblings('.transport_summary').find('.since').text(careful);
				if(door_num==1){
					var describe_mode=$(item).find('.describe_mode').text();
					var describe_sure=$(item).find('.sure').text();
					$(this).parents('.distribution_content').siblings('.transport_summary').find('.express').text(describe_mode);
					$(this).parents('.distribution_content').siblings('.transport_summary').find('.door').text(describe_sure).siblings('.since').text('');
				}
				
				}
			});
		});
		$('.summary_edite').click(function(){
			$(this).parents('.transport_summary').hide().siblings('.distribution_content').slideDown();
		});
		
	})();
	//确认订单。。。。。
	





});