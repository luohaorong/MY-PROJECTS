<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateActivitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('activities', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->uuid('uuid')->default('')->comment('UUID');
            $table->string('activity_code',255)->default('')->comment('活动代号');
            $table->string('activity_title',255)->default('')->comment('活动标题');
            $table->string('activity_desc',255)->default('')->comment('活动描述');
            $table->string('banners_uuid',255)->default('')->comment('活动banner_uuid');
            $table->enum('activity_status',array('false','true'))->default('true')->comment('活动状态');
            $table->timestamp('begin_time')->nullable()->comment('活动开始时间');
            $table->timestamp('end_time')->nullable()->comment('活动结束时间');
            $table->text('goods_uuid')->nullable()->comment('商品UUID数组编码json_encode');
            $table->uuid('operator_uuid')->default('')->comment('云酒平台操作人uuid');
            $table->string('operator_name')->default('')->comment('云酒平台操作人姓名');
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
        Schema::dropIfExists('activities');
    }
}
