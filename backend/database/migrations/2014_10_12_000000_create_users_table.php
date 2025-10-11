<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('prenom'); // Prénom
            $table->string('nom'); // Nom
            $table->enum('genre', ['homme', 'femme']); // Vos coordonées
            $table->date('date_naissance'); // Date de naissance
            $table->string('email')->unique();
            $table->string('password');
            $table->enum('role', ['administrateur', 'utilisateur'])->default('utilisateur');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};