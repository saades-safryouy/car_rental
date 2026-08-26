<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('assurances', function (Blueprint $table) {
            $table->id('id_assurance');
            $table->foreignId('id_location')->constrained('locations', 'id_location')->onDelete('cascade');
            $table->enum('type_assurance', ['Tous risques', 'Responsabilite civile']);
            $table->decimal('cout', 10, 2);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('assurances');
    }
};