<?php

namespace App\Providers;

use App\Events\OrderPlaced;
use App\Listeners\SendOrderPlacedNotification;
use Illuminate\Support\ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    protected $listen = [
        OrderPlaced::class => [
            SendOrderPlacedNotification::class,
        ],
    ];
    public function boot(): void
    {
        //
    }
}
