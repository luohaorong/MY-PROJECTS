<?php

namespace App\Http\Controllers\Auth;

use Cache;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    /**
     * Validate the user login request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return void
     */
    protected function validateLogin(Request $request)
    {
        if (Cache::has('login_times')) {
            $loginTimes = Cache::get('login_times');
            if ($loginTimes > 3) {
                return redirect('/login');
            }
            Cache::increment('login_times');
        } else {
            Cache::put('login_times', 1, 15);
        }
        $this->validate($request, [
            $this->username() => 'required',
            'password' => 'required',
            'validation' => 'required|captcha',
        ]);
    }

    /**
     *
     * 登录成功回调
     *
     * @param  Request $request
     * @param  object  $user
     */
    protected function authenticated(Request $request, $user)
    {
        Cache::forget('login_times');
    }

    /**
     *
     * 验证账号
     *
     * @return string
     */
    public function username()
    {
        return 'email';
    }
}
