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
            $table->string('nom');
            $table->foreignId('groupe_medicament_id')->constrained('groupe_medicaments')->onDelete('cascade');
            $table->integer('stock_quantite');
            $table->decimal('prix', 8, 2);
            $table->string('composition');
            $table->string('fabriquant');
            $table->string('type_consommation');
            $table->date('date_expiration');
            $table->text('description')->nullable();
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
