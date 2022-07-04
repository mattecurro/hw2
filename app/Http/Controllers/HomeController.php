<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

//includere i Models da usare 
use App\Models\User;



class HomeController extends BaseController
{
    
    //info php all'interno dell'html di home_logged.php
    public function introduction(){
        $user = User::where('id', Session::get('username'))
                    ->get();
        //ritorna la view home_logged inviandogli i dati di $user
        //nella view potrò quindi chiamare questi dati con {{ $user-> dati}}
        return view('home_logged')->with($user);
    }

    
    public function index() {
        return view('home_logged');
    } 
} 
