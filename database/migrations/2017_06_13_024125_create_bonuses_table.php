<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBonusesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bonuses', function (Blueprint $table) {
            $table->uuid('uuid')->default('')->comment('UUID');
            $table->uuid('agencies_uuid')->default('')->comment('代理商UUID');
            $table->uuid('areas_uuid')->default('')->comment('地区UUID');
            $table->enum('bonus_source', [ 'agency', 'company' ])->default('agency')->comment('返利来源');
            $table->uuid('orders_uuid')->default('')->comment('订单UUID');
            $table->string('order_sn')->default('')->comment('订单编号');
            $table->string('merchant_name')->default('')->comment('商家名称');
            $table->uuid('members_uuid')->default('')->comment('会员UUID');
            $table->unsignedInteger('trade_amount')->default(0)->comment('订单成交额（分）');
            $table->unsignedInteger('amount')->default(0)->comment('返利金额（分）');
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
        Schema::dropIfExists('bonuses');
    }
}
