! function() {
	laydate.skin('default'); //切换皮肤，请查看skins下面皮肤库

	$('.datepicker').each(function () {
		var item = $(this).attr('id');
		setTimeout(function () {
			laydate({
				elem: '#' + item
			});
		}, 100);
	});
}();

//日期范围限制
var start = {

	elem: '#start',

	format: 'YYYY-MM-DD',

	min: laydate.now(), //设定最小日期为当前日期

	max: '2099-06-16', //最大日期

	istime: true,

	istoday: false,
	choose: function(datas) {

		end.min = datas; //开始日选好后，重置结束日的最小日期

		end.start = datas //将结束日的初始值设定为开始日
	}

};
var end = {

	elem: '#end',

	format: 'YYYY-MM-DD',

	min: laydate.now(),

	max: '2099-06-16',
	istime: true,

	istoday: false,

	choose: function(datas) {

		start.max = datas; //结束日选好后，充值开始日的最大日期

	}

};
laydate(start);

laydate(end);

//自定义日期格式

laydate({

	elem: '#test1',

	format: 'YYYY-MM-DD',


	festival: true, //显示节日

	choose: function(datas) { //选择日期完毕的回调

		

	}

});
