<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Controller;
use App\Http\Controllers\MarqueController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\VoitureController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\NotificationController;

// Public routes
// Route::get('/', function(){
//     return redirect()->away("http://localhost:5173");
// })->name('home');

// Auth routes with session
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    
    // Admin routes with auth and session
    // Route::middleware(['auth:sanctum', 'session'])->group(function () {
        Route::get('/admin/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
        Route::get('/admin/client-activities', [AdminController::class, 'clientActivities'])->name('admin.client-activities');
        Route::get('/admin/analytics', [DashboardController::class, 'getAnalytics'])->name('admin.analytics');
        
        Route::prefix('api')->group(function () {
            //DashBoard Routes
            Route::get('/admin/view-marque',[MarqueController::class,'view'])->name('marque.index');
            Route::get('/admin/add-marque', [MarqueController::class, 'create'])->name('marque.create');
            Route::post('/admin/add-marque', [MarqueController::class, 'store'])->name('marque.store');
            Route::get('/admin/show-marque/{id}', [MarqueController::class, 'show'])->name('marque.show');
            Route::put('/admin/update-marque/{id}', [MarqueController::class, 'update'])->name('marque.update');
            Route::delete('/admin/destroy-marque/{id}', [MarqueController::class, 'destroy'])->name('marque.destroy');

            Route::get('/admin/view-categories',[CategorieController::class,'view'])->name('categorie.index');
            Route::get('/admin/add-categories', [CategorieController::class, 'create'])->name('categorie.create');
            Route::post('/admin/add-categories', [CategorieController::class, 'store'])->name('categorie.store');
            Route::get('/admin/show-categories/{id}', [CategorieController::class, 'show'])->name('categorie.show');
            Route::put('/admin/update-categories/{id}', [CategorieController::class, 'update'])->name('categorie.update');
            Route::delete('/admin/destroy-categories/{id}', [CategorieController::class, 'destroy'])->name('categorie.destroy');
            
            Route::get('/admin/view-cars',[VoitureController::class,'view'])->name('voiture.index');
            Route::get('/admin/add-cars', [VoitureController::class, 'create'])->name('voiture.create');
            Route::post('/admin/add-car', [VoitureController::class, 'store'])->name('voiture.store');
            Route::get('/admin/show-car/{id_voiture}', [VoitureController::class, 'show'])->name('voiture.show');
            Route::put('/admin/update-car/{id_voiture}', [VoitureController::class, 'update'])->name('voiture.update');
            Route::delete('/admin/destroy-car/{id_voiture}', [VoitureController::class, 'destroy'])->name('voiture.destroy');

            Route::get('admin/reservations', [LocationController::class, 'index'])->name('reservation.index');
            Route::put('admin/reservations/{id}/status', [LocationController::class, 'updateStatus'])->name('reservation.status.update');
        });

        // Notification routes
        Route::prefix('admin')->middleware(['auth'])->group(function () {
            Route::get('/notifications', [NotificationController::class, 'index'])->name('admin.notifications.index');
            Route::post('/notifications/{id}/read', [NotificationController::class, 'markAsRead'])->name('admin.notifications.read');
            Route::post('/notifications/mark-all-read', [NotificationController::class, 'markAllAsRead'])->name('admin.notifications.mark-all-read');
        });
    // });
?>
