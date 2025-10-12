<?php

namespace App\Http\Controllers;

use App\Models\Medicament;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;

class MedicamentController extends Controller
{
    /**
     * Retourne le nom de la colonne à utiliser pour le dosage.
     * Si la DB a 'dosage', on l'utilise ; sinon on retombe sur 'composition'.
     */
    private function dosageColumn(): string
    {
        return Schema::hasColumn('medicaments', 'dosage') ? 'dosage' : 'composition';
    }

    /**
     * Liste de tous les médicaments avec recherche + filtre groupe
     */
    public function index(Request $request)
    {
        $query = Medicament::query();

        // Recherche par nom ou ID (on groupe pour éviter de "casser" d'autres filtres)
        if ($request->filled('search')) {
            $search = $request->string('search')->toString();
            $query->where(function ($q) use ($search) {
                // ILIKE = Postgres ; si MySQL, 'like' est déjà insensible à la casse (collation)
                $driver = config('database.default');
                $likeOp = in_array($driver, ['pgsql', 'postgres']) ? 'ILIKE' : 'LIKE';
                $q->where('nom', $likeOp, "%{$search}%")
                  ->orWhere('id_medicament', $likeOp, "%{$search}%");
            });
        }

        // Filtrer par groupe
        if ($request->filled('groupe')) {
            $query->where('groupe', $request->string('groupe')->toString());
        }

        // Pagination
        $medicaments = $query->orderByDesc('created_at')->paginate(8);

        return response()->json($medicaments);
    }

    /**
     * Créer un nouveau médicament
     */
    public function store(Request $request)
    {
        try {
            // Validation : on privilégie 'dosage', on garde 'composition' comme alias
            $validated = $request->validate([
                'nom'         => ['required','string','max:255'],
                'description' => ['nullable','string'],
                'dosage'      => ['nullable','string','max:255'],
                'prix'        => ['nullable','numeric','min:0'],
                'image'       => ['nullable','image','mimes:jpeg,png,jpg,gif,webp','max:2048'],
            ]);

            // ID unique
            $id_medicament = 'D06ID' . rand(100000000, 999999999);

            // Upload image
            $imagePath = null;
            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('medicaments', 'public');
            }

            // Déterminer la colonne DB pour le dosage
            $dosageCol = $this->dosageColumn();

            // Choisir la valeur de dosage : priorité au champ 'dosage'
            $dosageValue = $request->filled('dosage')
                ? $request->string('dosage')->toString()
                : ($request->filled('composition') ? $request->string('composition')->toString() : null);

            // Payload de création (avec valeurs par défaut conservées)
            $payload = [
                'nom'              => $request->string('nom')->toString(),
                'id_medicament'    => $id_medicament,
                'groupe_medicament_id' => null,
                'groupe'           => 'Non classé',
                'Dosage'          => $request->input('dosage'),
                'stock_quantite'   => 0,
                'prix'             => $request->input('prix'),
                'fabriquant'       => null,
                'type_consommation'=> null,
                'date_expiration'  => null,
                'description'      => $request->input('description'),
                'image'            => $imagePath,
            ];

            if (!is_null($dosageValue)) {
                $payload[$dosageCol] = $dosageValue;
            }

            $medicament = Medicament::create($payload);

            return response()->json([
                'message'    => 'Médicament créé avec succès',
                'medicament' => $medicament,
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Erreur de validation',
                'errors'  => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            Log::error('Erreur création médicament:', [
                'message' => $e->getMessage(),
                'trace'   => $e->getTraceAsString(),
            ]);

            return response()->json([
                'message' => 'Erreur lors de la création du médicament',
                'error'   => $e->getMessage(),
            ], 500);
        }
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
            'nom'              => ['sometimes','string','max:255'],
            'groupe_medicament_id' => ['sometimes','nullable','exists:groupe_medicaments,id'],
            'groupe'           => ['sometimes','string','max:255'],
            'stock_quantite'   => ['sometimes','integer','min:0'],
            'prix'             => ['sometimes','nullable','numeric','min:0'],
            'dosage'           => ['sometimes','nullable','string','max:255'],
            'fabriquant'       => ['sometimes','nullable','string','max:255'],
            'type_consommation'=> ['sometimes','nullable','string','max:255'],
            'date_expiration'  => ['sometimes','nullable','date'],
            'description'      => ['sometimes','nullable','string'],
            'image'            => ['sometimes','nullable','image','mimes:jpeg,png,jpg,gif,webp','max:2048'],
        ]);

        // Upload image
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('medicaments', 'public');
            $medicament->image = $imagePath;
        }

        // Construire le payload d'update
        $payload = $request->except('image');

        // Mapper dosage -> colonne DB effective
        $dosageCol = $this->dosageColumn();

        // Si 'dosage' est fourni, on l'écrit dans la bonne colonne
        if ($request->has('dosage')) {
            $payload[$dosageCol] = $request->input('dosage');
            // et on supprime l'autre clé si présente pour éviter conflit fillable
            unset($payload['composition']);
        }
        // Sinon, si 'composition' est fourni (legacy), on le mappe
        elseif ($request->has('composition')) {
            $payload[$dosageCol] = $request->input('composition');
            unset($payload['composition']);
        }

        $medicament->update($payload);

        // Si image uploadée
        if (array_key_exists('image', $payload) === false && $request->hasFile('image')) {
            $medicament->save();
        }

        return response()->json([
            'message'    => 'Médicament mis à jour avec succès',
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
        $totalGroupes     = Medicament::distinct('groupe')->count('groupe');
        $totalStock       = Medicament::sum('stock_quantite');
        $penuries         = Medicament::where('stock_quantite', '<', 10)->count();

        return response()->json([
            'total_medicaments' => $totalMedicaments,
            'total_groupes'     => $totalGroupes,
            'total_stock'       => $totalStock,
            'penuries'          => $penuries,
        ]);
    }
}
