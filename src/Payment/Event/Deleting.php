<?php

namespace Flamarkt\Core\Payment\Event;

use Flamarkt\Core\Payment\Payment;
use Flarum\User\User;

class Deleting
{
    public $payment;
    public $actor;

    public function __construct(Payment $payment, User $actor)
    {
        $this->payment = $payment;
        $this->actor = $actor;
    }
}
