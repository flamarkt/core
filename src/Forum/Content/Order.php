<?php

namespace Flamarkt\Core\Forum\Content;

use Flarum\Api\Client;
use Flarum\Frontend\Document;
use Flarum\Http\UrlGenerator;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Symfony\Contracts\Translation\TranslatorInterface;

class Order
{
    protected $api;
    protected $url;
    protected $translator;

    public function __construct(Client $api, UrlGenerator $url, TranslatorInterface $translator)
    {
        $this->api = $api;
        $this->url = $url;
        $this->translator = $translator;
    }

    public function __invoke(Document $document, ServerRequestInterface $request)
    {
        $queryParams = $request->getQueryParams();
        $id = Arr::get($queryParams, 'id');

        $apiDocument = $this->getApiDocument($request, $id);
        $order = $apiDocument->data->attributes;

        $document->title = $this->translator->trans('flamarkt-core.forum.order.headingTitle', [
            '{number}' => $order->number,
        ]);
        $document->canonicalUrl = $this->url->to('forum')->route('flamarkt.orders.show', ['id' => $order->slug]);
        $document->payload['apiDocument'] = $apiDocument;
    }

    protected function getApiDocument(ServerRequestInterface $request, string $id)
    {
        $response = $this->api->withParentRequest($request)->withQueryParams(['bySlug' => true])->get("/flamarkt/orders/$id");
        $statusCode = $response->getStatusCode();

        if ($statusCode === 404) {
            throw new ModelNotFoundException;
        }

        return json_decode($response->getBody());
    }
}
