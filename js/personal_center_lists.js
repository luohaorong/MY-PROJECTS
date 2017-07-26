/**
 * Created by Chrise on 2017/2/15.
 */

$(function () {
    $('.order_state').on('click', function () {
    	
      $(this).children('.order_top').addClass('checkbox_change').parent('div').addClass('color_red').siblings('.order_state').removeClass('color_red')
          .children('span').removeClass('checkbox_change');
    });
    $(".order_lists_right").each(function () {
        $(this).height($(this).siblings().height())
    });
    //tab 
    $('.track').click(function (e) {
        var that = $(this);
        $(this).parents('.order_lists ').find('.order_follow').show();
        e.stopPropagation();
    });
    $(document.body).click(function () {
        $(".order_follow").hide();
    });
    $(".order_follow").click(function (e) {
        e.stopPropagation();
    });
    $('.order_follow_off').click(function () {
        $(this).parent('div').hide();
    })
});