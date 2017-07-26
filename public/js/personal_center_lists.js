$(function() {
	ChangeList($('#my_personal_lists'));

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
	$('.order_state').on('click', function() {

		$(this).children('.order_top').addClass('checkbox_change').parent('a').addClass('color_red').siblings('.order_state').removeClass('color_red')
			.children('span').removeClass('checkbox_change');
	});
	$(".order_lists_right").each(function() {
		$(this).height($(this).siblings().height())
	});
	//tab 
	$('.track').click(function(e) {

		var that = $(this);
		$(this).parents('.order_lists,.order_lists_marTop').find('.order_follow').show();
		e.stopPropagation();
	});
	$(document.body).click(function() {
		$(".order_follow").hide();
	});
	$(".order_follow").click(function(e) {
		e.stopPropagation();
	});
	$('.order_follow_off').click(function() {
		$(this).parent('div').hide();
	});
	//订单查询点击事件（起始时间+状态）
	$('.vip_filter').click(function() {
		var start = $('#personal_test1').text();
		var end = $('#personal_test2').text();
		var status = $('.color_red').attr('data_status');
		if (status==undefined) {
			status='待支付';
		}
		var url = window.global.orderlist + '?state=' + status + '&begin_time=' + start + '&end_time=' + end;
		window.location.href = url;
	});
	//Enter按钮绑定点击事件
	$(document).keydown(function(event) {

		if(event.keyCode == 13) {

			$(".suer_btn").click();

		}

	})
	$('.suer_btn').click(function() {

		var pages = $('.page_btn').children('li').length - 2;
		var num = $('#page_num').val();
		var num_test = /\d/;
		if(num_test.test(num) && num <= pages) {
			lookup(num);

		}

	});
	//分页
	function lookup(num) {
		var http_url = window.location.href;

		var arr = http_url.split('?');
		var str1 = arr[0];

		arr.splice(0, 1)
		var str2 = arr.join();

		var arr1 = str2.split('&');

		arr1.splice(0, 1);

		var str3 = arr1.join();
		var str4 = str3.replace(/,/gm, '&');

		var url_str = str1 + '?' + 'page=' + num + '&' + str4;

		if(http_url.indexOf('?') == -1) {
			window.location.href = http_url + '?' + 'page=' + num;
		}
		if(http_url.indexOf('?') !== -1 && http_url.indexOf('page') == -1) {

			window.location.href = str1 + '?' + 'page=' + num + '&' + str2;
		}
		if(http_url.indexOf('?') !== -1 && http_url.indexOf('page') !== -1) {
			window.location.href = url_str;
		}

	}

	//一加载就把分页的a标签里的href值给赋值

	hrf_change();

	function hrf_change() {

		var http_url = window.location.href;

		var reg = $('.color_red').attr('data_status');
		var reg1 = encodeURI(reg);

		var arr = http_url.split('&');

		arr.splice(0, 1)

		var str2 = arr.join();

		var str3 = str2.replace(/,/gm, '&');

		if(http_url.indexOf(reg1) != -1) {

			if(str3.indexOf('state') == -1) {
				$('.page_btn>li').find('a').each(function(index, elem) {

					var hrf = $(this).attr('href');

					var str = hrf + '&' + 'state=' + reg1 + '&' + str3;

					$(this).attr('href', str);
				});
			} else {
				$('.page_btn>li').find('a').each(function(index, elem) {

					var hrf = $(this).attr('href');

					var str = hrf + '&' + str3;

					$(this).attr('href', str);
				});
			}

		}

	}
	//点击取消订单
	$('.order_cancel').click(function(){
		 
		 if(confirm('您确定要取消订单？')){
		 	return true;
		 }else{
		 	return false;
		 };
	});
	//文件上传

	
	var Sys = {};
	var ua = navigator.userAgent.toLowerCase();
	var s;
	(s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1]: 0;
	if(Sys.safari) { //Js判断为苹果safari浏览器
		$('.imgWapper').remove();

	};
	var files1 = document.getElementById('input_file1');
	var files2 = document.getElementById('input_file2');
	
		
		files1.onchange = function() {
		
		PreviewImage(files1, 'img_id');
		if ($('.tip_company').text()=='') {
			$('.imgWapper').show();
		}else{
			$('.imgWapper').hide();
		}
		
	};
	files2.onchange = function() {
		
		PreviewImage(files2, 'img_p');
		if ($('.tip_company').text()=='') {
			$('.imgWapper').show();
		}else{
			$('.imgWapper').hide();
		}
		
	};

	
	// js本地图片预览          兼容ie[6-9]、火狐、Chrome17+、Opera11+、Maxthon3
	function PreviewImage(fileObj, divPreviewId) {
		$('.tip_company').attr('data-success', '1');
		var allowExtention = ".jpg,.jpeg,.png"; //允许上传文件的后缀名document.getElementById("hfAllowPicSuffix").value;
		var extention = fileObj.value.substring(fileObj.value.lastIndexOf(".") + 1).toLowerCase();
		var browserVersion = window.navigator.userAgent.toUpperCase();
		if(allowExtention.indexOf(extention) > -1) {
			if(fileObj.files) { //HTML5实现预览，兼容chrome、火狐7+等
				var img_size = fileObj.files[0].size / 1024 / 1024;
				if(img_size <= 6) {
					if(window.FileReader) {
						var reader = new FileReader();
						reader.onload = function(e) {
							var img_preview = document.getElementById('img_preview');
							var tempDivPreview = document.getElementById(divPreviewId);
							var img_chlid=$(tempDivPreview).find('#img_preview');
							if(img_chlid.length == 0) {
								var img = document.createElement("img");
								img.style.width = 175 + "px";
								img.style.height = 110 + "px";
								img.setAttribute("id", 'img_preview');
								img.setAttribute("src", e.target.result);
								tempDivPreview.appendChild(img);
							} else {
								$(tempDivPreview).find('img').remove();
								var img = document.createElement("img");
								img.style.width = 175 + "px";
								img.style.height = 110 + "px";
								img.setAttribute("id", 'img_preview');
								img.setAttribute("src", e.target.result);
								tempDivPreview.appendChild(img);
							}

						}
						reader.readAsDataURL(fileObj.files[0]);
					}
				} else {
					$(tempDivPreview).find('img').remove();
					$('.tip_company').removeAttr('data-success').text('图片过大（小于6M）,请重新选择！！').css('color', '#EA0000');
				}

			} else if(browserVersion.indexOf("MSIE") > -1) {
				if(browserVersion.indexOf("MSIE 6") > -1) { //ie6
					var img = document.createElement("img");
					img.style.width = 175 + "px";
					img.style.height = 110 + "px";
					var tempDivPreview = document.getElementById(divPreviewId);
					img.setAttribute("src", fileObj.value);
					tempDivPreview.appendChild(img);
				} else { //ie[7-9]
					getFileSize(fileObj);
					if(filesize <= 6) {
						fileObj.select();
						if(browserVersion.indexOf("MSIE 9") > -1) {
							fileObj.blur(); //不加上document.selection.createRange().text在ie9会拒绝访问
							document.selection.createRange().text;
							var newPreview = document.getElementById(divPreviewId + "New");
							if(newPreview == null) {
								newPreview = document.createElement("div");
								newPreview.setAttribute("id", divPreviewId + "New");
								newPreview.style.width = 175 + "px";
								newPreview.style.height = 110 + "px";
								
							};
						};
						newPreview.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src='" + document.selection.createRange().text + "')";
						var tempDivPreview = document.getElementById(divPreviewId);
						tempDivPreview.parentNode.insertBefore(newPreview, tempDivPreview);
						tempDivPreview.style.display = "none";

					} else {
						$(tempDivPreview).find('img').remove();
						$('.tip_company').removeAttr('data-success').text('图片过大（小于6M）,请重新选择！！').css('color', '#EA0000');
					}
				}
			} else if(browserVersion.indexOf("FIREFOX") > -1) { //firefox
				var firefoxVersion = parseFloat(browserVersion.toLowerCase().match(/firefox\/([\d.]+)/)[1]);
				if(firefoxVersion < 7) { //firefox7以下版本
					document.getElementById(imgPreviewId).setAttribute("src", fileObj.files[0].getAsDataURL());
				} else { //firefox7.0+                    
					document.getElementById(imgPreviewId).setAttribute("src", window.URL.createObjectURL(fileObj.files[0]));
				}
			} else {
				document.getElementById(imgPreviewId).setAttribute("src", fileObj.value);
			}
		} else {
			if(allowExtention.indexOf(extention) <= -1) {
				$(divPreviewId).find('img').remove();
				$('.tip_company').removeAttr('data-success').text('图片限于png,jpeg,jpg格式,请重新选择！！').css('color', '#EA0000');
				//fileObj.outerHTML = fileObj.outerHTML;
			};

		};
		var data_card_pec = $('.tip_company').attr('data-success');
		if(data_card_pec) {
			onoff4 = true;

			$('.tip_company').text('');
		} else {
			onoff4 = false;

		};
	}
	//兼容ie9，获取文件大小
	function getFileSize(obj) {
		try {
			var file = obj;
			file.select();
			file.blur();
			var path = document.selection.createRange().text;
			var fso = new ActiveXObject("Scripting.FileSystemObject");
			filesize = fso.GetFile(path).size / 1024 / 1024;
		} catch(e) {
			alert(e + "\n" + "如果错误为：Error:Automation 服务器不能创建对象；" + "\n" + "请按以下方法配置浏览器：" + "\n" + "请打开【Internet选项-安全-Internet-自定义级别-ActiveX控件和插件-对未标记为可安全执行脚本的ActiveX控件初始化并执行脚本（不安全）-点击启用-确定】");
			return window.location.reload();
		};
	};
//点击申请开发票
	$('.application,.application_deny').click(function(){
		$('.layer').show();
	})
	$('.application_no,.cancel_li').click(function(){
		window.location.reload();
	});

	
	if ($('.box_h_sub').css('display')=='inline') {
		
		inpt($('.layer_name'));
		inpt($('.layer_code'));
		inpt($('.layer_dress'));
		inpt($('.layer_bank'));
		inpt($('.layer_bank_account'));
		inpt($('.layer_person_adress'));
		inpt($('.layer_person_number'));
		inpt($('.layer_person_name'));
	}
	function inpt(obj) {
		    var data_please = obj.attr('data_please');
		    if (obj.val().trim() !== '') {
		    	data_please = obj.val();
		    } 
			obj.val(data_please).css('color', '#999');

			obj.focus(function() {

				var obj_val = obj.val();
				if(obj_val == data_please) {
					obj.val('').css('color', '#000');
				};
				obj.next('span').text('');
			});
			obj.blur(function() {
				var obj_val = obj.val();
				if(!obj_val) {
					obj.val(data_please).css('color', '#999');
				};
			});
		}
	
		function panduan(){
			var flag = false;
			$('.layer [name]').each(function () {
				if (!$(this).val().trim() || $(this).val().charAt(0) === '请') {
					flag = true;
					return false;
				}
			});

			if (flag) {
				$('.submit').attr('type','button');
			} else {
				$('.submit').attr('type','submit');
			}
		}
		
		$('.submit').click(function(){
			panduan();
			if ($(this).attr('type') === 'button') {
				alert('请完善开票信息！')
			}
		})
});