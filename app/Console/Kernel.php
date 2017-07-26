<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        \App\Console\Commands\OrderCrontab::class,
        \App\Console\Commands\ConfirmCrontab::class,
        \App\Console\Commands\CornsCrontab::class,
      //  \App\Console\Commands\ReorganizeCrontab::class,
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->command('order')
            ->everyMinute();

        $schedule->command('corns')
            ->everyMinute();

        $schedule->command('confirm')
            ->everyMinute();

    //    $schedule->command('reorganize');
    }
}
