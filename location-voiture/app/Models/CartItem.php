<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    use HasFactory;

    protected $table = 'cart_items';
    protected $primaryKey = 'id_cart_item';
    protected $fillable = ['id_panier', 'id_voiture', 'quantite', 'date_ajout'];

    public function panier()
    {
        return $this->belongsTo(Panier::class, 'id_panier', 'id_panier');
    }

    public function voiture()
    {
        return $this->belongsTo(Voiture::class, 'id_voiture', 'id_voiture');
    }
}