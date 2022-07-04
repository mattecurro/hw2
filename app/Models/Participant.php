<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Participant extends Model {


    protected $fillable = [
        'user', 'vote'
    ];

    public $timestamps = false;

    public function user() {
        return $this->belongsToMany("App\Models\User");
    }

    public function options() {
        return $this->belongsToMany('App\Models\Option', 'options');
    }

}


?>