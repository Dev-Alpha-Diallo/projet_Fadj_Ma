<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Medicament extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'id_medicament',
        'groupe_medicament_id',
        'groupe',
        'stock_quantite',
        'prix',
        'dosage',
        'fabriquant',
        'type_consommation',
        'date_expiration',
        'description',
        'image',
    ];

    protected $casts = [
        'date_expiration' => 'date',
        'stock_quantite'  => 'integer',
        'prix'            => 'decimal:2',
    ];

    public function groupe()
    {
        return $this->belongsTo(GroupeMedicament::class, 'groupe_medicament_id');
    }
}
