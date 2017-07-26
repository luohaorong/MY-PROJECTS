@extends('top')
@section('CSS')
    <link rel="stylesheet" href="/css/register.css" />
@stop
@section('content')
<!--register主体开始-->
<div id="register_container">
    <div class="step_container">
        <img class="step_img" src="/images/register/nav3.png"/>
        <div class="left_side"></div>
        <div class="right_side3"></div>
    </div>
    <div class="register_mian">
        <ul class="step_nodes">
            <li>会员信息注册</li>
            <li>完善会员资料</li>
            <li class="last3">注册成功，等待审核</li>
        </ul>
        <div class="register_content">
            <div class="left_content">
                <div class="prompt_box">
                    <div class="prompt_title">
                        <p>您好，尊敬的客户：</p>
                    </div>
                    <ul class="prompt_content">
                        <li class="prompt_img"></li>
                        <li class="prompt_ifo">
                            <p>您的注册申请已提交，我们将在两个工作日内完成审核，审核结果将以</p>
                            <p>短信形式发送到您的注册手机号上；收到短信后请重新登录。如需加急或咨询请联系客服：<span style="color: #bd0e0e;">{{ \App\Setting::get('phone') }}</span></p>
                        </li>
                    </ul>
                    <a href="{{action('IndexController@index')}}">返回首页→</a>
                </div>
            </div>
            <div class="right_content">
                <div class="left_line"></div>
                <div class="rigth_list">
                    <p class="list_title">注册酒品荟会员，即刻享受</p>
                    <ul class="ifo_list">
                        <li>一手市场信息</li>
                        <li>海量待选产品</li>
                        <li>便捷采购管理</li>
                        <li>安心价格保护</li>
                        <li>更多高端服务</li>
                    </ul>
                    <a href="{{action('IndexController@login')}}" class="soon">已是会员，快速登录</a>
					<a href="{{action('IndexController@enterpriseRegister')}}" class="soon">企事业单位注册入口</a>
                </div>
            </div>
        </div>
    </div>
</div>


 @stop
@section('JS')
    <script type="text/javascript" src="/js/area.js" ></script>
@stop

