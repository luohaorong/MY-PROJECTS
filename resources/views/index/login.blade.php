@extends('top')

@section('CSS')
    <link rel="stylesheet" type="text/css" href="/css/login.css"/>
@stop

@section('tool_bar')
@endsection

<!--logo开始-->
@section('login_bar')
<!--banner开始-->
<div id="login_banner">
	
    <div id="login_main">
        <div id="banner_main">
            <img src="/images/banner_00.png"/>
         </div>
        <div id="login_input_container">
            <div id="login_input">
                <ul class="login_title">
                    <li class="first_tab{{ is_null(old('fast')) ? ' title_current' : '' }}">账号登录</li>
                    <li class="{{ is_null(old('fast')) ? '' : 'title_current' }}">手机验证登录</li>
                </ul>
                <img class="underline" style="left: {{ is_null(old('fast')) ? '34px' : '178px' }}" src="/images/loginline.png"/>
               <form method="post" action="{{action('IndexController@login')}}">
                <div class="login_account login_tab" style="display: {{ is_null(old('fast')) ? 'block' : 'none' }}">
                	<input type="password" class="hidden_pass" />
                    <input type="text" id="username" name="mobile" value="{{old('mobile')}}" data-prompt="请输入用户名" />
                    <input name="redirect" type="hidden" value="{{isset($redirect)? $redirect: ''}}" class="not"/>
                    <span class="username_ico"></span>
                    <p class="prompt user_chk">请输入正确的用户名</p>
                    <input type="text" id="pwd" name="passwd" data-prompt="请输入密码" onkeyup="this.value=this.value.replace(/[^0-9a-zA-Z]*/g,'')" />
                    <span class="pwd_ico"></span>
                    <p class="pwd_prompt">请输入6-12位密码(数字、字母或数字和字母的组合)！</p>
                    @if($errors->has('login_error'))
                    <p class="login_error" style="display: block;color: #f94444;margin: 4px;padding: 4px;font-size: 12px;text-align: left;">{{$errors->first('login_error')}}</p>
                    @endif
                   	<p class="forget"></p>
                    @if (\Cache::has(\Input::getClientIp()))
                   	<div class="code_container">
                   		<input class="check_code" name="captcha" type="text" />
                   		<img class="img_box" src="{!! captcha_src() !!}"/>
                   		<a href="javascript:;" class="change_code">看不清，换一张？</a>
                        @if($errors->has('captcha'))
                   		<p class="code_error">{{$errors->first('captcha')}}</p>
                        @endif
                   	</div>
                   	@endif
                    <button type="submit"  class="login_btn btn_current btn_account" >登录</button>
                     <div  class="login_register"><a href="{{action('IndexController@registerNav') }}">快速注册</a></div>
                </div>
               </form>
                <form method="post" action="{{action('IndexController@fastLogin')}}">
                <div class="login_phone login_tab" style="display: {{ is_null(old('fast')) ? 'none' : 'block' }}">
                    <input name="redirect" type="hidden" value="{{isset($redirect)? $redirect: ''}}" class="not"/>
                    <input type="text" id="phone" name="phone" value="{{old('phone')}}" data-prompt="请输入手机号" />
                    <span class="phone_ioc"></span>
                    <p class="prompt phone_chk">请输入正确的手机号！</p>
                    <input type="text" id="verification" name="code" data-prompt="请输入动态码" />
                    <button type="button" id="btnoption">点击获取验证码 </button>
                    <span class="verification_ico"></span>
                    <p class="verification_prompt">请输入验证码！</p>
                    @if($errors->has('fast_login_error'))
                    <p class="login_error"  style="display: block;color:#f94444;margin-left: 20px;font-size: 12px;">{{$errors->first('fast_login_error')}}</p>
                    @endif
                    <button type="submit" class="btn login_btn btn_current btn_phone" >登录</button>
                    <div  class="login_register"><a href="{{action('IndexController@registerNav') }}">快速注册</a></div>
                </div>
                </form>
            </div>
        </div>
    </div>
</div>
<!--banner结束-->
@endsection

@section('JS')
<script>
    window.global.login = "{{action('IndexController@login')}}";
    window.global.index = "{{action('IndexController@index')}}";
    window.global.send_sms = "{{action('IndexController@smsSend')}}";
</script>
<script src="/js/jquery.cookie.js" type="text/javascript" charset="utf-8"></script>
<script src="/js/login.js" type="text/javascript" charset="utf-8"></script>

@stop
