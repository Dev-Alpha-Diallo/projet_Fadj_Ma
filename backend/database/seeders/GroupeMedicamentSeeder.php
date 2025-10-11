<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\GroupeMedicament;

class GroupeMedicamentSeeder extends Seeder
{
    public function run(): void
    {
        $groupes = [
            ['nom' => 'Médecine générique'],
            ['nom' => 'Diabète'],
            ['nom' => 'Antibiotiques'],
            ['nom' => 'Antiallergiques'],
            ['nom' => 'Antipaludiques'],
            ['nom' => 'Vitamines'],
        ];

        foreach ($groupes as $groupe) {
            GroupeMedicament::firstOrCreate($groupe);
        }
    }
}
