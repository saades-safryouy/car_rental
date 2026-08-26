<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MarqueController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\VoitureController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\PanierController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;

Route::post('/login', [AuthController::class, 'login'])->middleware();
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::post('/signup', [ClientController::class, 'store']);


    Route::get('marques', [MarqueController::class,'clientindex']);
    Route::get('categories', [CategorieController::class,'clientindex']);
    Route::get('voitures', [VoitureController::class,'clientindex']);
    Route::get('clients', [ClientController::class,'clientindex']);
    Route::get('locations/{id_client}/', [LocationController::class,'clientindex']);
    Route::get('location/{id_location}', [LocationController::class,'show']);
    Route::post('locations', [LocationController::class,'store']);
    Route::get('paniers', [PanierController::class,'clientindex']);

    // Additional Panier routes for cart item management
    Route::post('paniers/{id}/items', [PanierController::class, 'addItem']);
    Route::delete('paniers/{id}/items/{cartItemId}', [PanierController::class, 'removeItem']);
    Route::delete('paniers/{id}/items', [PanierController::class, 'clearItems']);
    ?>


