<?php

use Illuminate\Support\Facades\Route;


//da togliere
use App\Models\Pool;
//
//
//
//


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your 
application. These
| routes are loaded by the RouteServiceProvider within 
a group which
| contains the "web" middleware group. Now create something 
great!
|
*/

Route::get('/', function () {
    return view('welcome');
});



Route::get('test_view', function(){
    $pool = Pool::select('id', 'description', 'hour', 'date_event', 'place', 'category', 'n_voters', 'status')
    ->where('id', 1)
    ->get();

    return view('test')->with('pool', $pool);
});




/////////////////////////////////////////////////////////////////////////////
Route::get('/test_users', 'App\Http\Controllers\TestController@showTable');

 
Route::get('home_logged', function(){
                                return view("home_logged");
                                }
);


/////////////////////////////////////////////
Route::get('home_not_logged', function(){ 
                                    return view("home_not_logged"); 
                                } 
);


///////////////////////////////////////////////////////////////
Route::get('vote_pool', 'App\Http\Controllers\PoolController@get_info');
 
Route::get('my_pool', 'App\Http\Controllers\PoolController@get_my_pool_info');


 
/*          LOGIN CONTROLLER            */

Route::match(['get', 'post'], 'login', 'App\Http\Controllers\LoginController@check_if_is_logged');
//Route::post('login', 'App\Http\Controllers\LoginController@check_if_is_logged');

Route::get('home_logged', 'App\Http\Controllers\HomeController@index');




Route::get('signup', 'App\Http\Controllers\RegisterController@index');

Route::match(['get', 'post'],'register', 'App\Http\Controllers\RegisterController@register');

Route::get('/register/username/{username}', 'App\Http\Controllers\RegisterController@checkUsername');


 
///////////////////////////////////////// home_logged
Route::post('view_create_pool', 'App\Http\Controllers\PoolController@index');

Route::post('create_pool', 'App\Http\Controllers\PoolController@create_pool');


Route::get('update_pool', 'App\Http\Controllers\PoolController@update_pool');

Route::get('delete_pool', 'App\Http\Controllers\PoolController@delete_pool');

Route::post('logout', 'App\Http\Controllers\LoginController@logout');

  


Route::get('/home', 'App\Http\Controllers\HomeController@introduction');



Route::get('/search/{cerca}', 'App\Http\Controllers\PoolController@search');

Route::get('/search_logged/{cerca}', 'App\Http\Controllers\PoolController@search_logged');



Route::get('pools', 'App\Http\Controllers\PoolController@get_pools');

Route::get('pools_logged', 'App\Http\Controllers\PoolController@get_pools_logged');


Route::get('get_options/{id_sondaggio}', 'App\Http\Controllers\PoolController@get_options');

Route::get('get_results/{id_sondaggio}', 'App\Http\Controllers\PoolController@get_results');

Route::get('get_details/{id_sondaggio}', 'App\Http\Controllers\PoolController@get_details');

Route::get('get_comments/{id_sondaggio}', 'App\Http\Controllers\PoolController@get_comments');

Route::get('add_comment/{id_sondaggio}/{testo}/{id_utente}', 'App\Http\Controllers\PoolController@add_comment');

Route::get('add_vote', 'App\Http\Controllers\PoolController@add_vote');

Route::get('api_weather/{luogo}', 'App\Http\Controllers\PoolController@api_weather');

Route::get('modify/{id_sondaggio}', 'App\Http\Controllers\PoolController@modify');


//Route::post('api_weather', 'App\Http\Controllers\PoolController@api_weather');

////////////////////////////////////////////////////
