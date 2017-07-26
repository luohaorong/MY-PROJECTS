$(function() {
	//轮播开始
	var opts = {
		boxh: 78, //轮播的高度
		w: 1070, //图片宽度
		h: 78, //图片高度
		isShow: false, //是否显示控制按钮
		isShowBtn: false, //是否显示左右按钮
		controltop: 0, //控制器按钮上下偏移距离 
		controlsW: 0, //控制按钮宽度
		controlsH: 0, //控制按钮高度
		radius: 4, //圆角度数
		speed: 3000,
		controlsColor: "#4b3b1b", //普通控制按钮的颜色
		controlsCurrentColor: "#7b1712" //当前控制按钮的颜色
	};
	$("#ppt").tyslide(opts);
	
	//是否现货或独家
	if($('.chk').length != 0 && $('.selected').length != 0) {
		switch_Hook(chk, selected);
	}
	if($('#right').length != 0 && $('#next_right').length != 0) {
		switch_Hook(right, next_right);
	}
	function switch_Hook(id_pre, id_aft) {
		$(id_pre).click(function() {
			$(id_aft).show().attr('data-success', 1).parent().find(id_pre).hide().attr('data-success', 0);
		});
		$(id_aft).click(function() {
			$(id_pre).show().attr('data-success', 1).parent().parent().find(id_aft).hide().attr('data-success', 0);
		});
	};
	slide_box(heat, left_list_top, add, detract);
	if($('#browse').length && $('#add_sub').length && $('#detract_sub').length && $('#left_list_sub').length) {
		slide_box(browse, left_list_sub, add_sub, detract_sub);
	};
	if($('#slid_screen').length != 0 && $('#wine_type').length != 0) {
		slide_box(slid_screen, wine_type);

	}
	if($('#origin_from').length != 0 && $('#country').length != 0) {
		slide_box(origin_from,country);
	}
	if($('#wine_type').length != 0 && $('#slid_screen').length != 0) {
		choice_item(wine_type, slid_screen);
	}
	if($('#country').length != 0 && $('#origin_from').length != 0) {
		choice_item(country,origin_from);
	}

	//鼠标移入效果    包销选择
	$('.underwriting li').hover(function() {
		$(this).find('a').addClass('under_curent');
	}, function() {
		var data_sign = $(this).find('a').attr('data_sign');
		if(!data_sign) {
			$(this).find('a').removeClass('under_curent');
		}
	});
	//点击切换条件查询页面
	! function() {
		var http_url = window.location.href;
		//查找地址栏中是否有某个name的值；
		getQueryString = function(name) {
			if(!name) return '';
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if(r != null) return unescape(r[2]);
			return '';
		};
		if(http_url.indexOf('agent=no') != -1) {
			//刷新页面后给“全部”筛选按钮添加样式
			$('.underwriting li').eq(0).find('a').addClass('under_curent').attr('data_sign', '1').parent().siblings().find('a').removeClass().removeAttr('data_sign');
			//刷新页面后给sub_item下面的a标签修改链接，用于保存之前的操作，在点击a标签后之前选择的条件不会丢失
			$('.filter_item').each(function() {
				var old_url = $(this).attr('href');
				var new_a_url = old_url + '?agent=no';
				$(this).attr('href', new_a_url)
			});
			$('.pagination').each(function() {
				var old_url = $(this).attr('href');
				var new_a_url = old_url + '&agent=no';
				$(this).attr('href', new_a_url);
			})
		};
		if(http_url.indexOf('agent=yes') != -1) {
			//刷新页面后给“独家”筛选按钮添加样式
			$('.underwriting li').eq(1).find('a').addClass('under_curent').attr('data_sign', '1').parent().siblings().find('a').removeClass().removeAttr('data_sign');
			//刷新页面后给sub_item下面的a标签修改链接，用于保存之前的操作，在点击a标签后之前选择的条件不会丢失
			$('.filter_item').each(function() {
				var old_url = $(this).attr('href');
				var new_a_url = old_url + '?agent=yes';
				$(this).attr('href', new_a_url)
			});
			$('.pagination').each(function() {
				var old_url = $(this).attr('href');
				var new_a_url = old_url + '&agent=yes';
				$(this).attr('href', new_a_url)
			})
		};
		if(getQueryString('price') == 'desc') {
			$('.arrow_down').attr('data-select', '1').show();
			$('.arrow_gray').attr('data-select', '0').hide();
			$('.arrow_up').attr('data-select', '0').hide();
		}  
		if(getQueryString('price') == 'asc'){
			$('.arrow_up').attr('data-select', '1').show();
			$('.arrow_down').attr('data-select', '0').hide();
			$('.arrow_gray').attr('data-select', '0').hide();
		}
		
		if(http_url.indexOf('mix') != -1) {
			$('.option li').eq(0).addClass('option_first').siblings().removeClass();
			if(http_url.indexOf('agent') != -1) {
				//刷新页面后给sub_item下面的a标签修改链接
				$('.filter_item').each(function() {
					var old_url = $(this).attr('href');
					var new_a_url = old_url + '&mix=asc';
					$(this).attr('href', new_a_url)
				});
				$('.pagination').each(function() {
					var old_url = $(this).attr('href');
					var new_a_url = old_url + '&mix=asc';
					$(this).attr('href', new_a_url)
				})
			} else {
				//刷新页面后给sub_item下面的a标签修改链接
				$('.filter_item').each(function() {
					var old_url = $(this).attr('href');
					var new_a_url = old_url + '?mix=asc';
					$(this).attr('href', new_a_url)
				});
				$('.pagination').each(function() {
					var old_url = $(this).attr('href');
					var new_a_url = old_url + '&mix=asc';
					$(this).attr('href', new_a_url)
				})
			}
		};
		if(http_url.indexOf('new') != -1) {
			$('.option li').eq(1).addClass('option_seconte').siblings().removeClass();
			if(http_url.indexOf('agent') != -1) {
				//刷新页面后给sub_item下面的a标签修改链接
				$('.filter_item').each(function() {
					var old_url = $(this).attr('href');
					var new_a_url = old_url + '&new=asc';
					$(this).attr('href', new_a_url)
				});
				$('.pagination').each(function() {
					var old_url = $(this).attr('href');
					var new_a_url = old_url + '&new=asc';
					$(this).attr('href', new_a_url)
				})
			} else {
				//刷新页面后给sub_item下面的a标签修改链接
				$('.filter_item').each(function() {
					var old_url = $(this).attr('href');
					var new_a_url = old_url + '?new=asc';
					$(this).attr('href', new_a_url)
				});
				$('.pagination').each(function() {
					var old_url = $(this).attr('href');
					var new_a_url = old_url + '&new=asc';
					$(this).attr('href', new_a_url)
				})
			}
		};
		if(http_url.indexOf('price') != -1) {
			$('.option li').eq(2).addClass('option_thirde').siblings().removeClass();
			
			if(http_url.indexOf('agent') != -1) {
				//刷新页面后给sub_item下面的a标签修改链接
				$('.filter_item').each(function() {
					var old_url = $(this).attr('href');
					var new_a_url = old_url + '&price=' + getQueryString('price');
					$(this).attr('href', new_a_url)
				});
				$('.pagination').each(function() {
					var old_url = $(this).attr('href');
					var new_a_url = old_url + '&price=' + getQueryString('price');
					$(this).attr('href', new_a_url)
				})
			} else {
				//刷新页面后给sub_item下面的a标签修改链接
				$('.filter_item').each(function() {
					var old_url = $(this).attr('href');
					var new_a_url = old_url + '?price=' + getQueryString('price');
					$(this).attr('href', new_a_url)
				});
				$('.pagination').each(function() {
					var old_url = $(this).attr('href');
					var new_a_url = old_url + '&price=' + getQueryString('price');
					$(this).attr('href', new_a_url)
				})
			}
		};
		$('.arrow').each(function(index, el) {
			if ($(this).attr('data-select')=='1') {
				$(this).show();
			}else{
				$(this).hide();
			}
		});
		//当选择了“筛选、产地、现货、独家”后，保存用户选择的条件，避免重新刷新的时候丢失
		var data_url = $('.select_sub>li');
		var radio_btn = $('.radio_btn')
		var jump_arr = [];
		var sort_arr = [];
		data_url.each(function() {
			var data_name = $(this).attr('data-jump');
			var data_val = $(this).attr('data-sort');
			jump_arr.push(data_name);
			sort_arr.push(data_val)
		});
		radio_btn.each(function() {
			btn_name = $(this).attr('data-jump');
			btn_val = $(this).attr('data-sort');
			jump_arr.push(btn_name);
			sort_arr.push(btn_val)
		});

		var data_key = jump_arr.join('|');
		var data_val = sort_arr.join('|');
		//用于匹配data_key字符串中用|隔开的字符其中一个；
		var res = new RegExp("(.*)(\\?|&)(" + data_key + ")=[a-z0-9A-Z-_]+(&|$)(.*)");
		//检测地址栏里有没有data_key中用|隔开的字符
		var chk_url = res.test(http_url);
		if(chk_url) {
			var key_arr = data_key.split('|');
			for(var i = 0; i < key_arr.length; i++) {
				var select_val = $(data_url[i]).attr('data-sort');
				var radio_val = $(radio_btn[i]).attr('data-sort');
				if(getQueryString(key_arr[i]) == select_val) {
					var select_name = $(data_url[i]).text();
					var sign = $(data_url[i]).attr('data-sign');
					$('[data-sign=' + sign + ']').val(select_name);
				};
				if(getQueryString(key_arr[data_url.length + i]) == radio_val) {
					$(radio_btn[i]).hide().siblings('.radio_btn').show();
				}

			};

		};

		//点击切换“全部或独家代理页面”
		$('.underwriting li').click(function() {
			$(this).find('a').attr('data_sign', '1').parent().siblings().find('a').removeAttr('data_sign').removeClass('under_curent');
			var http_url = window.location.href;
			var data_url = $(this).find('a').attr('data-jump');
			var data_sort = $(this).find('a').attr('data-sort');
			var num_url = http_url.indexOf('?');
			var static_url = http_url.substring(0, num_url); //截取？以前的字符串
			var new_url = http_url.replace(http_url, static_url + '?' + data_url + '=' + data_sort);
			window.location.href = new_url;
		});
		//排除价格筛选
		$('.option li').not('[name=price_li]').click(function() {
			//价格筛选的图标显示灰色
			//点击跳转
			var http_url = window.location.href;
			var data_http = $(this).find('a').attr('data-jump');
			var data_sort = $(this).find('a').attr('data-sort');
			var data_url = $('.option>li').find('a');
			var data_arr = [];
			data_url.each(function() {
				var data_name = $(this).attr('data-jump');
				data_arr.push(data_name);
			});
			var data_key = data_arr.join('|');
//			 if(getQueryString('agent')) {
//			 	var constant_url = http_url.split('&');
//			 	constant_url.splice(1, 1);
//			 	var jamp_url = constant_url.join('&');
//			 	var new_jamp = jamp_url + '&' + data_http + '=' + data_sort;
//			 	window.location.href = new_jamp;
//			 } else {
				if(getQueryString('wine_type') || getQueryString('country_name') || getQueryString('spot')||getQueryString('agent')) {
					var res = new RegExp("(.*)(\\?|&)(" + data_key + ")=[a-z0-9A-Z-_]+(&|$)(.*)");
					var ckh_name = res.test(http_url);
					if(ckh_name) {
						var new_http_url = http_url.replace(res, '$1$2' + data_http + '=' + data_sort + '$4$5'); // 匹配并替换
					} else {
						var new_http_url = http_url + '&' + data_http + '=' + data_sort
					}
					window.location.href = new_http_url;
				} else {
					var num_url = http_url.indexOf('?');
					var static_url = http_url.substring(0, num_url);
					var new_url = http_url.replace(http_url, static_url + '?' + data_http + '=' + data_sort);
					window.location.href = new_url;
				}
//			 }
		});
		//价格筛选

		$('[name=price_li]').click(function() {
			$(this).addClass('option_thirde').siblings().removeClass();
			$(this).find('[data-select="1"]').show().attr('data-select', '0').siblings('.arrow').attr('data-select', '1').hide();
			var http_url = window.location.href;
			var data_http = $(this).find('a').attr('data-jump');
			var data_sort = $(this).find('a').attr('data-sort');
			var arrow_down = $('.arrow_down').attr('data-select');
			var arrow_up = $('.arrow_up').attr('data-select');
			var sort_seat = data_sort.split('&');
			var up_sort = sort_seat[0].toString();
			var down_sort = sort_seat[1].toString();
			var data_url = $('.option>li').find('a');
			var data_arr = [];
			data_url.each(function() {
				var data_name = $(this).attr('data-jump');
				data_arr.push(data_name)
			});
			var data_key = data_arr.join('|');
//			 if(getQueryString('agent')) {
//			 	var constant_url = http_url.split('&');
//			 	constant_url.splice(1, 1);
//			 	var jamp_url = constant_url.join('&');
//			 	if(arrow_down == '1') {
//			 		var new_jamp = jamp_url + '&' + data_http + '=' + down_sort
//			 	} else {
//			 		var new_jamp = jamp_url + '&' + data_http + '=' + up_sort
//			 	}
//			 	console.log(new_jamp)
////			 	 window.location.href = new_jamp;
//			 } else {
				if(getQueryString('wine_type') || getQueryString('country_name') || getQueryString('spot')||getQueryString('agent')) {
					var res = new RegExp("(.*)(\\?|&)(" + data_key + ")=[a-z0-9A-Z-_]+(&|$)(.*)");
					var ckh_name = res.test(http_url);
					if(ckh_name) {
						if(arrow_up == '1') {
							var http_url = http_url.replace(res, '$1$2' + data_http + '=' + up_sort + '$4$5'); // 匹配并替换
						}else{
							var http_url = http_url.replace(res, '$1$2' + data_http + '=' + down_sort + '$4$5'); // 匹配并替换
						}
					} else {
						if(arrow_up == '1') {
							var http_url = http_url + '&' + data_http + '=' + up_sort
						}else{
							var http_url = http_url + '&' + data_http + '=' + down_sort
						}
					}

					window.location.href = http_url;
				} else {
					var num_url = http_url.indexOf('?');
					var static_url = http_url.substring(0, num_url);
					if(arrow_up == '1') {
						var new_url = http_url.replace(http_url, static_url + '?' + data_http + '=' + up_sort);
					}else{
						var new_url = http_url.replace(http_url, static_url + '?' + data_http + '=' + down_sort);
					}
					window.location.href = new_url;

				}

//			 }
		});
		$('.suer_btn').click(function() {
			var page_num = $('#page_num').val();
			lookup('page', page_num)
		});
		$('.radio_btn').click(function() {
			var data_jump = $(this).attr('data-jump');
			var data_sort = $(this).attr('data-sort');
			var brother_jump=$(this).parent('p').parent('div').siblings('div').find('.chk').attr('data-jump');
			if ($('.underwriting').length!==0) {
				lookupsingle(data_jump, data_sort,brother_jump)
			}else{
				lookup(data_jump, data_sort)
			}
		})
		//单选
		function lookupsingle(name, value,brother) {
			var http_url = window.location.href;
			var reg = new RegExp("(.*)(\\?|&)" + name + "=[a-z0-9A-Z-_]+(&|$)(.*)"); // 是否存在name，
			http_url = http_url.replace(reg, '$1$2' + name + '=' + value + '$3$4'); // 匹配并替换
			if(http_url.indexOf(name) === -1) {
				http_url += (http_url.indexOf('?') === -1 ? '?' : '&') + name + '=' + value;
			}

			var hta = http_url.split('?');

			var reg1 = new RegExp("(^|&)" + brother + "=([^&]*)(&|$)");
			hta[1] = hta[1].replace(reg1,'&');
			window.location.href = hta.join('?');
	
		}
		//可以多选
		function lookup(name, value) {
			var http_url = window.location.href;
			if(value) {
				var reg = new RegExp("(.*)(\\?|&)" + name + "=[a-z0-9A-Z-_]+(&|$)(.*)"); // 是否存在name，
				http_url = http_url.replace(reg, '$1$2' + name + '=' + value + '$3$4'); // 匹配并替换
				if(http_url.indexOf(name) === -1) {
					http_url += (http_url.indexOf('?') === -1 ? '?' : '&') + name + '=' + value;
				}
				window.location.href = http_url;
			}
		}

		//产地和筛选
		$('.select_sub>li').click(function() {
			var data_jump = $(this).attr('data-jump');
			var data_sort = $(this).attr('data-sort');
			lookup(data_jump, data_sort);
		})
		$('#page_num').bind('input propertychange', function() {
			var num_test = /\d/;
			var max_num = window.global.totalPage;
			var page_num = $('#page_num').val();
			var chkeck = num_test.test(page_num);
			if(!chkeck) {
				var marked = $('.marked');
				if(marked.length == 0) {
					$('.suer_btn').after($('<span class="marked">请输入正确的数字！</span>').css({
						color: '#ea0000',
						display: 'block',
						position: 'absolute',
						top: '38px',
						left: '384px'
					}));
					$('.suer_btn').attr('disabled', 'disabled');
				};
			} else {
				if(page_num > max_num) {
					$('#page_num').val(max_num);
				}
				$('.marked').remove();
				$('.suer_btn').attr('disabled', false);
			}
		});

	}();

	//点击左侧显示或隐藏
	// slide_box(origin, asd, qwe, country);
	function slide_box(id_click, id_up, id_add, id_det) {
		$(id_click).click(function() {
			var data_state = $(this).attr('data_state');
			// console.log(id_click,id_up);
			if(data_state == 1) {
				$(id_add).show().parent().find(id_det).hide();
				$(id_up).stop(true, true).slideUp();
				$(this).attr('data_state', '0');
			} else {
				$(id_det).show().parent().find(id_add).hide();
				$(id_up).stop(true, true).slideDown();
				$(this).attr('data_state', '1');
			}
		});
	};
	//选择产地或筛选子选项效果
	function choice_item(item_wap, data_wap) {
		$(item_wap).find('li').hover(function() {
			$(this).css({
				backgroundColor: '#661b18',
				color: '#ffffff'
			});
		}, function() {
			$(this).css({
				backgroundColor: '#ffffff',
				color: '#333'
			});
		});
		$(item_wap).find('li').click(function() {
			var text = $(this).text();
			$(this).parent().stop(true, true).slideUp();
			$(data_wap).val(text).attr('data_state', '0');
		});
	};

	//商品缩放效果
	(function product_zoom() {
		$('#list_details .product_show>li').hover(function() {
			if(isFirefox = navigator.userAgent.indexOf("Firefox") > 0) {
				$(this).find('.single_first .sole_last').stop(true, true).animate({
					width: '160px',
					height: '232px'
				}, 200);
			} else {
				$(this).find('.product_pic').stop(true, true).animate({
					paddingTop: '16px',
					zoom: 1.05
				}, 200);
			};

		}, function() {
			if(isFirefox = navigator.userAgent.indexOf("Firefox") > 0) {
				$(this).find('.single_first .sole_last').stop(true, true).animate({
					width: '152px',
					height: '220px'
				}, 200);
			} else {
				$(this).find('.product_pic').stop(true, true).animate({
					paddingTop: '20px',
					zoom: 1
				}, 200);
			};

		});
	})();

	//切换效果函数
	// function switch_Hook(id_pre, id_aft) {
	// 	$(id_pre).click(function() {
	// 		$(id_aft).show().attr('data-success', 1).parent().find(id_pre).hide().attr('data-success', 0);
	// 	});
	// 	$(id_aft).click(function() {
	// 		$(id_pre).show().attr('data-success', 1).parent().parent().find(id_aft).hide().attr('data-success', 0);
	// 	});
	// };
	$('.describe_first').hover(function(){
			$(this).find('a').addClass('third_line_add').removeClass('three');
		},function(){
			$(this).find('a').removeClass('third_line_add').addClass('three');
		});
	//    兼容
	function isBrowser() {
		var Sys = {};
		var ua = navigator.userAgent.toLowerCase();
		var s;
		//	(s=ua.match(/msie ([\d.]+)/))?Sys.ie=s[1]:
		(s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1]: 0;
		//	(s=ua.match(/chrome\/([\d.]+)/))?Sys.chrome=s[1]:
		//	(s=ua.match(/opera.([\d.]+)/))?Sys.opera=s[1]:
		(s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1]: 0;
		//判断是否为ie
		if(!!window.ActiveXObject || "ActiveXObject" in window) {
			$('#wine_type').css('left', '381px');
			$('#country').css('left', '559px');
		}

		if(Sys.firefox) { //Js判断为火狐(firefox)浏览器
			$('#wine_type').css('left', '381px');
			$('#country').css('left', '558px');
		};
		if(navigator.userAgent.toLowerCase().indexOf('opr') >= 0) {
			$('#wine_type').css('left', '381px');
			$('#country').css('left', '558px');
		};
		if(Sys.safari) { //Js判断为苹果safari浏览器
			$('#wine_type').css('left', '381px');
			$('#country').css('left', '558px');
		};
	};
	isBrowser();
	if ($('.chk_content').length!==0) {
		
		$('.empty').show();
	}else{
		$('.empty').hide();
	}

});