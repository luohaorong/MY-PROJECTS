<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDeliveryBillsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('delivery_bills', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->uuid('uuid')->default('')->comment('UUID');
            $table->bigInteger('orders_sn')->default(0)->comment('订单编号');
            $table->string('orders_uuid')->default('')->comment('订单uuid');
            $table->uuid('members_uuid')->default('')->comment('下单客户');
            $table->string('shipping_code')->default('')->comment('物流编号');
            $table->string('shipping_fee')->default('')->comment('物流费');
            $table->string('addresses_uuid')->default('')->comment('用户收件地址uuid');
            $table->string('service_fee')->default('')->comment('上门服务费');
            $table->enum('delivery_method', array('freight','express','self','other'))->comment('配送方式');
            $table->string("send_station", 255)->default('')->comment('发送城市');
            $table->enum('home_service', array('no','yes'))->default('no')->comment('送货上门');
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
        Schema::dropIfExists('delivery_bills');
    }
}
