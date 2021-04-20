<?php

namespace Flamarkt\Core\Api\Controller;

use Flamarkt\Core\Api\Serializer\OrderSerializer;
use Flamarkt\Core\Order\Order;
use Flamarkt\Core\Order\OrderFilterer;
use Flamarkt\Core\Order\OrderSearcher;
use Flarum\Api\Controller\AbstractListController;
use Flarum\Http\UrlGenerator;
use Flarum\Query\QueryCriteria;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class OrderIndexController extends AbstractListController
{
    public $serializer = OrderSerializer::class;

    public $include = [
        'user',
    ];

    protected $filterer;
    protected $searcher;
    protected $url;

    public function __construct(OrderFilterer $filterer, OrderSearcher $searcher, UrlGenerator $url)
    {
        $this->filterer = $filterer;
        $this->searcher = $searcher;
        $this->url = $url;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = $request->getAttribute('actor');
        $filters = $this->extractFilter($request);
        $sort = $this->extractSort($request);

        $limit = $this->extractLimit($request);
        $offset = $this->extractOffset($request);
        $include = $this->extractInclude($request);

        $criteria = new QueryCriteria($actor, $filters, $sort);
        if (array_key_exists('q', $filters)) {
            $results = $this->searcher->search($criteria, $limit, $offset);
        } else {
            $results = $this->filterer->filter($criteria, $limit, $offset);
        }

        $document->addPaginationLinks(
            $this->url->to('api')->route('flamarkt.orders.index'),
            $request->getQueryParams(),
            $offset,
            $limit,
            $results->areMoreResults() ? null : 0
        );

        return $results->getResults()->load($include);
    }
}
