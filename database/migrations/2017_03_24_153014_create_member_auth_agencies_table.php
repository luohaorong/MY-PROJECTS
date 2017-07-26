<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMemberAuthAgenciesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('member_auth_agencies', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->uuid('uuid')->default('')->comment('UUID');
            $table->uuid('members_uuid')->default('')->comment('会员UUID');
            $table->string('duty', 255)->default('')->comment('职务');
            $table->string('id_card', 255)->default('')->comment('身份证号码');
            $table->string('company_addr', 255)->default('')->comment('公司注册地');
            $table->string('tel_num', 255)->default('')->comment('公司座机电话');
            $table->string('path_img', 300)->default('')->comment('营业执照图片路径');
            $table->string('company')->default('')->comment('公司名称');
            $table->char('company_code', 18)->nullable()->comment('公司营业执照代码');
            $table->uuid('address_uuid')->nullable()->comment('经销商默认主营区域');
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
        Schema::drop('member_auth_agencies');
    }
}
