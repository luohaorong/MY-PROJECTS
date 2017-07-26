<?php

namespace App\Http\Controllers;

use UUID;
use App\Invoices;
use App\Orders;
use Illuminate\Http\Request;
use Storage;
use Validator;

class InvoiceController extends BaseController
{
    /**
     * 发票申请
     */
    public function apply(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'orders_uuid' => 'required',
            'company' => 'required',
            'credit_code' => 'required',
            'company_addr' => 'required',
            'bank_name' => 'required',
            'bank_account' => 'required',
            'license_img' => 'required',
            'tax_img' => 'required',
            'recipient_person' => 'required',
            'recipient_addr' => 'required',
            'recipient_phone' => 'required',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
            return back()->withErrors($errors)->withInput();
        }

        if (!isset($request->uuid)) {
            $isExist = Invoices::where('orders_uuid', $request->orders_uuid)
                            ->exists();
            if ($isExist) {
                $validator->errors()->add('orders_uuid', '已经提交过发票申请了');
                $errors = $validator->errors();
                return back()->withErrors($errors)->withInput();
            }
        }

        $order = Orders::where('uuid', $request->orders_uuid)
                        ->where('order_state', '已完成')
                        ->first();

        if (is_null($order)) {
            $validator->errors()->add('order', '订单不存在或不具备开票条件');
            $errors = $validator->errors();
            return back()->withErrors($errors)->withInput();
        }

        // 上传营业执照
        $file = $request->file('license_img');
        $license = '';
        if ($file->isValid()) {
            $ext = $file->getClientOriginalExtension();
            $realPath = $file->getRealPath();
            $license = '/invoice/license/' . date('Y-m-d-H-i-s') . '-' . uniqid() . '.' . $ext;
            $bool = Storage::disk('ftp')->put($license.'/'.'origin', file_get_contents($realPath));
            if (!$bool) {
                $validator->errors()->add('license_img', '上传营业执照失败');
                $errors = $validator->errors();
                return back()->withErrors($errors)->withInput();
            }
        }

        // 上传纳税人资质
        $file = $request->file('tax_img');
        $tax = '';
        if ($file->isValid()) {
            $ext = $file->getClientOriginalExtension();
            $realPath = $file->getRealPath();
            $tax = '/invoice/tax/' . date('Y-m-d-H-i-s') . '-' . uniqid() . '.' . $ext;
            $bool = Storage::disk('ftp')->put($tax.'/'.'origin', file_get_contents($realPath));
            if (!$bool) {
                $validator->errors()->add('tax_img', '上传纳税人资质失败');
                $errors = $validator->errors();
                return back()->withErrors($errors)->withInput();
            }
        }

        if (isset($request->uuid)) {
            $invoice = Invoices::findOrFail($request->uuid);
        } else {
            $invoice = new Invoices();
        }
        $invoice->uuid = UUID::generate()->string;
        $invoice->members_uuid = session('uuid');
        $invoice->orders_uuid = $order->uuid;
        $invoice->amount = $order->payed_amount;
        $invoice->company = $request->company;
        $invoice->credit_code = $request->credit_code;
        $invoice->company_addr = $request->company_addr;
        $invoice->bank_name = $request->bank_name;
        $invoice->bank_account = $request->bank_account;
        $invoice->recipient_person = $request->recipient_person;
        $invoice->recipient_addr = $request->recipient_addr;
        $invoice->recipient_phone = $request->recipient_phone;
        $invoice->license_img = $license;
        $invoice->verify_pass = 'ing';
        $invoice->tax_img = $tax;
        $result = $invoice->save();

        if (!$result) {
            $validator->errors()->add('file', '提交申请失败');
            $errors = $validator->errors();
            return back()->withErrors($errors)->withInput();
        }

        return redirect()->action('OrdersController@orderlist');
    }
}
