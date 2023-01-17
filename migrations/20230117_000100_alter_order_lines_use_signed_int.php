<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->table('flamarkt_order_lines', function (Blueprint $table) {
            $table->integer('price_unit')->nullable()->change();
            $table->integer('quantity')->nullable()->change();
            $table->integer('price_total')->change();
        });
    },
    'down' => function (Builder $schema) {
        // Not implemented since Flarum doesn't support partial rollbacks
    },
];
