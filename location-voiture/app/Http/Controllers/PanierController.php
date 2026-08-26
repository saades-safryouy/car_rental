<?php

namespace App\Http\Controllers;

use App\Models\Panier;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PanierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $paniers = Panier::with('client')->get()->map(function ($panier) {
            return [
                'id_panier' => $panier->id_panier,
                'id_client' => $panier->id_client,
                'client' => $panier->client ? [
                    'id_client' => $panier->client->id_client,
                    'nom' => $panier->client->nom,
                    'prenom' => $panier->client->prenom,
                    'email' => $panier->client->email
                ] : null,
                'date_ajout' => $panier->date_ajout,
                'items' => $panier->cartItems->map(function ($item) {
                    return [
                        'id_cart_item' => $item->id_cart_item,
                        'id_voiture' => $item->id_voiture,
                        'voiture' => $item->voiture ? [
                            'id_voiture' => $item->voiture->id_voiture,
                            'modele' => $item->voiture->modele,
                            'prix_journalier' => $item->voiture->prix_journalier
                        ] : null,
                        'quantite' => $item->quantite,
                        'date_ajout' => $item->date_ajout
                    ];
                })
            ];
        });

        return response()->json($paniers, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id_client' => 'required|exists:clients,id_client',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $panier = Panier::create([
            'id_client' => $request->id_client,
        ]);

        return response()->json([
            'id_panier' => $panier->id_panier,
            'id_client' => $panier->id_client,
            'client' => $panier->client ? [
                'id_client' => $panier->client->id_client,
                'nom' => $panier->client->nom,
                'prenom' => $panier->client->prenom,
                'email' => $panier->client->email
            ] : null,
            'date_ajout' => $panier->date_ajout,
            'items' => [],
            'message' => 'Panier created successfully',
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $panier = Panier::with(['client', 'cartItems.voiture'])->findOrFail($id);
            return response()->json([
                'id_panier' => $panier->id_panier,
                'id_client' => $panier->id_client,
                'client' => $panier->client ? [
                    'id_client' => $panier->client->id_client,
                    'nom' => $panier->client->nom,
                    'prenom' => $panier->client->prenom,
                    'email' => $panier->client->email
                ] : null,
                'date_ajout' => $panier->date_ajout,
                'items' => $panier->cartItems->map(function ($item) {
                    return [
                        'id_cart_item' => $item->id_cart_item,
                        'id_voiture' => $item->id_voiture,
                        'voiture' => $item->voiture ? [
                            'id_voiture' => $item->voiture->id_voiture,
                            'modele' => $item->voiture->modele,
                            'prix_journalier' => $item->voiture->prix_journalier
                        ] : null,
                        'quantite' => $item->quantite,
                        'date_ajout' => $item->date_ajout
                    ];
                }),
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Panier not found'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $panier = Panier::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'id_client' => 'required|exists:clients,id_client',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $panier->update([
                'id_client' => $request->id_client,
            ]);

            return response()->json([
                'id_panier' => $panier->id_panier,
                'id_client' => $panier->id_client,
                'client' => $panier->client ? [
                    'id_client' => $panier->client->id_client,
                    'nom' => $panier->client->nom,
                    'prenom' => $panier->client->prenom,
                    'email' => $panier->client->email
                ] : null,
                'date_ajout' => $panier->date_ajout,
                'items' => $panier->cartItems->map(function ($item) {
                    return [
                        'id_cart_item' => $item->id_cart_item,
                        'id_voiture' => $item->id_voiture,
                        'voiture' => $item->voiture ? [
                            'id_voiture' => $item->voiture->id_voiture,
                            'modele' => $item->voiture->modele,
                            'prix_journalier' => $item->voiture->prix_journalier
                        ] : null,
                        'quantite' => $item->quantite,
                        'date_ajout' => $item->date_ajout
                    ];
                }),
                'message' => 'Panier updated successfully',
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Panier not found'], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $panier = Panier::findOrFail($id);
            $panier->delete(); // Cascades to delete cart items
            return response()->json(['message' => 'Panier deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Panier not found'], 404);
        }
    }

    /**
     * Add an item to the panier.
     */
    public function addItem(Request $request, string $id)
    {
        try {
            $panier = Panier::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'id_voiture' => 'required|exists:voitures,id_voiture',
                'quantite' => 'required|integer|min:1',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            // Check if the voiture is already in the panier
            $existingItem = $panier->cartItems()->where('id_voiture', $request->id_voiture)->first();

            if ($existingItem) {
                $existingItem->update([
                    'quantite' => $existingItem->quantite + $request->quantite,
                ]);
                $cartItem = $existingItem;
            } else {
                $cartItem = CartItem::create([
                    'id_panier' => $panier->id_panier,
                    'id_voiture' => $request->id_voiture,
                    'quantite' => $request->quantite,
                ]);
            }

            return response()->json([
                'id_cart_item' => $cartItem->id_cart_item,
                'id_panier' => $cartItem->id_panier,
                'id_voiture' => $cartItem->id_voiture,
                'voiture' => $cartItem->voiture ? [
                    'id_voiture' => $cartItem->voiture->id_voiture,
                    'modele' => $cartItem->voiture->modele,
                    'prix_journalier' => $cartItem->voiture->prix_journalier
                ] : null,
                'quantite' => $cartItem->quantite,
                'date_ajout' => $cartItem->date_ajout,
                'message' => 'Item added to panier successfully',
            ], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Panier not found'], 404);
        }
    }

    /**
     * Remove a specific item from the panier.
     */
    public function removeItem(string $id, string $cartItemId)
    {
        try {
            $panier = Panier::findOrFail($id);
            $cartItem = CartItem::where('id_panier', $panier->id_panier)
                ->where('id_cart_item', $cartItemId)
                ->firstOrFail();

            $cartItem->delete();

            return response()->json(['message' => 'Item removed from panier successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Panier or item not found'], 404);
        }
    }

    /**
     * Clear all items from the panier.
     */
    public function clearItems(string $id)
    {
        try {
            $panier = Panier::findOrFail($id);
            $panier->cartItems()->delete();

            return response()->json(['message' => 'All items removed from panier successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Panier not found'], 404);
        }
    }
}