/**
 * Created by Chrise on 2017/2/10.
 */



//=====================全局函数========================
/*tab切换函数
 * ele_id: tab标签父节点ID
 * arguments[1]: 活动标签classname，默认为:on
 * arguments[2]：内容父节点ID,默认为：tabid_con
 * DEMO:tab_switch(tabid);
 */
function tab_switch(ele_id, activeclass) {
    $("#" + ele_id).children().each(function () {
        var xh = $(this).index();
        $(this).find("*").click(function () {
            console.log($(this));
            $(this).addClass(activeclass);
            $(this).siblings().removeClass(activeclass);
            $(".tabcon_sy>li").addClass("tab_hidden");
            alert(xh);
            $(".tabcon_sy>li").eq(xh).removeClass("tab_hidden");
        })
    });
}
/*
//=====================全局函数========================
//==================图片详细页函数=====================
 */

//点击左侧显示或隐藏
function slide_box(id_click, id_add, id_det, id_up) {
    $(id_click).click(function () {
        var data_state = $(this).attr('data_state');
        if (data_state == 1) {
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

$(function(){
    //图片预览小图移动效果,页面加载时触发
    var showproduct = {
        "boxid": "showbox",
        "sumid": "showsum",
        "boxw": 274,//宽度,该版本中请把宽高填写成一样
        "boxh": 374,//高度,该版本中请把宽高填写成一样
        "sumw": 62,//列表每个宽度,该版本中请把宽高填写成一样
        "sumh": 62,//列表每个高度,该版本中请把宽高填写成一样
        "sumi": 6,//列表间隔
        "sums": 3,//列表显示个数
        "sumsel": "sel",
        "sumborder": 1,//列表边框，没有边框填写0，边框在css中修改
        "lastid": "showlast",
        "nextid": "shownext"
    };//参数定义
    jQuery.ljsGlasses.pcGlasses(showproduct);//方法调用，务必在加载完后执行
//==================图片详细页函数=====================
    //根据ID调用菜单切换函数
    $('#tab_id>.tab li').click(function () {
        var i = $(this).index();//下标第一种写法
        //var i = $('tit').index(this);//下标第二种写法
        $(this).addClass('active').siblings().removeClass('active');
        $('.tabcon_sy li').eq(i).show().siblings().hide();
    });
    //选择独家地区
    //选择独家地区
    var ex_off1 = false;
    var ex_off2 = false;
    exclusive();
    $('.ck_churchyard').on('click', function () {
        if (!ex_off1) {
            $(this).children('.ck_city').addClass('ex_change').parent('div').addClass('ex_afterclick');
            $(this).siblings('.ck_province ')
                .removeClass('ex_afterclick')
                .children('.ck_region').removeClass('ex_change');
            ex_off1 = true;
            ex_off2 = false;
        } else {
            $(this).children('.ck_city').removeClass('ex_change').parent('div').removeClass('ex_afterclick');
            ex_off1 = false;
        }
        exclusive();
    });
    $('.ck_province').on('click', function () {
        if (!ex_off2) {
            $(this).children('.ck_city').addClass('ex_change').parent('div').addClass('ex_afterclick');
            $(this).siblings('.ck_churchyard')
                .removeClass('ex_afterclick')
                .children('.ck_region').removeClass('ex_change');
            ex_off2 = true;
            ex_off1 = false;
        } else {
            $(this).children('.ck_city').removeClass('ex_change').parent('div').removeClass('ex_afterclick');
            ex_off2 = false;
        }
        exclusive();
    });
    //输入数量验证
    $('.ex_amount').bind('input propertychange', function () {
        $(this).val($(this).val().replace(/[^\d]/g, ''));//验证只能输入数字
        if ($(this).val() == null || $(this).val() == "") {
            $(this).val(0)
        } else if ($(this).val().substr(0, 1) == '0' && $(this).val().length > 1) {
            $(this).val($(this).val().substr(1));
        }
    });
    //加减订购数量
    $('.ex_add').on('click', function () {
        var amount = parseInt($('.ex_amount').val());
        amount++;
        $('.ex_amount').val(amount);

    });
    $('.ex_minus').on('click', function () {
        var amount = parseInt($('.ex_amount').val());
        amount--;
        $('.ex_amount').val(amount);
        if ($('.ex_amount').val() < 0) {
            $('.ex_amount').val(0);
        }
    });
    //送至的地区点击切换
    $('.ex_jiantou1').on('click', function () {
        $(this).hide();
        $('.ex_jiantou2').show();
        $('.ex_selectaddress').show();
        $('.first_li').html('');
    });
    $('.ex_jiantou2').on('click', function () {
        $(this).hide();
        $('.ex_jiantou1').show();
        $('.ex_selectaddress').hide();
        $('.first_li').html($('.ex_selectaddress li:first').text());
    });

    //确认代理
    function exclusive() {
        if (!ex_off1 && !ex_off2 && parseInt($('.ex_amount').val()) > 0) {
            /* $('.sure_agent').css({
             'background':'#cccccc'
             })*/
            $(".sure_agent").attr({
                "disabled": "disabled"
            });

        } else {
            $('.sure_agent').removeAttr("disabled");
            $('.sure_agent').css({
                'background': '#57e6d3'
            });
        }
    }

    $('.sure_agent').on('click', function () {
        console.log(111);
    });
    //点击切换显示隐藏
    slide_box(heat, add, detract, left_list_top);
    slide_box(browse, add_sub, detract_sub, left_list_sub);
    //初始化地址
    // $("#mySelect").select(); 不传参数可以这样写
    $("#select-area").select();
    //可选参数,不填就是默认值
    //width: "180px",            //生成的select框宽度
    //listMaxHeight:"200px",     //生成的下拉列表最大高度
    //themeColor: "#00bb9c",    //主题颜色
    //fontColor: "#000",        //字体颜色
    //fontFamily: "'Helvetica Neue', arial, sans-serif",    //字体种类
    //fontSize:"15px",           //字体大小
    //showSearch: false,        //是否启用搜索框
    //rowColor:"#fff",          //行原本的颜色
    //rowHoverColor: "#0faf03", //移动选择时，每一行的hover底色
    //fontHoverColor: "#fff",   //移动选择时，每一行的字体hover颜色
    //mainContent: "请选择",    //选择显示框的默认文字
    //searchContent: "关键词搜索"   //搜索框的默认提示文字
});