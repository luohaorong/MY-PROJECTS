/**
 * Created by Chrise on 2017/2/10.
 */

//=====================ȫ�ֺ���========================
/*tab�л�����
 * ele_id: tab��ǩ���ڵ�ID
 * arguments[1]: ���ǩclassname��Ĭ��Ϊ:on
 * arguments[2]�����ݸ��ڵ�ID,Ĭ��Ϊ��tabid_con
 * DEMO:tab_switch(tabid);
 */
$(window).scroll(function() {
	var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop; //兼容各种浏览器
	var scrollHafter = scrollTop + 200; //滚动的高度
	//右边栏定位高度
	//			if(scrollHafter <= 300) {
	//				$('#toolbar').css('top', '250px')
	//			};
	if(scrollHafter >= 800) {
		$('#toolbar').css('top', '200px');
	}
});

function tab_switch(ele_id, activeclass) {
	$("#" + ele_id).children().each(function() {
		var xh = $(this).index();
		$(this).find("*").click(function() {
			$(this).addClass(activeclass);
			$(this).siblings().removeClass(activeclass);
			$(".tabcon_sy>li").addClass("tab_hidden");
			$(".tabcon_sy>li").eq(xh).removeClass("tab_hidden");
		})
	});
}
/*
//=====================ȫ�ֺ���========================
//==================ͼƬ��ϸҳ����=====================
 */

//��������ʾ������
function slide_box(id_click, id_add, id_det, id_up) {
	$(id_click).click(function() {
		var data_state = $(this).attr('data_state');
		if(data_state == 1) {
			$(id_add).show().parent().find(id_det).hide();
			$(id_up).stop(true, true).slideUp();
			$(this).attr('data_state', '0');
		} else {
			$(id_det).show().parent().find(id_add).hide();
			$(id_up).stop(true, true).slideDown();
			$(this).attr('data_state', '1');
		}
	});
}

$(function() {
	$('#tab_id>.tab li').click(function() {
		var i = $(this).index(); //�±��һ��д��
		//var i = $('tit').index(this);//�±�ڶ���д��
		$(this).addClass('active').siblings().removeClass('active');
		$('.tabcon_sy li').eq(i).show().siblings().hide();
	});
	//ѡ����ҵ���
	//ѡ����ҵ���


	//�Ӽ���������
	$('.ex_add').on('click', function() {
		var amount = parseInt($(this).siblings('.ex_amount').val());
		var min_val = parseInt($(this).siblings('.ex_amount').attr('data_value'));//起订量
		var max_val = parseInt($('.layer_total_stock').attr('data_stock'));//库存量
		if (amount<max_val) {
			amount++;
		}

		$(this).siblings('.ex_amount').val(amount);
		var single = parseInt($('.single').text());
		var amount = parseInt($('.total_amount').val());
		var pomit_length=$('.limit_prompt').length;
		$('.ex_allo').text(single * amount);
		if($(this).siblings('.ex_amount').val()>=max_val){

			if (pomit_length==0) {
				$('<div class="limit_prompt">库存量('+max_val+')不足！！</div>').appendTo($('.limit')).css({
						color: '#ea0000',
						fontSize: '12px',
						marginLeft: '140px'
					});
			}
		}else if($(this).siblings('.ex_amount').val()>=min_val && $(this).siblings('.ex_amount').val()<=max_val){
			// $('.sure_agent').attr('disabled',false);
			$('.limit_prompt').remove();
		}
		

	});
	$('.ex_minus').on('click', function() {
		var amount = parseInt($(this).siblings('.ex_amount').val());
		var min_val = parseInt($(this).siblings('.ex_amount').attr('data_value'));
		var max_val = parseInt($('.layer_total_stock').attr('data_stock'));//库存量
		var pomit_length=$('.limit_prompt').length;
		if(amount>min_val){
			amount--;
		}
		if(amount===min_val){
			if (pomit_length==0) {
				$('<div class="limit_prompt">本商品' + min_val + '箱起购</div>').appendTo($('.limit')).css({
						color: '#ea0000',
						fontSize: '12px',
						marginLeft: '140px'
					});
			}
		}
		$(this).siblings('.ex_amount').val(amount);
		var single = parseInt($('.single').text());
		var amount = parseInt($('.total_amount').val());
		var pomit_length=$('.limit_prompt').length;
		$('.ex_allo').text(single * amount);
		if ($(this).siblings('.ex_amount').val()<min_val) {
			// $('.sure_agent').attr('disabled',true);
			if (pomit_length==0) {
				$('<div class="limit_prompt">本商品' + min_val + '箱起购</div>').appendTo($('.limit')).css({
						color: '#ea0000',
						fontSize: '12px',
						marginLeft: '140px'
					});
			}
			
		}else if($(this).siblings('.ex_amount').val()>max_val){
			if (pomit_length==0) {
				$('<div class="limit_prompt">库存量('+max_val+')不足！！</div>').appendTo($('.limit')).css({
						color: '#ea0000',
						fontSize: '12px',
						marginLeft: '140px'
					});
			}
		}else if($(this).siblings('.ex_amount').val()>min_val && $(this).siblings('.ex_amount').val()<=max_val){
			$('.limit_prompt').remove();
		}
		
	});
	//输入数量
	$('.total_amount').keyup(function() {
		var min_val = parseInt($(this).attr('data_value'));//起订量
		var max_val = parseInt($('.layer_total_stock').attr('data_stock'));//库存量
		var reg = /^[1-9]\d*$/gi;
		
		if(reg.test($(this).val())) {

			var single = parseInt($('.single').text());
			var amount = parseInt($('.total_amount').val());
			$('.ex_allo').text(single * amount);
			//			exclusive();
		}else{
			$(this).val('')
		}
		var pomit_length=$('.limit_prompt').length;

		if ($(this).val()<min_val) {
			if (pomit_length==0) {
				$('<div class="limit_prompt">本商品' + min_val + '箱起购</div>').appendTo($('.limit')).css({
						color: '#ea0000',
						fontSize: '12px',
						marginLeft: '140px'
					});
			}
			
		}else if($(this).val()>max_val){
			if (pomit_length==0) {
				$('<div class="limit_prompt">库存量('+max_val+')不足！！</div>').appendTo($('.limit')).css({
						color: '#ea0000',
						fontSize: '12px',
						marginLeft: '140px'
					});
			}
		}else if($(this).val()>=min_val && $(this).val()<=max_val){
			$('.limit_prompt').remove();
		}
		
	});
	//�����ĵ������л�
	//	$('.ex_jiantou1').on('click', function() {
	//		$(this).hide();
	//		$('.ex_jiantou2').show();
	//		$('.ex_selectaddress').show();
	//		$('.first_li').html('');
	//	});
	//	$('.ex_jiantou2').on('click', function() {
	//		$(this).hide();
	//		$('.ex_jiantou1').show();
	//		$('.ex_selectaddress').hide();
	//		$('.first_li').html($('.ex_selectaddress li:first').text());
	//	});

	//ȷ�ϴ���

	

	//����л���ʾ����
	slide_box(heat, add, detract, left_list_top);
	slide_box(browse, add_sub, detract_sub, left_list_sub);
	//��ʼ����ַ
	// $("#mySelect").select(); ���������������д
	//	$("#select-area").select();
	//��ѡ����,�������Ĭ��ֵ
	//width: "180px",            //��ɵ�select����
	//listMaxHeight:"200px",     //��ɵ������б����߶�
	//themeColor: "#00bb9c",    //������ɫ
	//fontColor: "#000",        //������ɫ
	//fontFamily: "'Helvetica Neue', arial, sans-serif",    //��������
	//fontSize:"15px",           //�����С
	//showSearch: false,        //�Ƿ�����������
	//rowColor:"#fff",          //��ԭ������ɫ
	//rowHoverColor: "#0faf03", //�ƶ�ѡ��ʱ��ÿһ�е�hover��ɫ
	//fontHoverColor: "#fff",   //�ƶ�ѡ��ʱ��ÿһ�е�����hover��ɫ
	//mainContent: "��ѡ��",    //ѡ����ʾ���Ĭ������
	//searchContent: "�ؼ������"   //�������Ĭ����ʾ����

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

	//判断库存和起订量，来显示加入购物车或移入收藏夹
	(function() {
		var data_attr = $('.ex_afterclick').attr('data-attr-value-uuid');
		var data_stock = $('.ex_afterclick').parents('#index_container').siblings('.layer').find('.depot').attr('data-attr-value-uuid');
		var data_uuid = data_attr + '_' + data_stock;
		var data_key = data[data_uuid];
		if(!data_key) {
			data_uuid = data_stock + '_' + data_attr;
			data_key = data[data_uuid];
		}
		var moq = parseInt(data_key.moq); //起定量
		var stock = parseInt(data_key.stock); //库存量
		if(stock >= 100000000) {
			$('.ex_situation>span,.max_shopping,.layer_stock,.ex_sendgoods').hide();
			$('.sure_agent').show();
			$('.to_favorite').hide();
		} else {
			$('.ex_situation>span,.max_shopping,.layer_stock,.ex_sendgoods').show();
			if(moq > stock) {
				$('.sure_agent').hide();
				$('.to_favorite').show();
				$('.ex_sendgoods').hide()
			} else {
				$('.sure_agent').show();
				$('.to_favorite').hide();
				$('.ex_sendgoods').show();
			}
		}

		var data_favorite = $('.to_favorite').attr('data_favorite');
		if(data_favorite == 1) {
			$('.to_favorite').css({
				backgroundColor: '#f3554a'
			})
		} else {
			$('.to_favorite').css({
				backgroundColor: '#f3554a'
			})
		}
	})();
	//加入收藏夹
	// var favorite_number = $('.favorite_num').text().match(/\d/).join('');
	// var favorite_count = parseInt(favorite_number);
	$('.to_favorite,.letter_space_one').click(function() {
		var data_favorite = $(this).attr('data_favorite');
		if(data_favorite == 0) {
			// favorite_count++;
			var goods_id = window.global.goods_uuid;
			$.post(window.global.add_favor, {
				goods_uuid: goods_id
			}, function(data) {
				if(data.code == 0) {
					$('.to_favorite').css({
						backgroundColor: '#f3554a'
					}).attr('data_favorite', '1').find('.join').text('取消收藏');
					$('.favorite_wapper').css({
						color: '#f3554a'
					}).find('.letter_space_one').attr('data_favorite', '1').text('★已收藏');
					$('.favorite_num').text('（' + data.data.count + '）');
					if($('.to_favorite').css('display') === 'none') {
						alert('已加入收藏夹！')
					} else {
						alert('商品暂时缺货，已加入收藏夹！')
					}
				} else {
					alert('加入收藏夹失败！');

				}
			});
		} else {
			var goods_id = window.global.goods_uuid;
			// if(favorite_count != 0) {
			// 	favorite_count--;
			// }
			$.post(window.global.del_favor, {
				goods_uuid: goods_id
			}, function(data) {

				if(data.code == 0) {
					$('.to_favorite').css({
						backgroundColor: '#f3554a'
					}).attr('data_favorite', '0').find('.join').text('加入收藏夹');
					$('.favorite_wapper').css({
						color: '#333'
					}).find('.letter_space_one').attr('data_favorite', '0').text('☆加入收藏夹');
					$('.favorite_num').text('（' + data.data.count + '）');
				} else {
					alert('取消收藏失败！');

				}
			});
		}

	});

	//点击报价
	$('.right_block').click(function() {
		$(this).addClass('ex_afterclick').attr('data-selected', '1').siblings().removeClass('ex_afterclick').removeAttr('data-selected');
		$(this).find('.ck_region').addClass('ex_change').parent().siblings().find('.ck_region').removeClass('ex_change');
		$('.limit_prompt').remove();
		var data_attr = $(this).attr('data-attr-value-uuid');
		var sub_wap = $('[data-index=' + data_attr + ']'); //找到当前显示的仓库
		sub_wap.find('.depot').eq(0).attr('data-selected', '1').parents('.sub_wap').siblings('.sub_wap').find('.depot').eq(0).attr('data-selected', '0')
		var depot = sub_wap.find('[data-selected="1"]');
		var stock_single = sub_wap.find('[data-selected="1"]').siblings('.layer_ex_xiang').find('.single_amount');
		var depot_uuid = depot.eq(0).attr('data-attr-value-uuid');
		var depot_text = depot.eq(0).text().trim();
		$('.default_st').attr('data-attr-value-uuid', depot_uuid);
		$('.default_st').text(depot_text + '发货');
		var data_uuid = data_attr + '_' + depot_uuid;
		var data_key = data[data_uuid];
		if(!data_key) {
			data_uuid = depot_uuid + '_' + data_attr;
			data_key = data[data_uuid];
		}
		var moq = parseInt(data_key.moq); //起定量
		var pricing_unit = data_key.pricing_unit;
		var stock = parseInt(data_key.stock); //库存量
		var stocking_pricing_ratio = data_key.stocking_pricing_ratio;
		//			$('.max_shopping_num').text(stock);
		//			$('.max_shopping_moq').text(moq);
		var stocking_unit = data_key.stocking_unit;
		$('.total_amount').val(moq)
		var val_num = parseInt($('.total_amount').val());
		var total = val_num * stocking_pricing_ratio;
		$('#' + data_key.uuid).show().siblings().hide();
		if(stock >= 100000000) {
			$('.ex_situation>span,.layer_stock,.max_shopping,.ex_sendgoods').hide();
			$('.sure_agent').show();
			$('.to_favorite').hide();
		} else {
			$('.ex_situation>span,.layer_stock,.max_shopping,.ex_sendgoods').show();
			if(moq > stock) {
				$('.sure_agent').hide();
				$('.to_favorite').show();
				$('.ex_sendgoods').hide()
			} else {
				$('.sure_agent').show();
				$('.to_favorite').hide();
				$('.ex_sendgoods').show();
			}
		}
		$('.quantitative_content_details').text('满' + moq + stocking_unit + '起订' + '（每' + stocking_unit + stocking_pricing_ratio + pricing_unit + '）');
		$('.ex_amount').val(moq);
		$('.ex_amount').attr('data_value', moq);
		$('.unit').text(stocking_unit);
		$('.number_details').text('（' + stocking_pricing_ratio + pricing_unit + '装，' + '共' + total + pricing_unit + '）');
		$('.stock').text('库存' + '（' + stock + stocking_unit + '）');
		$('.total_stock_num').text(stock);
	});
	$('.ex_amount').blur(function() {
		// var limit = $(this).parents('.limit');
		// var This = $(this);
		// stock_number(This, limit);
		// count_box()
		// amout();
		// moq_count(This);
	});
	$('.total_amount').change(function() {
		singel_total()
	});
	$('.modefile').click(function() {
		singel_total();
		count_box();
		edit();
	})
	
	$('.total_minus').click(function() {
		singel_total();
	});
	$('.total_add').click(function() {
		singel_total();
	});
	
	$('.chk').click(function() {
		$(this).hide().parents('.ex_xiang_wap').attr('data_uuid', '1').find('.selected').show().siblings('.depot').attr('data-selected', '1');
		var single_amount=parseInt($(this).parents('.limit').find('.single_amount').val());
		var moq_data=parseInt($(this).parents('.limit').find('.single_amount').attr('data_value'));
		var stock_data=parseInt($(this).parents('.limit').find('.layer_stock_num').attr('data_stock'));
		if(single_amount<moq_data){
			$(this).parents('.limit').find('.single_amount').val(moq_data)
		}
		if(single_amount>stock_data){
			$(this).parents('.limit').find('.single_amount').val(stock_data)
		}
		add_time();
		count_box();
	});
	$('.selected').click(function() {
		$(this).hide().siblings('.depot').removeAttr('data-selected').parents('.ex_xiang_wap').removeAttr('data_uuid').find('.chk').show();
		add_time();
		count_box();
	});
	//点击提交时执行的代码

	$('.sure_agent').on('click', function() {
		var data_attr = $('.ex_afterclick').attr('data-attr-value-uuid');
		var sub_wap = $('[data-index=' + data_attr + ']'); //找到当前显示的仓库
		var data_stock = $('.default_st').attr('data-attr-value-uuid');
		var data_uuid = data_attr + '_' + data_stock;
		var data_key = data[data_uuid];
		if(!data_key) {
			data_uuid = data_stock + '_' + data_attr;
			data_key = data[data_uuid];
		}
		var uuid = data_key.uuid;
		var moq = data_key.moq;
		var stock = Number(data_key.stock);
		var num = parseInt($('.total_amount').val());
		var shoping_num = parseInt($('.shoping_num a').text());
		// if(stock > 100000000) {
			//判断符合条件后提交数据
			
				buy();
			
		// } else {
		// 	singel_total();
		// 	count_box();
		// 	edit();
		// }
	});

	function buy() {
		var data_attr = $('.ex_afterclick').attr('data-attr-value-uuid');
		var data_stock_uuid = $('.default_st').attr('data-attr-value-uuid');
		var data_uuid = data_attr + '_' + data_stock_uuid;
		var data_key = data[data_uuid];
		if(!data_key) {
			data_uuid = data_stock_uuid + '_' + data_attr;
			data_key = data[data_uuid];
		}
		var uuid = data_key.uuid;
		var depot_num = parseInt($('.total_amount').val());
		var moq = parseInt(data_key.moq);
		var stock = parseInt(data_key.stock);

	    $.ajax({
	    	url: window.global.add_carts,
	    	type: 'POST',
	    	dataType: 'json',
	    	data: {
				goods_extends_uuid: uuid,
				goods_num: depot_num,
				station_uuid: '',
				station: '',
				station_alias: '',
				activity_type: 'normal',
			},
	    })
	    .done(function(data) {
	    	if(!data.code) {
				var shooping_top = $('.shoping').offset().top;
				var shooping_left = $('.shoping').offset().left;
				$('<img class="sign_img" src="/images/sign_img.png" />').appendTo('body')
				$('html,body').animate({
					scrollTop: 0
				}, 200);
				$('.sign_img').animate({
					top: shooping_top,
					left: shooping_left,
					with: 0,
					height: 0,
					opacity: 0
				}, 1000);
				setTimeout($('.layer').hide(), 1000);
				setTimeout($('.shoping_num').find('a').text(data.data), 1500);
				$('.continue_buy').show();
			}
	    })
	    .fail(function() {
	    	var amount = parseInt($('.ex_amount').val());
			var min_val = parseInt($('.ex_amount').attr('data_value'));//起订量
			var max_val = parseInt($('.layer_total_stock').attr('data_stock'));//库存量
			if (amount<min_val) {
					$('.total_amount').val(min_val)
				}
				if (amount>max_val) {
					$('.total_amount').val(max_val)
			}
	    })
	    // .always(function() {
	    // 	console.log("complete");
	    // });
	}
	//提交数据函数
	function join_carts() {
		var data_attr = $('.ex_afterclick').attr('data-attr-value-uuid');
		var sub_wap = $('[data-index=' + data_attr + ']'); //找到当前显示的仓库
		var limit = sub_wap.find('.depot');
		var data_uuid = '';
		// $('.layer_wapper').show();
		$.each(limit, function(index, item) {
			var data_stock_uuid = $(item).attr('data-attr-value-uuid');
			var data_uuid = data_attr + '_' + data_stock_uuid;
			var data_key = data[data_uuid];
			if(!data_key) {
				data_uuid = data_stock_uuid + '_' + data_attr;
				data_key = data[data_uuid];
			}
			var uuid = data_key.uuid;
			var moq = parseInt(data_key.moq);
			var stock = parseInt(data_key.stock);
			var num = parseInt($(item).parents('.limit').find('.single_amount').val());
			if($(item).attr('data-selected') == 1) {
				var depot_num = parseInt($(item).siblings('.layer_ex_xiang').find('.single_amount').val());
				//仓库名字
				var depot_name = $(item).text();
				var depot_name_last = depot_name.trim();
				var station_alias = $(item).attr('data-station-alias');
				var station_last = station_alias.trim();
				if(num >= moq && num <= stock) {
					$.post(window.global.add_carts, {
						goods_extends_uuid: uuid,
						goods_num: depot_num,
						station_uuid: data_stock_uuid,
						station: depot_name_last,
						station_alias: station_last,
						activity_type: 'normal',
					}, function(data) {
						if(!data.code) {
							var shooping_top = $('.shoping').offset().top;
							var shooping_left = $('.shoping').offset().left;
							$('<img class="sign_img" src="/images/sign_img.png" />').appendTo('body')
							$('html,body').animate({
								scrollTop: 0
							}, 200);
							$('.sign_img').animate({
								top: shooping_top,
								left: shooping_left,
								with: 0,
								height: 0,
								opacity: 0
							}, 1000);
							setTimeout($('.layer').hide(), 1000);
							setTimeout($('.shoping_num').find('a').text(data.data), 1500);
							$('.continue_buy').show();
						} else {
							alert(data.message);
							
						}
					});
				}

			}
		});

	}
	//点击弹出层取消效果
	$('.cancel').click(function() {
		singel_total()
		shrink();
		$('.wait_gif').hide();
	});
	//点击弹出层确定时的效果
	$('.ensure').click(function() {
		var data_attr = $('.ex_afterclick').attr('data-attr-value-uuid');
		var sub_wap = $('[data-index=' + data_attr + ']');
		var depot = sub_wap.find('[data-selected="1"]');
		var stock_single = sub_wap.find('[data-selected="1"]').siblings('.layer_ex_xiang').find('.single_amount');
		var depot_uuid = depot.eq(0).attr('data-attr-value-uuid');
		var depot_text = depot.eq(0).text().trim();
		var sum = 0;
		var stock_sum = 0;
		$('.default_st').attr('data-attr-value-uuid', depot_uuid);
		$('.default_st').text(depot_text + '发货');
		$.each(stock_single, function(index, item) {
			var stock_num = parseInt($(item).val());
			var single_stock_num = parseInt($(item).parents('.layer_ex_xiang').siblings('.layer_stock_num').attr('data_stock'));
			sum += stock_num;
			stock_sum += single_stock_num;
		});
		$('.total_stock_num').text(stock_sum);
		$('.total_amount').val(sum);
		amout();
		$('.layer_container').hide();
		join_carts();
	});

	//计算弹出层取货次数并填写到$('.time_num')里面
	function add_time() {
		var data_attr = $('.ex_afterclick').attr('data-attr-value-uuid');
		var sub_wap = $('[data-index=' + data_attr + ']');
		var stock_single = sub_wap.find('[data-selected="1"]');
		var i = 0;
		$.each(stock_single, function(index, item) {
			i++
		});
		$('.time_num').text(i);
	}
	//计算弹出层输入框的数据并填写到$('.box_num')里面
	function count_box() {
		var data_attr = $('.ex_afterclick').attr('data-attr-value-uuid');
		var sub_wap = $('[data-index=' + data_attr + ']');
		var stock_single = sub_wap.find('[data-selected="1"]').siblings('.layer_ex_xiang').find('.single_amount');
		var sum = 0;
		$.each(stock_single, function(index, item) {
			var single_num = $(item).val();
			if(single_num == '') {
				single_num = 0
			}
			var stock_num = parseInt(single_num);
			sum += stock_num;
		});
		$('.box_num').text(sum);
	}
	//默认先将库存最多的仓库填满再选别的仓库
	function singel_total() {
		var data_attr = $('.ex_afterclick').attr('data-attr-value-uuid');
		var sub_wap = $('[data-index=' + data_attr + ']');
		sub_wap.show().attr('data-selected', '1').siblings('.sub_wap').hide().removeAttr('data-selected');
		var limit_data = sub_wap.find('.limit');
		//将仓库按库存量排序，从大到小排
		for(var i = 0; i < limit_data.length - 1; i++) {
			for(var j = i + 1; j < limit_data.length; j++) {
				var stock_num_bef = parseInt($(limit_data[i]).find('.layer_stock_num').attr('data_stock'));
				var stock_num_aft = parseInt($(limit_data[j]).find('.layer_stock_num').attr('data_stock'));
				if(stock_num_bef < stock_num_aft) {
					var item = limit_data[i];
					limit_data[i] = limit_data[j];
					limit_data[j] = item;
				}
			};
		};
		//自动按每个仓库的库存添加货物
		$.each(limit_data, function(index, item) {
			var total_num = parseInt($('.total_amount').val());
			var layer_stock_num = parseInt($(item).find('.layer_stock_num').attr('data_stock'));
			var val_num = layer_stock_num - total_num;
			var after_limit = $(limit_data[index + 1]);
			if(val_num >= 0) {
				$(item).find('.single_amount').val(total_num);
				$(item).find('.chk').hide().siblings('.selected').show().siblings('.depot').attr('data-selected', '1');
				after_limit.find('.single_amount').val(0);
				return false;
			} else {
				var spare_num = (-val_num);
				for(var i = 1; i < limit_data.length; i++) {
					var next_stock_num = parseInt($(limit_data[i]).find('.layer_stock_num').attr('data_stock'))
					var spare_num = next_stock_num - spare_num;
					if(spare_num >= 0) {
						$(item).find('.single_amount').val(layer_stock_num);
						$(item).find('.chk').hide().siblings('.selected').show().siblings('.depot').attr('data-selected', '1');
						$(limit_data[i]).find('.single_amount').val(-val_num);
						after_limit.find('.chk').hide().siblings('.selected').show().siblings('.depot').attr('data-selected', '1');
						return false;
					} else {
						$(item).find('.single_amount').val(layer_stock_num);
						$(item).find('.chk').hide().siblings('.selected').show().siblings('.depot').attr('data-selected', '1');
						$(limit_data[i]).find('.single_amount').val(next_stock_num);
						after_limit.find('.chk').hide().siblings('.selected').show().siblings('.depot').attr('data-selected', '1');
					}

				}
			}
		});
		//			将添加好的仓库重新显示
		limit_data.each(function(i, t) {
			var new_dom = $(t).clone(true);
			$(t).remove();
			new_dom.appendTo(sub_wap);
		});

	};
	//        判断库存量是否充足
	function stock_number(This, limit) {
		var depot = This.parents('.limit').find('.depot');
		var data_select = depot.attr('data-selected');
			if(data_select==='1' || !depot.length){
				var stock = parseInt(This.parents('.limit').find('.layer_stock_num').attr('data_stock'));
				var stock_val = This.val();
				var val_num = parseInt(stock_val);
				if(val_num > stock) {
					var beyond = This.parents('.limit').find('.beyond').length;
					This.val(stock)
					if(beyond == 0) {
						$('<div class="beyond">库存量不足！！</div>').appendTo(limit).css({
							color: '#ea0000',
							fontSize: '12px',
							marginLeft: '140px'
						});
					};
		
				} else {
				This.parents('.limit').find('.beyond').remove();
				};
		
				if(stock_val == '') {
					stock_val = 0
				}
			}
		
		

	};
	//判断是否小于起订量
	function moq_count(item) {
		var depot = item.parents('.limit').find('.depot');
		var data_select = depot.attr('data-selected');
		if(data_select==='1' || !depot.length){
			var min_val = parseInt(item.attr('data_value'));
			var limit = item.parents('.limit');
			var limit_prompt = limit.find('.limit_prompt').length;
			if(parseInt(item.val())< min_val) {
				item.val(min_val)
				if(limit_prompt == 0) {
					$('<div class="limit_prompt">本商品' + min_val + '箱起购</div>').appendTo(limit).css({
						color: '#ea0000',
						fontSize: '12px',
						marginLeft: '140px'
					});
				};
			} else {
				limit.find('.limit_prompt').remove();
			};
			
		}
	}
	//       计算货物数量
	function amout() {
		var data_attr = $('.ex_afterclick').attr('data-attr-value-uuid');
		var data_stock = $('.default_st').attr('data-attr-value-uuid');
		var data_uuid = data_attr + '_' + data_stock;
		var data_key = data[data_uuid];
		if(!data_key) {
			data_uuid = data_stock + '_' + data_attr;
			data_key = data[data_uuid];
		}
		var stocking_unit = data_key.stocking_unit;
		var pricing_unit = data_key.pricing_unit;
		var stocking_pricing_ratio = parseInt(data_key.stocking_pricing_ratio);
		var ex_amount = $('.total_amount').val();
		if(ex_amount == '') {
			ex_amount = 0
		};
		var val_num = parseInt(ex_amount);
		var stocking_pricing_ratio = data_key.stocking_pricing_ratio;
		var total = val_num * stocking_pricing_ratio;
		$('.number_details').text('（' + stocking_pricing_ratio + pricing_unit + '装，' + '共' + total + pricing_unit + '）');
	};

	//弹出层弹出
	function edit() {
		$('.layer').show();
		$('.layer_container').show();
	};
	//弹出框隐藏效果
	function shrink() {
		$('.layer').hide();
	}
});