<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    use HasFactory;

    protected $table = 'locations';
    protected $primaryKey = 'id_location';
    protected $fillable = [
        'id_voiture', 'id_client', 'date_debut', 'date_fin', 'date_retour',
        'montant_total', 'statut'
    ];

    protected $dates = ['created_at', 'updated_at', 'date_debut', 'date_fin', 'date_retour'];

    public function voiture()
    {
        return $this->belongsTo(Voiture::class, 'id_voiture', 'id_voiture');
    }

    public function client()
    {
        return $this->belongsTo(Client::class, 'id_client', 'id_client');
    }

  
}