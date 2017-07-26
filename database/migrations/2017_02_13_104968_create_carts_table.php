<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCartsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('carts', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->uuid('uuid')->default('')->comment('UUID');
            //会员：购物车  == 1:1
            $table->uuid('members_uuid')->default('')->comment('会员ID');
            //购物车：商品  == 1：n
            $table->uuid('goods_uuid')->default('')->comment('商品UUID');
            $table->uuid('goods_extends_uuid')->default('')->comment('商品属性组合UUID');
            $table->string('goods_chinese_name',200)->comment('商品名称');
            $table->string('goods_english_name',200)->comment('商品名称');
            $table->string('station',200)->default('')->comment('商品仓库');
            $table->string('station_alias',200)->default('')->comment('商品仓库英文别名');
            $table->uuid('station_uuid')->default('')->comment('仓库UUID');
            $table->unsignedInteger('stock')->default(0)->comment('库存数量');
            $table->unsignedInteger('moq')->default(0)->comment('起订量');
            $table->string('image_path',200)->default('')->comment('商品缩略图');
            $table->unsignedInteger('goods_num')->default(0)->comment('商品数量');
            $table->unsignedInteger('goods_price')->default(0)->comment('商品价格');
            $table->unsignedInteger('stocking_pricing_ratio')->default(0)->comment('库存单位与定价单位比');
            $table->string('stocking_unit',255)->default('')->comment('库存单位');
            $table->enum('selected',array('true ','false'))->default('true')->comment('是否选中');
            $table->string('discount_method',255)->default('')->comment('具体活动表名');
            $table->uuid('discount_uuid')->default('')->comment('具体活动表对应的具体UUID');
            $table->enum('use_corns',array('true ','false'))->default('false')->comment('是否使用金币');
            $table->timestamp('expired_at')->nullable()->comment('购物车商品过期时间');
            //会员禁用处理
            //商品下架处理
            //组合销售购物车设计考虑
            $table->softDeletes(); //逻辑删除
            $table->primary('uuid');
            $table->timestamps();//创建时间
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('carts');
    }
}
