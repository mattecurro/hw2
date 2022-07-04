<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model {
    public $timestamps = false;

    protected $fillable = [
        'name', 'username', 'surname', 'password'
    ];


    public function pools() {
        return $this->hasMany("App\Models\Post");
    }

    public function comments(){
        return $this->hasMany("App\Models\Comment");
    }

    public function likes(){
        return $this->hasMany("App\Models\Like");
    }

    public function participants(){
        return $this->belongsToMany("App\Models\Participant");
    }


    
}
