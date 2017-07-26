$(function(){
	$('.into_box').change(function() {
		var element=$(this).parents('.configure_container').find('.right_foot_img');
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
	$('.unsave').click(function() {
		if($(this).attr('data-post')==='1') {
			var agencyProvinceIp = $('[name="agency_province_ip"]').val();
			var agencyProvincePbc = $('[name="agency_province_pbc"]').val();
			var agencyProvinceIc = $('[name="agency_province_ic"]').val();
			var agencyProvinceCbp = $('[name="agency_province_cbp"]').val();
			var agencyCityIp = $('[name="agency_city_ip"]').val();
			var agencyCityPbc = $('[name="agency_city_pbc"]').val();
			var agencyCityIc = $('[name="agency_city_ic"]').val();
			var agencyCityCbp = $('[name="agency_city_cbp"]').val();
			var companyProvinceIp = $('[name="company_province_ip"]').val();
			var companyProvincePbc = $('[name="company_province_pbc"]').val();
			var companyProvinceIc = $('[name="company_province_ic"]').val();
			var companyProvinceCbp = $('[name="company_province_cbp"]').val();
			var companyCityIp = $('[name="company_city_ip"]').val();
			var companyCityPbc = $('[name="company_city_pbc"]').val();
			var companyCityIc = $('[name="company_city_ic"]').val();
			var companyCityCbp = $('[name="company_city_cbp"]').val();

			var element=$(this).parents('.configure_container').find('.right_foot_img')
			backColor(element);
			$.post(window.global.store, {
				'agency_province_ip': parseFloat(agencyProvinceIp) * 100,
				'agency_province_pbc': parseFloat(agencyProvincePbc) * 100,
				'agency_province_ic': parseFloat(agencyProvinceIc) * 100,
				'agency_province_cbp': parseFloat(agencyProvinceCbp) * 100,
				'agency_city_ip': parseFloat(agencyCityIp) * 100,
				'agency_city_pbc': parseFloat(agencyCityPbc) * 100,
				'agency_city_ic': parseFloat(agencyCityIc) * 100,
				'agency_city_cbp': parseFloat(agencyCityCbp) * 100,
				'company_province_ip': parseFloat(companyProvinceIp) * 100,
				'company_province_pbc': parseFloat(companyProvincePbc) * 100,
				'company_province_ic': parseFloat(companyProvinceIc) * 100,
				'company_province_cbp': parseFloat(companyProvinceCbp) * 100,
				'company_city_ip': parseFloat(companyCityIp) * 100,
				'company_city_pbc': parseFloat(companyCityPbc) * 100,
				'company_city_ic': parseFloat(companyCityIc) * 100,
				'company_city_cbp': parseFloat(companyCityCbp) * 100,
			}, function(data) {
				if (data.status) {
					alert(data.info);
					return;
				}
				window.location.reload();
			});
		}
	});

	$('body').on('change', '#province_select', function () {
		window.location.href = window.global.index + '?id=' + $(this).val();
	});

})