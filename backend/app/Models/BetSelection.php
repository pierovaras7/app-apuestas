<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class BetSelection extends Model
{
    use HasFactory;

    protected $fillable = [
        'bet_id','event_name','market','pick','odd','status'
    ];

    public function bet()
    {
        return $this->belongsTo(Bet::class);
    }
}
