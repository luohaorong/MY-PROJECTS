<?php

namespace App\Providers;

use DB;
use Log;
use Blade;
use Validator;
use Schema;
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
        // DB::listen(function ($query) {
        //     Log::info('执行SQL：'.$query->sql);
        // });
        
        Validator::extend('captcha', function ($attribute, $value, $parameters, $validator) {
            return captcha_check($value);
        });

        Blade::directive('percent', function ($number) {
            return "<?php echo sprintf('%1$.2f', intval({$number}) / 100) ?>";
        });

        Blade::directive('currency', function ($money) {
            return "<?php echo '&yen; '.sprintf('%1$.2f', intval({$money}) / 100); ?>";
        });

        Schema::defaultStringLength(191);
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
