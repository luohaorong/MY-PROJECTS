<?php

return array(
    'server' => array(
        'enabled' => true,
        'prefix' => '/jsonrpc',
        'methods' => array('POST','GET'),
        'resolvers' => array(
            'bonus' => '\App\Http\Controllers\{class}Controller'
        ),
        'allowed' => array(
            '127.0.0.1/24' => env('APP_KEY'),
            '192.168.52.130/24' => env('APP_KEY'),
            '172.19.100.221/24' => env('APP_KEY')
        )
    ),

    'client' => array(
        'cloud' => array(
            'key' => env('JSONRPC_CLOUD_KEY'),
            'route' => env('JSONRPC_CLOUD_ROUTE')
        )
    ),
);
