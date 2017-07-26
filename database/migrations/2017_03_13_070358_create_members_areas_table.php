<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMembersAreasTable extends Migration
{
    /**
     * Run the migrations.
     *主营区域表
     * @return void
     */
    public function up()
    {
        Schema::create('members_areas', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->uuid('uuid')->default('')->comment('UUID');
            $table->uuid('members_uuid')->default('')->comment('用户UUID');
            $table->uuid('areas_uuid')->default('')->comment('主营地区UUID');
            $table->text('company_code')->nullable()->comment('营业执照组织代码');
            $table->text('detail')->nullable()->comment('详细地址');
            $table->text('thumb')->nullable()->comment('营业执照图片');
            $table->enum('verify_pass', array('yes','ing','no'))->default('ing')->comment('审核通过标志');
            $table->enum('is_default', array('true ','false'))->default('false')->comment('默认主营地区');
            $table->timestamp('checked_time')->nullable()->comment('审核时间');
            $table->text('check_content')->nullable()->comment('审核内容');
            $table->uuid('operator_uuid')->default('')->comment('操作人uuid');
            $table->string('operator_name')->default('')->comment('操作人姓名');
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
        Schema::dropIfExists('members_areas');
    }
}
