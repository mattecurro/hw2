<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
 
        <title>@yield('title')</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        <link rel = 'stylesheet' href="../resources/css/pool.css">
        @yield('script')

        <!-- Styles general purpose for pool
            a new css for both --> 
   
    </head>
    <body>
        @yield('img')
        <div class="post_start">
            <h1>  
                {{ $pool[0]->description }}
            </h1>
            <span id="primo">   
                Giorno: {{ $pool[0]->date_event }}                 
            </span>
            <span>    
                alle ore: {{ $pool[0]->hour }}
            </span>
            <span id="ultimo">  
                 a {{ $pool[0]->place }}
                <input type="hidden" name="luogo" value='{{ $pool[0]->place }}'>
            </span>
            <div id="chat">
                <img src="../resources/img/comment.png">
            </div>
            <div>
                <div class='horizonthal'>
                @yield('section_1')
                <input type="hidden" name="id" value= '{{ $pool[0]->id }}' >
                <input type="hidden" name="n_vot" value= '{{ $pool[0]->n_voters }}' >

                <div class="pointer" id="risultati">Risultati </div>
                <div class="pointer" id="dettagli">Dettagli</div>
            </div>
            @yield('section_2')
            <section id='sec_risultati' class='vote hidden'>
            </section>
            <section id='sec_dettagli' class='vote hidden'>
            </section>    
            @yield('modal')        
   </body>
</html>         
