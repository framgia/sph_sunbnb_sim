<?php

namespace App\Claims;

use App\Models\Admin;
use App\Models\User;
use CorBosman\Passport\AccessToken;

class UserClaim {
    public function handle(AccessToken $token, $next) {
        $user = User::find($token->getUserIdentifier());
        if (! $user) {
            $user = Admin::find($token->getUserIdentifier());
            $user->role = 'admin';
            $user->status = 'active';
            $user->provider = null;
        }

        $token->addClaim('user', [
            'id' => $user->id,
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'email' => $user->email,
            'role' => $user->role,
            'status' => $user->status,
            'provider' => $user->provider,
        ]);

        return $next($token);
    }
}
