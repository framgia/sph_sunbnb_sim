<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Enums\UserStatus;
use App\Notifications\ResetPasswordNotification;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable {
    use HasApiTokens;
    use HasFactory;
    use Notifiable;
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'role',
        'status',
        'email',
        'password',
        'provider',
        'provider_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function reports() {
        return $this->hasMany(Report::class);
    }

    public function bookings() {
        return $this->hasMany(Booking::class);
    }

    public function listings() {
        return $this->hasMany(Listing::class);
    }

    public function setPasswordAttribute($password) {
        $this->attributes['password'] = bcrypt($password);
    }

    private function shouldAllowUpdate(): bool {
        return $this->provider === null;
    }

    public function checkPassword($password): bool {
        return Hash::check($password, $this->password);
    }

    public function sendPasswordResetNotification($token) {
        $url = env('FE_URL').'/reset-password?token='.$token.'&email='.urlencode($this->email);

        $this->notify(new ResetPasswordNotification($url));
    }

    public static function authenticateUser($credentials) {
        abort_unless(Auth::attempt($credentials), 401, 'Invalid credentials.');

        return self::find(Auth::user()->id);
    }

    public static function authenticateGoogleUser($payload): self {
        abort_unless($payload && isset($payload['sub']), 400, 'Invalid Google payload.');
        $user = self::where('provider_id', $payload['sub'])->first();
        abort_unless($user, 401, 'User not found.');

        return $user;
    }

    public static function createGoogleUser($payload, $role): self {
        abort_unless($payload && isset($payload['sub']) && isset($payload['email']), 400, 'Invalid Google payload.');
        abort_unless(self::where('email', $payload['email'])->doesntExist(), 400, 'User already exists.');

        $data = [
            'email' => $payload['email'],
            'provider_id' => $payload['sub'],
            'provider' => 'google',
            'first_name' => $payload['given_name'] ?? null,
            'last_name' => $payload['family_name'] ?? null,
            'role' => $role,
            'status' => UserStatus::ACTIVE,
        ];

        return self::create($data);
    }

    public static function createUser($request): self {
        abort_unless(is_array($request), 400, 'Invalid user data.');
        $data = [
            'email' => $request['email'],
            'password' => $request['password'],
            'first_name' => $request['first_name'],
            'last_name' => $request['last_name'],
            'role' => $request['role'],
            'status' => UserStatus::ACTIVE,
        ];

        return self::create($data);
    }

    public function updateUser($request): void {
        $data = [
            'first_name' => $request->input('first_name', $this->first_name),
            'last_name' => $request->input('last_name', $this->last_name),
        ];

        if ($this->shouldAllowUpdate()) {
            $data['email'] = $request->input('email', $this->email);
        }

        $this->update($data);
    }

    public function updatePassword($request): void {
        if ($this->shouldAllowUpdate()) {
            if ($request->has('current_password') && ! $this->checkPassword($request->input('current_password'))) {
                abort(403, 'Current password is incorrect.');
            }

            $data['password'] = $request->input('new_password')
                ? $request->input('new_password')
                : $this->password;
        } else {
            abort(403, 'Cannot update password if using provider.');
        }
        $this->update($data);
    }
}
