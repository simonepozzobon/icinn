<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    protected $table = 'files';

    public function articles()
    {
        return $this->belongsToMany(Article::class);
    }
}
