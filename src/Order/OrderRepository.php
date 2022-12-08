<?php

namespace Flamarkt\Core\Order;

use Flamarkt\Core\Cart\CartRepository;
use Flamarkt\Core\Order\Event\Created;
use Flamarkt\Core\Order\Event\Deleted;
use Flamarkt\Core\Order\Event\Deleting;
use Flamarkt\Core\Order\Event\Saving;
use Flamarkt\Core\Order\Event\SavingLine;
use Flamarkt\Core\Order\Event\UserChanged;
use Flamarkt\Core\Product\ProductRepository;
use Flarum\Foundation\DispatchEventsTrait;
use Flarum\User\User;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Arr;
use Ramsey\Uuid\Uuid;

class OrderRepository
{
    use DispatchEventsTrait;

    public function __construct(
        Dispatcher                   $events,
        protected CartRepository     $cartRepository,
        protected ProductRepository  $productRepository,
        protected OrderValidator     $orderValidator,
        protected OrderLineValidator $lineValidator
    )
    {
        $this->events = $events;
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

    /**
     * @internal Kept just in case, but should be avoided
     */
    public function findIdOrFail($id, User $actor = null): Order
    {
        return $this->visibleTo($actor)->findOrFail($id);
    }

    public function findUidOrFail(string $uid = null, User $actor = null): Order
    {
        return $this->visibleTo($actor)->where('uid', $uid)->firstOrFail();
    }

    public function save(Order $order, User $actor, array $data): Order
    {
        $linesRelationship = Arr::get($data, 'data.relationships.lines.data');

        if (is_array($linesRelationship)) {
            $actor->assertCan('backoffice');

            /**
             * @var OrderLine[]|Collection $existingLines
             */
            $existingLines = $order->lines->keyBy('uid');

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
                    $attributes['productUid'] = Arr::get($relationships, 'product.data.id');
                }

                $type = Arr::exists($attributes, 'type') ? Arr::get($attributes, 'type') : $line->type;

                // Skip validation of productUid if not a product line
                if ($type !== 'product' && Arr::exists($attributes, 'productUid')) {
                    unset($attributes['productUid']);
                }

                $this->lineValidator->assertValid($attributes);

                if (Arr::exists($attributes, 'group')) {
                    $line->group = Arr::get($attributes, 'group');
                }

                if (Arr::exists($attributes, 'type')) {
                    $line->type = Arr::get($attributes, 'type');

                    // Remove existing product
                    // TODO: this would delete the product from custom types as well
                    if ($line->type !== 'product') {
                        $line->product_id = null;
                    }
                }

                if (Arr::exists($attributes, 'label')) {
                    $line->label = Arr::get($attributes, 'label');
                }

                if (Arr::exists($attributes, 'comment')) {
                    $line->comment = Arr::get($attributes, 'comment');
                }

                // Only set product for product lines
                // Still allow null values as a way to reset an invalid state
                if (($type === 'product' || is_null(Arr::get($attributes, 'productUid'))) && Arr::exists($attributes, 'productUid')) {
                    $product = $this->productRepository->findUidOrFail($attributes['productUid']);

                    $line->product()->associate($product);
                }

                if (Arr::exists($attributes, 'priceUnit')) {
                    $line->price_unit = Arr::get($attributes, 'priceUnit');
                }

                if (Arr::exists($attributes, 'quantity')) {
                    $line->quantity = Arr::get($attributes, 'quantity');
                }

                $line->updateTotal();

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

        $attributes = (array)Arr::get($data, 'attributes');

        $relationships = (array)Arr::get($data, 'relationships');

        if (Arr::exists($relationships, 'user')) {
            $attributes['userId'] = Arr::get($relationships, 'user.data.id');
        }

        if ($order->exists) {
            $this->orderValidator->setOrder($order);
        }

        $this->orderValidator->assertValid($attributes);

        if (Arr::exists($attributes, 'userId')) {
            $actor->assertCan('backoffice');

            $oldUser = $order->user;

            $order->user()->associate($attributes['userId']);

            if ($order->exists) {
                $order->raise(new UserChanged($order, $oldUser));
            }
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

        if (!$order->exists) {
            $order->raise(new Created($order));
        }

        $order->save();

        // So event listeners can retrieve the new values
        $order->unsetRelation('user');
        $order->unsetRelation('lines');

        $order->updateMeta()->save();

        $this->dispatchEventsFor($order, $actor);

        // Force a full refresh. It's critical for everything to be up to date in the return payload
        return Order::findOrFail($order->id);
    }

    public function store(User $actor, array $data): Order
    {
        $actor->assertCan('create', Order::class);

        $order = new Order();
        $order->uid = Uuid::uuid4()->toString();

        return $this->save($order, $actor, $data);
    }

    public function update(Order $order, User $actor, array $data): Order
    {
        return $this->save($order, $actor, $data);
    }

    public function delete(Order $order, User $actor, array $data = []): void
    {
        $actor->assertCan('delete', $order);

        $this->events->dispatch(new Deleting($order, $actor, $data));

        $order->delete();

        $this->events->dispatch(new Deleted($order, $actor));
    }
}
