<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExclusivesTable extends Migration
{
    /**
     * Run the migrations.
     *独家活动表
     * @return void
     */
    public function up()
    {
        Schema::create('exclusives', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->uuid('uuid')->default('')->comment('UUID');
            $table->uuid('goods_uuid')->default('')->comment('商品表');
            $table->uuid('goods_extends_uuid')->default('')->comment('商品扩展表');
            $table->uuid('areas_uuid')->default('')->comment('地区uuid');
            $table->unsignedInteger('price')->default(0)->comment('独家销售价（分）');
            $table->unsignedInteger('moq')->default(0)->comment('独家起订量');
            $table->enum('exclusive_time', array('quarter','half','year'))->default('year')->comment('独家周期');
            $table->string('pricing_unit')->default('')->comment('定价单位');
            $table->string('stocking_unit')->default('')->comment('库存单位');
            $table->unsignedInteger('stocking_pricing_ratio')->default(0)->comment('库存单位与定价单位比');
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
        Schema::dropIfExists('exclusives');
    }
}
