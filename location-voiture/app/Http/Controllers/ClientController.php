<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class ClientController extends Controller
{
    public function clientindex()
    {
        $clients = Client::all()->map(function ($client) {
            return [
                'id_client' => $client->id_client,
                'nom' => $client->nom,
                'prenom' => $client->prenom,
                'email' => $client->email,
                'telephone' => $client->telephone,
                'adresse' => $client->adresse,
                'permis_conduire' => $client->permis_conduire,
            ];
        });

        return response()->json($clients, 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:50',
            'prenom' => 'required|string|max:50',
            'email' => 'required|email|max:100|unique:clients',
            'password' => 'nullable|string|min:8',
            'telephone' => 'nullable|string|max:20',
            'adresse' => 'nullable|string|max:255',
            'permis_conduire' => 'required|string|max:20|unique:clients',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $clientData = $request->only(['nom', 'prenom', 'email', 'telephone', 'adresse', 'permis_conduire']);
        if ($request->password) {
            $clientData['password'] = Hash::make($request->password);
        }

        $client = Client::create($clientData);

        return response()->json([
            'id_client' => $client->id_client,
            'nom' => $client->nom,
            'prenom' => $client->prenom,
            'email' => $client->email,
            'telephone' => $client->telephone,
            'adresse' => $client->adresse,
            'permis_conduire' => $client->permis_conduire,
            'message' => 'Client created successfully',
        ], 201);
    }

    public function show(string $id)
    {
        try {
            $client = Client::findOrFail($id);
            return response()->json([
                'id_client' => $client->id_client,
                'nom' => $client->nom,
                'prenom' => $client->prenom,
                'email' => $client->email,
                'telephone' => $client->telephone,
                'adresse' => $client->adresse,
                'permis_conduire' => $client->permis_conduire,
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Client not found'], 404);
        }
    }

    public function update(Request $request, string $id)
    {
        try {
            $client = Client::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'nom' => 'required|string|max:50',
                'prenom' => 'required|string|max:50',
                'email' => 'required|email|max:100|unique:clients,email,' . $id . ',id_client',
                'password' => 'nullable|string|min:8',
                'telephone' => 'nullable|string|max:20',
                'adresse' => 'nullable|string|max:255',
                'permis_conduire' => 'required|string|max:20|unique:clients,permis_conduire,' . $id . ',id_client',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $clientData = $request->only(['nom', 'prenom', 'email', 'telephone', 'adresse', 'permis_conduire']);
            if ($request->password) {
                $clientData['password'] = Hash::make($request->password);
            }

            $client->update($clientData);

            return response()->json([
                'id_client' => $client->id_client,
                'nom' => $client->nom,
                'prenom' => $client->prenom,
                'email' => $client->email,
                'telephone' => $client->telephone,
                'adresse' => $client->adresse,
                'permis_conduire' => $client->permis_conduire,
                'message' => 'Client updated successfully',
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Client not found'], 404);
        }
    }

    public function destroy(string $id)
    {
        try {
            $client = Client::findOrFail($id);
            $client->delete();
            return response()->json(['message' => 'Client deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Client not found'], 404);
        }
    }
}