<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Medicament;
use App\Models\GroupeMedicament;

class MedicamentSeeder extends Seeder
{
    public function run(): void
    {
        // Exemple : récupération ou création des groupes
        $generique = GroupeMedicament::firstOrCreate(['nom' => 'Médecine générique']);
        $diabete = GroupeMedicament::firstOrCreate(['nom' => 'Diabète']);

        $medicaments = [
            [
                'nom' => 'Augmentin 625 Duo Comprimé',
                'groupe_medicament_id' => $generique->id,
                'stock_quantite' => 350,
                'composition' => 'Amoyicillin-500MG + Clavulanic Acid-122MG',
                'fabriquant' => 'GlaxoSmithKlin Pharmaceutical ldt',
                'type_consommation' => 'Oral',
                'date_expiration' => '2025-01-25',
                'description' => 'Augmentin 625 DuoComprimé est utilisé pour traiter les infections bactériennes...'
            ],
            [
                'nom' => 'Azithral-500 Comprimé',
                'groupe_medicament_id' => $generique->id,
                'stock_quantite' => 20,
                'composition' => 'Azithromycin-500MG',
                'fabriquant' => 'Alembic Pharmaceuticals Ltd',
                'type_consommation' => 'Oral',
                'date_expiration' => '2025-03-15',
                'description' => 'Azithral 500 est un antibiotique utilisé pour traiter diverses infections...'
            ],
            [
                'nom' => 'Sirop Ascoril LS',
                'groupe_medicament_id' => $diabete->id,
                'stock_quantite' => 85,
                'composition' => 'Ambroxol + Levosalbutamol + Guaifenesin',
                'fabriquant' => 'Glenmark Pharmaceuticals',
                'type_consommation' => 'Oral',
                'date_expiration' => '2025-06-20',
                'description' => 'Ascoril LS Syrup est un médicament combiné utilisé pour traiter la toux productive...'
            ],
            [
                'nom' => 'Azée 500 Comprimé',
                'groupe_medicament_id' => $generique->id,
                'stock_quantite' => 75,
                'composition' => 'Azithromycin-500MG',
                'fabriquant' => 'Cipla Ltd',
                'type_consommation' => 'Oral',
                'date_expiration' => '2025-04-10',
                'description' => 'Azée 500 est un antibiotique macrolide utilisé pour traiter diverses infections...'
            ],
            [
                'nom' => 'Allegra 120mg Comprimé',
                'groupe_medicament_id' => $diabete->id,
                'stock_quantite' => 44,
                'composition' => 'Fexofenadine-120MG',
                'fabriquant' => 'Sanofi India Ltd',
                'type_consommation' => 'Oral',
                'date_expiration' => '2025-08-30',
                'description' => 'Allegra 120mg est un antihistaminique utilisé pour soulager les symptômes...'
            ],
            [
                'nom' => 'Sirop d\'Alex',
                'groupe_medicament_id' => $generique->id,
                'stock_quantite' => 65,
                'composition' => 'Chlorpheniramine + Dextromethorphan',
                'fabriquant' => 'Franco-Indian Pharmaceuticals',
                'type_consommation' => 'Oral',
                'date_expiration' => '2025-05-15',
                'description' => 'Sirop d\'Alex est utilisé pour le soulagement temporaire de la toux causée par le rhume...'
            ],
            [
                'nom' => 'Amoxyclav-625 Comprimé',
                'groupe_medicament_id' => $generique->id,
                'stock_quantite' => 150,
                'composition' => 'Amoxicillin-500MG + Clavulanic Acid-125MG',
                'fabriquant' => 'Alkem Laboratories Ltd',
                'type_consommation' => 'Oral',
                'date_expiration' => '2025-07-22',
                'description' => 'Amoxyclav 625 est un antibiotique qui aide votre corps à combattre les infections...'
            ],
            [
                'nom' => 'Avil-25 Tablette',
                'groupe_medicament_id' => $generique->id,
                'stock_quantite' => 270,
                'composition' => 'Pheniramine Maleate-25MG',
                'fabriquant' => 'Sanofi India Ltd',
                'type_consommation' => 'Oral',
                'date_expiration' => '2025-09-18',
                'description' => 'Avil 25 est un antihistaminique utilisé pour traiter les symptômes allergiques...'
            ],
        ];

        foreach ($medicaments as $data) {
            Medicament::create($data);
        }
    }
}
