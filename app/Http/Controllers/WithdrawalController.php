<?php

namespace App\Http\Controllers;

use Log;
use App\Agency;
use App\Withdrawal;
use Illuminate\Http\Request;

class WithdrawalController extends Controller
{
 
    /**
     * 显示列表页面
     *
     * @return \Illuminate\Http\Response
     */
    public function check(Request $request)
    {
        $this->validate($request, [
            'status' => 'in:ing,yes,no,',
        ]);

        $model = Withdrawal::where([]);
        if (!empty($request->status)) {
            $model = $model->where('status', $request->status);
        }

        $withdrawals = $model->orderBy('created_at', 'desc')->paginate();
        foreach ($withdrawals as $withdrawal) {
            $withdrawal->agency = Agency::find($withdrawal->agencies_uuid);
        }
        return view('agency.withdrawal', [ 'withdrawals' => $withdrawals ]);
    }

    /**
     * 审核通过
     *
     * @return \Illuminate\Http\Response
     */
    public function pass(Request $request)
    {
        $withdrawal = Withdrawal::find($request->id);
        if (is_null($withdrawal)) {
            return output(1, '提现申请不存在');
        }
        if ($withdrawal->status !== config('const.withdrawals_status_ing')) {
            return output(2, '提现申请状态不处于审核中');
        }
        $withdrawal->status = config('const.withdrawals_status_yes');
        $withdrawal->check_content = '审核通过';
        $result = $withdrawal->save();
        if ($result) {
            $result = Agency::decrementBalance($withdrawal->agencies_uuid, $withdrawal->amount, '提现申请');
            if ($result) {
                return output();
            }
            Log::error('审核通过，但是减少余额失败', $withdrawal->toArray());
        }
        return output(3, '审核失败');
    }

    /**
     * 审核拒绝
     *
     * @return \Illuminate\Http\Response
     */
    public function deny(Request $request)
    {
        $withdrawal = Withdrawal::find($request->id);
        if (is_null($withdrawal)) {
            return output(1, '提现申请不存在');
        }
        if ($withdrawal->status !== config('const.withdrawals_status_ing')) {
            return output(2, '提现申请状态不处于审核中');
        }
        $withdrawal->status = config('const.withdrawals_status_no');
        $withdrawal->check_content = '审核不通过';
        $result = $withdrawal->save();
        if ($result) {
            return output();
        }
        return output(3, '审核失败');
    }
}
