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
    public function __construct(
        protected Client              $api,
        protected UrlGenerator        $url,
        protected TranslatorInterface $translator
    )
    {
    }

    public function __invoke(Document $document, ServerRequestInterface $request): void
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
