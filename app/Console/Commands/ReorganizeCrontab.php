<?php

namespace App\Console\Commands;

use App\GoodsCategories;
use App\GoodsAttrNames;
use Carbon\Carbon;
use Log;
use DB;
use Illuminate\Console\Command;

class ReorganizeCrontab extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'reorganize';


    protected $name = 'reorganize:start';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'reorganize script';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     *整理左右值
     */
    public function handle()
    {


    }
}
