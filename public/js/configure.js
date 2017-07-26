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
				$('.right_body_title .title').text(item['name']);
				if (item.layout === 3) {
					$('.right_body_title .code').text('SC' + item['code']);
				} else {
					$('.right_body_title .code').text('SP' + item['code']);
				}
				var data = window.global.staffs[uuid];
				if (data !== undefined) {
					$('.account').val(data.name);
					$('.username').val(data.real_name);
					$('.tle').val(data.mobile);
					$('.e-mail').val(data.email);
					$('#personal_test1').text(new Date(data.inducted_at).format('yyyy-MM-dd'));
					$('.openId').val(data.openid);
				} else {
					$('.account').val($('.right_body_title .code').text());
					$('.username').val('');
					$('.tle').val('');
					$('.e-mail').val('');
					$('#personal_test1').text('');
					$('.openId').val('');
				}
				return false;
			}
		});
		$(this).addClass('active').siblings().removeClass('active');
	})

	$('.unsave').click(function() {
		var account=$('.account').val();
		var password=$('.password').val();
		var username=$('.username').val();
		var tle=$('.tle').val();
		var e_mail=$('.e-mail').val();
		var openId=$('.openId').val();
		var inducted_at = $('#personal_test1').text().trim();
		var code = $('.right_body_title .code').text().trim();
		var element=$(this).parents('.configure_right_body').find('.right_foot_img');
		backColor(element);
		$.post(window.global.store, {
			'code':code,
			'areas_uuid':uuid,
			'name':account,
			'password':password,
			'real_name':username,
			'mobile':tle,
			'email':e_mail,
			'openid':openId,
			'inducted_at': inducted_at	
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
