<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('voitures', function (Blueprint $table) {
            $table->id('id_voiture');
            $table->foreignId('id_marque')->constrained('marques', 'id_marque')->onDelete('cascade');
            $table->foreignId('id_categorie')->constrained('categories', 'id_categorie')->onDelete('cascade');
            $table->string('modele', 50);
            $table->integer('annee');
            $table->string('immatriculation', 20)->unique();
            $table->boolean('disponible')->default(true);
            $table->decimal('prix_journalier', 10, 2);
            $table->string('imageFront', 255)->nullable();
            $table->string('imageRight', 255)->nullable();
            $table->string('imageLeft', 255)->nullable();
            $table->string('imageBack', 255)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('voitures');
    }
};