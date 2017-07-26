<?php

namespace App\Events;

use App\Events\Event;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class OrderEvent extends Event implements ShouldBroadcast
{
    use SerializesModels;

    public $uuid;
    public $order_sn;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($uuid, $orderSn)
    {
        $this->uuid = $uuid;
        $this->order_sn = $orderSn;
    }

    /**
     * Get the channels the event should be broadcast on.
     *
     * @return array
     */
    public function broadcastOn()
    {
        return ['private-pusher'];
    }
}
