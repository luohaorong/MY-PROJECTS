@extends('layouts') @section('CSS')
<link rel="stylesheet" type="text/css" href="/css/commodity_list.css" />
<link rel="stylesheet" type="text/css" href="/css/commodity_list1.css" />
<link rel="stylesheet" type="text/css" href="/css/slide.css" /> @stop

@section('list')
<div id="list_details">
	<div class="list_details_left">
		<div id="heat" data_state='1' class="left_first">
			<img id="add" class="first_ico" src="/images/commodity_list/add.png" />
			<img id="detract" class="first_ico current" src="/images/commodity_list/detract.png" />
			<p>产品热度榜</p>
		</div>
		<ul id="left_list_top" class="left_list">
			@foreach ($favoriteGoods as $favorite)
			<li class="product_list">
				<a target="_blank" href="{{ action('GoodsController@show', [ 'uuid' => $favorite->uuid ]) }}">
					<img class="unload" data-src="@image([$favorite->thumb, 60, 86])" />
					<div class="r_content">
						<p class="product_name">{{ $favorite->chinese_name }}</p>
						<p class="product_price">@currency($favorite->lowest_price)</p>
					</div>
				</a>
			</li>
			@endforeach
		</ul>
		@if (!empty($recentScanGoods))
		<div id="browse" data_state='1' class="left_first">
			<img id="add_sub" class="first_ico" src="/images/commodity_list/add.png" />
			<img id="detract_sub" class="first_ico current" src="/images/commodity_list/detract.png" />
			<p>最近浏览</p>
		</div>
		<ul id="left_list_sub" class="left_list">
			@foreach ($recentScanGoods as $recentScan)
			<li class="product_list">
				<a target="_blank" href="{{ action('GoodsController@show', [ 'uuid' => $recentScan->uuid ]) }}">
					<img class="unload" data-src="@image([$recentScan->thumb, 60, 86])" />
					<div class="r_content">
						<p class="product_name">{{ $recentScan->chinese_name }}</p>
						<p class="product_price">@currency($recentScan->lowest_price)</p>
					</div>
				</a>
			</li>
			@endforeach
		</ul>
		@endif
	</div>
	<div class="list_details_right">
		<div class="list_right_top">
			<div class="pptbox" id="ppt">
				<ul class="innerwrapper">
					<li>
						<a href="/oems/brandCustomizition"><img src="/images/commodity_list/banner.png" /></a>
					</li>
					<li>
						<a href="/categories/0b7b8100-2958-11e7-9ab4-e337f0fad04a?agent=yes"><img src="/images/commodity_list/banner1.png" /></a>
					</li>
				</ul>
				<!-- <ul class="controls">
					<li class="current">1</li>
					<li>2</li>
				</ul> -->
				<span class="btnleft"></span>
				<span class="btnright"></span>
			</div>
		</div>
		<div class="list_right_sub">
			@if (isset($selected))
			<div class="filter_box">
				<div class="describe_wap">
					<div class="describe_tile">
						<span>
                                全部酒品：
                            </span>
					</div>
					<div class="show_describe">
						<ul class="describe_list">
							@foreach ($selected as $select) 
							<li>
								<div class="chk_content">
									<span>{{ $select['name'] }}</span>
									<a href="{{ action('CategoriesController@show', [ 'uuid' => $goodsCategory->uuid, 'filter' => remove($select['number'], $select['array']) ]) }}" class="filter_item"><img class="delete_img" src="/images/commodity_list/delete.png" /></a>
								</div>
								<img class="right_img" src="/images/commodity_list/rightarrow.png" />
							</li>
							@endforeach
							<li class="describe_list_active">
								<div class="nav_contetn">
									<p class="nav_name">{{ $goodsCategory->name }}</p>
								</div>
							</li>
							<li class="describe_list_active">
								<div class="nav_contetn">
									<p class="nav_name">
										<a class="empty" href="{{ action('CategoriesController@show', [ 'uuid' => $goodsCategory->uuid ]) }}">清空</a>
									</p>
								</div>
							</li>
						</ul>
					</div>
				</div>
				<div class="sub_item">
					@foreach ($attrNames as $attrName) 
					@if (!isset($attrName['selected']) && count($attrName['sub']))
					<div class="sub_item_wap origin">
						<div class="sub_item_title">
							<span>
                                {{ $attrName['name'] }}：
                            </span>
						</div>
						<ul>
							<li>
								<a class="bg_crruten filter_item" href="{{ action('CategoriesController@show', [ 'uuid' => $goodsCategory->uuid, 'filter' => filter($attrName['number'], $attrName['array']) ]) }}">不限</a>
							</li>
							@foreach($attrName['sub'] as $value)
							<li>
								<a class="filter_item {{ in_array($value['number'], $value['array']) ? 'bg_crruten' : '' }}" href="{{ action('CategoriesController@show', [ 'uuid' => $goodsCategory->uuid, 'filter' => filter($value['number'], $value['array']) ]) }}">{{ $value['name'] }}</a>
							</li>
							@endforeach
						</ul>
					</div>
					@else
					@foreach($attrName['sub'] as $value)
					@if (isset($value['sub']) && in_array($value['number'], $value['array']))
					@foreach ($value['sub'] as $v)
					@if (!isset($v['selected']))
					<div class="sub_item_wap submenu submenu_top">
						<div class="sub_item_title">
							<span>
                                {{ $v['name'] }}：
                            </span>
						</div>
						<ul class="bd_dashed submenu_ul">
							<li>
								<a class="bg_crruten filter_item" href="{{ action('CategoriesController@show', [ 'uuid' => $goodsCategory->uuid, 'filter' => filter($v['number'], $v['array']) ]) }}">不限</a>
							</li>
							@foreach($v['sub'] as $vv)
							<li>
								<a class="filter_item {{ in_array($vv['number'], $vv['array']) ? 'bg_crruten' : '' }}" href="{{ action('CategoriesController@show', [ 'uuid' => $goodsCategory->uuid, 'filter' => filter($vv['number'], $vv['array']) ]) }}">{{ $vv['name'] }}</a>
							</li>
							@endforeach
						</ul>
					</div>
					@endif
					@endforeach
					@endif
					@endforeach
					@endif
					@endforeach
				</div>
			</div>
			@elseif (isset($floor))
			<p class="list_title_left">
				<span class="sub_title_left">
                    {{ $floor['title'] }}
                </span>
			</p>
			@endif
			<div class="outline">
				@if (isset($selected) && $goodsCategory->uuid === '0b7b8100-2958-11e7-9ab4-e337f0fad04a')
				<ul class="underwriting">
					<li>
						<a href="javascript:;" class="under_curent" data_sign='1' data-jump='agent' data-sort="no">全部</a>
					</li>
					@if (session('type') === 'agency')
					<li class="last">
						<a href="javascript:;" class="" data-jump='agent' data-sort="yes">独家代理</a>
					</li>
					@endif
				</ul>
				@endif
				<p class="list_title_right">
					<span class="sub_title_right">
                            <span class="gray">
                                共有
                            </span>
					<span>
                                {{ $goods->total() }}
                            </span>
					<span class="gray">
                                件商品 {{ $goods->currentPage() }}/{{ ceil($goods->total() / $goods->perPage()) }}
                            </span>
					<span class="pages">
                                <a href="{{ $goods->previousPageUrl() ?: 'javascript:;' }}">上一页</a>
                            </span>
					<span class="pages">
                                <a href="{{ $goods->nextPageUrl() ?: 'javascript:;' }}">下一页</a>
                            </span>
					</span>
				</p>
				<div class="nav_title">
					<div class="nav_title_wap">
						<ul class="option">
							<li class="option_first">
								<a href="javascript:;" data-jump='mix' data-sort="desc">综合排序</a>
							</li>
							<li>
								<a href="javascript:;" data-jump='new' data-sort="desc">新品</a>
							</li>
							<li name="price_li">
								<a href="javascript:;" data-jump='price' data-sort="asc&desc">价格</a><img data-select='0' class="arrow_down arrow" src="/images/commodity_list/arrow_down.png" /><img class="arrow_up arrow" data-select='0' src="/images/commodity_list/arrow_up.png" /><img data-select='1' class="arrow_gray arrow" src="/images/commodity_list/arrow_gray.png" /></li>
						</ul>
						@if (!isset($selected))
						<span class="text">
                        筛选:
                    </span>
						<input type="text" name="screen" id="slid_screen" class="screening" value="全部" readonly="readonly" data-sign = "be_filter" data_state="0"/>

						<span class="text">
                        产地:
                    </span>
						<input type="text" name="origin_from" id="origin_from" data_state="0" class="screening" value="全部" readonly="readonly" data-sign = "af_country"/>

						<div>
							<p>
								<span id="chk" class="chk radio_btn" data-jump='spot' data-sort='yes'></span>
								<span id="selected" class="selected radio_btn" data-jump='spot' data-sort='no' data-success=1></span>
								<span class="stock">现货</span>
							</p>
						</div>
						@if (session('type') === 'agency')
						<div>
							<p>
								<span id="right" class="chk right radio_btn" data-jump='agent' data-sort='yes'></span>
								<span id="next_right" class="selected right radio_btn" data-jump='agent' data-sort='no' data-success=1></span>
								<span class="stock sole dujiajia">可独家</span>
							</p>
						</div>
						@endif
						<ul id="wine_type" class="select_sub">
							<li data-jump='wine_type' data-sort='allWine' data-sign = "be_filter">全部</li>
							<li data-jump='wine_type' data-sort='wooden' data-sign = "be_filter">木箱酒</li>
							<li data-jump='wine_type' data-sort='win' data-sign = "be_filter">获奖酒</li>
							<!-- <li data-jump='wine_type' data-sort='little' data-sign = "be_filter">小瓶酒</li> -->
							<li data-jump='wine_type' data-sort='recommend' data-sign = "be_filter">高度推荐</li>
						</ul>
						<ul id="country" class="select_sub next">
							<li data-jump='country_name' data-sort='all' data-sign = "af_country">全部</li>
						    @foreach ($countries as $country)
							<li data-jump='country_name' data-sort='{{ $country->uuid }}' data-sign = "af_country">{{ $country->chinese_abbreviation }}</li>
							@endforeach
						</ul>
						@else
						<div>
							<p>
								<span id="chk" class="chk radio_btn  cash_goods" data-jump='spot' data-sort='yes'></span>
								<span id="selected" class="selected radio_btn cash_goods" data-jump='spot' data-sort='no' data-success=1></span>
								<span class="stock cash_words">现货</span>
							</p>
						</div>
						<div>
							<p>
								<span id="right" class="chk right radio_btn presell" data-jump='pre_sale' data-sort='yes'></span>
								<span id="next_right" class="selected right radio_btn presell" data-jump='pre_sale' data-sort='no' data-success=1></span>
								<span class="stock sole pre_words">预售</span>
							</p>
						</div>
						@endif
					</div>
				</div>
			</div>
		<!--购物车为空的时候显示-->
        <div class="carts_empty" style="{{ $goods->total() === 0 ? '' : 'display: none;' }}">
        	<div class="img_empty">
        		<img src="/images/shopping_car/roading.png"/>
        		<p class="text_empty">
        			<span class="em_content">
        				我们已经在路上啦～
        			</span>
        		</p>
        	</div>
        </div>
        <!--购物车不为空的时候显示-->
		<div class="package package_active" style="{{ $goods->total() === 0 ? 'display: none;' : '' }}">
			<div class="product_wap">
					<ul id="sort" class="product_show">
						@foreach ($goods as $wine)
						<li>
							<a class="single_first" target="_blank" href="{{ action('GoodsController@show', [ 'uuid' => $wine->uuid ]) }}">
								<div class="sole">
									@if ($wine->agent_type === 'region' && session('type') === 'agency')
                                    <img src="/images/dujia.png" class="soleImg"/>
                                    @endif
									@if ($wine->is_presale === 'yes')
	                                <img src="/images/yushou.png" class="soleImg"/>
									@endif
									@if ($wine->is_new === 'yes')
	                                <img src="/images/xinpin.png" class="soleImg"/>
									@endif
                                </div>
                                @if (!empty($wine->honor))
                                <ul class="getwin_list getwin_list2">
                                @foreach ($wine->honor as $honor)
                                    <li><img src="/images/huojiang.png" class="huojiangImg"/></li>
                                @endforeach
                                </ul>
                                @endif
								<img data-src="@image([ $wine->thumb, 152, 220])" class="product_pic sole_last unload" />
							</a>
							
							<div class="describe_pro" style="border-right:none">
								<ul class="describe_text">
									<li class="describe_first">
										<a class="three" target="_blank" href="{{ action('GoodsController@show', [ 'uuid' => $wine->uuid ]) }}">{{ $wine->slogan }}</a>
									</li>
									<li class="first_line">
										<a class="first" target="_blank" href="{{ action('GoodsController@show', [ 'uuid' => $wine->uuid ]) }}">{{ $wine->chinese_name }}</a>
									</li>
									<li class="second_line">
										<a class="second" target="_blank" href="{{ action('GoodsController@show', [ 'uuid' => $wine->uuid ]) }}">{{ $wine->english_name }}</a>
									</li>
								</ul>
								<ul class="describe_price">
									<li class="price_list">@currency($wine->lowest_price)</li>
									<li class="price_sce">{{ $wine->label }}</li>
									<li class="price_last">{{ $wine->sub_label }}</li>
								</ul>
							</div>
								<p class="flag1">
									<img src="@image([ $wine->country->flag, 30, 20 ])" />
								</p>
						</li>
						@endforeach
					</ul>
					{{ $goods->links() }}
			</div>
		</div>
	</div>
	<div id="asd" style="display: none;"></div>
	<div id="qwe" style="display: none;"></div>
</div>
@stop @section('JS')
<script src="/js/commodity_list.js" type="text/javascript" charset="utf-8"></script>
<script src="/js/commodity_list1.js" type="text/javascript" charset="utf-8"></script>
<script src="/js/slide.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript">
	window.global.totalPage = {{ceil($goods->total() / $goods->perPage())}};
</script>
@stop