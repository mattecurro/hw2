@extends('guest') 

@section('title', '| Login')

@section('script')
<script src="../resources/js/login.js" defer></script>
@endsection



@section('content')
<form name='login' method='post' action="login">
    @csrf 
    <input type='text' name='username' placeholder='Nome Utente'>                    
    <input type='password' name='password' placeholder='Password'>                    
    <input id='accedi' type='submit' name='accedi' value='Accedi'>                    
    </form>
    <div class="signup">Non hai un account? <a href="signup">Iscriviti</a>
    <p class='errore'>
    @isset($errore)
    {{
        $errore                
    }}
    @endisset
    </p>
@endsection 