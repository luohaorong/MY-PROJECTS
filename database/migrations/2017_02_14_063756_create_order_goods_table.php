<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrderGoodsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_goods', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->uuid('uuid')->default('')->comment('UUID');
            $table->uuid('orders_uuid')->default('')->comment('订单UUID');
            $table->uuid('goods_extends_uuid')->default('')->comment('商品扩展UUID');
            $table->uuid('goods_uuid')->default('')->comment('商品UUID');
            $table->unsignedInteger('goods_num')->default(0)->comment('商品数量');
            $table->unsignedInteger('goods_price')->default(0)->comment('商品价格');
            $table->unsignedInteger('stocking_pricing_ratio')->default(0)->comment('库存单位与定价单位比');
            $table->unsignedInteger('price_sum')->default(0)->comment('某型号商品总价格');
            $table->string('goods_image')->default('')->comment('订单缩略图路径');
            $table->string('goods_chinese_name', 200)->comment('商品中文名称');
            $table->string('goods_english_name', 200)->comment('商品英文名称');
            $table->uuid('members_uuid')->default('')->comment('会员UUID');
            $table->string('discount_method', 255)->default('')->comment('具体活动表名');
            $table->uuid('discount_uuid')->default('')->comment('具体活动表对应的具体UUID');
            $table->string('station', 200)->comment('仓库名');
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
        Schema::dropIfExists('order_goods');
    }
}
