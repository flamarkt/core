<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->create('flamarkt_product_user', function (Blueprint $table) {
            $table->unsignedInteger('product_id');
            $table->unsignedInteger('user_id');

            $table->foreign('product_id')->references('id')->on('flamarkt_products')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    },
    'down' => function (Builder $schema) {
        $schema->dropIfExists('flamarkt_product_user');
    },
];
