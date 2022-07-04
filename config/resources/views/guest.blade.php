<!DOCTYPE html>
<html>
    <head>


        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Laravel') }} @yield('title')</title>
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        <link rel = 'stylesheet' href="../resources/css/guest.css">
        @yield('script')
    
    </head>
<body>
    <main>
        <section class="main_left">
            <img onclick="window.location.href='home_not_logged'" src="../resources/img/go_back.png">
        </section>
        <section class="main_right">
            <h1>Doxa</h1>
            @yield('content')
        </section>
    </main>
</body> 
</html>


