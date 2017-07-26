@extends('layouts_member')
@section('CSS')
    @parent
    <link rel="stylesheet" href="/css/my_exclusive.css" />
@stop
    @section('right')

            <div class="content_common">
                <div class="box_h">我的独家</div>
                <div class="account_info1">
                    <div class="info1_left"><img src="/img/avatar.png" /></div>
                    <div class="info1_right">
                        <div class="info1_complete">
                            <div class="complete_words">
                                您好,尊敬的<span class="myex_vip">{{ session('real_name') }}</span>
                            </div>
                            <!-- <div class="myex_gold">黄金会员</div> -->
                            <div class="myex_bind_number">已绑定手机：<span class="myex_vip_number">@privacy_mobile(session('mobile'))</span></div>
                        </div>
                        <p class="info1_service">截止<span class="myex_date">{{ \Carbon\Carbon::now()->format('Y年m月d日') }}</span>，您有:<span class="myex_order">0</span>笔独家代理订单快到期，请您及时查看</p>
                    </div>
                </div>
                <ul class="myex_headbar">
                    <li class="mheabar1">商品</li>
                    <li class="mheabar2">类型</li>
                    <li class="mheabar3">单价</li>
                    <li class="mheabar4">独家区域</li>
                    <li class="mheabar5">独家周期</li>
                    <li class="mheabar6">全部状态</li>
                    {{--<li class="mheabar7">操作</li>--}}

                </ul>
                <!--这个订单开始-->

                @if(count($members_exclusive) === 0)
                <!--无订单生成显示-->
                <div class="no_order">
                     尊敬的荟酒网客户：您还没有独家任何商品！
                </div>
                @endif

                @foreach($members_exclusive as $k=>$v)
                <div class="myex_orderlists">
                    <div class="myex_orderlists_head">
                        独家商品：<span class="myex_ordernumber"></span> 下单时间：
                        <span class="myex_ordertime">{{$v['created_at']}}</span>
                    </div>


                    <div class="myex_orderlists_container">
                        <div class="box">
                            <!--单个订单号左边订单详情可多个-->
                            <ul class="myex_container_left">
                                <li class="myex_left_li1">
                                    <a target="_blank" href="{{ action('GoodsController@show', [ 'uuid' => $v['goods']['uuid'] ]) }}"><img src="@image([$v['goods']['thumb'], 132, 188])" /></a>
                                </li>
                                <li class="myex_left_li2">
                                    <p class="myex_left_name"></p>
                                    <p class="myex_left_amount">{{$v['exclusive']['stocking_pricing_ratio']}}支装</p>
                                </li>
                                <li class="myex_left_li3">独家</li>
                                <li class="myex_left_li4">@currency($v['exclusive']['price'])</li>
                                <li class="myex_left_li5">{{$v['areas_name']}} </li>
                                <li class="myex_left_li6">@if($v['exclusive']['exclusive_time']==='half')半年@elseif(($v['exclusive']['exclusive_time']==='quarter'))三个月@elseif(($v['exclusive']['exclusive_time']==='year'))一年@endif </li>
                            </ul>
                            <!--单个订单号-->
                        </div>
                        <!--右边第一个操作栏-->
                        <div class="myex_container_right1">
                            <p class="myex_wait_pay">待付款</p>
                            <p class="myex_already_off">已取消</p>
                            <p class="myex_receive_good" >待收货</p>
                            <p class="myex_already_complete" style="display: block;">已完成</p>
                        	{{--<div class="myex_order_follow">订单跟踪</div>--}}
                        </div>
                        <!--右边第一个操作栏结束-->
                        <!--右边第二个操作栏-->
                        <div class="myex_container_right2">
                            <div class="right2_wait_pay" style="display:none;">
                                <!--<a href="my_exclusive_detail.html">查看订单</a>-->
                                <!--<a href="my_exclusive_download.html">文件下载</a>-->
                                <a href="#">立即支付</a>
                            </div>
                            <div class="right2_already_off" style="display: none;">
                               <!--<a href="my_exclusive_detail.html">查看订单</a>-->
                                <!--<a href="#">文件下载</a>-->

                            </div>
                            <div class="right2_receive_good" style="display:none;">
                                <a href="my_exclusive_detail.html">查看订单</a>
                                <!--<a href="my_exclusive_download.html">文件下载</a>-->
                                <a href="#">确认收货</a>
                            </div>
                            <div class="right2_already_complete" style="display:block;">
                                <!--<a href="my_exclusive_detail.html">查看订单</a>-->
                                <!--<a href="my_exclusive_download.html">文件下载</a>-->

                            </div>

                        </div>
                        <!--右边第二个操作栏结束-->
                    </div>
                </div>
                @endforeach
                <!--上个订单结束-->
                
            </div>
		{{$members_exclusive->links()}}


    @stop
@section('JS')
@parent
	<script type="text/javascript" src="/js/my_exclusive.js" ></script>
    <script type="text/javascript" src="/js/laydate.js" ></script>
    <script type="text/javascript" src="/js/personal_date.js" ></script>
@stop