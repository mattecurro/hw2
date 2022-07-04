<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model {

  /*
    protected $fillable = [
        'user_id', 'post_id', 'content'
    ];

*/
protected $fillable = [
  'user', 'pool', 'text'
];

  public $timestamps = false;
    
    public function user() {
        return $this->belongsTo("App\Models\User");
    }

    public function pool() {
        return $this->belongsTo("App\Models\Pool");
    }

}

?>