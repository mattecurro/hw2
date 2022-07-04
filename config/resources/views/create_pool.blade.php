<html>
    <head> 
        <meta charset="utf-8">
        <link rel = 'stylesheet' href="../resources/css/guest.css">
        <script src="../resources/js/create_pool.js" defer></script>
        <script src="//cdn.jsdelivr.net/npm/sweetalert2@11" defer></script>
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
        <main id="main_create_pool">
            <!--// screen sito, esempio d'uso   -->
            <section class="create_pool">
                <div class="scelta">
                    <h1>Doxa</h1>          
                    <img onclick="window.location.href='home_logged'" src="../resources/img/go_back.png">
                </div>  
                <form name='login' method='post' action='create_pool'>
                    @csrf 
                    <h3> Descrizione </h3> 
                    <textarea name='descrizione'></textarea>                    
                    <h3> Orario </h3>
                    <input type="time" name='orario'>                    
                    <h3> Luogo </h3>
                    <input type='text' name='luogo'>                    
                    <h3> Data dell'evento </h3>
                    <input type='date' name='data'>                    
                    <h3> Categoria </h3>
                    <input type='text' name='categoria'>
                    <h3> Opzione 1 </h3>
                    <input type='text' name='opzione[]'>
                    <h3> Opzione 2 </h3>
                    <input type='text' name='opzione[]'>
                    <input type='button' value='+   Aggiungi Opzione'>
                    <div class='hidden'>
                        <h3> Opzioni Aggiuntive </h3>
                    </div>
                    <div class='scelta'>
                        <input type="image" src="../resources/img/add.png">
                    </div>  
                </form>
            </section>
        </main>
    </body>
</html>
