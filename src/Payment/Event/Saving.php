<?php

namespace Flamarkt\Core\Payment\Event;

use Flamarkt\Core\Payment\Payment;
use Flarum\User\User;

class Saving
{
    public $payment;
    public $actor;
    public $data;

    public function __construct(Payment $payment, User $actor, array $data = [])
    {
        $this->payment = $payment;
        $this->actor = $actor;
        $this->data = $data;
    }
}
