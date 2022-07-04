@extends('guest')
 
@section('title', '| Signup')

@section('script')
<script src="../resources/js/signup.js" defer></script>
@endsection
 
 
@section('content')             
<form name='login' method='post' action="register">
    @csrf
    <label>Nome <input type='text' name='name' id= 'name' placeholder='{{ old("name") }}'></label>
    <label>Cognome <input type='text' name='surname' id ='surname' placeholder='{{ old("cognome") }}'></label>
    <label>Username <input type='text' name='username' id = 'username' placeholder='{{ old("username") }}'></label>
    <label>Password <input type='password' name='password' id = 'password' placeholder='Password'></label>        
    <label>Conferma Password <input type='password' name='confirm_password' id = 'confirm_password' placeholder='Conferma Password'></label>
    <input type='submit' id = 'submit' value='Registrati'></label>

    <div class = 'campo'></div>
    <div class = 'surname'></div>
    <div class = 'username'></div>
    <div class = 'password'></div>
    <div class = 'conferma_password'></div>
</form>
<div class="signup">Hai un account? <a href="login">Accedi</a>
<div class="error"> @isset($errore)
    {{
        $errore                
    }}
    @endisset
     </div>

@endsection