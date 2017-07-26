<?php

namespace App\Http\Controllers;

use App\Areas;
use App\Base;
use App\Carts;
use App\MemberAuthAgencies;
use App\MemberAuthEnterprises;
use App\Members;
use App\Banners;
use App\Floors;
use App\MembersAreas;
use App\Orders;
use App\SmsLogs;
use App\Goods;
use App\Countries;
use App\Events\RegisterEvent;
use Illuminate\Http\Request;
use DB;
use UUID;
use Cache;
use Validator;
use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Lucid\Jsonrpc\Jsonrpc;
use Illuminate\Support\Facades\Session;

class IndexController extends Controller
{

    /**
     * 网站首页
     */
    public function index(Request $request)
    {
        $banners = Banners::getIndexBanner();
        $floors = Floors::getFloorBar();
        foreach ($floors as $k => $v) {
            $goodsUuidArr = json_decode($v['goods_uuid'], true);
            $goods = Goods::whereIn('uuid', $goodsUuidArr);
            if (!session('uuid')) {
                // 未登录状态，不显示独家代理
                $goods = $goods->where('agent_type', '<>', 'region');
            }

            $goodsUuidStr = implode(',', $goodsUuidArr);
            $tmp = $goods->orderBy(DB::raw("find_in_set(uuid, '{$goodsUuidStr}')"))
                        ->limit(10)
                        ->get();
            if (is_null($tmp)) {
                $floors[$k]['goods'] = [];
            } else {
                foreach ($tmp as $goods) {
                    $goods->honor = json_decode($goods->honor, true);
                    $goods->country = Countries::find($goods->countries_uuid);
                }
                $floors[$k]['goods'] = $tmp;
            }
        }
        return view('index.index', [ 'banners' => $banners, 'floors' => $floors]);
    }



    /**
     * 登录页面
     */
    public function login(Request $request)
    {

        //get提交输出注册页面
        if ($request->method() == 'GET') {
            if (session('uuid')) {
                return redirect('/');
            }
            return view('index.login', ['redirect'=>urlencode($request->redirect)]);
        }
        $rule = [
            'mobile' => 'required|valid_mobile',
            'passwd' => 'required',
        ];

        // 判断是否需要图形验证码
        $ip = $request->getClientIp();
        if (Cache::has($ip)) {
            $rule['captcha'] = 'required|captcha';
            Cache::increment($ip);
        } else {
            Cache::put($ip, 1, 30);
        }

        $validator = Validator::make($request->all(), $rule);
        if ($validator->fails()) {
            $errors = $validator->errors();
            return back()->withErrors($errors)->withInput();
        }

        //判断用户是否存在
        $member = Members::where('mobile', $request->mobile)
            ->first();

        if (is_null($member)) {
            $validator->errors()->add('login_error', '该手机号未注册,请先注册');
            $errors = $validator->errors();
            return back()->withErrors($errors)->withInput();
        }

        // 登录超过三次锁定
        if (Cache::get($ip) > 3) {
            $member->is_locked = 'login_lock';
            $member->save();
            Cache::forget($ip);
        }

        //是否被封号
        if ($member->is_locked === 'yes') {
            $validator->errors()->add('login_error', '该账号已被封号');
            $errors = $validator->errors();
            return back()->withErrors($errors)->withInput();
        }

        //是否被登录锁定
        if ($member->is_locked === 'login_lock') {
            $validator->errors()->add('login_error', '该账号已被锁定,请手机验证码登录解锁');
            $errors = $validator->errors();
            return back()->withErrors($errors)->withInput();
        }


        //判断用户是否审核通过
        if ($member->type ==='agency') {
            $members_agencies = MemberAuthAgencies::where('members_uuid', $member->uuid)
                ->first();

            if ($members_agencies->verify_pass ==='ing') {
                $validator->errors()->add('login_error', '帐号审核中,请耐心等待');
                $errors = $validator->errors();
                return back()->withErrors($errors)->withInput();
            }


            if ($members_agencies->verify_pass ==='no') {
                $validator->errors()->add('login_error', '审核未通过,请联系客服');
                $errors = $validator->errors();
                return back()->withErrors($errors)->withInput();
            }
        }


        if ($member->type ==='enterprise') {
            $members_enterprise = MemberAuthEnterprises::where('members_uuid', $member->uuid)
                ->first();
            if ($members_enterprise->verify_pass ==='ing') {
                $validator->errors()->add('login_error', '帐号审核中,请耐心等待');
                $errors = $validator->errors();
                return back()->withErrors($errors)->withInput();
            }

            if ($members_enterprise->verify_pass ==='no') {
                $validator->errors()->add('login_error', '审核未通过,请联系客服');
                $errors = $validator->errors();
                return back()->withErrors($errors)->withInput();
            }
        }


        //验证密码是否正确
        if ($member->password != crypt($request->passwd, $member->rand_str)) {
            $validator->errors()->add('login_error', '用户名或者密码不正确');
            $errors = $validator->errors();
            return back()->withErrors($errors)->withInput();
        }

        //购物车数量
        $carts_count = Carts::where('members_uuid', $member->uuid)->count();

        //待支付订单数量
        $orders_count = Orders::where('members_uuid', $member->uuid)
            ->where('order_state', '待支付')
            ->count();

        //写session登录信息
        $request->session()->put('mobile', $request->mobile);
        $request->session()->put('balance', $member->balance);
        $request->session()->put('corns', ($member->corns-$member->freeze_corns));
        $request->session()->put('points', ($member->points-$member->freeze_points));
        $request->session()->put('uuid', $member->uuid);
        $request->session()->put('real_name', $member->real_name);
        $request->session()->put('last_login_at', $member->last_login_at);
        $request->session()->put('carts_count', $carts_count);
        $request->session()->put('orders_count', $orders_count);
        $request->session()->put('type', $member->type);

        // 清除登录次数
        Cache::forget($ip);
        //登录成功跳转目的页
        if (isset($request->redirect)) {
            return redirect(urldecode($request->redirect));
        }

        return redirect()->action('IndexController@index');
    }

    /**
     * 手机快捷登录
     */
    public function fastLogin(Request $request)
    {
        $request->merge([ 'fast' => true ]);
        $validator = Validator::make($request->all(), [
            'phone' => 'required|valid_mobile',
            'code' => 'required',
        ]);
        if ($validator->fails()) {
            $errors = $validator->errors();
            return back()->withErrors($errors)->withInput();
        }

        //判断用户是否存在
        $member = Members::where('mobile', $request->phone)->first();
        if (!$member) {
            $validator->errors()->add('fast_login_error', '该手机号未注册,请先注册');
            $errors = $validator->errors();
            return back()->withErrors($errors)->withInput();
        }

        //封号判断
        if ($member->is_locked === 'yes') {
            $validator->errors()->add('fast_login_error', '该账号已被封号');
            $errors = $validator->errors();
            return back()->withErrors($errors)->withInput();
        }

        //判断用户是否审核通过
        if ($member->type ==='agency') {
            $members_agencies = MemberAuthAgencies::where('members_uuid', $member->uuid)->first();

            if ($members_agencies->verify_pass ==='ing') {
                $validator->errors()->add('fast_login_error', '帐号审核中,请耐心等待');
                $errors = $validator->errors();
                return back()->withErrors($errors)->withInput();
            }


            if ($members_agencies->verify_pass ==='no') {
                $validator->errors()->add('fast_login_error', '审核未通过,请联系客服');
                $errors = $validator->errors();
                return back()->withErrors($errors)->withInput();
            }
        }


        if ($member->type ==='enterprise') {
            $members_enterprise = MemberAuthEnterprises::where('members_uuid', $member->uuid)
                                                        ->first();
            if ($members_enterprise->verify_pass === 'ing') {
                $validator->errors()->add('fast_login_error', '帐号审核中,请耐心等待');
                $errors = $validator->errors();
                return back()->withErrors($errors)->withInput();
            }

            if ($members_enterprise->verify_pass === 'no') {
                $validator->errors()->add('fast_login_error', '审核未通过,请联系客服');
                $errors = $validator->errors();
                return back()->withErrors($errors)->withInput();
            }
        }

        $time = time();
        //查证验证码
        $smslogs = SmsLogs::where('mobile', $request->phone)
                            ->where('code', $request->code)
                            ->where('status', 'success')
                            ->where('type', 'fast_login')
                            ->orderBy('created_at', 'desc')
                            ->first();


        //没查到或者不相等
        if (!$smslogs) {
            $validator->errors()->add('fast_login_error', '输入验证码错误');
            $errors = $validator->errors();
            return back()->withErrors($errors)->withInput();
        }


        if ($time >strtotime($smslogs->expired_at)) {
            $validator->errors()->add('fast_login_error', '验证码过期,请点击获取验证码');
            $errors = $validator->errors();
            return back()->withErrors($errors)->withInput();
        }

        if ($smslogs->code !== $request->code) {
            $validator->errors()->add('fast_login_error', '输入验证码错误');
            $errors = $validator->errors();
            return back()->withErrors($errors)->withInput();
        } else {
            $smslogs->delete();
        }

        //购物车数量
        $carts_count = Carts::where('members_uuid', $member->uuid)->count();

        //待支付订单数量
        $orders_count = Orders::where('members_uuid', $member->uuid)
                                ->where('order_state', '待支付')
                                ->count();

        //写session登录信息
        $request->session()->put('mobile', $request->phone);
        $request->session()->put('balance', $member->balance);
        $request->session()->put('corns', ($member->corns-$member->freeze_corns));
        $request->session()->put('points', ($member->points-$member->freeze_points));
        $request->session()->put('uuid', $member->uuid);
        $request->session()->put('real_name', $member->real_name);
        $request->session()->put('last_login_at', $member->last_login_at);
        $request->session()->put('carts_count', $carts_count);
        $request->session()->put('orders_count', $orders_count);
        $request->session()->put('type', $member->type);

        // 清除登录次数
        $ip = $request->getClientIp();
        if (Cache::has($ip) && $member->is_locked === 'login_lock') {
            $member->is_locked = 'no';
            $member->save();
            Cache::forget($ip);
        }

        //登录成功跳转目的页
        if (isset($request->redirect)) {
            return redirect(urldecode($request->redirect));
        }

        return redirect()->action('IndexController@index');
    }

    /**
     * 退出登录
     */
    public function logout()
    {
        Session::flush();
        return redirect()->to('login');
    }

    /**
     * 余额支付密码校验
     */
    public function passCheck(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'password' =>'required',
            'code'=>'required',
        ]);

        if ($validator->fails()) {
            return response()->json(configs('error_code.100'));
        }

        //验证输入密码合法性
        $members = Members::where('uuid', session('uuid'))
            ->where('is_locked', 'no')
            ->first();
        if ($members->password != crypt($request->password, $members->rand_str)) {
            return response()->json(configs('error_code.10022'));
        }

        //查证验证码
        $time = time();
        $smslogs = SmsLogs::where('mobile', $members->mobile)
            ->where('code', $request->code)
            ->where('status', 'success')
            ->where('type', 'balance_pay')
            ->orderBy('created_at', 'desc')
            ->first();

        if (is_null($smslogs)) {
            return response()->json(configs('error_code.10007'));
        }

        if ($time > strtotime($smslogs->expired_at)) {
            return response()->json(configs('error_code.10028'));
        }

        if ($smslogs->code !== $request->code) {
            return response()->json(configs('error_code.10005'));
        } else {
            //  $smslogs->delete();
        }

        return response()->json(configs('error_code.0'));
    }


    /**
     * 注册代理商会员
     */
    public function register(Request $request)
    {
        //get提交输出注册页面
        if ($request->method() === 'GET') {
            if (session('uuid')) {
                return redirect('/');
            }
            return view('index.register');
        }

       //post提交注册会员
        $validator = Validator::make($request->all(), [
            'mobile' => 'required|valid_mobile',
            'code' => 'required',
            'company' => 'required',
            'company_code' => 'required',
            'areas_uuid'=>'required',
            'passwd' => 'required',
            'confirm' => 'required',
            'company_addr'=>'required',
            'real_name'=>'required',
            'id_card'=>'required',
        ]);


        if ($validator->fails()) {
            $errors = $validator->errors();
            return back()->withErrors($errors)->withInput();
        }

        //查看验证码
        $smslogs = SmsLogs::where('code', $request->code)
            ->where('mobile', $request->mobile)
            ->where('status', 'success')
            ->where('type', 'register')
            ->orderBy('created_at', 'desc')
            ->first();


        if (!$smslogs) {
            $validator->errors()->add('code', '验证码错误,请重新输入');
            $errors = $validator->errors();
            return back()->withErrors($errors)->withInput();
        }

        if ($smslogs->code !== $request->code) {
            $validator->errors()->add('code', '验证码错误,请重新输入');
            $errors = $validator->errors();
            return back()->withErrors($errors)->withInput();
        } else {
            $smslogs->delete();
        }

        // 判断手机号是否存在
        $isExist = Members::where('mobile', $request->mobile)->exists();
        if ($isExist) {
            $validator->errors()->add('mobile', '手机号已存在');
            $errors = $validator->errors();
            return back()->withErrors($errors)->withInput();
        }

        //上传图片
        $file = $request->file('file');
        $filename = '';
        if ($file->isValid()) {
            $ext = $file->getClientOriginalExtension();
            $realPath = $file->getRealPath();
            $filename = '/company/' . date('Y-m-d-H-i-s') . '-' . uniqid() . '.' . $ext;
            $bool = Storage::disk('ftp')->put($filename.'/'.'origin', file_get_contents($realPath));
            if (!$bool) {
                $validator->errors()->add('file', '上传文件失败');
                $errors = $validator->errors();
                return back()->withErrors($errors)->withInput();
            }
        }

        //添加会员表
        DB::beginTransaction();
        $rand_str = '$1$'.gen_rand_str(8).'$';
        $members = new Members();
        $members->uuid = UUID::generate()->string;
        $members->mobile = $request->mobile;
        $members->rand_str = $rand_str;
        $members->type = 'agency';
        $members->password = crypt($request->passwd, $rand_str);
        $members->email = $request->email;
        $members->real_name = $request->real_name;
        $result = $members->save();
        if (!$result) {
            $validator->errors()->add('save_error', '提交申请失败,请重新输入');
            $errors = $validator->errors();
            DB::rollBack();
            return back()->withErrors($errors)->withInput();
        }


        //添加代理商审核认证表
        $members_agencies = new MemberAuthAgencies();
        $members_agencies->uuid = UUID::generate()->string;
        $members_agencies->members_uuid = $members->uuid;
        $members_agencies->duty = $request->duty;
        $members_agencies->company = $request->company;
        $members_agencies->company_addr = $request->company_addr;
        $members_agencies->tel_num = $request->area.'-'.$request->tel_num;
        $members_agencies->path_img = $filename;
        $members_agencies->address_uuid = $request->areas_uuid;
        $members_agencies->id_card = $request->id_card;
        $members_agencies->company_code = $request->company_code;
        $members_agencies->verify_pass = 'ing';
        $result = $members_agencies->save();
        if (!$result) {
            $validator->errors()->add('save_error', '提交申请失败,请重新输入');
            $errors = $validator->errors();
            DB::rollBack();
            return back()->withErrors($errors)->withInput();
        }


        //添加默认主营地区
        $members_areas = new MembersAreas();
        $members_areas->uuid =  UUID::generate()->string;
        $members_areas->members_uuid = $members->uuid;
        $members_areas->areas_uuid = $request->areas_uuid;
        $members_areas->detail = $request->company_addr;
        $members_areas->thumb = $filename;
        $members_areas->is_default = 'true';
        $result =  $members_areas->save();
        if (!$result) {
            $validator->errors()->add('areas_uuid', '提交申请失败,请重新输入');
            $errors = $validator->errors();
            DB::rollBack();
            return back()->withErrors($errors)->withInput();
        }

        DB::commit();

        // 通知后台审核
        event(new RegisterEvent($members_agencies->members_uuid, $members_agencies->company, 'agency'));

        return redirect()->action('IndexController@registerfinish');
    }


    /**
     * 企事业注册
     */
    public function enterpriseRegister(Request $request)
    {
        //get提交输出注册页面
        if ($request->method() == 'GET') {
            if (session('uuid')) {
                return redirect('/');
            }
            return view('index.enterpriseRegister');
        }

        //验证所有参数是否合法
        $validator = Validator::make($request->all(), [
            'mobile' => 'required|valid_mobile',
            'code' => 'required',
            'company' => 'required',
            'file' => 'required',
            'passwd' => 'required',
            'confirm' => 'required',
            'detail'=>'required',
            'username'=>'required',
            'country' => 'required',
           // 'card'=>'required',
            'card_pic'=>'required',
        ]);


        if ($validator->fails()) {
            $errors = $validator->errors();
            return back()->withErrors($errors)->withInput();
        }


        //验证验证码
        $smslogs = SmsLogs::where('code', $request->code)
            ->where('mobile', $request->mobile)
            ->where('status', 'success')
            ->where('type', 'register')
            ->orderBy('created_at', 'desc')
            ->first();
        if (!$smslogs) {
            $validator->errors()->add('code', '验证码错误,请重新输入');
            $errors = $validator->errors();
            return back()->withErrors($errors)->withInput();
        }
        if ($smslogs->code !== $request->code) {
            $validator->errors()->add('code', '验证码错误,请重新输入');
            $errors = $validator->errors();
            return back()->withErrors($errors)->withInput();
        } else {
            $smslogs->delete();
        }

        // 判断手机号是否存在
        $isExist = Members::where('mobile', $request->mobile)->exists();
        if ($isExist) {
            $validator->errors()->add('mobile', '手机号已存在');
            $errors = $validator->errors();
            return back()->withErrors($errors)->withInput();
        }
        
        //上传企业营业执照图片
        $file = $request->file('file');
        $file_company= '';
        if ($file->isValid()) {
            $ext = $file->getClientOriginalExtension();
            $realPath = $file->getRealPath();
            $file_company = '/company/' . date('Y-m-d-H-i-s') . '-' . uniqid() . '.' . $ext;
            $bool = Storage::disk('ftp')->put($file_company.'/'.'origin', file_get_contents($realPath));
            if (!$bool) {
                $validator->errors()->add('file', '上传文件失败');
                $errors = $validator->errors();
                return back()->withErrors($errors)->withInput();
            }
        }

        //上传企业采购人身份证图片
        $file = $request->file('card_pic');
        $file_avatar = '';
        if ($file->isValid()) {
            $ext = $file->getClientOriginalExtension();
            $realPath = $file->getRealPath();
            $file_avatar = '/id_Cards/' . date('Y-m-d-H-i-s') . '-' . uniqid() . '.' . $ext;
            $bool = Storage::disk('ftp')->put($file_avatar.'/'.'origin', file_get_contents($realPath));
            if (!$bool) {
                $validator->errors()->add('card_pic', '上传文件失败');
                $errors = $validator->errors();
                return back()->withErrors($errors)->withInput();
            }
        }


        //添加会员表
        DB::beginTransaction();
        $rand_str = '$1$'.gen_rand_str(8).'$';
        ;
        $members = new  Members();
        $members->uuid = UUID::generate()->string;
        $members->mobile = $request->mobile;
        $members->rand_str = $rand_str;
        $members->type = 'enterprise';
        $members->password = crypt($request->passwd, $rand_str);
        $members->email = $request->e_mail;
        $members->real_name = $request->username;
        $result = $members->save();
        if (!$result) {
            $validator->errors()->add('save_error', '提交申请失败,请重新输入');
            $errors = $validator->errors();
            DB::rollBack();
            return back()->withErrors($errors)->withInput();
        }
        // 公司注册地址
        $addr = Areas::getParentsPath($request->country);

        //添加代理商审核认证表
        $members_enterprises = new MemberAuthEnterprises();
        $members_enterprises->uuid = UUID::generate()->string;
        $members_enterprises->members_uuid = $members->uuid;
        $members_enterprises->duty = $request->department;
       // $members_enterprises->id_card_img = $request->card_pic;
        $members_enterprises->company = $request->company;
        $members_enterprises->company_addr = $addr.$request->detail;
        $members_enterprises->address_uuid = $request->country;
        $members_enterprises->tel_num = $request->area.'-'.$request->tel;
        $members_enterprises->path_img = $file_company;
        $members_enterprises->id_card_img = $file_avatar;
        $members_enterprises->verify_pass = 'ing';
        $result = $members_enterprises->save();
        if (!$result) {
            $validator->errors()->add('save_error', '提交申请失败,请重新输入');
            $errors = $validator->errors();
            DB::rollBack();
            return back()->withErrors($errors)->withInput();
        }
        DB::commit();

        // 通知后台审核
        event(new RegisterEvent($members_enterprises->members_uuid, $members_enterprises->company, 'company'));

        return redirect()->action('IndexController@registerfinish');
    }

    /**
     * 注册提交资料完成 等待审核
     */
    public function registerfinish()
    {
        return view('index.registerfinish');
    }

    /**
     * 发送短信请求
     */
    public function smsSend(Request $request)
    {
        $rule = [
            'mobile' => 'required|valid_mobile',
            'type' => 'required'
        ];
        if ($request->type === 'fast_login') {
            //判断用户是否存在
            $isExist = Members::where('mobile', $request->mobile)
                                ->where('is_locked', 'no')
                                ->exists();
            if (!$isExist) {
                return response()->json(config('error_code.10008'));
            }
        } else {
            $rule['captcha'] = 'required|captcha';
        }

        $validator = Validator::make($request->all(), $rule);

        if ($validator->fails()) {
            return response()->json(config('error_code.10003'));
        }

        //RPC发起短信日志记录
        $json = new Jsonrpc(
            config('jsonrpc.client.cloud.route'),
            'POST',
            config('jsonrpc.client.cloud.key')
        );

        $str = rand(1000, 9999);
        $params = [
            'mobile'=> [ $request->mobile ],
            'content'=> trans_message('sms.verification_code', [ 'code' => $str ]),
        ];

        $result = $json->send('sms', 'Kingtto.send', $params);

        //发送短信成功
        if (!empty($result->data) && ($result->data['returnstatus']==='Success')) {
            $sms_logs = new SmsLogs();
            $sms_logs->uuid = UUID::generate()->string;
            $sms_logs->mobile = $request->mobile;
            $sms_logs->content = '';
            $sms_logs->code = $str;
            $sms_logs->expired_at = Carbon::now()->addMinutes(3);
            $sms_logs->status = 'success';
            $sms_logs->type = $request->type;
            $sms_logs->save();
            return response()->json(config('error_code.0'));
        } else {
            //发送失败放队列处理
            $sms_logs = new SmsLogs();
            $sms_logs->uuid = UUID::generate()->string;
            $sms_logs->mobile = $request->mobile;
            $sms_logs->content = '';
            $sms_logs->code = $str;
            $sms_logs->expired_at = Carbon::now()->addMinutes(3);
            $sms_logs->status = 'failed';
            $sms_logs->type = $request->type;
            $sms_logs->save();
            return response()->json(config('error_code.10003'));
        }
    }

    /**
     * 短信安全验证
     */
    public function smsSecure(Request $request)
    {
        $validator = Validator::make($request->all(), ['type'=>'required']);
        if ($validator->fails()) {
            return response()->json(config('error_code.100'));
        }

        //RPC发起短信日志记录
        $json = new Jsonrpc(
            config('jsonrpc.client.cloud.route'),
            'POST',
            config('jsonrpc.client.cloud.key')
        );

        $str = rand(1000, 9999);
        $params = [
            'mobile'=> [ session('mobile') ],
            'content'=> trans_message('sms.verification_code', [ 'code' => $str ]),
        ];

        $result = $json->send('sms', 'Kingtto.send', $params);

        //发送短信成功
        if (!empty($result->data) && ($result->data['returnstatus']==='Success')) {
            $sms_logs = new SmsLogs();
            $sms_logs->uuid = UUID::generate()->string;
            $sms_logs->mobile =session('mobile');
            $sms_logs->content = '';
            $sms_logs->code = $str;
            $sms_logs->expired_at = Carbon::now()->addMinutes(3);
            $sms_logs->status = 'success';
            $sms_logs->type = $request->type;
            $sms_logs->save();
            return response()->json(config('error_code.0'));
        } else {
            //发送失败放队列处理
            $sms_logs = new SmsLogs();
            $sms_logs->uuid = UUID::generate()->string;
            $sms_logs->mobile = session('mobile');
            $sms_logs->content = '';
            $sms_logs->code = $str;
            $sms_logs->expired_at = Carbon::now()->addMinutes(3);
            $sms_logs->status = 'failed';
            $sms_logs->type = $request->type;
            $sms_logs->save();
            return response()->json(config('error_code.10003'));
        }
    }

    /**
     * 注册手机号验证
     */
    public function checkAccount(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'mobile' => 'required|valid_mobile',
        ]);

        if ($validator->fails()) {
            return response()->json(configs('error_code.100'));
        }

        $members = Members::where('mobile', $request->mobile)->first();
        if ($members) {
            return response()->json(configs('error_code.100'));
        }
        return response()->json(configs('error_code.0'));
    }


    /**
     * 获取省级别地址
     */
    public function getProvince()
    {
        //输出省
        $areas = Areas::where(['layout'=>2])->get();
        $tmp = array();
        foreach ($areas as $value) {
            $tmp[] = $value->toArray();
        }
        return  json_encode($tmp);
    }




    /**
     * 根据uuid获取所有市级行政区域
     */
    public function getAreas(Request $request)
    {
        $validator = Validator::make($request->all(), [
              'uuid' =>'required',
        ]);

        if ($validator->fails()) {
            return response()->json(configs('error_code.-1'));
        }

        $area = Areas::where('uuid', '=', $request->uuid)->first();
        if (!$area) {
            return response()->json(configs('error_code.-1'));
        }
        $area = $area->toArray();
        $areas = Areas::where('rgt', '<', $area['rgt'])
            ->where('lft', '>', $area['lft'])
            ->where(['layout'=>3])
            ->get();
        $tmp = array();
        foreach ($areas as $value) {
            $tmp[] = $value->toArray();
        }
        return json_encode($tmp);
    }




    /**
     * 根据uuid获取所有区级行政区域
     */
    public function getCountrys(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'uuid' =>'required',
        ]);

        if ($validator->fails()) {
            return response()->json(configs('error_code.-1'));
        }

        $area = Areas::where('uuid', '=', $request->uuid)->first();
        if (!$area) {
            return response()->json(configs('error_code.-1'));
        }
        $area = $area->toArray();
        $areas = Areas::where('rgt', '<', $area['rgt'])
            ->where('lft', '>', $area['lft'])
            ->where(['layout'=>4])
            ->get();
        $tmp = array();
        foreach ($areas as $value) {
            $tmp[] = $value->toArray();
        }
        return json_encode($tmp);
    }


    public function registerNav()
    {
        if (session('uuid')) {
            return redirect('/');
        }
        return view('index.registerNav');
    }


    //app银联支付回调webView
    public function unionReturn(Request $request)
    {
        return view('index.unionReturn', ['params'=>$request->params]);
    }

    //app关于我们webView
    public function aboutUs()
    {
        return view('index.aboutUs');
    }

    //用户注册协议
    public function agreement()
    {
        return view('index.agreement');
    }
}
