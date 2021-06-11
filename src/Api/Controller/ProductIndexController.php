<?php

namespace Flamarkt\Core\Api\Controller;

use Flamarkt\Core\Api\Serializer\ProductSerializer;
use Flamarkt\Core\Product\Product;
use Flamarkt\Core\Product\ProductFilterer;
use Flamarkt\Core\Product\ProductSearcher;
use Flarum\Api\Controller\AbstractListController;
use Flarum\Http\RequestUtil;
use Flarum\Http\UrlGenerator;
use Flarum\Query\QueryCriteria;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class ProductIndexController extends AbstractListController
{
    public $serializer = ProductSerializer::class;

    public $sortFields = [
        'createdAt',
        'title',
        'price',
    ];

    public $sort = [
        'createdAt' => 'desc',
    ];

    protected $filterer;
    protected $searcher;
    protected $url;

    public function __construct(ProductFilterer $filterer, ProductSearcher $searcher, UrlGenerator $url)
    {
        $this->filterer = $filterer;
        $this->searcher = $searcher;
        $this->url = $url;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $filters = $this->extractFilter($request);
        $sort = $this->extractSort($request);

        $limit = $this->extractLimit($request);
        $offset = $this->extractOffset($request);
        $include = array_merge($this->extractInclude($request), ['cartState', 'userState']);

        $criteria = new QueryCriteria($actor, $filters, $sort);
        if (array_key_exists('q', $filters)) {
            $results = $this->searcher->search($criteria, $limit, $offset);
        } else {
            $results = $this->filterer->filter($criteria, $limit, $offset);
        }

        $document->addPaginationLinks(
            $this->url->to('api')->route('flamarkt.products.index'),
            $request->getQueryParams(),
            $offset,
            $limit,
            $results->areMoreResults() ? null : 0
        );

        Product::setStateUser($actor);
        Product::setStateCart($request->getAttribute('cart'));

        $this->loadRelations($results->getResults(), $include);

        return $results->getResults();
    }
}
