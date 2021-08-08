<?php

namespace Flamarkt\Core\Order;

use Flamarkt\Core\Cart\CartRepository;
use Flamarkt\Core\Order\Event\Saving;
use Flamarkt\Core\Order\Event\SavingLine;
use Flarum\Foundation\DispatchEventsTrait;
use Flarum\User\User;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Arr;

class OrderRepository
{
    use DispatchEventsTrait;

    protected $cartRepository;
    protected $orderValidator;
    protected $lineValidator;

    public function __construct(Dispatcher $events, CartRepository $cartRepository, OrderValidator $orderValidator, OrderLineValidator $lineValidator)
    {
        $this->events = $events;
        $this->cartRepository = $cartRepository;
        $this->orderValidator = $orderValidator;
        $this->lineValidator = $lineValidator;
    }

    public function query(): Builder
    {
        return Order::query();
    }

    public function visibleTo(User $actor = null): Builder
    {
        $query = $this->query();

        if ($actor) {
            return $query->whereVisibleTo($actor);
        }

        return $query;
    }

    public function findOrFail($id, User $actor = null): Order
    {
        return $this->visibleTo($actor)->findOrFail($id);
    }

    public function save(Order $order, User $actor, array $data): Order
    {
        $linesRelationship = Arr::get($data, 'data.relationships.lines.data');

        if (is_array($linesRelationship)) {
            $actor->assertCan('backoffice');

            /**
             * @var OrderLine[]|Collection $existingLines
             */
            $existingLines = $order->lines->keyBy('id');

            /**
             * @var OrderLine[] $lines
             */
            $lines = [];

            foreach ($linesRelationship as $lineData) {
                // Cast to string because pull() only accepts strings or integer
                // And the IDs should already be as string in the keys
                $line = $existingLines->pull((string)Arr::get($lineData, 'id'));

                if (!$line) {
                    $line = new OrderLine();
                }

                $attributes = (array)Arr::get($lineData, 'attributes');

                $relationships = (array)Arr::get($lineData, 'relationships');

                if (Arr::exists($relationships, 'product')) {
                    $attributes['productId'] = Arr::get($relationships, 'product.data.id');
                }

                $this->lineValidator->assertValid($attributes);

                if (Arr::exists($attributes, 'group')) {
                    $line->group = Arr::get($attributes, 'group');
                }

                if (Arr::exists($attributes, 'type')) {
                    $line->type = Arr::get($attributes, 'type');
                }

                if (Arr::exists($attributes, 'label')) {
                    $line->label = Arr::get($attributes, 'label');
                }

                if (Arr::exists($attributes, 'comment')) {
                    $line->comment = Arr::get($attributes, 'comment');
                }

                if (Arr::exists($attributes, 'productId')) {
                    $line->product()->associate($attributes['productId']);
                }

                $this->events->dispatch(new SavingLine($order, $line, $actor, $lineData));

                $lines[] = $line;
            }

            foreach ($lines as $index => $line) {
                $line->number = $index + 1;
            }

            $order->afterSave(function (Order $order) use ($lines, $existingLines) {
                foreach ($lines as $line) {
                    if (!$line->exists) {
                        $line->order()->associate($order);
                    }
                    $line->save();
                }

                foreach ($existingLines as $line) {
                    $line->delete();
                }
            });
        }

        $attributes = (array)Arr::get($data, 'data.attributes');

        $relationships = (array)Arr::get($data, 'data.relationships');

        if (Arr::exists($relationships, 'user')) {
            $attributes['userId'] = Arr::get($relationships, 'user.data.id');
        }

        $this->orderValidator->assertValid($attributes);

        if (Arr::exists($attributes, 'userId')) {
            $actor->assertCan('backoffice');

            $order->user()->associate($attributes['userId']);
        }

        if (Arr::exists($attributes, 'isHidden')) {
            $actor->assertCan('backoffice');

            if ($attributes['isHidden']) {
                $order->hide();
            } else {
                $order->restore();
            }
        }

        $this->events->dispatch(new Saving($order, $actor, $data));

        $order->save();

        $this->dispatchEventsFor($order, $actor);

        // Force a full refresh. It's critical for everything to be up to date in the return payload
        return Order::findOrFail($order->id);
    }

    public function store(User $actor, array $data): Order
    {
        $actor->assertCan('create', Order::class);

        $order = new Order();

        return $this->save($order, $actor, $data);
    }

    public function update(Order $order, User $actor, array $data): Order
    {
        return $this->save($order, $actor, $data);
    }

    public function delete(Order $order, User $actor)
    {
        $actor->assertCan('delete', $order);

        $order->delete();
    }
}
