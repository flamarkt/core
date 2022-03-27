<?php

namespace Flamarkt\Core\Payment\Event;

use Flamarkt\Core\Payment\Payment;
use Flarum\User\User;

class Deleted
{
    public $payment;
    public $actor;

    public function __construct(Payment $payment, User $actor = null)
    {
        $this->payment = $payment;
        $this->actor = $actor;
    }
}
