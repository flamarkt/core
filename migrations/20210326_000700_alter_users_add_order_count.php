<?php

use Flarum\Database\Migration;

return Migration::addColumns('users', [
    'flamarkt_order_count' => ['integer', 'unsigned' => true, 'default' => 0],
]);
