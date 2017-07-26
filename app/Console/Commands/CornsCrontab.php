<?php

namespace App\Console\Commands;

use App\Flows;
use App\Members;
use App\MemberAuthAgencies;
use App\MemberAuthEnterprises;
use App\Orders;
use App\Setting;
use Carbon\Carbon;
use Log;
use DB;
use UUID;
use Illuminate\Console\Command;

class CornsCrontab extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'corns';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'return corns';

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
        Log::info('返金币start---');
        $orders = Orders::where('order_state', '已完成')
                        ->whereNull('promoted_at')
                        ->where('finished_at', '<', Carbon::now()->subDays(10)->format('Y-m-d H:i:s'))
                        ->get();

        if ($orders->isEmpty()) {
            exit;
        }

        // 金币折算
        $cornsSetting = Setting::where('key', 'gold')->first();
        $gold = json_decode($cornsSetting->value, true);

        $bonus = [];
        //完成时间后10天返金币
        foreach ($orders as $order) {
            DB::beginTransaction();
            $rs = Members::where('uuid', $order->members_uuid)
                           ->where('type', 'agency')
                           ->increment('corns', $order->corns);
                           
            if (!$rs) {
                DB::rollBack();
                continue;
            }

            $flows = new Flows();
            $flows->uuid = UUID::generate()->string;
            $flows->members_uuid = $order->members_uuid;
            $flows->amount = $order->corns;
            $flows->inout = 'in';
            $flows->type = 'corns';
            $flows->note = json_encode(['msg'=>'支付订单奖励金币','order_sn'=>$order->order_sn]);
            $rs = $flows->save();
            if (!$rs) {
                DB::rollBack();
                Log::info('创建金币收入流水失败');
                continue;
            }

            $order->promoted_at = Carbon::now()->format('Y-m-d H:i:s');
            $rs = $order->save();
            if (!$rs) {
                DB::rollBack();
                Log::info('处理订单优惠活动失败');
                continue;
            }
            DB::commit();

            $member = Members::find($order->members_uuid);
            if (!is_null($member)) {
                $tradeAmount = (int) $order->payed_amount + (int) $order->use_balance - (int) ($order->corns * $gold['exchange_money']);
                if ($member->type === 'agency') {
                    $maa = MemberAuthAgencies::where('members_uuid', $member->uuid)
                                                ->first();
                    if (!is_null($maa)) {
                        $bonus[] = [
                            'areas_uuid' => $maa->address_uuid,
                            'trade_amount' => $tradeAmount,
                            'bonus_source' => 'agency',
                            'orders_uuid' => $order->uuid,
                            'order_sn' => $order->order_sn,
                            'merchant_name' => $maa->company,
                            'members_uuid' => $order->members_uuid,
                        ];
                    }
                } elseif ($member->type === 'enterprise') {
                    $mae = MemberAuthEnterprises::where('members_uuid', $member->uuid)
                                                ->first();
                    if (!is_null($mae)) {
                        $bonus[] = [
                            'areas_uuid' => $mae->address_uuid,
                            'trade_amount' => $tradeAmount,
                            'bonus_source' => 'company',
                            'orders_uuid' => $order->uuid,
                            'order_sn' => $order->order_sn,
                            'merchant_name' => $mae->company,
                            'members_uuid' => $order->members_uuid,
                        ];
                    }
                }
            }
        }
        Log::info('返金币end---');

        // 分红返利
        httpPost(env('DISTRIBUTION_URL').'/bonus/calculate', $bonus);
    }
}
