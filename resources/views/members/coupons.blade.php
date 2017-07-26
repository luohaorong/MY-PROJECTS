@extends('layouts_member')
@section('CSS')
    @parent
    <link rel="stylesheet" href="/css/my_sample_coupons.css" />
@stop
    @section('right')
        
            <div class="content_common">
                <div class="box_h">我的样品券</div>
                <!--三个tab切换未使用，已使用，已过期-->
                <div class="my_sample_usage">
                    <a href="##" class="sample_not_use sample_common">
                        <div class="sample_ck add_sample_ck"></div>
                        <p class="sample_situation add_sample">未使用（3）</p>
                        <div class="sample_container_common sample_container_common_nouse" style="display: block;"  >
                            <!--未使用样品券内容-->
                            <div class="sample_box_no_use">
                                <p class="sample_apply">样品申请券</p>
                                <p class="sample_could">可申请一款样品</p>
                                <p class="sample_limit">品类限制：红酒、啤酒</p>
                                <p class="sample_number">券编号：x146545454522122</p>
                                <p class="sample_exipry_date">有效期：2016-05-05至2016-08-31</p>
                            </div>
                            <!--未使用样品券内容结束-->
                        </div>
                    </a>
                    <a href="###" class="sample_already_use sample_common">
                        <div class="sample_ck"></div>
                        <p class="sample_situation">已使用（3）</p>
                        <div class="sample_container_common sample_container_common_aluse" >
                            <!--已使用样品券内容-->
                            <div class="sample_box_already_use" >
                                <p class="sample_apply">样品申请券</p>
                                <p class="sample_could">可申请一款样品</p>
                                <p class="sample_limit">品类限制：红酒、啤酒</p>
                                <p class="sample_number">券编号：x146545454522122</p>
                                <p class="sample_exipry_date">有效期：2016-05-05至2016-08-31</p>
                            </div>
                            <!--已使用样品券内容结束-->
                        </div>
                    </a>
                    <a href="###" class="sample_date_off sample_common">
                        <div class="sample_ck"></div>
                        <p class="sample_situation">已过期（3）</p>
                        <div class="sample_container_common sample_container_common_dateoff" >
                            <!--已过期样品券内容-->
                            <div class="sample_box_date_off">
                                <p class="sample_apply">样品申请券</p>
                                <p class="sample_could">可申请一款样品</p>
                                <p class="sample_limit">品类限制：红酒、啤酒</p>
                                <p class="sample_number">券编号：x146545454522122</p>
                                <p class="sample_exipry_date">有效期：2016-05-05至2016-08-31</p>
                            </div>
                            <!--已过期样品券内容结束-->
                        </div>
                    </a>
                </div>
                <!--tab切换结束-->
                <!--tab切换的内容区域-->




                <!--tab切换的内容区域结束-->

            </div>

        
    @stop
@section('JS')
@parent
    <script type="text/javascript" src="/js/my_coupons.js"></script>

@stop