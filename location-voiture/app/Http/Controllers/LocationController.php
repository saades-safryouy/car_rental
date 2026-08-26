<?php

namespace App\Http\Controllers;

use App\Models\Location;
use App\Models\Voiture;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LocationController extends Controller
{

    public function index()
    {
        $locations = Location::with(['voiture', 'client'])
            ->orderBy('created_at', 'desc')
            ->get();

        return view('reservations.view', compact('locations'));
    }
    public function clientindex(Request $request)
    {
        $locations = Location::with(['voiture', 'client'])
        ->where('id_client', $request->id_client)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($locations, 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id_voiture' => 'required|exists:voitures,id_voiture',
            'id_client' => 'required|exists:clients,id_client',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after_or_equal:date_debut',
            'date_retour' => 'nullable|date|after_or_equal:date_debut',
            'montant_total' => 'required|numeric|min:0',
            'statut' => 'nullable|in:En cours,Terminee,Annulee',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $location = Location::create($request->only([
            'id_voiture', 'id_client', 'date_debut', 'date_fin', 'date_retour', 'montant_total', 'statut'
        ]));

        return response()->json([
            'id_location' => $location->id_location,
            'id_voiture' => $location->id_voiture,
            'id_client' => $location->id_client,
            'date_debut' => $location->date_debut,
            'date_fin' => $location->date_fin,
            'date_retour' => $location->date_retour,
            'montant_total' => $location->montant_total,
            'statut' => $location->statut,
            'message' => 'Location created successfully',
        ], 201);
    }

    public function show(string $id)
    {
        try {
            $location = Location::with(['voiture', 'client'])->findOrFail($id);
            return response()->json([
                'id_location' => $location->id_location,
                'id_voiture' => $location->id_voiture,
                'voiture' => $location->voiture->modele,
                'id_client' => $location->id_client,
                'client' => $location->client->nom . ' ' . $location->client->prenom,
                'date_debut' => $location->date_debut,
                'date_fin' => $location->date_fin,
                'date_retour' => $location->date_retour,
                'montant_total' => $location->montant_total,
                'statut' => $location->statut,
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Location not found'], 404);
        }
    }

     public function updateStatus(Request $request, $id)
    {
        try {
            $request->validate([
                'status' => 'required|in:Pending,Accepted,Refused'
            ]);

            $location = Location::findOrFail($id);
            $voiture = Voiture::findOrFail($location->id_voiture);

            // Check if car is available for the requested dates
            $isAvailable = !Location::where('id_voiture', $voiture->id_voiture)
                ->where('id_location', '!=', $location->id_location)
                ->where('status', 'Pending')
                ->where(function($query) use ($location) {
                    $query->whereBetween('date_debut', [$location->date_debut, $location->date_fin])
                        ->orWhereBetween('date_fin', [$location->date_debut, $location->date_fin]);
                })
                ->exists();

            if ($request->status === 'En cours' && !$isAvailable) {
                return response()->json([
                    'error' => 'Car is not available for these dates.'
                ], 422);
            }

            $location->status = $request->status;
            $location->save();

            return back()->with('success', 'Reservation status updated successfully');
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to update reservation status'
            ], 500);
        }
    }

    public function destroy(string $id)
    {
        try {
            $location = Location::findOrFail($id);
            $location->delete();
            return response()->json(['message' => 'Location deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Location not found'], 404);
        }
    }
}
