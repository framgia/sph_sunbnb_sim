<?php

namespace App\Models;

use App\Enums\UserStatus;
use App\Http\Requests\V1\BanRequest;
use App\Http\Requests\V1\UnbanRequest;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;

class BanReason extends Model {
    use HasFactory;
    use SoftDeletes;

    protected $fillable = ['reason'];

    public function admin(): BelongsTo {
        return $this->belongsTo(Admin::class);
    }

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    public static function banUser(BanRequest $request) {
        $admin = Auth::id();
        $user = User::findOrFail($request->user_id);

        if ($user->status === UserStatus::BANNED) {
            throw new \Exception('User is already banned.');
        }

        $banReason = new static(['reason' => $request->reason]);
        $banReason->admin()->associate($admin);
        $banReason->user()->associate($user);
        $banReason->save();

        $user->update(['status' => UserStatus::BANNED]);
    }

    public static function unbanUser(UnbanRequest $request) {
        $user = User::findOrFail($request->user_id);

        if ($user->status === UserStatus::ACTIVE) {
            throw new \Exception('User is not banned.');
        }

        $banReason = static::where('user_id', $request->user_id)->first();
        $banReason->user()->update(['status' => UserStatus::ACTIVE]);
        $banReason->delete();
    }
}
