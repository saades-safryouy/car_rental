<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Location;
use App\Models\Voiture;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    public function index()
    {
        $admins = Admin::all()->map(function ($admin) {
            return [
                'id_admin' => $admin->id_admin,
                'nom' => $admin->nom,
                'prenom' => $admin->prenom,
                'email' => $admin->email,
            ];
        });

        return response()->json($admins, 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:50',
            'prenom' => 'required|string|max:50',
            'email' => 'required|email|max:100|unique:admins',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $admin = Admin::create([
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'id_admin' => $admin->id_admin,
            'nom' => $admin->nom,
            'prenom' => $admin->prenom,
            'email' => $admin->email,
            'message' => 'Admin created successfully',
        ], 201);
    }

    public function show(string $id)
    {
        try {
            $admin = Admin::findOrFail($id);
            return response()->json([
                'id_admin' => $admin->id_admin,
                'nom' => $admin->nom,
                'prenom' => $admin->prenom,
                'email' => $admin->email,
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Admin not found'], 404);
        }
    }

    public function update(Request $request, string $id)
    {
        try {
            $admin = Admin::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'nom' => 'required|string|max:50',
                'prenom' => 'required|string|max:50',
                'email' => 'required|email|max:100|unique:admins,email,' . $id . ',id_admin',
                'password' => 'nullable|string|min:8',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $adminData = [
                'nom' => $request->nom,
                'prenom' => $request->prenom,
                'email' => $request->email,
            ];

            if ($request->password) {
                $adminData['password'] = Hash::make($request->password);
            }

            $admin->update($adminData);

            return response()->json([
                'id_admin' => $admin->id_admin,
                'nom' => $admin->nom,
                'prenom' => $admin->prenom,
                'email' => $admin->email,
                'message' => 'Admin updated successfully',
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Admin not found'], 404);
        }
    }

    public function destroy(string $id)
    {
        try {
            $admin = Admin::findOrFail($id);
            $admin->delete();
            return response()->json(['message' => 'Admin deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Admin not found'], 404);
        }
    }

       public function dashboard()
    {
        $totalReservations = Location::count();
        $totalClients = \App\Models\Client::count();
        $totalCars = Voiture::count();
        $revenue = Location::sum('montant_total');

        // Use locations as recent activities
        $recentActivities = Location::with(['client', 'voiture'])
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        $locations = Location::with(['client', 'voiture'])
            ->where('date_debut', '>=', now())
            ->orderBy('date_debut', 'asc')
            ->limit(5)
            ->get();

        return view('admin.dashboard', compact(
            'totalReservations',
            'totalClients',
            'totalCars',
            'revenue',
            'recentActivities',
            'locations'
        ));
    }

    public function clientActivities()
    {
        $clients = Client::with(['locations' => function($query) {
            $query->with('voiture')->latest();
        }])->get();

        return view('admin.client-activities', compact('clients'));
    }
}