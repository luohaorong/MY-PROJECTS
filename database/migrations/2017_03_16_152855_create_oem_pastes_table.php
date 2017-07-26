<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOemPastesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('oem_pastes', function (Blueprint $table) {
            $table->uuid('uuid')->default('')->comment('UUID');
            $table->uuid('countries_uuid')->default('')->comment('国别UUID');
            $table->string('level')->default('')->comment('等级');
            $table->string('district')->default('')->comment('产区');
            $table->string('category')->default('')->comment('类型');
            $table->string('capacity')->default('')->comment('容量');
            $table->string('remark')->default('')->comment('备注');
            $table->unsignedInteger('price')->default(0)->comment('销售价（分）');
            $table->unsignedInteger('cost')->default(0)->comment('成本价（分）');
            $table->unsignedInteger('moq')->default(0)->comment('起订量');
            $table->string('pricing_unit')->default('')->comment('定价单位');
            $table->string('stocking_unit')->default('')->comment('库存单位');
            $table->unsignedInteger('stocking_pricing_ratio')->default(0)->comment('库存单位与定价单位比');
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
        Schema::drop('oem_pastes');
    }
}
