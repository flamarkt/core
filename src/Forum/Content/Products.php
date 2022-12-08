<?php

namespace Flamarkt\Core\Forum\Content;

use Flarum\Api\Client;
use Flarum\Frontend\Document;
use Flarum\Http\UrlGenerator;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\View\Factory;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Symfony\Contracts\Translation\TranslatorInterface;

class Products
{
    public function __construct(
        protected Client                      $api,
        protected Factory                     $view,
        protected SettingsRepositoryInterface $settings,
        protected UrlGenerator                $url,
        protected TranslatorInterface         $translator
    )
    {
    }

    public function __invoke(Document $document, ServerRequestInterface $request): void
    {
        $queryParams = $request->getQueryParams();

        $sort = Arr::pull($queryParams, 'sort');
        $q = Arr::pull($queryParams, 'q');
        $page = max(1, intval(Arr::pull($queryParams, 'page')));

        $params = [
            'sort' => $sort,
            'filter' => [],
            'page' => ['offset' => ($page - 1) * 24, 'limit' => 24],
        ];

        if ($q) {
            $params['filter']['q'] = $q;
        }

        $apiDocument = $this->getApiDocument($request, $params);

        $document->title = $this->translator->trans('flamarkt-core.forum.products.headingTitle');
        $document->content = $this->view->make('flamarkt::frontend.content.products', compact('apiDocument', 'page'));
        $document->payload['apiDocument'] = $apiDocument;
    }

    protected function getApiDocument(ServerRequestInterface $request, array $params)
    {
        return json_decode($this->api->withParentRequest($request)->withQueryParams($params)->get('/flamarkt/products')->getBody());
    }
}
