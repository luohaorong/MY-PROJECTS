$(function(){
	
			ChangeList($('#personal_brand_customization'));
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
		var jj_uuid=$.cookie('jiujiang_uuid');
		var data_country=$.cookie('data_countrys');
		console.log(jj_uuid)
		if(jj_uuid){
			$('[data-country-uuid='+jj_uuid+']').find('.variety_ck_box').addClass('checkbox_change').parents('.variety_content').siblings('.variety_content').find('.variety_ck_box').removeClass('checkbox_change')
		};
		

		var varietyoff2 = false;

		//选择品种
		$(".variety_content").click(function(e, data) {
			$(this).find('.variety_ck_box').addClass('checkbox_change').parents('.variety_content')
				.siblings('.variety_content').find('.variety_ck_box').removeClass('checkbox_change');

		});

			//选择国家
		$('.brand_national_flag').click(function(e, data) {
			$(this).addClass('add_brand_national_flag');
			$(this).siblings('.brand_national_flag').removeClass('add_brand_national_flag');
			var dataUuid= $(this).attr('data-uuid');
			$('[data-uuid-name='+dataUuid+']').show().attr('data_click','1').siblings('.check_country_variety_container').hide().attr('data_click','0');
			var country = $(this).attr('data_name');
			$('.brand_country_name').text(country);
			if (data !== undefined && data.uuid!==undefined) {
				$(".variety_content").trigger('click', data);
			}
		});
		if(data_country){
			$('[data-countrys-uuid='+data_country+']').click();
		}
		//下一步
		$('.brand_nextstep').click(function() {
			var bottle=$('[data_click="1"]').find('.checkbox_change').parents('.variety_content').attr('data-bottle');
			var label=$('[data_click="1"]').find('.checkbox_change').parents('.variety_content').attr('data-label');
			var arr=[];
			var country=$('.brand_country_name').text();
			var tr=$('[data_click="1"]').find('.checkbox_change').parents('.variety_content');
			var td=$('[data_click="1"]').find('.checkbox_change').parent().siblings('td');
			var moq=tr.attr('data-moq');
			var jiujiang_uuid=tr.attr('data-country-uuid');
			var bottle_uuid=tr.attr('bottle_uuid');
			var data_countrys=$('.add_brand_national_flag').attr('data-countrys-uuid');
			arr.push(country);
			td.map(function(i,j){
				var td_text=$(j).text();
				arr.push(td_text);
			});
			arr.push(moq);
			$.cookie('bottle',bottle);
			$.cookie('data_countrys',data_countrys);
			$.cookie('jiujiang_uuid',jiujiang_uuid);
			$.cookie('bottle_uuid',bottle_uuid);
			$.cookie('label',label);
			$.cookie('product_data',arr);
			window.location.href = window.global.brandCustomizitionSecond +'/jiujiang_uuid';
		})
	})();
});