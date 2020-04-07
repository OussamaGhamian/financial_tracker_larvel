<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    public $timestamps = false;
    protected $fillable = [
        "name", "user_id"
    ];
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
    public function transactions()
    {
        return $this->hasMany(Transaction::class, 'categories_id', 'id');
    }
}
