<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// 会话验证
Route::group(['middleware' => 'auth'], function () {
    Route::get('/', function () {
        return redirect()->action('StatisticController@bonus');
    });

    Route::group(['prefix' => 'withdrawal'], function () {
        Route::get('check', 'WithdrawalController@check');
        Route::get('pass', 'WithdrawalController@pass');
        Route::get('deny', 'WithdrawalController@deny');
    });

    Route::group(['prefix' => 'statistic'], function () {
        Route::get('bonus', 'StatisticController@bonus');
        Route::get('order', 'StatisticController@show');
        Route::get('withdrawal', 'StatisticController@withdrawal');
        Route::get('detail', 'StatisticController@detail');
    });

    Route::group(['prefix' => 'excel'], function () {
        Route::get('bonus', 'ExcelController@bonus');
        Route::get('withdrawal', 'ExcelController@withdrawal');
    });

    Route::group(['prefix' => 'staff'], function () {
        Route::get('province', 'ProvinceStaffController@index');
        Route::post('province', 'ProvinceStaffController@store');

        Route::get('city', 'CityStaffController@index');
        Route::post('city', 'CityStaffController@store');
    });

    Route::group(['prefix' => 'agency'], function () {
        Route::get('province', 'ProvinceAgencyController@index');
        Route::post('province', 'ProvinceAgencyController@store');
        Route::group([ 'prefix' => 'province' ], function () {
            Route::get('history', 'ProvinceAgencyController@history');
            Route::post('close', 'ProvinceAgencyController@close');
            Route::post('open', 'ProvinceAgencyController@open');
        });

        Route::get('city', 'CityAgencyController@index');
        Route::post('city', 'CityAgencyController@store');
        Route::group([ 'prefix' => 'city' ], function () {
            Route::get('history', 'CityAgencyController@history');
            Route::post('close', 'CityAgencyController@close');
            Route::post('open', 'CityAgencyController@open');
        });

        Route::get('district', 'DistrictAgencyController@index');
        Route::post('district', 'DistrictAgencyController@store');
        Route::group([ 'prefix' => 'district' ], function () {
            Route::get('history', 'DistrictAgencyController@history');
            Route::post('close', 'DistrictAgencyController@close');
            Route::post('open', 'DistrictAgencyController@open');
        });
    });

    Route::group(['prefix' => 'bonus'], function () {
        // Route::get('setting', 'BonusController@index');
        // Route::post('setting', 'BonusController@store');
        Route::get('setting', 'BonusController@config');
        Route::post('setting', 'BonusController@setting');
    });
});

Route::post('bonus/calculate', 'BonusController@calculate');

Auth::routes();
