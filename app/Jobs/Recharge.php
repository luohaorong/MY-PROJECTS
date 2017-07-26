<?php

namespace App\Jobs;

use App\Flows;
use App\Jobs\Job;
use App\Recharges;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Pays;
use DB;
use Log;

class Recharge extends Job implements ShouldQueue
{
    use InteractsWithQueue, SerializesModels;

    protected $data;

    public function __construct($data)
    {
        $this->data = $data;
    }


    /**
     * @return void
     */
    public function handle()
    {
        Log::info('充值：'.$this->data['pay_sn'].'，支付回调异步执行开始');

        DB::beginTransaction();
        //1.修改充值记录状态
        $result = Recharges::updateRecharge($this->data);
        if (!$result) {
            DB::rollBack();
            exit;
        }

        //2.充值奖励积分
        $recharge = Recharges::updatePoints($this->data);
        if (!$recharge) {
            DB::rollBack();
            exit;
        }

        $result = Recharges::returnPoints($recharge);
        if (!$result) {
            DB::rollBack();
            exit;
        }

        //3.创建充值余额流水
        $flows = Recharges::createBalanceFlows($this->data);
        if (!$flows) {
            DB::rollBack();
            exit;
        }

        //4.修改用户余额
        $result = Recharges::updateBalance($this->data);
        if (!$result) {
            DB::rollBack();
            exit;
        }
        DB::commit();
        
        Log::info('充值：'.$this->data['pay_sn'].'，支付回调异步执行结束');
    }
}
