<?php

namespace Flamarkt\Core\Order;

use Flamarkt\Core\Cart\CartRepository;
use Flamarkt\Core\Order\Event\Saving;
use Flarum\Foundation\DispatchEventsTrait;
use Flarum\User\User;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Arr;

class OrderRepository
{
    use DispatchEventsTrait;

    protected $cartRepository;

    public function __construct(Dispatcher $events, CartRepository $cartRepository)
    {
        $this->events = $events;
        $this->cartRepository = $cartRepository;
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
        $this->events->dispatch(new Saving($order, $actor, $data));

        $order->save();

        $this->dispatchEventsFor($order, $actor);

        return $order;
    }

    public function store(User $actor, array $data): Order
    {
        $actor->assertCan('create', Order::class);

        $order = new Order();

        $cartId = Arr::get($data, 'data.relationships.cart.data.id');

        if ($cartId) {
            $cart = $this->cartRepository->findOrFail($cartId, $actor);

            $order->user()->associate($actor);
            $order->save();

            $total = 0;

            foreach ($cart->products as $product) {
                $line = new OrderLine();
                $line->product()->associate($product);
                $line->quantity = $product->pivot->quantity;
                $line->price_unit = $product->price;
                $line->price_total = $product->pivot->quantity * $product->price;

                $total += $line->price_total;

                $order->lines()->save($line);
            }

            $order->price_total = $total;
        } else {
            throw new \Exception('Not implemented'); //TODO
        }

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
