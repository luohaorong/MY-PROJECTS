<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWithdrawalsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('withdrawals', function (Blueprint $table) {
            $table->uuid('uuid')->default('')->comment('UUID');
            $table->string('withdrawal_sn')->default('')->comment('单号');
            $table->string('real_name')->default('')->comment('姓名');
            $table->char('id_card', 18)->default('')->comment('身份证号码');
            $table->string('bank_name')->default('')->comment('开户行');
            $table->string('bank_account')->default('')->comment('银行账号');
            $table->unsignedInteger('amount')->default(0)->comment('提现金额（分）');
            $table->uuid('agencies_uuid')->default('')->comment('代理商UUID');
            $table->enum('status', [ 'ing', 'yes', 'no' ])->default('ing')->comment('状态');
            $table->string('check_content')->default('')->comment('审核内容');
            $table->string('remark')->default('')->comment('备注');
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
        Schema::dropIfExists('withdrawals');
    }
}
