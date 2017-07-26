<?php

namespace App\Http\Controllers;

use Exporter;
use App\Bonus;
use App\Withdrawal;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ExcelController extends Controller
{

    /**
     * 导出分红订单列表
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function bonus(Request $request)
    {
        $result = Bonus::where('agencies_uuid', $request->agencies_uuid)
                        ->orderBy('created_at', 'desc')
                        ->get();

        $collect = collect([ [ '日期', '时间', '订单号', '商家', '商户类型', '订单成交额', '返利', '返利比例' ] ]);
        foreach ($result as $bonus) {
            $tmp = [];
            $tmp[] = Carbon::parse($bonus->created_at)->toDateString();
            $tmp[] = Carbon::parse($bonus->created_at)->toTimeString();
            $tmp[] = $bonus->order_sn;
            $tmp[] = $bonus->merchant_name;
            $tmp[] = $bonus->bonus_source === 'company' ? '企业' : '经销商';
            $tmp[] = '¥ ' . ($bonus->trade_amount / 100);
            $tmp[] = '¥ ' . ($bonus->amount / 100);
            $tmp[] = ($bonus->amount / $bonus->trade_amount) * 100 . '%';
            $collect->push($tmp);
        }

        $excel = Exporter::make('Excel');
        $excel->load($collect);
        $stream = $excel->stream('分红明细.xls');
        return $stream;
    }

    /**
     * 导出提现列表
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function withdrawal(Request $request)
    {
        $result = Withdrawal::where('agencies_uuid', $request->agencies_uuid)
                        ->orderBy('created_at', 'desc')
                        ->get();

        $collect = collect([ [ '提现申请时间', '提现完成时间', '提现金额', '户名', '银行账号', '开户行', '备注' ] ]);
        foreach ($result as $withdrawal) {
            $tmp = [];
            $tmp[] = Carbon::parse($withdrawal->created_at)->toDateTimeString();
            $tmp[] = Carbon::parse($withdrawal->updated_at)->toDateTimeString();
            $tmp[] = '¥ ' . ($withdrawal->amount / 100);
            $tmp[] = $withdrawal->real_name;
            $tmp[] = $withdrawal->bank_account;
            $tmp[] = $withdrawal->bank_name;
            $tmp[] = $withdrawal->remark;
            $collect->push($tmp);
        }

        $excel = Exporter::make('Excel');
        $excel->load($collect);
        $stream = $excel->stream('提现明细.xls');
        return $stream;
    }
}
