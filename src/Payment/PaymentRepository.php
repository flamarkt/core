<?php

namespace Flamarkt\Core\Payment;

use Flamarkt\Core\Order\Order;
use Flamarkt\Core\Payment\Event\Created;
use Flamarkt\Core\Payment\Event\Deleted;
use Flamarkt\Core\Payment\Event\Deleting;
use Flamarkt\Core\Payment\Event\Saving;
use Flarum\Foundation\DispatchEventsTrait;
use Flarum\User\User;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Arr;
use Ramsey\Uuid\Uuid;

class PaymentRepository
{
    use DispatchEventsTrait;

    protected $validator;

    public function __construct(Dispatcher $events, PaymentValidator $validator)
    {
        $this->events = $events;
        $this->validator = $validator;
    }

    public function findUidOrFail(string $uid = null, User $actor = null): Payment
    {
        $query = Payment::query();

        if ($actor) {
            // TODO: use a visibility scope on payments themselves
            $query->whereHas('order', function (Builder $query) use ($actor) {
                $query->whereVisibleTo($actor);
            });
        }

        return $query->where('uid', $uid)->firstOrFail();
    }

    public function save(Payment $payment, User $actor, array $data): Payment
    {
        $actor->assertCan('backoffice');

        $attributes = (array)Arr::get($data, 'attributes');

        if ($payment->exists) {
            $this->validator->setPayment($payment);
        }

        $this->validator->assertValid($attributes);

        if (Arr::exists($attributes, 'method')) {
            $actor->assertCan('edit', $payment);

            $payment->method = Arr::get($attributes, 'method');
        }

        if (Arr::exists($attributes, 'identifier')) {
            $actor->assertCan('edit', $payment);

            $payment->identifier = Arr::get($attributes, 'identifier');
        }

        if (Arr::exists($attributes, 'amount')) {
            $actor->assertCan('edit', $payment);

            $payment->amount = Arr::get($attributes, 'amount');
        }

        $this->events->dispatch(new Saving($payment, $actor, $data));

        if (!$payment->exists) {
            $payment->raise(new Created($payment));
        }

        $payment->save();

        $payment->order->updateMeta()->save();

        $this->dispatchEventsFor($payment, $actor);

        return $payment;
    }

    public function store(Order $order, User $actor, array $data): Payment
    {
        // TODO: gate on order
        $actor->assertCan('create', Payment::class);

        $payment = new Payment();
        $payment->uid = Uuid::uuid4()->toString();
        $payment->order()->associate($order);

        return $this->save($payment, $actor, $data);
    }

    public function update(Payment $payment, User $actor, array $data): Payment
    {
        return $this->save($payment, $actor, $data);
    }

    public function delete(Payment $payment, User $actor, array $data)
    {
        $actor->assertCan('delete', $payment);

        $this->events->dispatch(new Deleting($payment, $actor, $data));

        $payment->delete();

        $this->events->dispatch(new Deleted($payment, $actor));
    }
}
