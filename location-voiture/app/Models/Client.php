<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Client extends Model
{
    use HasFactory;
    use HasApiTokens;

    protected $table = 'clients';
    protected $primaryKey = 'id_client';
    protected $fillable = [
        'nom', 'prenom', 'email', 'password', 'telephone', 'adresse', 'permis_conduire'
    ];

    protected $hidden = ['password','remember_token'];

    public function locations()
    {
        return $this->hasMany(Location::class, 'id_client', 'id_client');
    }

    public function paniers()
    {
        return $this->hasMany(Panier::class, 'id_client', 'id_client');
    }
}