$(function(){

	var addNumber;
	var minusNumber;
	var del_all_ul=$('[data_invalid=yes]');
	del_all_ul.find('.chk_2').hide();
	del_all_ul.find('.selected_2').hide();
	function and (arr) {
        if (typeof arr === 'object') {
            var tmp = arr.length?1:0;
            arr.map(function(value, key) {
                if (typeof value === 'object') {
                    tmp &= and(value);
                } else {
                    tmp &= value;
                }
            });
            return tmp;
        }else{
	        return arr;
        }
    }

    function or (arr) {
        if (typeof arr === 'object') {
            var tmp = arr.length?0:1;
            arr.map(function(value, key) {
                if (typeof value === 'object') {
                    tmp |= or(value);
                } else {
                    tmp |= value;
                }
            });
            return tmp;
        }else{
	        return arr;
        }
    }

    var arr=[];

    // 数据初始化
    function init() {

    	arr=[];
    	$('.shopping_tbody').find('.logistics').each(function(i,j){
	    	var tmp1 = [];
	    	$(this).find('.logistics_wap').each(function(p,q){
	    		var tmp2 = [];
	    		$(this).find('.details_list').each(function(){
	    			tmp2.push(parseInt($(this).find('.first_details').find('.selected_2').attr('data-success')));
	    		})
	    		tmp1.push(tmp2);
	    	})
	    	arr.push(tmp1);
	    });
    	
	
    }
   
    // 页面重绘
    function render() {
    	// 全选
    	if (and(arr)) {
	    	$('.select_all2').attr('data-success','1').show();	
	    	$('.select_all1').attr('data-success','0').hide();	
    	} else {
    		$('.select_all1').attr('data-success','1').show();	
	    	$('.select_all2').attr('data-success','0').hide();
    	}
    	//　境内、境外发货
    	$('.wuliu').find('.selected_1').each(function(i,j){
    		if (and(arr[i])) {
		    	$(this).siblings('.chk_1').attr('data-success','0').hide();	
		    	$(this).attr('data-success','1').show();		
	    	} else {
	    		$(this).siblings('.chk_1').attr('data-success','1').show();	
		    	$(this).attr('data-success','0').hide();
	    	}
    	})
    	//仓库
    	$('.shopping_tbody').find('.logistics').each(function(i,j){
	    	$(this).find('.logistics_wap').find('.logistics_title').find('.selected_1').each(function(p,q){
	    		if (and(arr[i][p])) {
			    	$(this).siblings('.chk_1').attr('data-success','0').hide();	
			    	$(this).attr('data-success','1').show();		
		    	} else {
		    		$(this).siblings('.chk_1').attr('data-success','1').show();	
			    	$(this).attr('data-success','0').hide();		
		    	}
	    		
	    	})
	    });
	    //单个商品
	    $('.shopping_tbody').find('.logistics').each(function(i,j){
	    	$(this).find('.logistics_wap').each(function(p,q){
	    		$(this).find('.details_list').find('.first_details').find('.selected_2').each(function(m,n){
	    			if (and(arr[i][p][m])) {
				    	$(this).siblings('.chk_2').attr('data-success','0').hide();	
				    	$(this).attr('data-success','1').show();		
			    	} else {
			    		$(this).siblings('.chk_2').attr('data-success','1').show();	
				    	$(this).attr('data-success','0').hide();		
			    	}
	    		})
	    	})
    	});
    }

    init();
    render();
	//仓库最后一行删除底边
	$('.shopping_details').children('ul:last-child').css('border-bottom','0');
	(function switch_Hook() {
		//全选
		$('.select_all1').click(function(){
			arr.map(function(i,j){
				i.map(function(m,n){
					m.map(function(x,y){
						arr[j][n][y]=1;
					})
				})
			})
			post_data();
		})
		$('.select_all2').click(function(){
			arr.map(function(i,j){
				i.map(function(m,n){
					m.map(function(x,y){
						arr[j][n][y]=0;
					})
				})
			});
			post_data();
		})
		//境内外物流
		var $wuliu=$('.logistics .wuliu');
		$.each($wuliu, function(index,item) {
			$(item).find('.chk_1, .selected_1').click(function(){
				var tmp = $(this).hasClass('chk_1');
				arr[index].map(function(i,j){
					i.map(function(m,n){
						arr[index][j][n]= tmp ? 1 : 0;
					})
				});
				post_data();
			});
		});

		//境内仓库
		$('.logistics').each(function(i,j){
			$(this).find('.logistics_wap').each(function(m,n){
				$(this).find('.chk_1, .selected_1').click(function(){
					var tmp = $(this).hasClass('chk_1');
					arr[i].map(function(x,y){
						if (y===m) {
							x.map(function(a,b){
								arr[i][y][b]= tmp ? 1 : 0;
							})
						}
						
					});
					post_data();
				})
			})
		});

		//每个商品
		$('.logistics').each(function(i,j){
			$(this).find('.logistics_wap').each(function(p,q){
				$(this).find('.details_list').each(function(m,n){
					$(this).find('.first_details').find('.chk_2, .selected_2').click(function(){
						var tmp = $(this).hasClass('chk_2');
						arr[i].map(function(x,y){
							if (y==p) {
								x.map(function(a,b){
									if (b==m) {
										arr[i][y][b]= tmp ? 1 : 0;
									}
								});
							}
						});
						post_data();
					});
				})
			});
		});		
	})();
	//商品数量加减功能
		$('.minus').click(function(){
			minusNumber = $(this).parents('.details_list').attr('data_id');
			var data_moq=parseInt($(this).siblings('.shopping_number').attr('data_moq'));
			var data_stock=parseInt($(this).siblings('.shopping_number').attr('data_stock'));
			var goods_num=parseInt($(this).siblings('.shopping_number').val());
			if(goods_num<=data_moq){
				$(this).css({
					color:'#999999',
					border:'1px solid #999999'
				})
				if(goods_num>1){
					post_data();
				}else{
					$(this).siblings('.shopping_number').val(1);
					$(this).parents('.details_list').find('.error_prompt').text('商品的购买数量不能为0')
				}
				
			}else{
				post_data();
			}
			if(goods_num<=data_stock){
				$(this).siblings('.add').css({
					color:'#f3554a',
					border:'1px solid #f3554a'
				})
			}
		});
	
		$('.add').click(function(){
			addNumber = $(this).parents('.details_list').attr('data_id');
			var data_moq=parseInt($(this).siblings('.shopping_number').attr('data_moq'));
			var data_stock=parseInt($(this).siblings('.shopping_number').attr('data_stock'));
			var goods_num=parseInt($(this).siblings('.shopping_number').val());
			if(goods_num>=data_stock){
				$(this).css({
					color:'#999999',
					border:'1px solid #999999'
				})
			}
			if(goods_num>=data_moq){
				$(this).siblings('.minus').css({
					color:'#f3554a',
					border:'1px solid #f3554a'
				})
			}
		    post_data();
			
	});

	$('.coin_num').parents('.gold_coin').find('.selected_3').click(function(){
		$(this).hide();
		$(this).siblings('.chk_3').show();
		post_data();
	});

	$('.coin_num').parents('.gold_coin').find('.chk_3').click(function(){
		$(this).hide();
		$(this).siblings('.selected_3').show();
		post_data();
	});

	//单项删除功能
	$('.del').hover(function(){
		$(this).css('color','#f3554a')
	},function(){
		$(this).css('color','#333333')
	});
	$('.del').click(function(){
		if(confirm('您是否要将此商品删除？')){
			var del_ul=$(this).parents('.details_list');
			var data_id=del_ul.attr('data_id');
			var data_arr={}
			data_arr[data_id] = false;
			post_data(data_arr);
		}
		
	});
	
	//多项删除
	$('.del_all').click(function(){
		if(confirm('您是否要将所选商品删除？')){
			var del_data=$('.shopping_details .selected');
			var data_arr={};
			var id_container=[];
			$.each(del_data, function(index,item) {
				var del_selected=$(item).attr('data-success');
				if(del_selected=='1'){
					var del_all_ul=$(this).parents('.details_list');
					var delete_data=del_all_ul.attr('data_id');
					id_container.push(delete_data);
					data_arr[delete_data] = false;
				};
			});
			if(id_container.length){
				post_data(data_arr);
			}else{
				alert('您没选择任何商品')
			}
		}
	});
	//移除失效商品
	$('.invalid').click(function(){
		if(confirm('您是否要将失效商品移除？')){
			var data_arr={};
			var id_container=[];
			var del_all_ul=$('[data_invalid="yes"]');
			del_all_ul.each(function(){
				var data_id=$(this).attr('data_id');
				id_container.push(data_id);
				data_arr[data_id]= false;
			})
			if(id_container.length){
				post_data(data_arr);
			}else{
				alert('您还没有任何失效商品')
			}
		}
	})
	//多项移入收藏夹
	$('.favorites_all').click(function(){
		if(confirm('您是否要将所选商品移入收藏夹内？')){
			var del_data=$('.shopping_details .selected');
			var data_arr={};
			var id_container=[];
		$.each(del_data, function(index,item) {
			var del_selected=$(item).attr('data-success');
				if(del_selected=='1'){
					var del_all_ul=$(this).parents('.details_list');
					var data_id=del_all_ul.attr('data_id');
					id_container.push(data_id);
					data_arr[data_id] = true;
				};
		});
			if(id_container.length){
				post_data(data_arr);
			}else{
				alert('您没选择任何商品')
			}
		}
	});
	//收藏夹
	$('.favorites').hover(function(){
		$(this).css('color','#f3554a')
	},function(){
		$(this).css('color','#999999')
	})
	$('.favorites').click(function(){
		if(confirm('您是否要将此商品移入收藏夹内？')){
			var favorites_ul=$(this).parents('.details_list');
			var data_id=favorites_ul.attr('data_id');
			var data_arr={};
			data_arr[data_id] = true;
			post_data(data_arr);
		}
	});

	$('.shopping_number').blur(function(){
		var goods_num=$(this).val();
		var data_moq=parseInt($(this).attr('data_moq'));
		if(goods_num===''){
			$(this).val(data_moq);
			$(this).parents('.details_list').find('.error_prompt').text('商品购买量必须大于起订量（起订量：'+data_moq+'）')
		}else{
			$(this).parents('.details_list').find('.error_prompt').text('')
			post_data();
		}
	})
	//点击结算
	$('.btn_payment').click(function(){
		if (or(arr)) {
			window.location.href=window.global.ordercheck
		} else {
			alert('您没选择任何商品');
		}
	});
	//使用金币
	$('.coin_num').blur(function(){
		post_data();
	});
	$('.coin_num').keyup(function(){
		coin_cheack();
	});
	function coin_cheack(){
		var shopping_price=parseInt($('.allow_use').text()); 
		var coin_num=parseInt($('.coin_num').val());
		if(coin_num>shopping_price){
			$('.coin_num').val(shopping_price);
		}
		if(coin_num<=0){
			$('.coin_num').val(0);
		}
	}
	//猜你喜欢轮播功能
	(function() {
		var guess = $('.product_show>li').length;
		var count = 0;
		var flag = true;
		if(guess > 4) {
			timer = setInterval(function() {
				if(flag) {
					count++;
					if(count == guess - 4) {
						flag = false;
					}
				} else {
					count--;
					if(count == 0) {
						flag = true;
					}
				}
				ppt();
			}, 3000);

			$('#sort>li').hover(function() {
				clearInterval(timer);
			}, function() {
				timer = setInterval(function() {
					if(flag) {
						count++;
						if(count == guess - 4) {
							flag = false;
						}
					} else {
						count--;
						if(count == 0) {
							flag = true;
						}
					}
					ppt();
				}, 3000);
			});
		}

		function ppt() {
			$('.product_show').animate({
				left: -310 * count
			});
		}

	})();
	
	function in_array(key, arr) {
		for (var i = 0; arr[i]; i++) {
			if (key === arr[i]) {
				return true;
			}
		}
		return false;
	}
	//取对象的键名
	function array_keys(obj){
		var data = [];
		for (var i in obj) {
			if (obj.hasOwnProperty(i)) {
				data.push(i);
			}
		}
		return data;
	}
	//取对象的键值
	function array_values(obj){
		var data = [];
		for (var i in obj) {
			if (obj.hasOwnProperty(i)) {
				data.push(obj[i]);
			}
		}
		return data;
	}

	//post_data的回调函数
	function slid_up(del_ul){
		var slide_ul=del_ul.siblings('.details_list').length;
		del_ul.slideUp();
		setTimeout(function(){
			if(slide_ul===0){
				del_ul.parents('.logistics_wap').remove();
			}else{
				del_ul.remove();
			}
			var logistics=$('.logistics').find('.logistics_wap').length;
			if(logistics===0){
				$('.carts_empty').show();
				$('.shopping_main').hide();
			}
			//仓库最后一行删除底边
			$('.shopping_details').children('ul:last-child').css('border-bottom','0');
		},500);
	}
		$('.gold_coin').find('.chk_3').show().siblings('.selected_3').hide();
	//向服务端发起请求获取数据并显示在页面
	function post_data(obj){
		var data_success=$('.coin_num').parents('.gold_coin').find('.selected_3').css('display');
		var coin_num= data_success === 'none' ? 0 : $('.coin_num').val();
		var data_arry=[];
		arr.map(function (i, j) {
			i.map(function (m, n) {
				m.map(function (p, q) {
					if (p || obj !== undefined) {
						var item = $('.logistics').eq(j).find('.logistics_wap').eq(n).find('.details_list').eq(q);
						var data_json={};
						var data_uuid=$(item).attr('data_id');
						var shopping_number=$(item).find('.shopping_number').val();
						if (obj !== undefined && obj[data_uuid] !== undefined && !obj[data_uuid]) {
							shopping_number = 0;
						} else if (obj !== undefined && obj[data_uuid] !== undefined && obj[data_uuid]) {
							data_json.favorite = true;
						}
						
						if (addNumber !== undefined && data_uuid === addNumber) {
							shopping_number++;
							addNumber = undefined;
						}
						
						if (minusNumber !== undefined && data_uuid === minusNumber) {
							shopping_number--;
							minusNumber = undefined;
						}
						
						data_json.uuid = data_uuid;
						data_json.goods_num = shopping_number;
						data_arry.push(data_json);
					}
				})
			})
		})
		
		$('.layer_wapper').show();
		$.post(window.global.update_carts,{
			corns:coin_num,
			carts:data_arry
		},function(data){
			//循环carts获得操作结果
			var carts=data.data.carts;
			for(i in carts){
				if(carts[i].status === 'delete_success' || carts[i].status === 'favorite_success'){
					slid_up($('[data_id='+i+']'));
				} else if (carts[i].status === 'save_success'){
					$('[data_id='+i+']').find('.error_prompt').text('');
				} else if (in_array(carts[i].status, [ 'not_exist', 'goods_invalid', 'delete_error', 'favorite_error', 'stock_error', 'moq_error', 'save_error' ])) {
					$('[data_id='+i+']').find('.error_prompt').text(carts[i].msg);
				}
			}

			//填充数据
			var statistics=data.data.statistics;
			if (!statistics.carts.length) {
				window.location.reload();
			}
			for(var i=0; statistics.carts[i];i++){
				var goods_num=statistics.carts[i].goods_num;   //购买数量
				var goods_total=statistics.carts[i].goods_total/100; //单项商品总金额
				var selected=statistics.carts[i].selected; //是否选中
				var uuid=statistics.carts[i].uuid;//商品uuid
				$('[data_id='+uuid+']').find('.shopping_number').val(goods_num);
				$('[data_id='+uuid+']').find('.sign_price').text('¥ '+goods_total);
				$('[data_id='+uuid+']').find('.selected_2').attr('data-success', selected === 'true' ? 1 : 0);
			}
			var selected_goods_category=statistics.selected_goods_category;   //购买商品种类
			var selected_pricing=statistics.selected_pricing;   //购买瓶数
			var selected_stocking=statistics.selected_stocking;   //购买箱数
			var selected_goods_amount=statistics.selected_goods_amount/100;   //合计不含运费价格
			var fact_amount=statistics.fact_amount/100;   //实际支付价格
			var exchange_money=statistics.exchange_money/100;   //抵扣金额
			var rest_corns=statistics.rest_corns;   //剩余金币
			var available_corns=statistics.available_corns //可用金币数量
			$('.selected_goods_category').text(selected_goods_category+'件');
			$('.selected_number').text(selected_stocking+'箱，'+selected_pricing+'瓶');
			$('.price_amount').text('¥ '+selected_goods_amount.toFixed(2));
			$('.fact_pay').text('¥ '+fact_amount.toFixed(2));
			$('.deductible').text('¥ '+exchange_money.toFixed(2));
			$('.selectProduct').text(selected_goods_category);
			$('.rest_corns').text(rest_corns);
			$('.allow_use').text(available_corns);
			coin_cheack();//判断金币是否符合要求
			setTimeout(function(){
				init(); // 数据重置
			    render();　// 页面重绘
			}, 600);
		})
	}
});
