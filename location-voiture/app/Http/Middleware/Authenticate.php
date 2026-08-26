<?php
namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    protected function redirectTo(Request $request): ?string
    {
        // For API requests, return null to prevent redirection
        if ($request->expectsJson() || $request->is('api/*')) {
            return null;
        }

        // For admin requests, redirect to the admin login route
        if ($request->is('admin/*')) {
            return 'http://localhost:5173/login';
        }

        // For web requests, redirect to the login route (if you have one)
        return 'http://localhost:5173/login';
    }

    /**
     * Handle an unauthenticated user.
     */
    protected function unauthenticated($request, array $guards)
    {
        // For API requests, return a JSON response instead of redirecting
        if ($request->expectsJson() || $request->is('api/*')) {
            abort(response()->json(['message' => 'Unauthenticated'], 401));
        }

        parent::unauthenticated($request, $guards);
    }
}