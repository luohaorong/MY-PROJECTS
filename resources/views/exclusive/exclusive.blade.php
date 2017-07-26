@extends('layouts')
@section('CSS')
@parent

<link rel="stylesheet" href="/css/exclusive_agreements.css" />

@stop
@section('list')
	<!--协议内容区-->
	<div id="agreements">
		<div id="agreements-container">
				<!--修改仓库罩层-->
			<div id="layer">
				<div class="layer_content">
					<div class="layer_content_top">
						<p>起订量:<span class="start_bigest"><span class="ex_start_small">200</span>箱</span></p>
						
					</div>
					
					<div class="layer_content_bottom">
						<!--仓库内容-->
						@foreach($station as $k=>$v)
							<div class="station_container"  data-station-alias="@if(trim($v['attr_value']==='境外')) jingwai @elseif(trim($v['attr_value'])==='宁波仓') ningbo @elseif(trim($v['attr_value'])==='上海仓') shanghai @elseif(trim($v['attr_value'])==='成都仓')　chengdu @endif"  data-goods-extends-uuid="{{$k}}" data-station-name="{{$v['attr_value']}}" data-station-uuid="{{$v['station_uuid']}}">
							<div class="station_check"></div>
							<p class="station_place">{{$v['attr_value']}}</p>
							<div class="station_minu"></div>
							<input class="station_txt" onkeyup="value=value.replace(/[^\d]/g,'')" type="text" value=""/>
							<div class="station_add"></div>
							<p class="station_situation">箱<span class="station_span">(余<span class="stock_num">{{$v['stock']}}</span>箱)</span></p>
							</div>
						@endforeach
					</div>
					
					<input class="station_cancel" type="button" value="取消" />
					<input class="station_sure" type="button" value="确定" />
				</div>
			</div>
			<!--内容区域-->
			<div id="huijiuxieyi">
			<div class="box_h">荟酒网产品区域独家经营协议</div>
			<div class="next_onestep">为进一步保障上下游会员的权益，荟酒网甄选环球优质产品推出区域独家服务，只需低门槛即可取得区域独家经营权，更安享互联网+技术支撑的贴心服务和技术支持。</div>
			<h5>一、业务规则</h5>
			<ul class="agreements_lists">
				<li>【独家起订】地级城市100箱起、省会城市200-300箱起、省及直辖市300-500箱起，个别产品起订量有差异。</li>
				<li>【独家限时】默认一年，独家期内可随时优先续约。</li>
				<li>【独家区域】须为客户的经营地区，独家产品的收货地址须为签约的独家区域。</li>
				<li>【保密服务】未经会员的许可，荟酒网不会向任何人泄露会员、产品和价格信息。</li>
			</ul>
			<h5>二、经营权益</h5>
			<ul class="agreements_lists">
				<li>【营销控制】荟酒网将监管国外厂家，不再向独家区域的其他会员供货，并对紧邻区域进行严格销售控制，如一个省级区域只开发1-3位市级会员，最大限度保护会员的经营利润。</li>
				<li>【市场支持】荟酒网将优先安排厂商代表协助会员举办客户回访、酒庄参观、酒会支持等销售助力活动。</li>
				<li>【信息保护】取得独家经营权后，区域内其他客户无法获知独家产品的相关信息。</li>
				<li>【自由补货】在独家期间补货，可享受较低的补货起订量（30箱）。注意:补货不延长独家期限。</li>
			</ul>
			<h5>三、买家义务</h5>
			<ul class="agreements_lists">
				<li>【禁止串货】独家产品禁止区域间串货。荟酒网将通过大数据技术手段实时监测产品流通情况。违约者，荟酒网将终止与您的独家协议，并进行索赔。</li>
				<li>【禁止网售】非荟酒网及厂商书面许可，所有产品不得在网上商场、微信商城、手机商城等互联网渠道售卖。违规者，荟酒网将终止与您的独家协议，并按照已购产品的10倍价值</li>
				<p class="agreements_specail">及对其他客户造成损失两者孰高者主张侵权赔偿。全国独家不在此限制。</p>
				<li>【独家续约】如需续约，请在独家截止日3个月前告知荟酒网；续约后，该产品的独家日以续约日开始计算，期限仍为1年。</li>
				<li>【独家限制】省独家需注意省内是否存在市被其他用户独家的情况，系统会自动给出提示，用户若确认继续省独家操作，则:</li>
				<p class="agreements_specail">省级用户需承诺在市独家期限内不往该市销货；</p>
				<p class="agreements_specail">荟酒网承诺在该市独家到期后不再与其用户续约；</p>
				<p class="agreements_specail">如用户确认继续省独家操作，则视用户知晓并同意《荟酒网产品独家协议》，如用户有异议也可关闭独家操作。</p>
			</ul>
			<p class="agreements_specail agreements_color">签订本协议，表明双方已就有关经营事项及各方的权利义务达成一致。</p>
			<p class="agreements_specail agreements_color agreements_margin">本协议条款之解释与适用归荟酒网所有，但以不故意侵犯会员利益为限。</p>
			</div>
			<div class="exclusive">
				<div class="exclusive-left">
					<div class="exclusive_product">
						<img src="@image([$goods['thumb'], 152, 220])" />
					</div>
				</div>
				<div class="exclusive-right">
					<div class="exright_top">
						<div class="exclusive_infor">
							<p class="exproduct_name">{{$goods['chinese_name']}}</p>
							<p class="exproduct_price"><span>@currency($goods['lowest_price'])</span>/瓶</p>
							<p class="exproduct_date">{{date('Y-m-d',time())}}发货</p>
						</div>
						<div class="exclusive_region">
							<div class="ex_dujia">独家区域:</div>
							<div class="exclusive_container">
							@foreach($members_areas as $k=>$v)
								<!--区域-->
								<div class="ex_city ex_regioncoom" data-area-uuuid="{{$k}}">
									<div class="ck_region ck_city"></div>
									<p class="ck_name ckname_city @if($v['state']=='forbidden')regret @endif">{{$v['name']['name']}}</p>
									<!--<p class="ck_amount amount_city"><span class="start_num"></span>箱起订</p>-->
									@if($v['state']=='forbidden')
										<img src="/images/regret.png"/>
									@endif
								</div>
								@endforeach
								<a href="{{action('AddressController@addrList',['main_zone'=>'true'])}}"  class="ex_addregions"><span class="ex_addjia">+</span><span class="ex_addzeng">新增主营地区</span></a>
							</div>
						</div>
					</div>
					<div class="exright_bottom">
						<div class="bottom_one bottom_spacial">
							<p class="ex_words">订购数量:</p>
							<div class="ex_xiang">
								<div class="ex_minus"></div>
								<input class="ex_amount" onkeyup="value=value.replace(/[^\d]/g,'')" value="" type="text" />
								<div class="ex_add"></div>
							</div>
							<div class="ex_situation">
								箱
								<span><span class="ex_situation_single"></span>支装，共<span class="ex_situation_all"></span>瓶</span>
								<span>库存<span class="ex_situation_stock"></span>箱</span>
							</div>
							<div class="ex_error"></div>
						</div>
						<div class="bottom_two" style="display: none">
							<div class="ex_words">送<span>至</span>:</div>
							<div class="ex_songhuodizhi">
								<a target="_blank" class="ex_songhuodizhi_a ex_songhuodizhi_a_add" href="{{action('AddressController@addrList')}}"><p>{{$addr}}</p></a>

							</div>
							<!--<div class="ex_sendgoods">成都仓发货</div>-->
							<div class="ex_sdrevision" style="visibility: hidden;"><span>仓库</span>【修改】</div>
							<!--<a href="{{action('AddressController@addrList')}}">添加收货地址</a>-->
						</div>
						<div class="bottom_three">
							<p class="ex_words">独家时长:</p>
							@foreach($time as $k=>$v)
							<div class="ex_time" data_time='{{$v}}' data_month="@if(trim($v)=='quarter') 3 @elseif(trim($v)=='half') 6 @else 12 @endif">@if(trim($v)=='quarter')三个月 @elseif(trim($v)=='half')六个月@else一年@endif</div>
							@endforeach
						</div>
						<div class="bottom_three">
							<p class="ex_words">独家日期:<span class="ex_data"><span class="ex_data_start"></span>-<span class="ex_data_end"></span></span></p>
							
						</div>
						<input class="sure_agent" type="button" value="确认独家代理" />
						<p class="ex_agree">点击 “确认独家代理”，即代表您同意<a href="#huijiuxieyi">《荟酒网产品包销协议》</a></p>
					</div>
				</div>
			</div>

		</div>
	</div>
	<!--协议内容区结束-->
@stop
@section('JS')
@parent
	<script type="text/javascript" src="/js/exclusive_agreements.js"></script>
	<script type="text/javascript" src="/js/jquery.cookie.js"></script>
	
	<script>
	    window.global.carts_list = "{{action('CartsController@cartsList')}}"  
		window.global.addCarts = "{{action('CartsController@addCarts')}}";
	    window.global.mainZone = "{{action('ExclusivesController@mainZone')}}";
        var data = {!!json_encode($data, true) !!};
	</script>
@stop