<?php

namespace Flamarkt\Core\Api\Serializer;

use Flamarkt\Core\Product\Product;
use Flarum\Api\Serializer\AbstractSerializer;
use Flarum\Http\SlugManager;

class BasicProductSerializer extends AbstractSerializer
{
    protected $type = 'flamarkt-products';

    protected $slugManager;

    public function __construct(SlugManager $slugManager)
    {
        $this->slugManager = $slugManager;
    }

    /**
     * @param Product $product
     * @return array
     */
    protected function getDefaultAttributes($product): array
    {
        return [
            'title' => $product->title,
            'slug' => $this->slugManager->forResource(Product::class)->toSlug($product),
        ];
    }
}
