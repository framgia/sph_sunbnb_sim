<?php

namespace App\Http\Middleware;

use App\Models\Listing;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckOwnership {
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $type): Response {
        $userId = Auth::id();
        switch ($type) {
            case 'listing':
                $resource = Listing::findOrFail($request->route('listingId'));
                break;
            case 'user':
                if ($userId != $request->route('userId')) {
                    abort(403, 'Unauthorized action.');
                }
                break;
            default:
                abort(400, 'Invalid resource type.');
        }

        if ($userId != $resource->user_id) {
            abort(403, 'Unauthorized action.');
        }

        return $next($request);
    }
}
