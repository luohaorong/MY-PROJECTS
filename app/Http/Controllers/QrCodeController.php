<?php

namespace App\Http\Controllers;

use Identify;
use App\AppVersion;
use Illuminate\Http\Request;

class QrCodeController extends Controller
{
    /**
     * 扫码下载
     *
     * @param  Request $request
     * @return
     */
    public function index(Request $request)
    {
        $platform = Identify::os()->getName();
        $appVersion = AppVersion::where('platform', strtolower($platform))
                                ->orderBy('created_at', 'desc')
                                ->first();

        if (is_null($appVersion)) {
            return view('qrcode.index');
        }

        return redirect($appVersion->download_url);
    }
}
