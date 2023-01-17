<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->table('flamarkt_order_payments', function (Blueprint $table) {
            $table->integer('amount')->change();
        });
    },
    'down' => function (Builder $schema) {
        // Not implemented since Flarum doesn't support partial rollbacks
    },
];
