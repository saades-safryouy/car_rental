<?php

namespace App\Http\Controllers;

use App\Models\Voiture;
use App\Models\Marque;
use App\Models\Categorie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class VoitureController extends Controller
{
    public function clientindex()
    {
        $voitures = Voiture::with(['marque', 'categorie'])->get()->map(function ($voiture) {
            return [
                'id_voiture' => $voiture->id_voiture,
                'id_marque' => $voiture->id_marque,
                'marque' => $voiture->marque->nom_marque,
                'id_categorie' => $voiture->id_categorie,
                'categorie' => $voiture->categorie->nom_categorie,
                'modele' => $voiture->modele,
                'annee' => $voiture->annee,
                'immatriculation' => $voiture->immatriculation,
                'description' => $voiture->description,
                'quantity' => $voiture->quantity,
                'disponible' => $voiture->disponible,
                'prix_journalier' => $voiture->prix_journalier,
                'imageFront' => $voiture->imageFront ? asset('storage/' . $voiture->imageFront) : null,
                'imageRight' => $voiture->imageRight ? asset('storage/' . $voiture->imageRight) : null,
                'imageLeft' => $voiture->imageLeft ? asset('storage/' . $voiture->imageLeft) : null,
                'imageBack' => $voiture->imageBack ? asset('storage/' . $voiture->imageBack) : null,
            ];
        });

        return response()->json($voitures, 200);
    }

    public function clientshow(string $id)
    {

        try {
            $voiture = Voiture::with(['marque', 'categorie'])->findOrFail($id);

            return response()->json([
                'id_voiture' => $voiture->id_voiture,
                'id_marque' => $voiture->id_marque,
                'marque' => $voiture->marque->nom_marque,
                'id_categorie' => $voiture->id_categorie,
                'categorie' => $voiture->categorie->nom_categorie,
                'modele' => $voiture->modele,
                'annee' => $voiture->annee,
                'immatriculation' => $voiture->immatriculation,
                'disponible' => $voiture->disponible,
                'description' => $voiture->description,
                'quantity' => $voiture->quantity,
                'prix_journalier' => $voiture->prix_journalier,
                'imageFront' => $voiture->imageFront ? asset('storage/' . $voiture->imageFront) : null,
                'imageRight' => $voiture->imageRight ? asset('storage/' . $voiture->imageRight) : null,
                'imageLeft' => $voiture->imageLeft ? asset('storage/' . $voiture->imageLeft) : null,
                'imageBack' => $voiture->imageBack ? asset('storage/' . $voiture->imageBack) : null,
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Voiture not found'], 404);
        }
    }



    public function show($id)
    {
        try {
            $voiture = Voiture::with(['marque', 'categorie'])->findOrFail($id);
            $categories = Categorie::all();
            $marques = Marque::all();
            return view('voitures.show', compact('voiture', 'categories', 'marques'));
        } catch (\Exception $e) {
            return redirect()->route('voiture.index')->with('error', 'Vehicle not found.');
        }
    }






    public function view()
    {
        $voitures = Voiture::with(['marque', 'categorie'])->get();
        $marques =Marque::all();
        $categories = Categorie::all();
        return view('voitures.view', compact('voitures','marques','categories'));
    }


    public function create()
    {
        $marques = Marque::all();
        $categories = Categorie::all();
        return view('voitures.create', compact('marques', 'categories'));
    }

    public function store(Request $request)
    {
        try {
            \Log::info('Received request data:', $request->all()); // Add logging to debug

            $validated = $request->validate([
                'id_marque' => 'required|exists:marques,id_marque',
                'id_categorie' => 'required|exists:categories,id_categorie',
                'modele' => 'required|string|max:255',
                'annee' => 'required|integer',
                'immatriculation' => 'required|string',
                'prix_journalier' => 'required|numeric',
                'description' => 'required|string',
                'quantity' => 'required|integer|min:1',
                'imageFront' => 'required|image',
                'imageRight' => 'required|image',
                'imageLeft' => 'required|image',
                'imageBack' => 'required|image'
            ]);

            $voiture = new Voiture();
            $voiture->fill($validated);
            $voiture->disponible = true;

            // Handle images
            $imageFields = ['imageFront', 'imageRight', 'imageLeft', 'imageBack'];
            foreach ($imageFields as $field) {
                if ($request->hasFile($field)) {
                    $path = $request->file($field)->store('voitures', 'public');
                    $voiture->$field = $path;
                }
            }

            $voiture->save();

            return redirect()->route('voiture.index')->with('success', 'Voiture added successfully');

        } catch (\Exception $e) {
            \Log::error('Error adding vehicle: ' . $e->getMessage());
            return response()->json([
                'error' => 'Failed to add vehicle',
                'message' => $e->getMessage()
            ], 422);
        }
    }



    public function update(Request $request, string $id)
    {
        try {
            $voiture = Voiture::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'id_marque' => 'required|exists:marques,id_marque',
                'id_categorie' => 'required|exists:categories,id_categorie',
                'modele' => 'required|string|max:50',
                'annee' => 'required|integer|min:1900|max:' . date('Y'),
                'immatriculation' => 'required|string|max:20|unique:voitures,immatriculation,' . $id . ',id_voiture',
                'disponible' => 'boolean',
                'prix_journalier' => 'required|numeric|min:0',
                 'description' => 'required|string',
                'quantity' => 'required|integer|min:1',
                'imageFront' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'imageRight' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'imageLeft' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'imageBack' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $voitureData = $request->only([
                'id_marque', 'id_categorie', 'modele', 'annee', 'immatriculation', 'disponible', 'prix_journalier','description', 'quantity'
            ]);

            foreach (['imageFront', 'imageRight', 'imageLeft', 'imageBack'] as $imageField) {
                if ($request->hasFile($imageField)) {
                    if ($voiture->$imageField) {
                        Storage::disk('public')->delete($voiture->$imageField);
                    }
                    $voitureData[$imageField] = $request->file($imageField)->store('voitures', 'public');
                }
            }

            $voiture->update($voitureData);

            return response()->json([
                'id_voiture' => $voiture->id_voiture,
                'id_marque' => $voiture->id_marque,
                'id_categorie' => $voiture->id_categorie,
                'modele' => $voiture->modele,
                'annee' => $voiture->annee,
                'immatriculation' => $voiture->immatriculation,
                'disponible' => $voiture->disponible,
                'description' => 'required|string',
                'quantity' => 'required|integer|min:1',
                'prix_journalier' => $voiture->prix_journalier,
                'imageFront' => $voiture->imageFront ? asset('storage/' . $voiture->imageFront) : null,
                'imageRight' => $voiture->imageRight ? asset('storage/' . $voiture->imageRight) : null,
                'imageLeft' => $voiture->imageLeft ? asset('storage/' . $voiture->imageLeft) : null,
                'imageBack' => $voiture->imageBack ? asset('storage/' . $voiture->imageBack) : null,
                'message' => 'Voiture updated successfully',
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Voiture not found'], 404);
        }
    }

    public function destroy(string $id)
    {
        try {
            $voiture = Voiture::findOrFail($id);

            foreach (['imageFront', 'imageRight', 'imageLeft', 'imageBack'] as $imageField) {
                if ($voiture->$imageField) {
                    Storage::disk('public')->delete($voiture->$imageField);
                }
            }

            $voiture->delete();

            return redirect()->route('voiture.index')->with('success', 'Voiture deleted successfully');        } catch (\Exception $e) {
        } catch (\Exception $e) {
            return response()->json(['error' => 'Voiture not found'], 404);
        }
    }
}
