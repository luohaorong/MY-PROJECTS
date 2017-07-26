<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStaffsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('staffs', function (Blueprint $table) {
            $table->uuid('uuid')->default('')->comment('UUID');
            $table->char('code', 8)->default('')->comment('编号');
            $table->string('name')->default('')->comment('用户名');
            $table->string('real_name')->default('')->comment('姓名');
            $table->string('avatar')->default('')->comment('头像');
            $table->char('mobile', 11)->default('')->comment('手机号');
            $table->string('password')->default('')->comment('密码');
            $table->string('openid')->default('')->comment('微信openid');
            $table->string('email')->default('')->comment('邮箱');
            $table->uuid('areas_uuid')->default('')->comment('管辖区域UUID');
            $table->enum('status', [ 'normal', 'locked' ])->default('normal')->comment('状态');
            $table->timestamp('inducted_at')->nullable()->comment('入职时间');
            $table->softDeletes();
            $table->timestamps();
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
        Schema::dropIfExists('staffs');
    }
}
