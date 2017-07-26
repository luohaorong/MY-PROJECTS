<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSmsLogsTable extends Migration
{
    /**s
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sms_logs', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->uuid('uuid')->default('')->comment('UUID');
            $table->string('mobile', 11)->default('')->comment('手机号码');
            $table->text('content')->nullable()->comment('短信发送详细信息');
            $table->string('code', 20)->default('')->comment('短信验证码');
            $table->timestamp('expired_at')->comment('过期时间');
            $table->enum('status', array('success','failed'))->comment('发送成功标志');
            $table->char('type')->nullable()->comment('发送短信类型');
            $table->softDeletes(); //逻辑删除
            $table->primary('uuid');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('sms_logs');
    }
}
