<?php

namespace Flamarkt\Core\Product;

use Flamarkt\Core\Cart\Cart;
use Flamarkt\Core\Product\Event\Saving;
use Flarum\Foundation\DispatchEventsTrait;
use Flarum\User\User;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Arr;

class ProductRepository
{
    use DispatchEventsTrait;

    protected $validator;

    public function __construct(Dispatcher $events, ProductValidator $validator)
    {
        $this->events = $events;
        $this->validator = $validator;
    }

    public function query(): Builder
    {
        return Product::query();
    }

    public function visibleTo(User $actor = null): Builder
    {
        $query = $this->query();

        if ($actor) {
            return $query->whereVisibleTo($actor);
        }

        return $query;
    }

    public function findOrFail($id, User $actor = null): Product
    {
        return $this->visibleTo($actor)->findOrFail($id);
    }

    public function save(Product $product, User $actor, array $data, Cart $cart = null): Product
    {
        $attributes = Arr::get($data, 'data.attributes');

        $this->validator->assertValid($attributes);

        if (Arr::exists($attributes, 'title')) {
            $actor->assertCan('edit', $product);

            $product->title = Arr::get($attributes, 'title');
        }

        if (Arr::exists($attributes, 'description')) {
            $actor->assertCan('edit', $product);

            $product->description = Arr::get($attributes, 'description');
        }

        if (Arr::exists($attributes, 'price')) {
            $actor->assertCan('edit', $product);

            $product->price = Arr::get($attributes, 'price');
        }

        if ($cart && Arr::exists($attributes, 'cartQuantity')) {
            $state = $product->stateForCart($cart);

            //TODO: validation
            $state->quantity = (int)Arr::get($attributes, 'cartQuantity');
            $state->save();

            $cart->updateMeta();
        }

        $this->events->dispatch(new Saving($product, $actor, $data));

        $product->save();

        $this->dispatchEventsFor($product, $actor);

        return $product;
    }

    public function store(User $actor, array $data): Product
    {
        $actor->assertCan('create', Product::class);

        return $this->save(new Product(), $actor, $data);
    }

    public function update(Product $product, User $actor, array $data, Cart $cart = null): Product
    {
        return $this->save($product, $actor, $data, $cart);
    }

    public function delete(Product $product, User $actor)
    {
        $actor->assertCan('delete', $product);

        $product->delete();
    }
}
