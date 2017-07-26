<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRecentScansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('recent_scans', function (Blueprint $table) {
            $table->uuid('uuid')->default('')->comment('收藏UUID');
            $table->uuid('members_uuid')->default('')->comment('会员UUID');
            $table->uuid('goods_uuid')->default('')->comment('商品UUID');
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
        Schema::drop('recent_scans');
    }
}
