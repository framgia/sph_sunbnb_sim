<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckUserRole {
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $role): Response {
        $user = $request->user();

        if ($user && ($user->tokenCan($role) || $user->tokenCan('admin'))) {
            return $next($request);
        }

        return response()->json(['error' => 'Unauthorized Access'], Response::HTTP_FORBIDDEN);
    }
}
