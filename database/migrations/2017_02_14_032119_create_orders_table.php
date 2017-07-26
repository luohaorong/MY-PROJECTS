<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->uuid('uuid')->default('')->comment('UUID');
            $table->string('order_sn')->default('')->comment('订单编号');
            $table->uuid('members_uuid')->default('')->comment('下单客户');
            $table->string('pay_sn')->default('')->comment('支付编号');
            $table->string('addresses_uuid')->default('')->comment('用户收件地址快照');
            $table->enum('order_from_client', array('pc','app','weixin','system'))->comment('下单客户端');
            $table->enum('order_state', array('待支付','已支付','待发货','已发货','已完成','已取消'))->comment('订单状态');
            $table->enum('pay_method', array('alipay','weixin','bank','balance','ABC',''))->comment('支付方式');
            $table->timestamp('payed_at')->nullable()->comment('支付完成时间');
            $table->timestamp('canceled_at')->nullable()->comment('订单取消时间');
            $table->string('canceled_content')->default('')->comment('订单取消原因');
            $table->timestamp('checked_at')->nullable()->comment('订单审核时间');
            $table->timestamp('output_at')->nullable()->comment('出库时间');
            $table->timestamp('send_at')->nullable()->comment('发货时间');
            $table->timestamp('finished_at')->nullable()->comment('订单完成时间');
            $table->text('check_content')->nullable()->comment('审核内容');
            $table->string('operator_name')->default('')->comment('操作人姓名');
            $table->text('address')->nullable()->comment('用户收件地址快照');

            //以分为单位
            $table->unsignedInteger('goods_amount')->default(0)->comment('商品总价格');
            $table->unsignedInteger('order_amount')->default(0)->comment('订单总价格');
            $table->unsignedInteger('payed_amount')->default(0)->comment('实际支付金额');
            $table->unsignedInteger('service_amount')->default(0)->comment('上门服务费总金额');
            $table->unsignedInteger('benefit_amount')->default(0)->comment('优惠总金额');


            $table->unsignedInteger('shipping_fee')->default(0)->comment('物流运费');
            $table->enum('refund_state', array('no_refund','part_refund','all_refund'))->comment('退款状态');
            $table->unsignedInteger('refund_amount')->comment('退款金额');
            $table->string('operator_uuid')->default('')->comment('操作人UUID');
            $table->unsignedInteger('use_corns')->default(0)->comment('抵用金币');
            $table->unsignedInteger('use_points')->default(0)->comment('抵用积分');
            $table->unsignedInteger('use_balance')->default(0)->comment('抵用余额');
            $table->timestamp('refund_finished_at')->nullable()->comment('退款完成时间');
            $table->timestamp('expired_at')->nullable()->comment('过期时间');
            $table->unsignedBigInteger('corns')->default(0)->comment('奖励金币');
            $table->unsignedBigInteger('points')->default(0)->comment('奖励积分');

            //是否锁定
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
        Schema::dropIfExists('orders');
    }
}
