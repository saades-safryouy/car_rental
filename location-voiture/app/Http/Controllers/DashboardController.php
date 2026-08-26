<?php

namespace App\Http\Controllers;

use App\Models\Voiture;
use App\Models\Marque;
use App\Models\Categorie;
use App\Models\Location;
use Illuminate\Http\Request;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function getAnalytics()
    {
        $totalCars = Voiture::count();
        $totalBrands = Marque::count();
        $totalCategories = Categorie::count();
        $totalReservations = Location::count();
         
        $voitures= Voiture::all();
        $marques= Marque::all();
        $locations= Location::with(['client','voiture'])->get();

        

        $carsByBrand = Marque::withCount('voitures')
            ->get()
            ->map(fn($brand) => [
                'name' => $brand->nom_marque,
                'count' => $brand->voitures_count
            ]);

        $reservationsByMonth = Location::selectRaw('DATE_FORMAT(created_at, "%Y-%m") as month, COUNT(*) as count')
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->map(fn($res) => [
                'month' => Carbon::parse($res->month)->format('M Y'),
                'count' => $res->count
            ]);

        $reservationStatus = Location::selectRaw('statut, COUNT(*) as count')
            ->groupBy('statut')
            ->get()
            ->map(fn($res) => [
                'status' => ucfirst($res->statut),
                'count' => $res->count
            ]);
        

        return view('admin.analytics', compact(
            'totalCars',
            'totalBrands',
            'totalCategories',
            'totalReservations',
            'carsByBrand',
            'reservationsByMonth',
            'reservationStatus',
            'locations',
        ));
    }

 
}