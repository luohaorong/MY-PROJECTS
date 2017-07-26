@extends('layouts_member')
@section('CSS')
    @parent
   
    <link rel="stylesheet" href="/css/personal_my_gold.css" />
@stop
    @section('right')
       
            <div class="content_common">
                <div class="box_h">我的金币</div>
                <div class="my_gold_account">
                    <span>金币余额:</span>
                    <span class="my_gold_amounts">{{session('corns')}}</span>
                    <a class="my_gold_help" href="{{ action('HelpController@show', [ 'uuid' => '3cbc6180-5a21-11e7-b737-f5309da64339' ]) }}">什么是金币？如何使用金币？</a>
                    <p class="my_gold_details">
                        您一共获得<span class="my_gold_intotal">{{$total_in}}</span>金币，已使用<span class="my_gold_already_use">{{$total_out}}</span>金币
                    </p>
                </div>
                <!--gold明细-->
                <div class="my_gold_level3">
                    <div class="my_glod_usage">
                        <a href="{{action('MembersController@mycorns',['inout'=>''])}}" class="my_gold_all gold_common">
                            <div class="gold_ck {{ empty($inout) ? 'add_gold_ck' :''}}" data_status=''></div>
                            <p class="gold_situation {{ empty($inout) ? 'add_gold' :''}}">全部明细</p>

                        </a>
                        <a href="{{action('MembersController@mycorns',['inout'=>'in'])}}" class="gold_income gold_common">
                            <div class="gold_ck {{$inout==='in'? 'add_gold_ck' :''}}" data_status='in'></div>
                            <p class="gold_situation {{$inout==='in'? 'add_gold' :''}}">只看收入</p>

                        </a>
                        <a href="{{action('MembersController@mycorns',['inout'=>'out'])}}" class="gold_pay gold_common">
                            <div class="gold_ck {{$inout==='out'? 'add_gold_ck' :''}}" data_status='out'></div>
                            <p class="gold_situation {{$inout==='out'? 'add_gold' :''}}">只看支出</p>

                        </a>
                    </div>

                    <div class="gold_timleft">
                        <p>按时间查找：</p>
                        <div id="personal_test1" name='corns_start' class="inline laydate-icon vip_timebox" ></div>
                        <div id="personal_test2" name='corns_end' class="inline laydate-icon vip_timebox" ></div>
                        <div class="gold_filter">查询</div>
                    </div>

                </div>
                <!--gold明细结束-->
                <ul class="my_gold_list">
                    <li class="my_gold_list_long">订单号</li>
                    <li class="my_gold_list_long">交易类型</li>
                    <li class="my_gold_list_long">交易时间</li>
                    <li class="my_gold_list_short">交易金币</li>
                    {{--<li class="my_gold_list_short">操作</li>--}}
                </ul>
                <!--明细呈现的内容-->
                <div class="gold_container_common gold_container_all"style="display: block;">
                   @if(count($flows) === 0)
                    <!--无订单生成显示-->
                    <div class="no_order">
                         尊敬的荟酒网客户：您还没有金币记录！
                    </div>
                   @endif

                   @foreach($flows as $k=>$v)
                    <ul class="my_gold_orderlists">
                        <li class="my_gold_list_long">{{json_decode($v['note'],true)['order_sn'] ?? ''}}</li>
                        <li class="my_gold_list_long">{{json_decode($v['note'],true)['msg']}}</li>
                        <li class="my_gold_list_long">{{$v['created_at']}}</li>
                        <li class="my_gold_list_short">{{$v['amount']}}</li>
                        {{--<li class="my_gold_list_short"><a class="gold_lookfor" href="##">查看</a></li>--}}
                    </ul>
                    @endforeach
                   
                       
                     
                </div>
                 {{$flows->links()}}
                <!--全部明细结束-->
            </div>

    @stop
@section('JS')
@parent
	<script type="text/javascript" src="/js/my_golds.js" ></script>
    <script type="text/javascript" src="/js/laydate.js" ></script>
    <script type="text/javascript" src="/js/personal_date.js" ></script>
@stop