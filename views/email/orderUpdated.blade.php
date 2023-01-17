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
    {!! $blueprint->getEmailMessage($translator) !!}

    @mithril2html($blueprint->getEmailComponent())
@endsection
