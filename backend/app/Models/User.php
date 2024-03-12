<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Notifications\ResetPasswordNotification;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
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

    public function setPasswordAttribute($password) {
        $this->attributes['password'] = bcrypt($password);
    }

    public function sendPasswordResetNotification($token) {
        $url = env('FE_URL').'/forget-password?token='.$token;

        $this->notify(new ResetPasswordNotification($url));
    }

    public function reports() {
        return $this->hasMany(Report::class);
    }

    public function bookings() {
        return $this->hasMany(Booking::class);
    }

    public function listings() {
        return $this->hasMany(Listing::class);
    }

    private function shouldAllowUpdate(): bool {
        return $this->provider === null;
    }

    public function updateUser($request): void {
        $data = [
            'first_name' => $request->input('first_name', $this->first_name),
            'last_name' => $request->input('last_name', $this->last_name),
        ];

        if ($this->shouldAllowUpdate()) {
            $data['email'] = $request->input('email', $this->email);
            $data['password'] = $request->input('password', $this->password);
        }

        $this->update($data);
    }
}
