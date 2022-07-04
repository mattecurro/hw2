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




class RegisterController extends BaseController
{
    //use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
 
    public function countErrors($data) {
        $error = array();
        
        # USERNAME
        // Controllo che l'username rispetti il pattern specificato
        if(!preg_match('/^[a-zA-Z0-9_]{1,15}$/', $data['username'])) {
            $error[] = "Username non valido";
        } else {
            $username = User::where('username', $data['username'])->get();
            if ($username !== null) {
                $error[] = "Username già utilizzato";
            }
        }
        # PASSWORD
        if (strlen($data["password"]) < 5) {
            $error[] = "Caratteri password insufficienti, inserire almento 5 caratteri";
        } 
        # CONFERMA PASSWORD
        if (strcmp($data["password"], $data["password_confirmation"]) != 0) {
            $error[] = "Le password non coincidono";
        }

        return count($error);
    }



    public function register(){
        $request = request();

        if(!empty($request["username"]) && !empty($request["password"]))  {
                if ( strlen($request["password"]) < 5) {
                    echo "<h1> Errore: Password troppo corta, inserire almeno 5 caratteri</h1>";
                    exit;
                }
        
                
                # USERNAME
                // Controlla che l'username rispetti il pattern specificato
                if(!preg_match('/^[a-zA-Z0-9_]{1,15}$/', $request["username"])) {
                    echo "Username non valido";
                    exit;
                } else {
                    $exist = User::where('username', $request["username"])->exists();
                    if ($exist ===true) {
                        echo "Username già utilizzato";
                        exit;
                    }
                }
                # CONFERMA PASSWORD
                if (strcmp($request["password"], $request["confirm_password"]) != 0) {
                    echo "Le password non coincidono";
                    return redirect('register')->withInput();
                } 
                
                else{
                    $password = $request['password'];
                    $hashedPassword = Hash::make($password);
                    $newUser =  User::create([
                    'username' => $request['username'],
                    'password' => $hashedPassword,
                    'name' => $request['name'],
                    'surname' => $request['surname'],
                    ]);
                    if ($newUser) {
                        Session::put('id', $newUser->id);
                        Session::put('username', $newUser->username);
                        return redirect('home_logged');
                    } 
                    else {
                        //se per qualche motivo l'inserimento non fosse andato a buon fine
                        return redirect('register')->withInput();
                    }
                }   
            }
    }

    public function index() {
        return view('registrer');
    } 

 

    public function checkUsername($username){
        $exist = User::where('username', $username)->exists();
        return $exist;
    }

}
?>        