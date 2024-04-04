<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
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

    public function report(): HasMany {
        return $this->hasMany(Report::class);
    }

    public function reason(): HasMany {
        return $this->hasMany(BanReason::class);
    }

    public static function authenticateAdmin($request) {
        $admin = self::where('email', $request['email'])->first();
        abort_unless($admin && Hash::check($request['password'], $admin->password), Response::HTTP_UNAUTHORIZED, 'Unauthorized');
        $adminToken = $admin->createToken('Personal Access Token', ['admin']);

        return $adminToken;
    }
}
