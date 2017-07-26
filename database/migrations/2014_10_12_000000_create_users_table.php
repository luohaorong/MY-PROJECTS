<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->uuid('uuid')->default('')->comment('UUID');
            $table->string('name')->default('')->comment('用户名');
            $table->string('avatar')->default('')->comment('头像');
            $table->string('real_name')->default('')->comment('真实姓名');
            $table->string('email')->default('')->comment('邮箱');
            $table->string('password')->default('')->comment('密码');
            $table->rememberToken();
            $table->softDeletes();
            $table->timestamps();
            $table->primary('uuid');
            $table->unique('email');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
