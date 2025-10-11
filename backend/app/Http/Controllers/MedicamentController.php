<?php

namespace App\Http\Controllers;

use App\Models\Medicament;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class MedicamentController extends Controller
{
    /**
     * Liste de tous les médicaments avec recherche
     */
    public function index(Request $request)
    {
        $query = Medicament::query();

        // Recherche par nom ou ID
        if ($request->has('search')) {
            $search = $request->search;
            $query->where('nom', 'ILIKE', "%{$search}%")
                  ->orWhere('id_medicament', 'ILIKE', "%{$search}%");
        }

        // Filtrer par groupe
        if ($request->has('groupe')) {
            $query->where('groupe', $request->groupe);
        }

        // Pagination
        $medicaments = $query->orderBy('created_at', 'desc')->paginate(8);

        return response()->json($medicaments);
    }

    /**
     * Créer un nouveau médicament
     */
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'groupe' => 'required|string|max:255',
            'stock_quantite' => 'required|integer|min:0',
            'prix' => 'required|numeric|min:0',
            'composition' => 'nullable|string',
            'fabriquant' => 'nullable|string|max:255',
            'type_consommation' => 'nullable|string|max:255',
            'date_expiration' => 'nullable|date',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        // Générer un ID unique pour le médicament
        $id_medicament = 'D06ID' . rand(100000000, 999999999);

        // Gérer l'upload de l'image
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('medicaments', 'public');
        }

        $medicament = Medicament::create([
            'nom' => $request->nom,
            'groupe_medicament_id' => 'required|exists:groupe_medicaments,id',
            'groupe' => $request->groupe,
            'stock_quantite' => $request->stock_quantite,
            'composition' => $request->composition,
            'fabriquant' => $request->fabriquant,
            'type_consommation' => $request->type_consommation,
            'date_expiration' => $request->date_expiration,
            'description' => $request->description,
            'image' => $imagePath,
        ]);

        return response()->json([
            'message' => 'Médicament créé avec succès',
            'medicament' => $medicament,
        ], 201);
    }

    /**
     * Afficher un médicament spécifique
     */
    public function show($id)
    {
        $medicament = Medicament::findOrFail($id);
        return response()->json($medicament);
    }

    /**
     * Mettre à jour un médicament
     */
    public function update(Request $request, $id)
    {
        $medicament = Medicament::findOrFail($id);

        $request->validate([
            'nom' => 'string|max:255',
            'groupe' => 'string|max:255',
            'stock_quantite' => 'integer|min:0',
            'composition' => 'nullable|string',
            'fabriquant' => 'nullable|string|max:255',
            'type_consommation' => 'nullable|string|max:255',
            'date_expiration' => 'nullable|date',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        // Gérer l'upload de l'image
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('medicaments', 'public');
            $medicament->image = $imagePath;
        }

        $medicament->update($request->except('image'));

        return response()->json([
            'message' => 'Médicament mis à jour avec succès',
            'medicament' => $medicament,
        ]);
    }

    /**
     * Supprimer un médicament
     */
    public function destroy($id)
    {
        $medicament = Medicament::findOrFail($id);
        $medicament->delete();

        return response()->json([
            'message' => 'Médicament supprimé avec succès',
        ]);
    }

    /**
     * Statistiques du tableau de bord
     */
    public function stats()
    {
        $totalMedicaments = Medicament::count();
        $totalGroupes = Medicament::distinct('groupe')->count('groupe');
        $totalStock = Medicament::sum('stock_quantite');
        $penuries = Medicament::where('stock_quantite', '<', 10)->count();

        return response()->json([
            'total_medicaments' => $totalMedicaments,
            'total_groupes' => $totalGroupes,
            'total_stock' => $totalStock,
            'penuries' => $penuries,
        ]);
    }
}