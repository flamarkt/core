<?php

namespace Flamarkt\Core\Api\Serializer;

use Flamarkt\Core\Product\Product;
use Flarum\Api\Serializer\AbstractSerializer;

class BasicProductSerializer extends AbstractSerializer
{
    protected $type = 'flamarkt-products';

    /**
     * @param Product $product
     * @return array
     */
    protected function getDefaultAttributes($product): array
    {
        return [
            'title' => $product->title,
        ];
    }
}
