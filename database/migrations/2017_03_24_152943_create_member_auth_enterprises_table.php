<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMemberAuthEnterprisesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('member_auth_enterprises', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->uuid('uuid')->default('')->comment('UUID');
            $table->uuid('members_uuid')->default('')->comment('会员UUID');
            $table->string('duty', 255)->default('')->comment('职务');
            $table->string('id_card_img', 255)->default('')->comment('身份证图片路径');
            $table->string('company_addr', 255)->default('')->comment('公司注册地');
            $table->string('tel_num', 255)->default('')->comment('公司座机电话');
            $table->string('path_img', 300)->default('')->comment('单位公章证明图片路径');
            $table->string('company')->default('')->comment('公司名称');
            $table->timestamp('checked_time')->nullable()->comment('审核时间');
            $table->text('check_content')->nullable()->comment('审核内容');
            $table->uuid('operator_uuid')->default('')->comment('操作人uuid');
            $table->string('operator_name')->default('')->comment('操作人姓名');
            $table->enum('verify_pass', array('yes','ing','no'))->default('ing')->comment('审核通过标志');
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
        Schema::drop('member_auth_enterprises');
    }
}
