<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePaysTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pays', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->uuid('uuid')->default('')->comment('UUID');
            $table->string('pay_sn')->default('')->comment('支付单编号');
            $table->unsignedInteger('money')->default(0)->comment('支付金额');
            $table->string('trade_no')->default('')->comment('平台交易号');
            $table->string('order_no')->default('')->comment('众酒荟订单编号');
            $table->string('members_uuid')->default('')->comment('用户UUID');
            $table->enum('pay_way', array('alipay','weixin','bank','balance','ABC',''))->default('')->comment('支付方式');
            $table->timestamps();  //创建时间
            $table->softDeletes(); //逻辑删除
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
        Schema::dropIfExists('pays');
    }
}
