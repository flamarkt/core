<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->create('flamarkt_products', function (Blueprint $table) {
            $table->increments('id');
            $table->string('type')->nullable();
            $table->string('title');
            $table->text('description');
            $table->unsignedInteger('price');
            $table->timestamps();
            $table->timestamp('hidden_at');
        });
    },
    'down' => function (Builder $schema) {
        $schema->dropIfExists('flamarkt_products');
    },
];
