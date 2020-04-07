<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{
    //
    protected $fillable = [
        'country', 'symbol', 'name', 'code'
    ];

    public function transactions()
    {
        return $this->belongsTo(Transaction::class, 'categories_id', 'id');
    }
}
