$(function() {
    $(".table_arrow").click(function(){
       if($(this).hasClass("rotate"))
                { 
                    $(this).removeClass("rotate");
                    $(this).addClass("rotate1");
                    $(this).next('.table_container').hide();
                }else{
                	$(this).addClass("rotate");
                    $(this).removeClass("rotate1");
                    $(this).next('.table_container').show();
                }
      })

    $('.check_orders').click(function(){
        var uuid = $(this).data('uuid');
        window.global.data.map(function (item) {
            if (uuid === item.agency.uuid) {
                $.get(window.global.detail, { agencies_uuid: item.agency.uuid }, function (data) {
                    if (data.status) {
                        alert(data.info);
                        return;
                    }
                    $('.query_layer_container .head_p span').eq(0).text(item.agency.real_name);
                    $('.query_layer_container .head_p span').eq(1).text(item.agency.agent_started_at.split(' ')[0] + ' - ' + item.agency.agent_ended_at.split(' ')[0]);
                    $('.query_layer_container .head_p span').eq(2).text('总：' + window.global.currency(item.total));
                    $('.query_layer_container .head_p span').eq(3).text('已提现：' + window.global.currency(item.withdrawal));
                    $('.query_layer_container .head_p span').eq(4).text('可提现：' + window.global.currency(item.total - item.withdrawal));
                    $('.query_layer_container .head_p span').eq(5).text('冻结：' + window.global.currency(item.freeze));
                    $('.query_layer_container .export_excel').attr('uuid', item.agency.uuid);
                    $('.query_layer_container .layer_tabs tbody tr:gt(0)').remove();
                    data.data.map(function (it) {
                        var clone = $('.query_layer_container .layer_tabs tbody tr').first().clone(true);
                        clone.find('td').eq(0).text(it.created_at);
                        clone.find('td').eq(1).text(it.updated_at);
                        clone.find('td').eq(2).text(window.global.currency(it.amount));
                        clone.find('td').eq(3).text(it.real_name);
                        clone.find('td').eq(4).text(it.bank_account);
                        clone.find('td').eq(5).text(it.bank_name);
                        clone.find('td').eq(6).text(it.remark);
                        $('.query_layer_container .layer_tabs tbody').append(clone.show());
                    });
                    $('.query_table_layer').show();
                });
                return false;
            }
        });
    });

    $('body').on('click', '.export_excel', function () {
        window.location.href = window.global.withdrawal + '?agencies_uuid=' + $(this).attr('uuid');
    });

    $('body').on('change', '#province_select', function () {
        window.location.href = window.global.index + '?pid=' + $(this).val();
    });

    $('body').on('change', '#country_select', function () {
        window.location.href = window.global.index + '?pid=' + $('#province_select').val() + '&cid=' + $(this).val();
    });

    $('body').on('change', '#district_select', function () {
        window.location.href = window.global.index + '?pid=' + $('#province_select').val() + '&cid=' + $('#country_select').val() + '&did=' + $(this).val();
    });
})