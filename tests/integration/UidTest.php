<?php

namespace Flamarkt\Core\Tests\integration;

use Carbon\Carbon;
use Flamarkt\Core\Order\Order;
use Flarum\Testing\integration\TestCase;
use Mockery;
use Ramsey\Uuid\Uuid;
use Ramsey\Uuid\UuidFactory;

class UidTest extends TestCase
{
    protected function setNextUuid(string $uuid)
    {
        // Based on https://github.com/ramsey/uuid/issues/147
        $factoryMock = Mockery::mock(UuidFactory::class . '[uuid4]', [
            'uuid4' => Uuid::fromString($uuid),
        ]);

        Uuid::setFactory($factoryMock);
        // We don't care about resetting the original factory for now since all our tests depend on mocked UUIDs
    }

    protected function setUp(): void
    {
        parent::setUp();

        $this->extension('flamarkt-backoffice');
        $this->extension('flamarkt-core');

        $this->prepareDatabase([
            'flamarkt_orders' => [
                [
                    'id' => 1,
                    'uid' => '7a5c0cd6-c318-4781-ad66-6d39722d6806',
                    'created_at' => Carbon::parse('2023-01-01 00:00:00'),
                ],
            ],
        ]);

        $this->setNextUuid('0f361691-7e0e-4a46-9b38-3ee3b0f5ef27');
    }

    public function test_existing_uid_untouched()
    {
        $this->app();

        $order = Order::query()->findOrFail(1);

        $this->assertEquals('7a5c0cd6-c318-4781-ad66-6d39722d6806', $order->uid);
    }

    public function test_uid_generated_on_save()
    {
        $this->app();

        $order = new Order();
        $order->save();

        $this->assertEquals('0f361691-7e0e-4a46-9b38-3ee3b0f5ef27', Order::query()->where('id', $order->id)->pluck('uid')->first());

        // The second model creation verifies the value is not stuck in a static value of the model
        // It also makes sure our mock implementation correctly switches value on demand
        $this->setNextUuid('fbd4a0f4-ef85-4080-8947-52450e3b84fa');

        $otherOrder = new Order();
        $otherOrder->save();

        $this->assertEquals('fbd4a0f4-ef85-4080-8947-52450e3b84fa', Order::query()->where('id', $otherOrder->id)->pluck('uid')->first());
    }

    public function test_uid_generated_on_demand()
    {
        $this->app();

        $order = new Order();

        $this->assertEquals('0f361691-7e0e-4a46-9b38-3ee3b0f5ef27', $order->uid);

        // This value should get ignored since a value has already been generated for the model
        $this->setNextUuid('858e4f51-98a4-42eb-850c-a521937e28a0');

        $order->save();

        $this->assertEquals('0f361691-7e0e-4a46-9b38-3ee3b0f5ef27', Order::query()->where('id', $order->id)->pluck('uid')->first());
    }
}
