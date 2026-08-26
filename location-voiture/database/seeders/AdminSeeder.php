<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        Admin::create([
            'nom' => 'Admin',
            'prenom' => 'User',
            'email' => 'admin@example.com',
            'password' => Hash::make('adminpassword'),
        ]);
        Admin::create([
            'nom' => 'ES-SAFRYOUY',
            'prenom' => 'Saad',
            'email' => 'saadessafryouy@gmail.com',
            'password' => Hash::make('one piece'),
        ]);
    }
}
