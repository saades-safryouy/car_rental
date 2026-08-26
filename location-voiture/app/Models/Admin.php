<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Admin extends Model
{
    use HasFactory;
use HasApiTokens;
    protected $table = 'admins';
    protected $primaryKey = 'id_admin';
    protected $fillable = ['nom', 'prenom', 'email', 'password'];

    protected $hidden = ['password'];

}