<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMembersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('members', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->uuid('uuid')->default('')->comment('UUID');
            $table->string('real_name', 100)->default('')->comment('真实姓名');
            $table->string('avatar')->default('')->comment('头像');
            $table->string('mobile', 11)->default('')->comment('手机号码');
            $table->string('password', 255)->default('')->comment('登录密码');
            $table->string('email', 40)->default('')->comment('邮箱地址');
            $table->unsignedInteger('balance')->default(0)->comment('账户余额');
            $table->unsignedInteger('freeze_balance')->default(0)->comment('被冻结余额');
            $table->unsignedBigInteger('corns')->default(0)->comment('金币');
            $table->unsignedBigInteger('freeze_corns')->default(0)->comment('被冻结金币');
            $table->string('openid')->default('')->comment('微信openid');
            $table->unsignedBigInteger('points')->default(0)->comment('积分');
            $table->unsignedBigInteger('freeze_points')->default(0)->comment('被冻结积分');
            $table->timestamp('expired_time')->comment('登录过期时间');
            $table->timestamp('last_login_at')->nullable()->comment('上次登录时间');
            $table->string('rand_str', 100)->default('')->comment('随机字符串hash加密');
            $table->enum('is_locked', array('yes','no','login_lock'))->default('no')->comment('是否禁用');
            $table->enum('type', array('enterprise','agency'))->default('agency')->comment('会员身份');
            $table->string('invited_code')->default('')->comment('邀请码');
            $table->softDeletes(); //逻辑删除
            $table->timestamps();  //创建时间
            $table->primary('uuid');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('members');
    }
}
