<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWechatUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('wechat_users', function (Blueprint $table) {
            $table->uuid('uuid')->default('')->comment('UUID');
            $table->string('openid')->default('')->comment('openid');
            $table->string('nickname')->default('')->comment('昵称');
            $table->unsignedTinyInteger('sex')->default(0)->comment('性别');
            $table->string('language')->default('')->comment('语言');
            $table->string('city')->default('')->comment('城市');
            $table->string('province')->default('')->comment('省份');
            $table->string('country')->default('')->comment('国家');
            $table->string('headimgurl')->default('')->comment('头像');
            $table->softDeletes();
            $table->timestamps();
            $table->primary('uuid');
            $table->unique('openid');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('wechat_users');
    }
}
