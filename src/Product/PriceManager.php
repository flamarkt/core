<?php

namespace Flamarkt\Core\Product;

use Flarum\User\User;
use Psr\Http\Message\ServerRequestInterface;

class PriceManager extends AbstractManager
{
    public const FREE = 0;

    public function increment(int $amount): string
    {
        return '+' . $amount;
    }

    public function decrement(int $amount): string
    {
        return '-' . $amount;
    }

    public function price(Product $product, User $actor, ServerRequestInterface $request = null): int
    {
        $results = $this->process($product, $actor, $request);

        $price = 0;

        foreach ($results as $result) {
            // Null values are ignored
            if (is_null($result)) {
                continue;
            }

            if (preg_match('~^([-+]?)([0-9]+)(%?)$~', $result, $matches) === 1) {
                $value = (int)$matches[2];

                if ($matches[3]) {
                    if (!$matches[1]) {
                        throw new \Exception('Invalid price modification "' . $result . '" (cannot use % without calculation)');
                    }

                    $value = $value / 100 * $price;
                }

                switch ($matches[1]) {
                    case '+':
                        $price += $value;
                        break;
                    case '-':
                        $price -= $value;
                        break;
                    default:
                        $price = $value;
                        break;
                }
            } else {
                throw new \Exception('Invalid price modification "' . $result . '"');
            }
        }

        return round($price);
    }

    public function driver(Product $product, User $actor, ServerRequestInterface $request = null): string
    {
        return $product->price_driver ?? $this->settings->get('flamarkt.defautPriceDriver') ?: 'fixed';
    }
}
