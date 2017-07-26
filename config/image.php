<?php

return array(

    /*
    |--------------------------------------------------------------------------
    | Image Driver
    |--------------------------------------------------------------------------
    |
    | Intervention Image supports "GD Library" and "Imagick" to process images
    | internally. You may choose one of them according to your PHP
    | configuration. By default PHP's "GD Library" implementation is used.
    |
    | Supported: "gd", "imagick"
    |
    */

    'driver' => 'imagick',

    /**
     *
     * 图片服务器地址
     *
     */
    'image_url' => env('IMAGE_URL', 'http://image.huijiuguoji.com'),

    /**
     *
     * 允许上传的文件类型
     *
     */
    'allowed_mime_type' => [ 'image/jpeg', 'image/png', 'image/gif' ],

    /**
     *
     * 图片尺寸
     *
     */
    'image_resize' => [
        'flag' => [
            [ 84, 84 ],
            [ 300, 200 ],
            [ 30, 20 ],
        ],
        'goods_category' => [
            [ 84, 84 ],
            [ 60, 60 ],
        ],
        'goods' => [
            [ 84, 84 ],
            [ 140, 200 ],
            [ 28, 40 ],
        ],
        'banner' => [
            [ 84, 84 ],
            [ 1920, 320 ],
            [ 29, 29 ],
            [ 272, 127 ],
            [ 200, 400 ],
            [ 134, 70 ],
        ],
    ],

);
