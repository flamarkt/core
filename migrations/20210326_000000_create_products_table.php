<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->create('flamarkt_products', function (Blueprint $table) {
            $table->increments('id');
            $table->string('uid')->unique();
            $table->string('title')->nullable()->index();
            $table->text('description')->nullable();
            $table->unsignedInteger('price')->nullable();
            $table->string('availability_driver')->nullable();
            $table->string('price_driver')->nullable();
            $table->timestamps();
            $table->timestamp('hidden_at')->nullable();
        });
    },
    'down' => function (Builder $schema) {
        $schema->dropIfExists('flamarkt_products');
    },
];
