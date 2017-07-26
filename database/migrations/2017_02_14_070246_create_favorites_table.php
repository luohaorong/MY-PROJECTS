<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFavoritesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('favorites', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->uuid('uuid')->default('')->comment('收藏UUID');
            $table->uuid('members_uuid')->default('')->comment('会员UUID');
            $table->uuid('goods_uuid')->default('')->comment('商品UUID');
            $table->string('goods_image')->default('')->comment('订单缩略图路径');
            $table->string('goods_chinese_name',200)->comment('商品名称');
            $table->string('goods_english_name',200)->comment('商品名称');
            $table->timestamp('expired_at')->nullable()->comment('收藏过期时间');
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
        Schema::dropIfExists('favorites');
    }
}
