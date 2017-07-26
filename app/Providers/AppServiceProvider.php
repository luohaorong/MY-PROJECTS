<?php

namespace App\Providers;

use DB;
use Log;
use Validator;
use Blade;
use Artisan;
use App\Setting;
use App\PaginationPresenter;
use Illuminate\Pagination\Paginator;
use Illuminate\Pagination\AbstractPaginator;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // 系统状态
        $system = Setting::get('system');
        if (!is_null($system)) {
            Artisan::call($system['status'] === 'close' ? 'down' : 'up');
        }

        // 图形验证码
        Validator::extend('captcha', function ($attribute, $value, $parameters, $validator) {
            return  captcha_check($value);
        });

        //验证手机
        Validator::extend('valid_mobile', function ($attribute, $value, $parameters, $validator) {
            return  valid_mobile($value);
        });

        //验证邮箱
        Validator::extend('valid_email', function ($attribute, $value, $parameters, $validator) {
            return  valid_email($value);
        });

        //验证密码
        Validator::extend('valid_passwd', function ($attribute, $value, $parameters, $validator) {
            return  valid_passwd($value);
        });

        Blade::directive('image', function ($option) {
            return "<?php echo is_array({$option}) ? (empty({$option}[0]) ? '' : config('image.image_url').{$option}[0].'/'.{$option}[1].'x'.{$option}[2]) : (empty({$option}) ? '' : config('image.image_url').{$option}.'/origin'); ?>";
        });

        Blade::directive('currency', function ($money) {
            return "<?php echo session('uuid') ? '&yen; '.sprintf('%1$.2f', intval({$money}) / 100) : '&yen; : 请登录'; ?>";
        });

        Blade::directive('privacy_mobile', function ($mobile) {
            return "<?php echo preg_replace('/(\d{3})(\d{4})(\d{4})/i', '$1****$3', {$mobile}) ?>";
        });

        // DB::listen(function ($query) {
        //     Log::info('执行SQL：'.$query->sql);
        // });

        // 使用自定义分页模板
        Paginator::presenter(function (AbstractPaginator $paginator) {
            return new PaginationPresenter($paginator);
        });
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
    }
}
