<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->table('flamarkt_carts', function (Blueprint $table) {
            $table->integer('amount_due_after_partial')->nullable()->after('price_total');
        });
    },
    'down' => function (Builder $schema) {
        $schema->table('flamarkt_carts', function (Blueprint $table) {
            $table->dropColumn('amount_due_after_partial');
        });
    },
];
