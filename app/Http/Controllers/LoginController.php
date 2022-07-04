<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;


//includere i Models da usare
use App\Models\User;

 
 
class LoginController extends BaseController
{
    //use AuthorizesRequests, DispatchesJobs, ValidatesRequests;


    public function show($p = "matteo"){
        return [1,2,3, ['nome' =>$p]]; //in JSON
    }


    public function check_if_is_logged(){
        if(session('username') != null )
        {
            //Vado alla home_da_loggato
            return view('home_logged');
        }
        $request = request();
 
        //verifico se dati inviati con POST hanno corrispondenza nel DB,
        //controllo ridondante, già effettuato in JS
    
        //tolgo già tutti coloro che non sono loggati, ma che hanno solo votato
        if (!empty($request["username"]) && !empty($request["password"]) )
        {
            //automatic escape
            //ricerco utenti con le date credenziali
            $user = User::where('username', request('username'))
                                ->first();            
            if($user != null){    
                if (Hash::check(request('password'), $user->password)) {
            
                    Session::flush();

                    Session::put("username", $user->username);
                    Session::put("id", $user->id);



                    return redirect('home_logged');
                }
                else{
                    $errore = "Username e/o Password errati.";
                    return view('login')
                                    ->with('errore', $errore);
    
                }                
            }
            else{
                $errore = "Username e/o Password errati.";
                return view('login')
                                ->with('errore', $errore);
            }
        }
        else{
            return view('login');
        }
    }
        
    public function logout(){
        Session::flush(); //non necessario
        return redirect('home_not_logged');
    }

}
