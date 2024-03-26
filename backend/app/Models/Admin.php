<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Http\Response;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Laravel\Passport\HasApiTokens;

class Admin extends Authenticatable {
    use HasApiTokens;
    use HasFactory;
    use Notifiable;
    use SoftDeletes;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
    ];

    protected $casts = [
        'password' => 'hashed',
    ];

    public function report() {
        return $this->hasMany(Report::class);
    }

    public static function authenticateAdmin($request): self {
        $admin = self::where('email', $request['email'])->first();
        abort_unless($admin && Hash::check($request['password'], $admin->password), Response::HTTP_UNAUTHORIZED, 'Unauthorized');

        return $admin;
    }
}
