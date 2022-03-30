<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="shortcut icon" href="#" />
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>POS</title>

{{--    <link rel="stylesheet" href='../js/App.css'>--}}
</head>
<body>
<div id="app">

</div>
<script src="../js/app.js"></script>
<script>
    Echo.channel('events')
        .listen('RealTimeMessage', (e) => console.log('RealTimeMessage: ' + e.message));
</script>
</body>
</html>
