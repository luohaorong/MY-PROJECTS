@extends('layouts_member')
@section('CSS')
    @parent
    <link rel="stylesheet" href="/css/personal_my_points.css" />
@stop
    @section('right')
        
            <div class="box_h">我的积分</div>
            <!--第一层成长等级-->
            <div class="my_points_level1">
                <div class="my_points_level1_top">
                    <!-- <div class="my_points_vip_level">黄金会员</div> -->
                    <p class="my_points_growup">
                        您的当前会员积分：<span class="points_your_points grow_up_common">{{$members->points}}</span>分
                    </p>
                    <a class="my_points_rules" href="{{ action('HelpController@show', [ 'uuid' => '0d273900-5f9e-11e7-8731-3fb141a116bd' ]) }}">积分规则</a>
                </div>
                <div class="my_points_level1_bottom">
                    <p class="my_growup">我的成长等级:</p>
                    <div class="my_points_all">
                        <div class="my_points_white">
                            <div class="my_points_color">

                            </div>
                        </div>
                        <span id="my_points_zero">0</span>
                        <span>20000</span>
                        <span>40000</span>
                        <span id="my_points_full">100000</span>
                    </div>
                </div>
            </div>
            <!--第一层成长等级结束-->
            <!--第二层筛选-->
            <div class="my_points_level2">
                <div class="vip_timleft">
                    <p>起止时间：</p>
                    <div id="personal_test1" name='points_start' class="inline laydate-icon vip_timebox" ></div>
                    <div id="personal_test2" name='points_end' class="inline laydate-icon vip_timebox" ></div>
                    <div class="vip_filter">筛选</div>
                </div>

            </div>
            <!--第二层筛选结束-->
            <!--第三层表头-->
            <ul class="my_points_headbar">
                <li class="my_points_dealtime">交易时间</li>
                <li class="my_points_resrouce">积分来源</li>
                <li class="my_points_get">获得积分</li>
                <li class="my_points_lose">积分扣除</li>
                <li class="my_points_remarks">备注</li>
            </ul>

            <!--第三层表头结束-->
            <!--我的积分内容-->
            <div class="my_points_all_container">
                @if(count($flows) === 0)
                <!--无订单生成显示-->
                <div class="no_order">
                     尊敬的荟酒网客户：您还没有积分记录！
                </div>
                @endif

                @foreach($flows as $k=>$v)
                <ul class="my_points_container">
                    <li class="my_points_contime">{{$v['created_at']}}</li>
                    <li class="my_points_conresrouce">{{json_decode($v['note'],true)['msg'].(json_decode($v['note'],true)['order_sn'] ?? '')}}</li>
                    <li class="my_points_conget">{{$v['amount']}}</li>
                    <li class="my_points_conlose">0.00</li>
                    <li class="my_points_conremarks">{{json_decode($v['note'],true)['msg']}}</li>
                </ul>
                @endforeach
            </div>
            <!--我的积分内容结束-->
            <!--分页开始-->
              {{$flows->links()}}
            <!--分页结束-->
        
    @stop
@section('JS')
@parent
	<script type="text/javascript" src="/js/my_points.js" ></script>
    <script type="text/javascript" src="/js/laydate.js" ></script>
    <script type="text/javascript" src="/js/personal_date.js"></script>
	<script>
		window.global.mypoints = "{{action('MembersController@mypoints')}}";
	</script>
@stop