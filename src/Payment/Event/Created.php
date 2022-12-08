<?php

namespace Flamarkt\Core\Payment\Event;

use Flamarkt\Core\Payment\Payment;
use Flarum\User\User;

class Created
{
    public function __construct(
        public Payment $payment,
        public ?User   $actor = null
    )
    {
    }
}
