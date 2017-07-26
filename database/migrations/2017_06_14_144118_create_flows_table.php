<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFlowsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('flows', function (Blueprint $table) {
            $table->uuid('uuid')->default('')->comment('UUID');
            $table->uuid('agencies_uuid')->default('')->comment('代理商UUID');
            $table->unsignedInteger('amount')->default(0)->comment('金额（分）');
            $table->enum('type', [ 'income', 'outcome' ])->default('income')->comment('收支');
            $table->enum('category', [ 'balance' ])->default('balance')->comment('类型');
            $table->enum('status', [ 'freeze', 'normal' ])->default('normal')->comment('状态');
            $table->string('remark')->default('')->comment('备注');
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
        Schema::dropIfExists('flows');
    }
}
