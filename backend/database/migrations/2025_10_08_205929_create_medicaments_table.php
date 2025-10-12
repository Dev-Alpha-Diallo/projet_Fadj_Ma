<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('medicaments', function (Blueprint $table) {
            $table->id();
            $table->string('id_medicament')->unique(); // identifiant généré (ex: D06IDxxxxx)
            $table->string('nom');

            // Groupe relié à table "groupe_medicaments" (optionnel)
            $table->foreignId('groupe_medicament_id')
                ->nullable()
                ->constrained('groupe_medicaments')
                ->onDelete('set null');

            // Champs principaux
            $table->string('groupe')->default('Non classé');
            $table->integer('stock_quantite')->default(0);
            $table->decimal('prix', 12, 2)->nullable();
            $table->string('dosage')->nullable(); // champ pour "500 mg", "1g/100mL", etc.
            $table->string('fabriquant')->nullable();
            $table->string('type_consommation')->nullable(); // ex: voie orale, injectable
            $table->date('date_expiration')->nullable();
            $table->text('description')->nullable();

            // Image (stockée dans storage/app/public/medicaments)
            $table->string('image')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medicaments');
    }
};
