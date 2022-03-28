@inject('url', 'Flarum\Http\UrlGenerator')

<div class="container">
    <h2>{{ $translator->trans('flamarkt-core.forum.products.headingTitle') }}</h2>

    <ul>
        @foreach ($apiDocument->data as $product)
            <li>
                <a href="{{ $url->to('forum')->route('flamarkt.products.show', [
                    'id' => $product->attributes->slug
                ]) }}">
                    {{ $product->attributes->title }}
                </a>
            </li>
        @endforeach
    </ul>

    @if (isset($apiDocument->links->prev))
        <a href="{{ $url->to('forum')->route('flamarkt.products.index') }}?page={{ $page - 1 }}">&laquo; {{ $translator->trans('core.views.index.previous_page_button') }}</a>
    @endif

    @if (isset($apiDocument->links->next))
        <a href="{{ $url->to('forum')->route('flamarkt.products.index') }}?page={{ $page + 1 }}">{{ $translator->trans('core.views.index.next_page_button') }} &raquo;</a>
    @endif
</div>
