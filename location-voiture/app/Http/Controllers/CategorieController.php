<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class CategorieController extends Controller
{
/**
     * Display the specified resource.
     */
    public function clientshow(string $id)
    {
        try {
            $category = Categorie::findOrFail($id);
            return response()->json([
                'id_categorie' => $category->id_categorie,
                'nom_categorie' => $category->nom_categorie,
                'description' => $category->description,
                'image' => $category->image ? asset('storage/' . $category->image) : null,
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Category not found'], 404);
        }
    }
    public function show(string $id)
    {
        try {
            $categorie = Categorie::findOrFail($id);
            return view('categories.show', compact('categorie')); 
        } catch (\Exception $e) {
            return response()->json(['error' => 'Category not found'], 404);
        }
    }





    /**
     * Display a listing of the resource.
     */
    public function clientindex()
    {
        $categories = Categorie::all()->map(function ($category) {
            return [
                'id_categorie' => $category->id_categorie,
                'nom_categorie' => $category->nom_categorie,
                'description' => $category->description,
                'image' => $category->image ? asset('storage/' . $category->image) : null,
            ];
        });

        return response()->json($categories, 200);
    }
    public function view()
    {   $categories = Categorie::all();
        return view('categories.view', compact('categories')); 
    }
    public function create()
    {
        return view('categories.create'); // Ensure this matches the directory and file name
    }

    /**
     * Store a newly created resource in storage.
     */
    public function dashboard(Request $request){
        return view("admin.dashboard");
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom_categorie' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        try {
            $categorie = new Categorie();
            $categorie->nom_categorie = $validated['nom_categorie'];
            $categorie->description = $validated['description'];

            if ($request->hasFile('image')) {
                $path = $request->file('image')->store('categories', 'public');
                $categorie->image = $path;
            }

            $categorie->save();

            return back()->with('success', 'Category added successfully!');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to add category. Please try again.')
                        ->withInput();
        }
    }

    

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $category = Categorie::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'nom_categorie' => 'required|string|max:50|unique:categories,nom_categorie,' . $id . ',id_categorie',
                'description' => 'nullable|string',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $categoryData = [
                'nom_categorie' => $request->nom_categorie,
                'description' => $request->description,
            ];

            if ($request->hasFile('image')) {
                if ($category->image) {
                    Storage::disk('public')->delete($category->image);
                }
                $categoryData['image'] = $request->file('image')->store('categories', 'public');
            }

            $category->update($categoryData);

            return response()->json([
                'id_categorie' => $category->id_categorie,
                'nom_categorie' => $category->nom_categorie,
                'description' => $category->description,
                'image' => $category->image ? asset('storage/' . $category->image) : null,
                'message' => 'Category updated successfully',
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Category not found'], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $category = Categorie::findOrFail($id);

            if ($category->image) {
                Storage::disk('public')->delete($category->image);
            }

            $category->delete();

            return response()->json(['message' => 'Category deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Category not found'], 404);
        }
    }
}