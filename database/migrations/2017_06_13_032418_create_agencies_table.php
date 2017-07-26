<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAgenciesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('agencies', function (Blueprint $table) {
            $table->uuid('uuid')->default('')->comment('UUID');
            $table->char('code', 8)->default('')->comment('编号');
            $table->string('name')->default('')->comment('用户名');
            $table->string('real_name')->default('')->comment('姓名');
            $table->string('avatar')->default('')->comment('头像');
            $table->char('mobile', 11)->default('')->comment('手机号');
            $table->string('password')->default('')->comment('密码');
            $table->string('card_owner')->default('')->comment('持卡人姓名');
            $table->char('id_card', 18)->default('')->comment('身份证号码');
            $table->string('bank_account')->default('')->comment('银行账号');
            $table->string('bank_name')->default('')->comment('开户行');
            $table->string('openid')->default('')->comment('微信openid');
            $table->unsignedInteger('balance')->default(0)->comment('账户余额');
            $table->unsignedInteger('freeze_balance')->default(0)->comment('被冻结余额');
            $table->timestamp('agent_started_at')->nullable()->comment('代理开始时间');
            $table->timestamp('agent_ended_at')->nullable()->comment('代理结束时间');
            $table->uuid('areas_uuid')->default('')->comment('代理区域UUID');
            $table->string('areas_name')->default('')->comment('代理区域');
            $table->enum('agent_type', [ 'province', 'city', 'district' ])->default('city')->comment('代理类型');
            $table->enum('bonus_case', [ 'ip', 'pbc', 'ic', 'cbp' ])->default('pbc')->comment('分红方案');
            $table->enum('status', [ 'normal', 'locked' ])->default('normal')->comment('状态');
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
        Schema::dropIfExists('agencies');
    }
}
