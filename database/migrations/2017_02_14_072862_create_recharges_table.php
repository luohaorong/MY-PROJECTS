<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRechargesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     * 用户相关流水
     */
    public function up()
    {
        Schema::create('recharges', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->uuid('uuid')->default('')->comment('流水记录UUID');
            $table->string('trade_no')->default('')->comment('充值编号');
            $table->uuid('members_uuid')->default('')->comment('会员UUID');
            $table->enum('state', array('payed','not_payed'))->nullable()->comment('支付状态');
            $table->unsignedBigInteger('amount')->default(0)->comment('充值金额');
            $table->string('method')->default('')->comment('充值平台');
            $table->enum('inout', array('in','out'))->nullable()->comment('充值或者提现');
            $table->text('note')->nullable()->comment('说明');
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
        Schema::dropIfExists('recharges');
    }
}
