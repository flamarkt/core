<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->create('flamarkt_cart_product', function (Blueprint $table) {
            $table->unsignedInteger('cart_id');
            $table->unsignedInteger('product_id');
            $table->unsignedInteger('quantity');

            $table->foreign('cart_id')->references('id')->on('flamarkt_carts')->onDelete('cascade');
            $table->foreign('product_id')->references('id')->on('flamarkt_products')->onDelete('cascade');
        });
    },
    'down' => function (Builder $schema) {
        $schema->dropIfExists('flamarkt_cart_product');
    },
];
