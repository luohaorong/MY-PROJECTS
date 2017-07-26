<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMembersExclusivesTable extends Migration
{
    /**
     * Run the migrations.
     *用户独家表
     * @return void
     */
    public function up()
    {
        Schema::create('members_exclusives', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->uuid('uuid')->default('')->comment('UUID');
            $table->uuid('exclusives_uuid')->default('')->comment('商品表');
            $table->uuid('members_uuid')->default('')->comment('用户UUID');
            $table->uuid('areas_uuid')->default('')->comment('地区UUID');
            $table->uuid('goods_uuid')->default('')->comment('商品UUID');
            $table->uuid('orders_uuid')->default('')->comment('订单UUID');
            $table->timestamp('expired_at')->nullable()->comment('过期时间');
            $table->enum('status',array('false','true'))->default('false')->comment('独家是否生效状态');
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
        Schema::dropIfExists('members_exclusives');
    }
}
