$(function() {
    $('body').on('change', '[name="status"]', function () {
        window.location.href = window.global.index + '?status=' + $(this).val();
    });

    $('body').on('click', '.cancel', function () {
        $.get(window.global.deny, { id: $(this).data('uuid') }, function (data) {
        	if (data.status) {
        		alert(data.info);
        		return;
        	}
        	window.location.reload();
        });
    });

    $('body').on('click', '.finish', function () {
        $.get(window.global.pass, { id: $(this).data('uuid') }, function (data) {
        	if (data.status) {
        		alert(data.info);
        		return;
        	}
        	window.location.reload();
        });
    });
})
