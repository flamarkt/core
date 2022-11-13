@extends(\Flamarkt\Core\Notification\MailConfig::$templateView)

@section('css')
    .CartTable {
    min-width: 100%;
    }

    .CartTable th, .CartTable td {
    border-collapse: collapse;
    text-align: left;
    padding: 10px 15px;
    }

    .CartTable thead th {
    border-bottom: 2px solid #666;
    }

    .CartTable tbody tr:nth-child(odd) {
    background: #f6f6f6;
    }
@endsection

@section('content')
    <p>{{ $translator->trans('flamarkt-core.email.orderReceived.message') }}</p>

    @mithril2html(new \Flamarkt\Core\Mithril2Html\OrderComponent($blueprint->order))
@endsection
