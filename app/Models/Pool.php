<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pool extends Model {


    protected $fillable = [
        'description', 'hour', 'place', 'date_event', 'category', 'status', 'user'
    ];
/*
    protected $casts = [
        'content' => 'array'
    ];
*/
    public $timestamps = false;

    public function user() {
        return $this->belongsTo("App\Models\User");
    }

    public function likes() {
        return $this->hasMany('App\Models\Like', 'likes');
    }

    public function comments() {
        return $this->hasMany('App\Models\Comment');
    }

    public function options(){
        return $this->hasMany('App\Models\Option');
    }



}


?>