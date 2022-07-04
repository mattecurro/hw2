<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

//includere i Models da usare
use App\Models\User;
use App\Models\Pool;
use App\Models\Option;
use App\Models\Participant;
use App\Models\Comment;


class PoolController extends BaseController
{
    public function index(){
        return view('create_pool');
    }

    public function delete_pool(){
        $request = request();

        Option::where('pool', $request['id_sondaggio'])->delete();
        Pool::where('id', $request['id_sondaggio'])->delete();
        return view('home_logged');
    }
    
    public function update_pool(){
        $request = request();

        if(session('id') == null )
        {
            $errore = true;
            echo "errore";
        }        


        if (!empty($request["descrizione"]) && !empty($request["orario"]) && !empty($request["luogo"]) && !empty($request["data"]) && !empty($request["categoria"]) ){
            $newPool =  Pool::
                            where('id', $request['id_sondaggio'])
                            ->update(["description" => $request['descrizione'],
                                    "hour" => $request['orario'],
                                    "place"=> $request['luogo'],
                                    "date_event" => $request['data'],
                                    "category" => $request['categoria'],
                                    "status" => $request['status'],
            ]);

            //ottengo id dell'opzione ASCENDENTE 
            $option_id = Option::
                                select('id')
                                ->where('pool', $request['id_sondaggio'])
                                ->orderBy('id', 'ASC')
                                ->first();
            $option_id = $option_id->id;
                

            foreach($request['opzione'] as $o){
                
                $option = Option::where('pool', $request['id_sondaggio'])
                                ->where('id', $option_id)
                                ->update(["option" => $o]);
                $option_id++;

            }
            return view('home_logged');
        }
    }

    public function create_pool(){
        $request = request();

        if(session('id') == null )
        {
            $errore = true;
            echo "errore";
        }
        
         
        if (!empty($request["descrizione"]) && !empty($request["orario"]) && !empty($request["luogo"]) && !empty($request["data"]) && !empty($request["categoria"]) ){
            $newPool =  Pool::create([
                'description' => $request['descrizione'],
                'hour' => $request['orario'],
                'place' => $request['luogo'],
                'date_event' => $request['data'],
                'category' => $request['categoria'],
                'user' => session('id'),
                'status' => "1",
            ]);

            $newPool_id = Pool::select('id')
                            ->orderBy('id', 'DESC')
                            ->first();

            $newPool_id = $newPool_id->id;

            foreach($request['opzione'] as $o){
                $option = Option::create([
                    'pool' => $newPool_id,
                    'option' => $o,
                ]);
            }
            return view('home_logged');
        }

    }

    public function get_pools(){
        //Visualizzare SONDAGGI presenti nel DB
        return Pool::select('id', 'description', 'hour', 'place', 'category', 'n_voters', 'status')
                    ->take(10)
                    ->get();
    }   
     
    public function get_pools_logged(){
        return Pool::select('id', 'description', 'hour', 'place', 'category', 'n_voters', 'status')
                    ->where('user', session('id'))
                    ->take(10)
                    ->get();
    }

    public function search_logged($cerca){
        $cerca = $cerca."%";
        return Pool:: select('id', 'description', 'hour', 'place', 'category', 'n_voters', 'status')
                        ->where('user', session('id'))
                        ->where(function($query) use ($cerca)
                        {
                            $query->orwhere('description', 'like', $cerca)
                                  ->orWhere('category', 'like', $cerca);
                        })
                        ->get(); 
    }

    public function search($cerca){
        $cerca = $cerca."%";

        //ritorno ARRAY di SONDAGGI

        return Pool:: select('id', 'description', 'hour', 'place', 'category', 'n_voters', 'status')
                        ->where('description', 'like', $cerca)
                        ->orWhere('category', 'like', $cerca)
                        ->get();
    }

    public function get_options($id_sondaggio){
        //visualizzare opzioni per il dato sondaggio              
        return Option::select('id', 'option', 'pool')
                ->where('pool', $id_sondaggio)
                ->get();               
    }


    public function get_results($id_sondaggio){        
        $options = DB::table('options')
                ->join('participants', 'options.id', '=', 'participants.vote')
                ->where('options.pool', $id_sondaggio)
                ->distinct()
                ->select('participants.vote')
                ->get(); 
        $assoc = json_decode($options, true);
        $i = 0;
        $occorrenze_voto = array();
        foreach ($assoc as $array) {
            foreach($array as $value){
                $occorrenze_voto[$i] = DB::table('options') 
                ->join('participants', 'options.id', '=', 'participants.vote')
                ->where('options.pool', $id_sondaggio)
                ->where('participants.vote', $value)
                ->select('options.option', DB::raw('count(participants.vote) as n_occ_voto'))
                ->get();
                $i++;
            }
        }    
        return $occorrenze_voto;
    }
        
    public function get_details($id_sondaggio){

        $contenuto = array();
    
        $utenti = array();

        $opzioni = array();
    
        $n_opzioni = array();

        $opzioni = DB::table('options')
                ->join('participants', 'options.id', '=', 'participants.vote')
                ->where('options.pool', $id_sondaggio)
                ->distinct()
                ->select('options.option')
                ->get(); 
        

        $options = DB::table('options')
                ->join('participants', 'options.id', '=', 'participants.vote')
                ->where('options.pool', $id_sondaggio)
                ->distinct()
                ->select('participants.vote')
                ->get(); 
        
        $assoc = json_decode($options, true);
        //
        $i = 0;        
        foreach ($assoc as $array) {
            foreach($array as $value){
                $occorrenze_voto[$i] = DB::table('options') 
                ->join('participants', 'options.id', '=', 'participants.vote')
                ->where('options.pool', $id_sondaggio)
                ->where('participants.vote', $value)
                ->select('options.option', DB::raw('count(participants.vote) as n_occ_voto'))
                ->get();
                $utenti[$i] = DB::table('participants') 
                ->join('options', 'participants.vote' , '=', 'options.id')
                ->join('users', 'participants.user', '=', 'users.id')
                ->where('options.pool', $id_sondaggio)
                ->where('participants.vote', $value)
                ->select('options.option', 'users.username')
                ->get();
                $i++;
            }
        }
        
        $contenuto['utenti'] = $utenti;
        $contenuto['opzioni'] = $opzioni;
        $contenuto['indice'] = $i;

        return $contenuto;
    }


    public function modify($id_sondaggio){
        

        $contenuto = array();
        $sondaggio = array();
        $opzioni = array();

        $opzioni = Option::select('option')
                    ->where('pool', $id_sondaggio)
                    ->get();               
        
        $sondaggio = Pool::select('description', 'hour', 'place', 'date_event', 'category', 'status')
                        ->where('id', $id_sondaggio)
                        ->get();

        $contenuto['sondaggio'] = $sondaggio;
        $contenuto['opzioni'] = $opzioni;
        return $contenuto; 
    }


    public function get_info(){
        $request = request();

        $id_opzioni = Option::select('id')
                ->where('pool', $request['id_sondaggio'])
                ->get();
        
        $array_id_opzioni = array();
        $i = 0;
        foreach ($id_opzioni as $array) {
            $array_id_opzioni[$i] = $array->id;
            $i++;
        }
        $array_id_opzioni;
        

        $participation = Participant::select('user')
                                    ->where('user', session('user_id_not_logged'))
                                    ->where('vote', $array_id_opzioni)
                                    ->orWhere('user', session('id'))
                                    ->first();
        
        //Visualizzare caratteristiche SONDAGGIO presenti nel DB
        $pool = Pool::select('id', 'description', 'hour', 'date_event', 'place', 'category', 'n_voters', 'status')
                ->where('id', $request['id_sondaggio'])
                ->get();    

        if($participation == null){
            //potrò votare ma potrò inserire il nome se e solo se le variabili session non sono settate
            return view('vote')
                            ->with('pool' , $pool)       
                            ->with('session_id', session('id', -1))
                            ->with('session_user_id_not_logged', session('user_id_not_logged', -1));                            
        }
        else{
            return view('post_vote')
                            ->with('pool', $pool)
                            ->with('session_id', session('id', -1))
                            ->with('session_user_id_not_logged', session('user_id_not_logged', -1));
        }
    }


    public function get_my_pool_info(){
        $request = request();

        $id_opzioni = Option::select('id')
                ->where('pool', $request['id_sondaggio'])
                ->get();
        
        $array_id_opzioni = array();
        $i = 0;
        foreach ($id_opzioni as $array) {
            $array_id_opzioni[$i] = $array->id;
            $i++;
        }
        $array_id_opzioni;
        
        //Visualizzare caratteristiche SONDAGGIO presenti nel DB
        $pool = Pool::select('id', 'description', 'hour', 'date_event', 'place', 'category', 'n_voters', 'status')
                ->where('id', $request['id_sondaggio'])
                ->get();    

        return view('my_pool')
                            ->with('pool', $pool)
                            ->with('session_id', session('id', -1))
                            ->with('session_user_id_not_logged', session('user_id_not_logged', -1));
    }



    public function get_comments($id_sondaggio){
        return DB::table('comments')
                ->join('users', 'comments.user', '=', 'users.id')
                ->orderBy("comments.id", "ASC")
                ->where('comments.pool', $id_sondaggio)
                ->select('comments.text', 'comments.pool', 'comments.user', 'users.username')
                ->get();
    }


    public function add_comment(){
        $request = request();
        
        $newComment = Comment:: create([
            'user' => $request['id_utente'],
            'pool' => $request['id_sondaggio'],
            'text' => $request['testo'],
        ]);
        return $newComment;
    }
   
    

    public function add_vote(){
        $request = request();
    
        $request['scelta'];
        
        if(session('username') !== null) { 
            $newParticipant = Participant:: create([
                'user' => session('id'),
                'vote' => $request['voto'],
            ]);
            $user = session('username');
            $user_id = session('id');
        }
        elseif(session('user_id_not_logged') !== null){
            $newParticipant = Participant::create([
                'user' => session('user_id_not_logged'),
                'vote' => $request['voto'],
            ]);
            $user_id = session('user_id_not_logged');
        }   
        else{
            $user = User:: create([
                'username' => $request['username']
            ]);

            $user = User:: select('id')
                ->orderBy('id', 'DESC')
                ->first();

            $user_id = $user->id;

            Session::put("user_id_not_logged", $user_id);

            $newParticipant = Participant:: create([
                'user' => $user_id,
                'vote' => $request['voto'],
            ]);
        }
    
       //Visualizzare SONDAGGI presenti nel DB
        $pool = Pool::select('id', 'description', 'hour', 'date_event', 'place', 'category', 'n_voters', 'status')
                ->where('id', $request['id_sondaggio'])
                ->get();    
        //ritorno SONDAGGIO con le sue info
        return view('post_vote')     
                    ->with('pool' , $pool)        
                    ->with('session_id', session('id', -1))
                    ->with('session_user_id_not_logged', session('user_id_not_logged', -1));
    }

    public function api_weather(){
        $request = request();

        $q = $request["luogo"];
/*
        echo env('WEATHER_APIKEY');
        echo "<br>";
        echo $request["luogo"];
        echo "<br>";
*/
        $url = 'http://api.weatherapi.com/v1/current.json?key='.env('WEATHER_APIKEY').'&q='.$q.'&aqi=no';
        //fare result 

        $curl = curl_init($url);     
        //setto return: valore e non boolean
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        //eseguo richiesta all'url
        $result = curl_exec($curl);
        
        $json = json_decode($result, true);

        curl_close($curl);

        //forse serve passarlo in json\\\\\\\\\\\\\\\\\\\\\\\\\\\\ anche se non credo
        return $json;
    }
}