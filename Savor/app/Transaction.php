<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'title', 'description', 'amount', 'categories_id', 'start_date', 'end_date', 'user_id', 'intervalo', 'type', 'currencies_id'
    ];
}
