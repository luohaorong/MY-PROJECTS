<?php

namespace App;

class Staff extends Base
{
    protected $table = 'staffs';

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
    ];
}
