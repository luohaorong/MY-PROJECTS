<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('oems', function (Blueprint $table) {
            $table->uuid('uuid')->default('')->comment('UUID');
            $table->string('chinese_name')->default('')->comment('中文名称');
            $table->string('english_name')->default('')->comment('英文名称');
            $table->unsignedInteger('paste_price')->default(0)->comment('酒浆单价（分）');
            $table->unsignedInteger('design_price')->default(0)->comment('设计单价（分）');
            $table->unsignedInteger('total_fee')->default(0)->comment('总费用（分）');
            $table->unsignedInteger('pre_fee')->default(0)->comment('预付款（分）');
            $table->unsignedInteger('pre_fee_ratio')->default(0)->comment('预付款比例（万分之几）');
            $table->unsignedInteger('quantity')->default(0)->comment('数量');
            $table->string('pricing_unit')->default('')->comment('定价单位');
            $table->string('stocking_unit')->default('')->comment('库存单位');
            $table->unsignedInteger('stocking_pricing_ratio')->default(0)->comment('库存单位与定价单位比');
            $table->string('combination')->default('')->comment('组合条件');
            $table->uuid('oem_pastes_uuid')->default('')->comment('酒浆UUID');
            $table->uuid('members_uuid')->default('')->comment('会员UUID');
            $table->string('remark')->default('')->comment('备注');
            $table->timestamp('checked_time')->nullable()->comment('审核时间');
            $table->text('check_content')->nullable()->comment('审核内容');
            $table->uuid('operator_uuid')->default('')->comment('操作人uuid');
            $table->string('operator_name')->default('')->comment('操作人姓名');
            $table->enum('verify_pass', array('yes','ing','no'))->default('ing')->comment('审核通过标志');
            $table->timestamps();
            $table->softDeletes();
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
        Schema::drop('oems');
    }
}
