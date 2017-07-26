<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>登录</title>
    <link rel="stylesheet" type="text/css" href="/css/common.css">
    <link rel="stylesheet" type="text/css" href="/css/login.css">
</head>
<body>
    <div id="login">
        <img class="login_banner" alt="" src="/images/login/login_banner.png"/>
        <div class="logincontainer">
            <div class="login_content">
                <div class="login_head">
                    <img class="login_logo" alt="" src="/images/login/logo.png" />
                    <p class="login_head_p">荟酒代理平台</p>
                </div>
                <div class="login_body">
                    <form class="login_form" action="{{ url('/login') }}" method="post">
                        {{ csrf_field() }}
                        <label class="input_common clearfix" for="">
                            <p class="input_title small">账号</p>
                            <p class="float_left maohao">:</p>
                            <input class="txt_common account" name="email" value="{{ old('email') }}" type="text"/>
                        </label>
                        <label class="input_common clearfix" for="">
                            <p class="input_title small">密码</p>
                            <p class="float_left maohao">:</p>
                            <input class="txt_common pass" name="password" type="password"/>
                        </label>
                        <label class="input_common clearfix" for="">
                            <p class="input_title big">验证码</p>
                            <p class="float_left maohao">:</p>
                            <input class="yanzheng" type="text" name="validation">
                            <img src="{!! captcha_src() !!}" alt="加载中..." title="点击刷新" onclick="this.src += 1" class="yanzheng_img">
                        </label>
                        <input class="login_sub" type="submit" value="">
                    </form>
                    @if ($errors->has('email') || $errors->has('password') || $errors->has('validation'))
                    <div class="login_layer">
                        <p class="layer_tip">录入信息错误，您还有<span>{{ 4 - cache('login_times') }}</span>次机会</p>
                        <p class="layer_tip">请重新输入登录信息</p>
                        <input class="layer_sure" type="button" name="" value='确定'>
                    </div>
                    @endif
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src='/js/jquery.min.js'></script>
    <script type="text/javascript">
        $('.layer_sure').click(function(){
            $('.login_layer').hide();
        })
    </script>
</body>
</html>