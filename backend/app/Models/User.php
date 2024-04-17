<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Enums\UserRole;
use App\Enums\UserStatus;
use App\Notifications\ResetPasswordNotification;
use App\Traits\ResponseHandlingTrait;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Http\Response;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Laravel\Passport\HasApiTokens;
use Spatie\Analytics\Facades\Analytics;
use Spatie\Analytics\Period;

class User extends Authenticatable {
    use HasApiTokens;
    use HasFactory;
    use Notifiable;
    use ResponseHandlingTrait;
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

    public function reason() {
        return $this->hasMany(BanReason::class);
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
        $user = self::where('email', $credentials['email'])->first();
        abort_unless(
            $user && Hash::check($credentials['password'], $user->password),
            Response::HTTP_UNAUTHORIZED,
            'Invalid credentials.'
        );
        $user->checkUserStatus($user->status);

        return $user->createToken('Personal Access Token', [$user->role]);
    }

    public static function authenticateGoogleUser($payload) {
        abort_unless(
            $payload && isset($payload['sub']),
            Response::HTTP_BAD_REQUEST,
            'Invalid Google payload.'
        );
        $user = self::where('provider_id', $payload['sub'])->first();
        abort_unless($user, Response::HTTP_UNAUTHORIZED, 'User not found.');
        $user->checkUserStatus($user->status);

        return $user->createToken('Personal Access Token', [$user->role]);
    }

    public static function createGoogleUser($payload, $role) {
        abort_unless(
            $payload && isset($payload['sub']) && isset($payload['email']),
            Response::HTTP_BAD_REQUEST,
            'Invalid Google payload.'
        );
        abort_unless(
            self::where('email', $payload['email'])->doesntExist(),
            Response::HTTP_BAD_REQUEST,
            'User already exists.'
        );

        self::create([
            'email' => $payload['email'],
            'provider_id' => $payload['sub'],
            'provider' => 'google',
            'first_name' => $payload['given_name'] ?? null,
            'last_name' => $payload['family_name'] ?? null,
            'role' => $role,
            'status' => UserStatus::ACTIVE,
        ]);

        return self::authenticateGoogleUser($payload);
    }

    public static function createUser($request) {
        abort_unless(is_array($request), Response::HTTP_BAD_REQUEST, 'Invalid user data.');

        self::create([
            'email' => $request['email'],
            'password' => $request['password'],
            'first_name' => $request['first_name'],
            'last_name' => $request['last_name'],
            'role' => $request['role'],
            'status' => UserStatus::ACTIVE,
        ]);

        return self::authenticateUser($request);
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
                abort(Response::HTTP_FORBIDDEN, 'Current password is incorrect.');
            }

            $data['password'] = $request->input('new_password')
                ? $request->input('new_password')
                : $this->password;
        } else {
            abort(Response::HTTP_FORBIDDEN, 'Cannot update password if using provider.');
        }
        $this->update($data);
    }

    public static function getUserDetails($userId) {
        $user = static::with('reason')->findOrFail($userId);

        $userRole = $user->role;
        if ($userRole === UserRole::GUEST) {
            $user->load('bookings.listing.media');
        } elseif ($userRole === UserRole::HOST) {
            $user->load('listings.media');
        }

        return $user;
    }

    public static function getUserAnalytics() {
        return [
            'host' => self::where('role', 'host')->count(),
            'guest' => self::where('role', 'guest')->count(),
            'admin' => Admin::count(),
            'traffic' => self::getActiveUsersPerDay(),
        ];
    }

    private static function getActiveUsersPerDay() {
        $firstDayOfMonth = Carbon::now()->startOfMonth();
        $lastDayOfMonth = Carbon::now()->endOfMonth();

        $userTraffic = Analytics::fetchTotalVisitorsAndPageViews(Period::create($firstDayOfMonth, $lastDayOfMonth));
        $daysInMonth = $lastDayOfMonth->day;
        $activeUsersPerDay = array_fill(0, $daysInMonth, 0);

        foreach ($userTraffic as $traffic) {
            $day = Carbon::parse($traffic['date'])->day;
            $activeUsersPerDay[$day - 1] = $traffic['activeUsers'];
        }

        return [
            'month' => Carbon::now()->monthName.' '.Carbon::now()->year,
            'users' => $activeUsersPerDay,
        ];
    }

    private function checkUserStatus($status): void {
        abort_unless(
            $status === UserStatus::ACTIVE,
            Response::HTTP_FORBIDDEN,
            "User $this->email is banned. ".$this->reason->last()->reason
        );
    }
}
