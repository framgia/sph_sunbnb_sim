<?php

namespace App\Models;

use App\Enums\UserStatus;
use App\Http\Requests\V1\UserSortRequest;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Http\Response;
use Illuminate\Notifications\Notifiable;
use Illuminate\Pagination\LengthAwarePaginator;
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

    public static function paginateAll(UserSortRequest $request) {
        $perPage = $request->query('per_page', 9);
        $search = $request->query('search');
        $role = $request->query('role');
        $status = $request->query('status');
        $sort = $request->query('sort', 'desc');

        $allData = self::getAllData($search, $role, $status);
        $sortedData = self::sortData($allData, $sort);
        $paginatedData = self::paginateData($sortedData, $perPage);
        $transformedData = self::transformData($paginatedData);

        return [
            'success' => true,
            'data' => $transformedData,
            'pagination' => self::paginationResponse($paginatedData, $perPage),
        ];
    }

    private static function getAllData($search = null, $role = null, $status = null) {
        $adminsQuery = self::query();
        if ($search) {
            $adminsQuery->where(function ($query) use ($search) {
                $query->where('first_name', 'like', '%'.$search.'%')
                    ->orWhere('last_name', 'like', '%'.$search.'%');
            });
        }

        $admins = $adminsQuery->get();
        if ($role === 'admin') {
            return $admins;
        }

        $usersQuery = User::query();
        if ($role) {
            $acceptedRoles = ['admin', 'host', 'guest'];
            if (in_array($role, $acceptedRoles)) {
                if ($role !== 'admin') {
                    $admins = collect();
                }
                $usersQuery->where('role', $role);
            } else {
                return collect();
            }
        }

        if ($status !== null && in_array($status, UserStatus::getConstants())) {
            $usersQuery->where('status', $status);
        }

        if ($search) {
            $usersQuery->where(function ($query) use ($search) {
                $query->where('first_name', 'like', '%'.$search.'%')
                    ->orWhere('last_name', 'like', '%'.$search.'%');
            });
        }

        $users = $usersQuery->get();
        $allData = $status !== null ? $users : $admins->concat($users);

        return $allData;
    }

    private static function sortData($data, $sort) {
        return ($sort === 'asc') ? $data->sortBy('created_at') : $data->sortByDesc('created_at');
    }

    private static function paginateData($data, $perPage) {
        $page = LengthAwarePaginator::resolveCurrentPage();
        $total = $data->count();
        $start = ($page - 1) * $perPage;
        $sliced = $data->slice($start, $perPage);
        $sliced = $sliced->values();

        return new LengthAwarePaginator($sliced, $total, $perPage, $page, [
            'path' => LengthAwarePaginator::resolveCurrentPath(),
        ]);
    }

    private static function transformData($data) {
        return $data->map(function ($item) {
            if ($item instanceof self) {
                $item->role = 'admin';
            }

            return $item;
        })->toArray();
    }

    private static function paginationResponse($data, $perPage) {
        return [
            'current_page' => $data->currentPage(),
            'per_page' => $perPage,
            'total' => $data->total(),
            'next_page_url' => $data->nextPageUrl(),
            'path' => request()->url(),
            'prev_page_url' => $data->previousPageUrl(),
            'to' => $data->lastItem(),
        ];
    }
}
