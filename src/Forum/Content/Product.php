<?php

namespace Flamarkt\Core\Forum\Content;

use Flarum\Api\Client;
use Flarum\Frontend\Document;
use Flarum\Http\UrlGenerator;
use Illuminate\Contracts\View\Factory;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;

class Product
{
    public function __construct(
        protected Client       $api,
        protected Factory      $view,
        protected UrlGenerator $url
    )
    {
    }

    public function __invoke(Document $document, ServerRequestInterface $request): void
    {
        $queryParams = $request->getQueryParams();
        $id = Arr::get($queryParams, 'id');

        $apiDocument = $this->getApiDocument($request, $id);
        $product = $apiDocument->data->attributes;

        $document->title = $product->title;
        $document->canonicalUrl = $this->url->to('forum')->route('flamarkt.products.show', ['id' => $product->slug]);
        $document->content = $this->view->make('flamarkt::frontend.content.product', compact('apiDocument'));
        $document->payload['apiDocument'] = $apiDocument;
    }

    protected function getApiDocument(ServerRequestInterface $request, string $id)
    {
        $response = $this->api->withParentRequest($request)->withQueryParams(['bySlug' => true])->get("/flamarkt/products/$id");
        $statusCode = $response->getStatusCode();

        if ($statusCode === 404) {
            throw new ModelNotFoundException;
        }

        return json_decode($response->getBody());
    }
}
