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
            if (uuid === item.agencies_uuid) {
                $.get(window.global.order, { agencies_uuid: item.agencies_uuid }, function (data) {
                    if (data.status) {
                        alert(data.info);
                        return;
                    }
                    $('.query_layer_container .head_p span').eq(0).text(item.real_name);
                    $('.query_layer_container .head_p span').eq(1).text(item.agent_started_at + ' - ' + item.agent_ended_at);
                    $('.query_layer_container .head_p span').eq(2).text('总：' + window.global.currency(item.agency_total + item.company_total));
                    $('.query_layer_container .head_p span').eq(3).text('经销商返利：' + window.global.currency(item.agency_total));
                    $('.query_layer_container .head_p span').eq(4).text('企业返利：' + window.global.currency(item.company_total));
                    $('.query_layer_container .export_excel').attr('uuid', item.agencies_uuid);
                    $('.query_layer_container .layer_tabs tbody tr:gt(0)').remove();
                    data.data.map(function (it) {
                        var clone = $('.query_layer_container .layer_tabs tbody tr').first().clone(true);
                        clone.find('td').eq(0).text(it.created_at.split(' ')[0]);
                        clone.find('td').eq(1).text(it.created_at.split(' ')[1]);
                        clone.find('td').eq(2).text(it.order_sn);
                        clone.find('td').eq(3).text(it.merchant_name);
                        clone.find('td').eq(4).text(it.bonus_source === 'company' ? '企业' : '经销商');
                        clone.find('td').eq(5).text(window.global.currency(it.trade_amount));
                        clone.find('td').eq(6).text(window.global.currency(it.amount));
                        clone.find('td').eq(7).text((it.amount / it.trade_amount) * 100 + '%');
                        $('.query_layer_container .layer_tabs tbody').append(clone.show());
                    });
                    $('.query_table_layer').show();
                });
                return false;
            }
        });
    });

    $('body').on('click', '.export_excel', function () {
        window.location.href = window.global.bonus + '?agencies_uuid=' + $(this).attr('uuid');
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