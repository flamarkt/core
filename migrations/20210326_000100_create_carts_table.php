<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->create('flamarkt_carts', function (Blueprint $table) {
            $table->increments('id');
            $table->string('uid')->unique();
            $table->unsignedInteger('user_id')->nullable();
            $table->unsignedInteger('order_id')->nullable(); // No foreign constraint on purpose, it will be used to know if the cart has been ordered
            $table->unsignedInteger('product_count')->nullable();
            $table->unsignedInteger('price_total')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
        });
    },
    'down' => function (Builder $schema) {
        $schema->dropIfExists('flamarkt_carts');
    },
];
