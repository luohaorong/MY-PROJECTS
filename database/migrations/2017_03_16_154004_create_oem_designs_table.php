<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOemDesignsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('oem_designs', function (Blueprint $table) {
            $table->uuid('uuid')->default('')->comment('UUID');
            $table->enum('category', [ 'bottle', 'stopper', 'hat', 'label', 'technique', 'box' ])->default('bottle')->comment('类型');
            $table->string('name')->default('')->comment('名称');
            $table->unsignedInteger('price')->default(0)->comment('销售价（分）');
            $table->unsignedInteger('cost')->default(0)->comment('成本价（分）');
            $table->string('pricing_unit')->default('')->comment('定价单位');
            $table->uuid('members_uuid')->default('')->comment('会员UUID');
            $table->string('image')->default('')->comment('图片');
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
        Schema::drop('oem_designs');
    }
}
