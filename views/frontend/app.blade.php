<!doctype html>
<html @if ($direction) dir="{{ $direction }}" @endif
@if ($language) lang="{{ $language }}" @endif>
<head>
    <meta charset="utf-8">
    <title>{{ $title }}</title>

    {!! $head !!}
</head>

<body>
{!! $layout !!}

<div id="modal"></div>
<div id="alerts"></div>

<script>
    document.getElementById('flarum-loading').style.display = 'block';
    var flarum = {extensions: {}};
</script>

{!! $js !!}

<script>{{-- We need to customize this view to call our own app object because flarum.core.app is immutable --}}
    document.getElementById('flarum-loading').style.display = 'none';
    try {
        flarum.extensions['flamarkt-core'].app.load(@json($payload));
        flarum.extensions['flamarkt-core'].app.bootExtensions(flarum.extensions);
        flarum.extensions['flamarkt-core'].app.boot();
    } catch (e) {
        var error = document.getElementById('flarum-loading-error');
        error.innerHTML += document.getElementById('flarum-content').textContent;
        error.style.display = 'block';
        throw e;
    }
</script>

{!! $foot !!}
</body>
</html>
