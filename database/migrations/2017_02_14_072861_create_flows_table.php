<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFlowsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     * 用户相关流水
     */
    public function up()
    {
        Schema::create('flows', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->uuid('uuid')->default('')->comment('流水记录UUID');
            $table->uuid('members_uuid')->default('')->comment('会员UUID');
            $table->string('out_trade_no')->nullable()->comment('第三方平台交易号');
            $table->unsignedBigInteger('amount')->default(0)->comment('金额或者金币数量或者积分数量');
            $table->enum('inout', array('in','out'))->nullable()->comment('收入或者支出');
            $table->enum('type', array('corns','points','balance'))->nullable()->comment('类型');
            $table->text('note')->nullable()->comment('流水说明');
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
        Schema::dropIfExists('flows');
    }
}
