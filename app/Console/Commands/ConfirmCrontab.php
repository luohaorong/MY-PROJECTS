<?php

namespace App\Console\Commands;

use App\Orders;
use Carbon\Carbon;
use Log;
use Illuminate\Console\Command;

class ConfirmCrontab extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'confirm';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'auto confirm receive order';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }


    /**
     *删除过期订单
     *清除为支付用户独家记录
     */
    public function handle()
    {
        Log::info('订单自动收货start---');
        $update = [];
        $update['order_state'] = '已完成';
        $update['finished_at'] = Carbon::now()->format('Y-m-d H:i:s');

        //支付成功后10天订单自动完成
        Orders::where('order_state', '已发货')
                ->where('payed_at', '<', Carbon::now()->subDays(10)->format('Y-m-d H:i:s'))
                ->update($update);
        Log::info('订单自动收货end---');
    }
}
