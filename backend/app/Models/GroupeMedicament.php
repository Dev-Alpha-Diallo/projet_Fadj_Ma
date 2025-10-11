<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GroupeMedicament extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'description',
    ];

    public function medicaments()
{
    return $this->hasMany(Medicament::class);
}

}