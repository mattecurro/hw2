<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Option extends Model {
    
    
    protected $fillable = [
        'pool', 'option'
    ];

    public $timestamps = false;

    public function pools() {
        return $this->belongsTo("App\Models\Pool");
    }

    public function participants() {
        return $this->belongsToMany('App\Models\Participant', 'participants');
    }

}


?>