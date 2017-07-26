<?php

namespace App\Console\Commands;

use App\GoodsExtends;
use App\MembersExclusives;
use App\OrderGoods;
use App\Orders;
use Carbon\Carbon;
use Log;
use DB;
use Illuminate\Console\Command;

class OrderCrontab extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'order';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

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
        $time = Carbon::now()->format('Y-m-d H:i:s');

        Log::info('开始清空无效超期用户独家记录');
        MembersExclusives::where('expired_at', '<', $time)
                            ->where('status', 'false')
                            ->delete();
        Log::info('结束清空无效超期用户独家记录');

        $isExist = Orders::where('expired_at', '<', $time)
                            ->where('order_state', '待支付')
                            ->exists();

        if (!$isExist) {
            exit;
        }

        $uuid = Orders::where('expired_at', '<', $time)
                        ->where('order_state', '待支付')
                        ->pluck('uuid')
                        ->toArray();

        Log::info('开始清空过期订单');
        DB::beginTransaction();
        $order_goods = OrderGoods::whereIn('orders_uuid', $uuid)
                                    ->get();
        foreach ($order_goods as $v) {
            $result = GoodsExtends::where('uuid', $v->goods_extends_uuid)
                            ->increment('stock', $v->goods_num);
            if (!$result) {
                DB::rollBack();
                Log::info('清空过期订单失败');
                exit;
            }
        }

        $reason = [];
        $reason['order_state'] = '已取消';
        $reason['canceled_at'] = $time;
        $reason['canceled_content'] = '超时取消';

        $result = Orders::where('expired_at', '<', $time)
                        ->where('order_state', '待支付')
                        ->update($reason);
                        
        if (!$result) {
            DB::rollBack();
            Log::info('清空过期订单失败');
            exit;
        }

        Log::info('结束清空过期订单');
        DB::commit();
    }
}
