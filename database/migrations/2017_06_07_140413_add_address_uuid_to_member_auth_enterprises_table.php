<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddAddressUuidToMemberAuthEnterprisesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('member_auth_enterprises', function (Blueprint $table) {
            $table->uuid('address_uuid')->default('')->comment('企业地址UUID');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('member_auth_enterprises', function (Blueprint $table) {
            $table->dropColumn('address_uuid');
        });
    }
}
