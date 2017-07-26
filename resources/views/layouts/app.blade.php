<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <title>{{ config('app.name') }}</title>
    <link rel="stylesheet" href="/css/common.css">
    <link rel="stylesheet" href="/css/head_left.css">
    @yield('css')
    <script type="text/javascript" src='/js/jquery.min.js'></script>
    <script type="text/javascript">
        Date.prototype.format = function (fmt) { 
            var o = {
                "M+": this.getMonth() + 1, //月份 
                "d+": this.getDate(), //日 
                "h+": this.getHours(), //小时 
                "m+": this.getMinutes(), //分 
                "s+": this.getSeconds(), //秒 
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
                "S": this.getMilliseconds() //毫秒 
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }
    
        $.ajaxSetup({
            beforeSend: function(xhr){
                xhr.setRequestHeader('X-CSRF-TOKEN', '{{ csrf_token() }}');
            },
        });

        window.global = {};
        window.global.currency = function ($money) {
            return '¥ ' + new Number($money / 100).toFixed(2);
        };
    </script>
</head>
<body>
    <div id="head_left_container">
        <div class="head_wrap clearfix">
            <img class="head_left_logo float_left" src="/images/head_left/logo2.png" alt="">
            <p class="head_left_title float_left">
                荟酒国际代理系统后台管理系统
            </p>
            <p class="head_left_date float_right">
                {{ \Carbon\Carbon::now()->format('Y-m-d H:i:s') }}
            </p>
        </div>
        <div class="left_wrap">
            <div class="left_userName clearfix">
                <p class="name_out float_left">
                    {{ \Auth::user()->name }}
                </p>
                <a href="{{ url('/logout') }}" class="name_out float_right" onclick="event.preventDefault();document.getElementById('logout-form').submit();">退出</a>
                <form id="logout-form" action="{{ url('/logout') }}" method="POST" style="display: none;">
                    {{ csrf_field() }}
                </form>
            </div>
            @foreach (\App\Setting::get('menu') as $menu)
            <div class="left_list_wrap ">
                <div class="list_title_wrap" data_active='0'>
                    <img class="left_list_img  float_left" src="/images/head_left/arrow.png" alt="">
                    <p class="list_title float_left">
                        {{ $menu['name'] }}
                    </p>
                </div>
                <ul class="left_list">
                    @foreach ($menu['children'] as $child)
                    <li>
                    <a class="list_item @if (strrpos(\Request::url(), $child['url']) !== false)active @endif" href="{{ $child['url'] }}">
                    ● {{ $child['name'] }}
                    </a>
                    </li>
                    @endforeach
                </ul>
            </div>
            @endforeach
        </div>
        <div class="content">
            @yield('content')
        </div>
    </div>
    @yield('layer')
    <script type="text/javascript" src='/js/head_left.js'></script>
    @yield('js')
</body>
</html>