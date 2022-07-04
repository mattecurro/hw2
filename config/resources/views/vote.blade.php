@extends('pool')

@section('title', 'DOXA: Sondaggio')

@section('script')
<script src="../resources/js/vote_pool.js" defer></script>
@endsection  

@section('img')
<img onclick="window.location.href='home_not_logged'" src="../resources/img/go_back.png">
@endsection

@section('section_1')
<div class="underlined pointer" id="registra_voto">Registra Voto </div>
@endsection

@section('section_2')
<section id='sec_registra_voto' class='vote'>
            </section>
@endsection

@section('modal')
<section id="modal-view" class="hidden"></section>
<div id='session_id' class="hidden">{{ $session_id }}</div>
<div id='session_user_id_not_logged' class="hidden">{{ $session_user_id_not_logged }}</div>
@endsection
  