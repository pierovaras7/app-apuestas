<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Bet extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id','type','description','stake','odd','potential_win','status'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function selections()
    {
        return $this->hasMany(BetSelection::class);
    }
}