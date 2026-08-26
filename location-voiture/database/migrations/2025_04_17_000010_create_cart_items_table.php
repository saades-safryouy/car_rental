<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cart_items', function (Blueprint $table) {
            $table->id('id_cart_item');
            $table->foreignId('id_panier')->constrained('paniers', 'id_panier')->onDelete('cascade');
            $table->foreignId('id_voiture')->constrained('voitures', 'id_voiture')->onDelete('cascade');
            $table->integer('quantite')->default(1);
            $table->timestamp('date_ajout')->useCurrent();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cart_items');
    }
};