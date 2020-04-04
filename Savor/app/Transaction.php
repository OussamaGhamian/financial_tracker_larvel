<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'title', 'description', 'amount', 'categories_id', 'start_date', 'end_date', 'user_id', 'intervalo', 'type', 'currencies_id'
    ];
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
    public function category()
    {
        $this->belongsTo(Category::class, 'categories_id', 'id');
    }
    public function currency()
    {
        $this->hasOne(Currency::class, 'currencies_id', 'id');
    }
}
