<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateInvoicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->uuid('uuid')->default('')->comment('UUID');
            $table->uuid('members_uuid')->default('')->comment('会员UUID');
            $table->uuid('orders_uuid')->default('')->comment('订单UUID');
            $table->unsignedInteger('amount')->default(0)->comment('开票金额');
            $table->string('company')->default('')->comment('公司名称');
            $table->string('credit_code')->default('')->comment('信用代码');
            $table->string('company_addr')->default('')->comment('公司注册地');
            $table->string('bank_name')->default('')->comment('开户银行');
            $table->string('bank_account')->default('')->comment('银行账号');
            $table->string('license_img', 300)->default('')->comment('营业执照图片');
            $table->string('tax_img', 300)->default('')->comment('纳税人图片');
            $table->string('recipient_person')->default('')->comment('收件人');
            $table->string('recipient_phone')->default('')->comment('收件人电话');
            $table->string('recipient_addr')->default('')->comment('收件人地址');
            $table->timestamp('checked_time')->nullable()->comment('审核时间');
            $table->text('check_content')->nullable()->comment('审核内容');
            $table->uuid('operator_uuid')->default('')->comment('操作人uuid');
            $table->string('operator_name')->default('')->comment('操作人姓名');
            $table->enum('verify_pass', array('yes','ing','no'))->default('ing')->comment('审核通过标志');
            $table->softDeletes();
            $table->timestamps();
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
        Schema::drop('invoices');
    }
}
