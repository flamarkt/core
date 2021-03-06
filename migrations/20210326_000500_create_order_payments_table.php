<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->create('flamarkt_order_payments', function (Blueprint $table) {
            $table->increments('id');
            $table->string('uid')->unique();
            $table->unsignedInteger('order_id');
            $table->unsignedInteger('user_id')->nullable();
            $table->string('method')->nullable();
            $table->string('identifier')->nullable();
            $table->unsignedInteger('amount');
            $table->timestamps();

            $table->foreign('order_id')->references('id')->on('flamarkt_orders')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
        });
    },
    'down' => function (Builder $schema) {
        $schema->dropIfExists('flamarkt_order_payments');
    },
];
