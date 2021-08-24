<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->create('flamarkt_order_lines', function (Blueprint $table) {
            $table->increments('id');
            $table->string('uid')->unique();
            $table->unsignedInteger('order_id');
            $table->unsignedInteger('product_id')->nullable();
            $table->unsignedInteger('number');
            $table->string('group')->nullable();
            $table->string('type')->nullable();
            $table->string('label')->nullable();
            $table->text('comment')->nullable();
            $table->unsignedInteger('price_unit')->nullable();
            $table->unsignedInteger('quantity')->nullable();
            $table->unsignedInteger('price_total');

            $table->foreign('order_id')->references('id')->on('flamarkt_orders')->onDelete('cascade');
            $table->foreign('product_id')->references('id')->on('flamarkt_products')->onDelete('set null');
        });
    },
    'down' => function (Builder $schema) {
        $schema->dropIfExists('flamarkt_order_lines');
    },
];
