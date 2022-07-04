@extends('pool')

@section('title', 'DOXA: Sondaggio')

@section('script')
<script src="../resources/js/my_pool.js" defer></script>
@endsection 


@section('img')
<img onclick="window.location.href='home_logged'" src="../resources/img/go_back.png">  
@endsection

@section('section_1')
<div class="pointer" id="modifica">Modifica </div>
@endsection

@section('section_2')
<section id='sec_modifica' class='vote hidden'>
            </section>
@endsection
  
@section('modal')
<section id="modal-view" class="hidden"></section>
<div id='session_id' class="hidden">{{ $session_id }}</div>
<div id='session_user_id_not_logged' class="hidden">{{ $session_user_id_not_logged }}</div>
@endsection
  
 