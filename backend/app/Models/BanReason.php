<?php

namespace App\Models;

use App\Enums\UserStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

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

    public static function ban($userId, $reason) {
        $admin = Admin::first();

        if (! $admin) {
            abort(404, 'No admin user found');
        }

        $user = User::findOrFail($userId);

        $banReason = new static(['reason' => $reason]);
        $banReason->admin()->associate($admin);
        // $banReason->admin()->associate(auth()->admin());
        $banReason->user()->associate($user);
        $banReason->save();

        $user->update(['status' => UserStatus::BANNED]);

        return $banReason;
    }

    public function unban() {
        $this->user()->update(['status' => UserStatus::ACTIVE]);
        $this->delete();
    }

    public static function validateBanRequest(Request $request) {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'reason' => 'required|string',
        ]);

        if ($validator->fails()) {
            throw ValidationException::withMessages($validator->errors()->all());
        }
    }
}
