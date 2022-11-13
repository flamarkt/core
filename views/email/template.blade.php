<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <style>
        body {
            font-family: 'Open Sans', sans-serif;
            background: white;
            color: #426799;
            margin: 0;
            padding: 0;
        }

        .content {
            box-sizing: border-box;
            width: 100%;
            max-width: 800px;
            margin: 0 auto;
            padding: 10px 20px;
        }

        .header {
            border-bottom: 1px solid #e8ecf3;
        }

        .header a, .header a:visited {
            color: {{ \Flamarkt\Core\Notification\MailConfig::themeColor() }};
            text-decoration: none;
        }

        .footer {
            background: #e8ecf3;
        }

        dt {
            font-weight: bold;
        }

        {{-- Must include a in the selector to be more specific than Gmail default style. The .Block rule is for clients that remove classes from links --}}
        a.Button, .ButtonBlock a, .ButtonLock a:visited {
            display: block;
            width: 300px;
            max-width: 100%;
            text-align: center;
            vertical-align: middle;
            white-space: nowrap;
            line-height: 20px;
            border-radius: 4px;
            border: 0;
            color: #fff;
            background: {{ \Flamarkt\Core\Notification\MailConfig::themeColor() }};
            font-weight: bold;
            margin: 40px auto;
            padding: 8px 20px;
            text-decoration: none;
        }

        @yield('css')

        {!! \Flamarkt\Core\Notification\MailConfig::css($blueprint) !!}
    </style>
</head>
<body>
<div class="header">
    <div class="content">
        {!! \Flamarkt\Core\Notification\MailConfig::brand() !!}
    </div>
</div>
<div class="content">
    @yield('content')
</div>
<div class="footer">
    <div class="content">
        <p>
            {{ $translator->trans('flamarkt-core.email.template.footer', ['{title}' => $settings->get('forum_title')]) }}
        </p>
    </div>
</div>
</body>
</html>
