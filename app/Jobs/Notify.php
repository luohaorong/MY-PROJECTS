<?php

namespace App\Jobs;

use DB;
use Log;
use App\Flows;
use App\Pays;
use App\Jobs\Job;
use App\Events\OrderEvent;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Monolog\Handler\SyslogUdp\UdpSocket;

class Notify extends Job implements ShouldQueue
{
    use InteractsWithQueue, SerializesModels;

    protected $data;

    public function __construct($data)
    {
        $this->data = $data;
    }

    public function handle()
    {
        Log::info('订单：'.$this->data['pay_sn'].'，支付回调异步执行开始');
        // 1.订单校验
        $order = Pays::check($this->data);
        if (!$order) {
            exit;
        }

        DB::beginTransaction();
        // 2.修改订单状态
        $result = Pays::createUpdate($this->data, $order);
        if (!$result) {
            DB::rollBack();
            exit;
        }

        // 3.扣除下单冻结金币
        if ($order->use_corns > 0) {
            $result = Pays::deductCorns($order);
            if (!$result) {
                DB::rollBack();
                exit;
            }

            $result = Flows::consumeCorns($order);
            if (!$result) {
                DB::rollBack();
                exit;
            }
        }

        // 4.如果是独家订单,修改用户独家记录状态
        $result = Pays::exclusive($this->data);
        if (!$result) {
            DB::rollBack();
            exit;
        }

        // 5.余额支付修改用户余额
        if ($this->data['extra']['pay_way'] === 'balance') {
            $result = Pays::updateBalance($order);
            if (!$result) {
                DB::rollBack();
                exit;
            }

            $result = Flows::consumeBalance($order);
            if (!$result) {
                DB::rollBack();
                exit;
            }
        }

        Log::info('订单：'.$this->data['pay_sn'].'，支付回调异步执行结束');
        DB::commit();

        // 发送短信
        Pays::sendSms($order);

        // 通知后台审核
        event(new OrderEvent($order->uuid, $order->order_sn));
    }
}
