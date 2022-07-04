@extends('home')

@section('title', '| DOXA')

@section('script')
<script src="../resources/js/home_logged.js" defer></script>
<link rel = 'stylesheet' href="../resources/css/home.css">
@endsection

@section('introduction')
<h1> Benvenuto {{ session()->get('username')  }} </h1>
<h3> I tuoi sondaggi </h3>
@endsection

@section('content')
<form name='create_pool' method='post' action='view_create_pool'>
    @csrf
    <input id='create_pool' type='submit' name='create_pool' value='Nuovo Sondaggio'>
</form>
<form name='logout' method='post' action='logout'>
@csrf
    <input id='logout' type='submit' name='logout' value='LOGOUT'>
</form>
@endsection

  