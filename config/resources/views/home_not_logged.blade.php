@extends('home')


@section('title', ' DOXA')

@section('script')
<script src="../resources/js/home_not_logged.js" defer></script>
<link rel = 'stylesheet' href="../resources/css/home.css">
@endsection
 
@section('content') 
<form name='login' method='post' action= "login">
    @csrf
    <input id='accedi' type='submit' name='accedi' value='Accedi'>        
</form>
<form name='sign_up' method='get' action= "signup">
    @csrf
    <input id='registrati' type='submit' name='registrati' value='Registrati'>
</form>
@endsection
    