<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Laravel') }} @yield('title')</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        @yield('script')

        <!-- Styles general purpose for home
            a new css for both -->
  
    </head>
    <body>
        <main>
            <section id="left" class="side">   <!-- LAT. SX: CATEGORIA -> LISTA Puntata            -->
                <h3>CATEGORIE</h3>
                <ul>

                </ul>                    
            </section>

            <section id="central">
                @yield('introduction')
                <div id="search">
                    <!-- da sistemare il form -->
                    <form name='cerca' action='hw1_get_search.php' method='get' id="form_cerca">   
                    <input type='text' placeholder='Cerca (per descrizione o per categoria)' name='cerca' class="cerca">
                    </form>
                </div>
                <div class="container"></div>
            </section>
            <section id="right" class="side">
                @yield('content')
            </section>
        </main>
    </body>
</html> 