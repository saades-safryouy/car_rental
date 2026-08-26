<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Client;
use Illuminate\Support\Facades\Hash;

class ClientSeeder extends Seeder
{
    public function run(): void
    {
        Client::create([
            'nom' => 'John',
            'prenom' => 'Doe',
            'email' => 'john.doe@example.com',
            'password' => Hash::make('password123'),
            'telephone' => '1234567890',
            'adresse' => '123 Main St',
            'permis_conduire' => 'ABC123456',
        ]);

        Client::create([
            'nom' => 'Jane',
            'prenom' => 'Smith',
            'email' => 'jane.smith@example.com',
            'password' => Hash::make('password123'),
            'telephone' => '0987654321',
            'adresse' => '456 Elm St',
            'permis_conduire' => 'XYZ987654',
        ]);
    }
}
