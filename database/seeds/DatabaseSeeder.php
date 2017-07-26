<?php

use Illuminate\Database\Seeder;
class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call('MembersExclusivesTableSeeder');
        $this->command->info('MembersExclusivesTableSeeder table seeded!');
    }
}

class MembersExclusivesTableSeeder extends Seeder {

    public function run()
    {
        \App\Activities::create([
            'uuid' => '08d9-11e7-a61f-a7017a8b5235-b61e4875',
            'activity_code'=>'miaosha',
            'activity_title'=>'秒杀活动',
            'activity_desc'=>'参与秒杀活动,一元免邮费',
            'banners_uuid'=>'true',
            'activity_status'=>'true',
            'begin_time'=>strtotime('Y-m-d H:i:s',time()),
            'end_time'=>strtotime('Y-m-d H:i:s',time()+86400*31),
            'goods_uuid'=>json_encode(Array(
                '0ac085b0-29a0-11e7-bd2c-d12b03519734',
                '14ad6240-29a8-11e7-b0ec-ed66cac13f67',
                '31fcc590-29a1-11e7-8f35-29138105bf2d',
                '3ffd4de0-29a6-11e7-85fc-cf56f8e78759',
                '6defa850-29a8-11e7-a893-2fa465c37cd6',
                '7a7d6160-29a7-11e7-a72d-8b3d73f97c7f',
                '7f1127a0-29a3-11e7-b19f-93ae91a3f965',
                '8052bd60-29a9-11e7-80ce-d9c4a102fb88',
                '90ce1ac0-29a2-11e7-8c05-25770312e9fe',
                '95c14db0-2997-11e7-8683-efeb63fea1d6',
                '9f0b1720-29a5-11e7-8f2d-3f7b578bbec9',
                'a8ed6bc0-299f-11e7-b304-d9820d4d2e6e',
                'ba4b4710-29a6-11e7-8cd7-b57d88b3055f',
                'c108ab40-2990-11e7-83c3-4711c177a985',
                'd6074b10-29a1-11e7-a9ad-ffca16aa373e',
                'e8c75300-29a8-11e7-91a1-01f6624c5fb1',
                'e8e45040-29a7-11e7-8d62-a37da6e25ca4',
                'f566c680-29a4-11e7-8888-37b50105d479')),
            'deleted_at' => null,
            'created_at'=>strtotime('Y-m-d H:i:s',time()),
            'updated_at'=>strtotime('Y-m-d H:i:s',time()),
        ]);
    }
}

//class MembersExclusivesTableSeeder extends Seeder {
//
//    public function run()
//    {
//        //DB::table('members_areas')->delete();
//        \App\MembersExclusives::create([
//            'uuid' => '08d8-11e7-a61f-a7017a8b5235-b61e4d87',
//            'exclusives_uuid'=>'f32e8680-2334-11e7-9e44-578c7267441b',
//            'members_uuid'=>'6ff8cf00-fe4a-11e6-be9f-5dddf0192ea7',
//            'areas_uuid'=>'05022740-dd25-11e6-b6c1-d797ed0aebde',
//            'status'=>'true',
//            'deleted_at'=>null,
//            'created_at'=>time(),
//            'updated_at'=>time(),
//        ]);
//    }
//
//}





//class ExclusivesTableSeeder extends Seeder {
//
//    public function run()
//    {
//        //DB::table('members_areas')->delete();
//        \App\Exclusives::create([
//            'uuid' => 'b61e3d60-08d8-11f7-a6ff-a7017a8b5235',
//            'goods_uuid'=>'030a2d80-0221-11e7-854b-cb60a2ae7743',
//            'goods_extends_uuid'=>'0f935980-062c-11e7-a910-f94a85fca590',
//            'areas_uuid'=>'05035b90-dd25-11e6-ac51-e1dbe92c73bf',
//            'price'=>'32800',
//            'moq'=>300,
//            'exclusive_time'=>'quarter',
//            'pricing_unit'=>'瓶',
//            'stocking_unit'=>'箱',
//            'stocking_pricing_ratio'=>6,
//            'deleted_at'=>null,
//            'created_at'=>time(),
//            'updated_at'=>time(),
//        ]);
//    }
//
//}
