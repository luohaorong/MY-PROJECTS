$(function(){
	$('.into_box').change(function() {
		var element=$(this).parents('.configure_right_body').find('.right_foot_img')
		changeColor(element);
	});
	function changeColor(selector){
		selector.css({
			backgroundImage:'url(/images/configure/save_hover.png)',
			textShadow:'-2px -2px 2px #2b6a99'
		}).attr('data-post','1');
	}
	function backColor(selector){
		selector.css({
			backgroundImage:'url(/images/configure/save.png)',
			textShadow:'-2px -2px 2px #555'
		}).attr('data-post','0');
	}

	var uuid;
	$('body').on('click', '.tbabel_row', function () {
		uuid = $(this).data('uuid');
		window.global.areas.map(function (item) {
			if (uuid === item['uuid']) {
				if (parseInt(item.layout) === 3) {
					var province = $('#province_select').find('option:selected').text();
					$('.configure_right_body .title').text(province);
					$('.configure_right_body .sub_title').text(item['name']);
					$('.configure_right_body .code').text('AC' + item['code']);
				} else if (parseInt(item.layout) === 4) {
					var province = $('#province_select').find('option:selected').text();
					var city = $('#city_select').find('option:selected').text();
					$('.configure_right_body .title').text(province);
					$('.configure_right_body .sub_title').text(city);
					$('.configure_right_body .last_title').text(item['name']);
					$('.configure_right_body .code').text('AD' + item['code']);
				} else {
					$('.configure_right_body .title').text(item['name']);
					$('.configure_right_body .code').text('AP' + item['code']);
				}
				var data = window.global.agencies[uuid];
				if (data !== undefined) {
					$('[name="name"]').val(data.name);
					$('[name="real_name"]').val(data.real_name);
					$('[name="id_card"]').val(data.id_card);
					$('[name="mobile"]').val(data.mobile);
					$('#agent_started_at').text(new Date(data.agent_started_at).format('yyyy-MM-dd'));
					$('#agent_ended_at').text(new Date(data.agent_ended_at).format('yyyy-MM-dd'));
					$('[name="openid"]').val(data.openid);
					if ($('[name="bonus_case"]').length) {
						$('[name="bonus_case"] option[value="' + data.bonus_case + '"]').attr('selected', true);
					}
				} else {
					$('[name="name"]').val($('.configure_right_body .code').text());
					$('[name="real_name"]').val('');
					$('[name="id_card"]').val('');
					$('[name="mobile"]').val('');
					$('#agent_started_at').text('');
					$('#agent_ended_at').text('');
					$('[name="openid"]').val('');
				}

				$.get(window.global.history, { id: uuid }, function (res) {
					if (res.status) {
						alert(res.info);
						return;
					}

					var currentTimestamp = new Date().getTime();
					$('.agent_history .configure_right_body tbody tr:gt(0)').remove();
					$('.query_layer_container tbody tr:gt(0)').remove();
					for (var i = 0; res.data[i]; i++) {
						var endTimestamp = new Date(res.data[i].agent_ended_at).getTime() + 86400000;
						var dom = $('.agent_history .configure_right_body tbody tr:first').clone(true);
						dom.find('td').eq(0).text(res.data[i].real_name);
						dom.find('td').eq(1).text(new Date(res.data[i].agent_started_at).format('yyyy年MM月dd日'));
						dom.find('td').eq(2).text(new Date(res.data[i].agent_ended_at).format('yyyy年MM月dd日'));
						if (res.data[i].status === 'locked') {
							dom.find('td').eq(3).html('<span class="stop">停用</span>');
						} else if (currentTimestamp < endTimestamp) {
							dom.find('td').eq(3).html('<span class="normal">正常</span>');
						} else {
							dom.find('td').eq(3).html('<span class="dateoff">过期</span>');
						}
						$('.agent_history .configure_right_body tbody').append(dom.show());

						// 弹出层
						var layer = $('.query_layer_container tbody tr:first').clone(true);
						layer.find('td').eq(0).text(res.data[i].name);
						layer.find('td').eq(1).text('******');
						layer.find('td').eq(2).text(res.data[i].real_name);
						layer.find('td').eq(3).text(res.data[i].id_card);
						layer.find('td').eq(4).text(res.data[i].mobile);
						layer.find('td').eq(5).text(new Date(res.data[i].agent_started_at).format('yyyy年MM月dd日'));
						layer.find('td').eq(6).text(new Date(res.data[i].agent_ended_at).format('yyyy年MM月dd日'));
						if (res.data[i].status === 'locked') {
							layer.find('td').eq(7).html('<span class="stop">停用</span>');
							layer.find('td').eq(8).html('<button class="open">启用</button>');
						} else if (currentTimestamp < endTimestamp) {
							layer.find('td').eq(7).html('<span class="normal">正常</span>');
						} else {
							layer.find('td').eq(7).html('<span class="dateoff">过期</span>');
							layer.find('td').eq(8).html('<button class="close">停用</button>');
						}
						$('.query_layer_container tbody').append(layer.attr('data-uuid', res.data[i].uuid).show());
					}
				});

				return false;
			}
		});
		$(this).addClass('active').siblings().removeClass('active');
	})

	$('.unsave').click(function() {
		var name = $('[name="name"]').val();
		var password = $('[name="password"]').val();
		var pay_pwd = $('[name="pay_pwd"]').val();
		var real_name = $('[name="real_name"]').val();
		var id_card = $('[name="id_card"]').val();
		var mobile = $('[name="mobile"]').val();
		var agent_started_at = $('#agent_started_at').text().trim();
		var agent_ended_at = $('#agent_ended_at').text().trim();
		var openid = $('[name="openid"]').val();
		var bonus_case = $('[name="bonus_case"]').length ? $('[name="bonus_case"]').val() : 'ip';
		var code = $('.configure_right_body .code').text().trim();
		var element=$(this).parents('.configure_right_body').find('.right_foot_img');
		backColor(element);
		$.post(window.global.store, {
			'name': name,
			'password': password,
			'pay_pwd': pay_pwd,
			'real_name': real_name,
			'id_card': id_card,
			'mobile': mobile,
			'agent_started_at': agent_started_at,
			'agent_ended_at': agent_ended_at,
			'code': code,
			'areas_uuid': uuid,
			'openid': openid,
			'bonus_case': bonus_case,
		}, function(data) {
			if (data.status) {
				alert(data.info);
				return;
			}
			window.location.reload();
		});
	});

	$('body').on('change', '#province_select', function () {
		window.location.href = window.global.index + '?id=' + $(this).val();
	});

	$('body').on('change', '#city_select', function () {
		window.location.href = window.global.index + '?id=' + $('#province_select').val() + '&cid=' + $(this).val();
	});

	$('body').on('click', '.close', function () {
		var button = $(this);
		var trDom = button.parents('tr');
		$.post(window.global.close, { id: trDom.data('uuid') }, function (data) {
			if (data.status) {
				alert(data.info);
				return;
			}
			button.removeClass('close').addClass('open').text('启用');
			trDom.find('td').eq(7).html('<span class="stop">停用</span>');
		});
	});

	$('body').on('click', '.open', function () {
		var button = $(this);
		var trDom = button.parents('tr');
		$.post(window.global.open, { id: trDom.data('uuid') }, function (data) {
			if (data.status) {
				alert(data.info);
				return;
			}
			button.removeClass('open').addClass('close').text('停用');
			trDom.find('td').eq(7).html('<span class="dateoff">过期</span>');
		});
	});

	$('.configure_head_img').click(function(){
        $('.query_table_layer').show();
    })

    $('.datepicker').click(function(){
		clickDate();
	})

	function clickDate(){
		$('.laydate_table tbody tr td,#laydate_today').click(function(){
			var element=$('.right_foot_img');
			changeColor(element);
		});
	}
});
