<?php

namespace App\Http\Controllers;

use App\Models\Marque;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class MarqueController extends Controller
{
    public function clientindex()
    {
        $marques = Marque::all()->map(function ($marque) {
            return [
                'id_marque' => $marque->id_marque,
                'nom_marque' => $marque->nom_marque,
                'logo' => $marque->logo ? asset('storage/' . $marque->logo) : null,
            ];
        });

        return response()->json($marques, 200);
    }

    public function view()
    {
        return view('marques.view',['marques' => Marque::all()]);
    }

    public function create()
    {
        return view('marques.create'); // Ensure this matches the directory and file name
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom_marque' => 'required|string|max:255',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        try {
            $marque = new Marque();
            $marque->nom_marque = $validated['nom_marque'];

            if ($request->hasFile('logo')) {
                $path = $request->file('logo')->store('marques', 'public');
                $marque->logo = $path;
            }

            $marque->save();

            return back()->with('success', 'Brand added successfully!');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to add brand. Please try again.')
                        ->withInput();
        }
    }

    public function clientshow(string $id)
    {
        try {
            $marque = Marque::findOrFail($id);
            return response()->json([
                'id_marque' => $marque->id_marque,
                'nom_marque' => $marque->nom_marque,
                'logo' => $marque->logo ? asset('storage/' . $marque->logo) : null,
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Marque not found'], 404);
        }
    }
    public function show(string $id)
    {
        try {
            $marque = Marque::findOrFail($id);
            $voitures_count= $marque->voitures->count();
            return view('marques.show', compact('marque', 'voitures_count'));
        } catch (\Exception $e) {
            return response()->json(['error' => 'Marque not found'], 404);
        }
    }

    public function update(Request $request, string $id)
    {
        try {
            $marque = Marque::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'nom_marque' => 'required|string|max:50|unique:marques,nom_marque,' . $id . ',id_marque',
                'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $marqueData = [
                'nom_marque' => $request->nom_marque,
            ];

            if ($request->hasFile('logo')) {
                if ($marque->logo) {
                    Storage::disk('public')->delete($marque->logo);
                }
                $marqueData['logo'] = $request->file('logo')->store('marques', 'public');
            }

            $marque->update($marqueData);

            return redirect()->route('marque.show',[$marque->id_marque])->with('success', 'Brand updated successfully!');
        } catch (\Exception $e) {
            return response()->json(['error' => 'Marque not found'], 404);
        }
    }

    public function destroy(string $id)
    {
        try {
            $marque = Marque::findOrFail($id);

            if ($marque->logo) {
                Storage::disk('public')->delete($marque->logo);
            }

            $marque->delete();

            return redirect()->back();
        } catch (\Exception $e) {
            return response()->json(['error' => 'Marque not found'], 404);
        }
    }
}