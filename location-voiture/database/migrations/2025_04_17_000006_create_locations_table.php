<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('locations', function (Blueprint $table) {
            $table->id('id_location');
            $table->foreignId('id_voiture')->constrained('voitures', 'id_voiture')->onDelete('cascade');
            $table->foreignId('id_client')->constrained('clients', 'id_client')->onDelete('cascade');
            $table->date('date_debut');
            $table->date('date_fin');
            $table->date('date_retour')->nullable();
            $table->decimal('montant_total', 10, 2);
            $table->enum('statut', ['En cours', 'Terminee', 'Annulee'])->default('En cours');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('locations');
    }
};