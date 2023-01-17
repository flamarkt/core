<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->table('flamarkt_orders', function (Blueprint $table) {
            $table->integer('price_total')->change();
            $table->integer('paid_amount')->change();
        });
    },
    'down' => function (Builder $schema) {
        // Not implemented since Flarum doesn't support partial rollbacks
    },
];
