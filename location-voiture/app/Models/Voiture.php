<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

Class Voiture extends Model{
    use HasFactory;
    protected $table='voitures';
    protected $primaryKey = 'id_voiture';
    protected $fillable = [
        'id_marque',
        'id_categorie',
        'modele',
        'annee',
        'immatriculation',
        'prix_journalier',
        'description',
        'disponible',
        'quantity',
        'imageFront',
        'imageRight',
        'imageLeft',
        'imageBack'
    ];

        protected $casts = [
            'disponible' => 'boolean',
            'prix_journalier' => 'decimal:2',
        ];
        public function marque() {
            return $this->belongsTo(Marque::Class,'id_marque','id_marque');
        }
        public function categorie() {
            return $this->belongsTo(Categorie::Class,'id_categorie','id_categorie');
        }       

        public function reservations() {
            return $this->hasMany(Reservation::Class,'id_voiture','id_voiture');
        }
        public function locations()
        {
            return $this->hasMany(Location::class, 'id_voiture', 'id_voiture');
        }
    
        public function cartItems()
        {
            return $this->hasMany(CartItem::class, 'id_voiture', 'id_voiture');
        }
    }