@extends('layouts_member')
@section('CSS')
    @parent

    <link rel="stylesheet" href="/css/personal_custom_detail.css" />
    <link rel="stylesheet" type="text/css" href="/css/personal_common.css" />

@stop

 @section('right')
   
         <div class="box_h">定制详情
             <a class="box_h_sub" href="{{action('OemsController@myOem')}}">【返回我的定制】</a>
         </div>
         <!--定制详情的上面部分-->
         <div class="personal_custom_information">
             <ul class="personal_custom_information_top">
                 <li class="my_custom_product_name">产品名称</li>
                 <li class="my_custom_common">单价（元/瓶）</li>
                 <li class="my_custom_common">数量（瓶）</li>
                 <li class="my_custom_money">金额</li>
                 <li class="my_custom_common">已支付金额</li>
                 <li class="my_custom_all">全部状态</li>
             </ul>
             <ul class="personal_custom_information_bottom">
                 <li class="custom_detail_name">
                     <div class="custom_detail_name_top">{{$oems->chinese_name}}</div>
                     <p>{{$oems->english_name}}</p>
                 </li>
                 <li class="custom_detail_price">@currency($oems['paste_price']+$oems['design_price'])</li>
                 <li class="custom_detail_amount">{{ $oems['quantity'] * $oems['stocking_pricing_ratio'] }}</li>
                 <li class="custom_detail_money">
                     <div class="orderlist_product_money_top">
                         总额：<span class="orderlist_product_money_intotal">@currency($oems['total_fee'])</span>
                     </div>
                     <div class="orderlist_product_money_bottom">
                         首付：<span class="orderlist_product_money_firstpay">@currency($oems['pre_fee'])</span>
                     </div>
                 </li>
                 <li class="custom_detail_alreadypay">&yen; 0</li>
                 <li class="custom_detail_all">
                    @if ($oems->verify_pass === 'yes')
                    通过
                    @elseif ($oems->verify_pass === 'no')
                    未通过
                    @else
                    审核中
                    @endif
                 </li>
             </ul>
         </div>
         <!--定制详情的上面部分结束-->





         <!--定制详情的下面部分-->
         <div class="personal_custom_content">
             <ul class="personal_custom_content_headbar">
                 <li class="custom_content_headbar_li1">类型</li>
                 <li class="custom_content_headbar_li2">名称</li>
                 <li class="custom_content_headbar_li3">内容</li>
             </ul>

             <table class="personal_custom_content_tab" cellspacing="0" cellpadding="0"  >
                 <tr>
                     <td class="custom_content_wine" width="140px" rowspan="7">酒浆</td>
                     <td>国家</td>
                     <td>{{$pastes->country}}</td>
                 </tr>
                 <tr>
                     <td>等级</td>
                     <td>{{$pastes->level}}</td>
                 </tr>
                 <tr>
                     <td>产区</td>
                     <td>{{$pastes->district}}</td>
                 </tr>
                 <tr>
                     <td>类型</td>
                     <td>{{$pastes->category}}</td>
                 </tr>
                 <tr>
                     <td>容量</td>
                     <td>{{$pastes->capacity}}ML</td>
                 </tr>
                 <tr>
                     <td>其他</td>
                     <td>{{$pastes->remark}}</td>
                 </tr>
                 @if (isset($designe['label']))
                 <tr>
                     <td>酒标</td>
                     <td>{{$designe['label'][0]['name']}}</td>
                 </tr>
                 @endif
                 @if (isset($designe['bottle']))
                 <tr>
                     <td class="custom_content_wine" width="140px" rowspan="6">包装</td>
                     <td>酒瓶</td>
                     <td>{{$designe['bottle'][0]['name']}}</td>
                 </tr>
                 @endif
                 @if (isset($designe['hat']))
                 <tr>
                     <td>酒帽</td>
                     <td>{{$designe['hat'][0]['name']}}</td>
                 </tr>
                 @endif
                 @if (isset($designe['stopper']))
                 <tr>
                     <td>酒塞</td>
                     <td>{{$designe['stopper'][0]['name']}}</td>
                 </tr>
                 @endif
                 @if (isset($designe['box']))
                 <tr>
                     <td>纸箱</td>
                     <td>{{$designe['box'][0]['name']}}</td>
                 </tr>
                 @endif
                 @if (isset($designe['technique']))
                 <tr>
                     <td>雅白纸</td>
                     <td>{{$designe['technique'][0]['name']}}</td>
                 </tr>
                 @endif
                 <tr>
                     <td>备注</td>
                     <td>{{$oems->remark}}</td>
                 </tr>
             </table>


         </div>
         <!--定制详情的下面部分结束-->
     
 @stop
@section('JS')
@parent
	
    <script type="text/javascript" src="/js/my_oem.js" ></script>
@stop