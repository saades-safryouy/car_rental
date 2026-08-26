<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Panier extends Model
{
    use HasFactory;

    protected $table = 'paniers';
    protected $primaryKey = 'id_panier';
    protected $fillable = ['id_client', 'date_ajout'];

    public function client()
    {
        return $this->belongsTo(Client::class, 'id_client', 'id_client');
    }

    public function cartItems()
    {
        return $this->hasMany(CartItem::class, 'id_panier', 'id_panier');
    }
}