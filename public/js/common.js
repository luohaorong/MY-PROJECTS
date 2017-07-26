
$(function(){
	search();
navigation();
aside();
//点击浏览器后退键自动刷新页面
        if($("#refreshed").val()=="no"){
        	$("#refreshed").val("yes");
        }else{
        	$("#refreshed").val("no");
        	location.reload();
        };
			$('.unload').each(function(){
				$(this).addClass('addbackground');
				Imagess($(this).attr('data-src'), $(this), checkimg)
			})
        //判断图片是否加载完成
        function Imagess(url, imgid, callback) {
				var timer = setInterval(function() {
					if(imgid.complete) {
						callback(imgid)
						clearInterval(timer)
					}
				}, 50);
				//如果因为网络或图片的原因发生异常，则显示该图片
				imgid.error(function(){
					imgid.attr('src','/images/unload.png');
					imgid.removeClass('addbackground');
				})
				
				imgid.load(function(){
					imgid.removeClass('addbackground');
					
				})
				imgid.attr('src',url);

			}
			//显示图片
			function checkimg(url,imgid) {
				imgid.attr('src',url);
			}
//搜索框函数
	function search() {
		var data_content = $('#search_input').attr('data_content');
		var data_keywords=$('#search_input').attr('data_keywords');
		if(data_content!=data_keywords&&data_keywords!=''){
			$('#search_input').val(data_keywords).css('color', '#000');
		}else{
			$('#search_input').val(data_content).css('color', '#999');
		}
		$('#search_input').focus(function() {
			var search_val = $('#search_input').val();
			if(search_val == data_content) {
				$('#search_input').val('').css('color', '#000');
			};
		});
		$('#search_input').blur(function() {
			var search_val = $('#search_input').val();
			if(!search_val) {
				$('#search_input').val(data_content).css('color', '#999');
			};
		});
	};
	$('#seach_inco').click(function(){
		var search_input=$('#search_input').val();
		if (search_input.trim() !== '') {
			search_input=search_input.replace(/\+/g,'');
			if (search_input.indexOf(' ')!==-1) {
				search_input=search_input.replace(/(^\s*)|(\s*$)/g, ""); 
				search_input=search_input.replace(/\s+/g, "+");
		    }
		    window.location.href = '/search/'+search_input;
		}
	});
	$('#search_input').keydown(function(event){
		var key_num=event.which;
		if(key_num==13){
			$('#seach_inco').click()
		}
	})
	//logo鼠标移入效果
	$('.logo_img').hover(function(){
		$('.logo_light').show();
		$('.logo_dark').hide();
	},function(){
		$('.logo_light').hide();
		$('.logo_dark').show();
	})
	//鼠标移入购物车
	$('.shoping').hover(function(){
		$('.shoping_num').css('background','#fe5e37');
	},function(){
		$('.shoping_num').css('background','#f3554a')
	});
	//导航效果
	function navigation() {
		//搜索框下面导航效果	
		$('#login_logo .nav_top').find('a').hover(function() {
			$(this).addClass('first_list').parent().siblings().find('a').removeClass('first_list');
		},function(){
			$(this).removeClass('firs_list');
		});
		//采购导航效果
		$('#index_container').find('.nav_first').mouseenter(function() {
			$('#index_container').find('.nav_first').css('backgroundColor', '#ad0f08');
			$('#index_container').find('.sub_list').stop(true, true).slideDown('fast');
		});
		$('#index_container').find('.nav_first').mouseleave(function() {
			$('#index_container').find('.nav_first').css('backgroundColor', '#661b18');
			$('#index_container').find('.sub_list').stop(true, true).slideUp('fast');
		});
		$('#index_container .sub_list').find('li').mouseenter(function() {
			$(this).addClass('purchase_sub').siblings().removeClass('purchase_sub');
			$(this).find('a').css('color', '#ffffff');
		});
		$('#index_container .sub_list').find('li').mouseleave(function() {
//			$(this).find('a').css('color', '#ae221c');
			$(this).removeClass('purchase_sub');
		});
		//其他导航效果
		var nav_li=$('#index_container .nav_list>li').not('.nav_first');
		
		nav_li.hover(function() {
				$(this).addClass('nav_current').find('a').addClass('nav_current').parent().siblings().find('a').not('.active').removeClass('nav_current')
		},function(){
			$(this).not('.active').removeClass('nav_current').find('a').not('.active').removeClass('nav_current');
		});
	};
	var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;//兼容各种浏览器
	//回到顶部
		$('#gotop').click(function() {
			$('html,body').animate({
				scrollTop: 0
			}, 300);
		});
	//head头部字体高亮效果
	$('.head_list>li,.work-left,.work-right,#head-left>li').hover(function(){
		
		$(this).find('a').css('color','#661b18');
	},function(){
		$(this).find('a').css('color','#666666');
	});
	//商品排列的右边框问题
	$('#sort>li').each(function(index,item){
		var count=(index+1)%4;
		if (!count) {
			$(this).css({
				marginRight:0
			});
	}
	})
	
	var screen_width=parseInt($(window).width());
	
	if (screen_width<1500) {
		
		$('.toolbar_show_box_big').css({
			'left':'-206px',
			'paddingRight':'2px',
			'z-index': '5'
		});
		
	}else{
		
		
		$('.toolbar_show_box_big').css({
			'left':'60px',
			'paddingLeft':'8px',
			'z-index': '5'
		});
	}
	//营销、账户余额的显示
	$('.toolbar_saler').mouseover(function(){
		
		$(this).find('.toolbar_show_box_big').show();
		$(this).siblings('.toolbar_saler').find('.toolbar_show_box_big').hide();
	});
	$('.toolbar_saler').mouseleave(function(){
		$(this).find('.toolbar_show_box_big').hide();
	})
	$('#toolbar>li').not('.toolbar_saler').hover(function(){
		$('.toolbar_show_box_big').hide();
	});
	$('.toolbar_cancel').click(function(){

		
		$(this).parents('.toolbar_saler').children('.toolbar_show_box_big').hide();
		
	})
		function aside() {

	    // var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
	    // console.log(clientHeight);
	    // var toolbarHeight = $('#toolbar').height();
	    // console.log(toolbarHeight);
	    // var toolbarTop = clientHeight - toolbarHeight -290;
		// $('#toolbar').css('top', toolbarTop);
		$(window).scroll(function() {
			floor_left();
		});
		function floor_left(){
			//分别获取每个模块相对于body左上角的垂直高度
			
			var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop; //兼容各种浏览器
			var scrollHafter = scrollTop + 200; //滚动的高度

			//右边栏定位高度
			// console.log(scrollHafter,toolbarTop)
			if(scrollHafter < 500) {
				$('#toolbar').css('top', '500px')
			}
			if (scrollHafter>=530) {
				
				$('#toolbar').css('top', '150px')
			}

			if(scrollHafter >= 4400) {
				$('#toolbar').css('top', '200px');
			}
			
			//判断左边栏滚动的高度
			
			if(scrollHafter <= 500) {
				
				$('#floor').hide();
			} else {
				$('#floor').show();
			};
			if(scrollHafter <= 750) {
				$('#floor').css('top', '200px');
			}
			if(scrollHafter >= 4300) {
				$('#floor').css('top', '100px');
			}
		};
		floor_left();
		var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop; //兼容各种浏览器
		var scrollHafter = scrollTop + 200; //滚动的高度
		//判断滚动的高度
		if(scrollHafter <= 500) {
			$('#floor').hide();
		} else {
			$('#floor').show();
		};
		//回到顶部
		$('#gotop').click(function() {
			$('html,body').animate({
				scrollTop: 0
			}, 300);
		});
	};
});
