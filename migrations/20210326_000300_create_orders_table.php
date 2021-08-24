<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->create('flamarkt_orders', function (Blueprint $table) {
            $table->increments('id');
            $table->string('uid')->unique();
            $table->unsignedInteger('user_id')->nullable();
            $table->unsignedInteger('price_total');
            $table->unsignedInteger('paid_amount');
            $table->unsignedInteger('product_count');
            $table->timestamps();
            $table->timestamp('hidden_at')->nullable();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
        });
    },
    'down' => function (Builder $schema) {
        $schema->dropIfExists('flamarkt_orders');
    },
];
