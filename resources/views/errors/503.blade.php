<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>{{ \App\Setting::get('website_name') }}</title>
    </head>
    <style>
        *{
        padding: 0;
        margin: 0;
        }
        body{
            
            background-color: #52abd6;
            
        }
        .container_protect{
            position: relative;
            width: 978px;
            margin: 160px auto;
        }
        .container_protect .tips{
            position: absolute;
            width: 660px;
            height: 140px;
            top: 276px;
            left: 162px;
            font-size: 18px;
            line-height: 34px;
            color: #FFFFFF;
            word-wrap: break-word;
        }
    </style>
    <body>
        <div class="container_protect">
            <img src="/img/co_protect.png" alt="" />
            <div class="tips">
                {!! \App\Setting::get('system')['reason'] !!}
            </div>
        </div>
    </body>
</html>
