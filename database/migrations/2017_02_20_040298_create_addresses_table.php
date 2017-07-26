<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAddressesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('addresses', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->uuid('uuid')->default('')->comment('UUID');
            $table->string('real_name', 200)->default('')->comment('真实姓名');
            $table->string('mobile', 11)->default('')->comment('手机号码');
            $table->uuid('members_uuid')->default('')->comment('会员UUID');
            $table->uuid('areas_uuid')->default('')->comment('area_uuid');
            $table->text('detail')->nullable()->comment('详细街道楼栋门牌号');
            $table->enum('is_default', array('true ','false'))->default('false')->comment('是否为默认地址');
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
        Schema::drop('addresses');
    }
}
