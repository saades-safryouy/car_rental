<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Marque extends Model
{
    use HasFactory;

    protected $table = 'marques';
    protected $primaryKey = 'id_marque';
    protected $fillable = ['nom_marque', 'logo'];

    public function voitures()
    {
        return $this->hasMany(Voiture::class, 'id_marque', 'id_marque');
    }
}