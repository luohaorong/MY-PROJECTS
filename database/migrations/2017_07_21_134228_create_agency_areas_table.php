<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAgencyAreasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('agency_areas', function (Blueprint $table) {
            $table->uuid('uuid')->default('')->comment('UUID');
            $table->uuid('agencies_uuid')->default('')->comment('代理商UUID');
            $table->uuid('areas_uuid')->default('')->comment('地区UUID');
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
        Schema::dropIfExists('agency_areas');
    }
}
