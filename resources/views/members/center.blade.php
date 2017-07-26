@extends('layouts_member')
@section('CSS')
@parent
<link rel="stylesheet" href="/css/account_information.css" />
@stop

    @section('right')
        <!--账户信息-->
    
            <div class="content_common">
            	
                <div class="box_h">账户信息</div>
                <div class="account_info1">
                    <div class="info1_left"><img src="/img/avatar.png" /></div>
                    <div class="info1_right">
                        <div class="info1_complete">
                            <div class="complete_words">
                                资料完整度 ：
                            </div>
                            <div class="commplete_pic">
                                <div class="cp_pic60"></div>
                                <div class="cp_pic80"></div>
                                <div class="cp_pic100"></div>
                            </div>
                            <p class="complete_percent">60%</p>
                        </div>
                        <p class="info1_service">您好，尊敬的{{$member['real_name']}}，填写详细的资料，以便我们为您提供更优质的服务。</p>
                    </div>
                </div>
                <div class="account_info2">
                    <div class="info2_person">
                        个人资料
                    </div>
                    <div class="info2_lab">
                        <p class="info2_head">账户姓名：</p>
                        <p class="info2_name">{{$member['real_name']}}</p>
                        <div class="info2_revise">
                            <img src="/img/info2_resive.png" />
                        </div>
                        <input type="text"  name="name" class="info2_box" />
                        <div class="info2_save info2_savename">
                            <img src="/img/info2_save.png" />
                        </div>
                        <div class="info2name_error"></div>
                    </div>

                    <div class="info2_lab">
                        <p class="info2_head">注册账户：</p>
                        <p class="info2_reaccount">@privacy_mobile($member['mobile'])</p>
                    </div>
                    <div class="info2_lab">
                        <p class="info2_head">绑定手机：</p>
                        <p class="bind_iphone">@privacy_mobile($member['mobile'])</p>
                        
                    </div>

                    <div class="info2_lab">
                        <p class="info2_head">电子邮箱：</p>
                        <p class="info2_email">{{$member['email']}}</p>
                        <div class="info2_revise">
                            <img src="/img/info2_resive.png" />
                        </div>
                        <input type="text"  name="email" class="info2_box" />
                        <div class="info2_save info2_savemali">
                            <img src="/img/info2_save.png" />
                        </div>
                        <div class="info2email_error"></div>
                    </div>

                    <div class="info2_lab">
                        <p class="info2_head">注册时间：</p>
                        <p class="info2_regtime">{{$member['created_at']}}</p>
                    </div>
                    <!--<div class="info2_lab">
                        <p class="info2_head">收货地址：</p>
                        <a href="{{action('AddressController@addrList')}}" class="info2_region">
                           
                            		<span>成都市金牛区盛大国际5栋1202号</span>
                            <img class="info2_img1" src="/img/jiantou1.png" />
                           
                        </a>
                        
                    </div>-->

                </div>

                <div class="account_info3">
                    <div class="info2_person" style="color: #f3554a;">
                        修改密码
                    </div>
                      
                        <label>
                            <p class="info2_head">当前密码：</p>
                            <input class="info3_current info3_common" autocomplete="off" name="old_passwd" type="text" />
                            
                            <div class="fo3err_common"></div>
                        </label>
                        <label>
                            <p class="info2_head">新的密码：</p>
                            <input class="info3_setpw info3_common" autocomplete="off" name="new_passwd" type="text" />
                            <div class="fo3err_common">密码6-12位，由数字、字母组成</div>
                        </label>
                        <label>
                            <p class="info2_head">确认密码：</p>
                            <input class="info3_surepw info3_common" autocomplete="off" name="confirm_passwd" type="text" />
                            <div class="fo3err_common">请再次输入密码，牢记密码不要将密码告诉他人</div>
                        </label>
                    @if($errors->has('edit_error'))
                        <p class="prompt verification_chk">{{$errors->first('edit_error')}}</p>
                    @endif
                    	<label>
                    		<p class="info2_head info2_special">验证码：</p>
                    		<input class="indent_txt" type="text" />
                    		<input class="get_ident" type="button" value="点击获取验证码"/>
                    		<span class="tip">点击获取验证码之后，注意查收手机短信</span>
                    	</label>
                        <input class="info3_ok" type="submit" value="确认修改" />
                        
                </div>
            	 
            </div>
          
        <!--账户信息结束-->
       
    @stop
    
@section('JS')
@parent
<script type="text/javascript" src="/js/account_info.js" ></script>
    <script>
        window.global.saveInfo =  "{{action('MembersController@saveInfo')}}";
        window.global.send_secure = "{{action('IndexController@smsSecure')}}";
//      window.global.getInfo="{{action('MembersController@getInfo')}}";
    </script>
@stop
	