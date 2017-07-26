@extends('layouts_member')
@section('CSS')
    @parent
    
    <link rel="stylesheet" href="/css/personal_my_custom.css" />
@stop

 @section('right')
     
         <div class="box_h">我的定制</div>
         <!--表头-->
         <ul class="my_custom_headebar">
             <li class="my_custom_product_name">产品名称</li>
             <li class="my_custom_common">单价（元/瓶）</li>
             <li class="my_custom_common">数量（瓶）</li>
             <li class="my_custom_money">金额</li>
             <li class="my_custom_common">已支付金额</li>
             <li class="my_custom_all">全部状态</li>
         </ul>

         <!--表头结束-->
         <!--我的订制内容-->
         <div class="my_custom_container">

         @if(count($oems)==0)
             <!--无订单生成显示-->
                 <div class="no_order">
                     尊敬的荟酒网客户：您还没有定制订单，快去<a class="no_order_list" href="{{action('OemsController@brandCustomizitionFirst')}}">生成订单</a>吧！
                 </div>
             @endif


         	@foreach($oems as $k=>$value)
             <div class="my_custom_orderlist_container">
                 
                 <div class="my_custom_orderlist_time">
                     {{$value['created_at']}}
                 </div>
                 <ul class="my_custom_orderlist_bottom">
                     <li class="orderlist_product_name" title="{{$value['chinese_name']}}">{{$value['chinese_name']}}</li>
                     <li class="orderlist_product_price">
                @currency($value['paste_price']+$value['design_price'])</li>
                     <li class="orderlist_product_amount">{{$value['quantity']*$value['stocking_pricing_ratio']}}</li>
                     <li class="orderlist_product_money">
                         <div class="orderlist_product_money_top">总额：<span class="orderlist_product_money_intotal">
                @currency($value['total_fee'])</span></div>
                         <div class="orderlist_product_money_bottom">首付：<span class="orderlist_product_money_firstpay">
                                 @currency($value['pre_fee'])</span></div>
                     </li>
                     <li class="orderlist_product_already_pay">&yen;
                0</li>
                     <li class="orderlist_product_allsituation">
                         <p>
                            @if ($value['verify_pass'] === 'yes')
                            通过
                            @elseif ($value['verify_pass'] === 'no')
                            未通过
                            @else
                            审核中
                            @endif
                         </p>
                         <a class="my_custom_orderlist_detail" href="{{action('OemsController@oemDetail',['uuid'=>$value['uuid']])}}">定制详情</a>
                     </li>
                 </ul>
                
             </div>
			 @endforeach
			 
         </div>
		{{$oems->links()}}
         <!--我的订制内容结束-->
         
    
 @stop
@section('JS')
@parent
	
    <script type="text/javascript" src="/js/my_oem.js" ></script>
@stop