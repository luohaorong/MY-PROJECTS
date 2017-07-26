$(function(){
	$('body').on('blur', '[name="bonus"]', function () {
		var value = $(this).val();
		$.post(window.global.store, {
			'bonus': value,
		}, function(data) {
			if (data.status) {
				alert(data.info);
				return;
			}
		});
	})
});
