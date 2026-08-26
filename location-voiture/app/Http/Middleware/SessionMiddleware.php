<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class SessionMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        // Check if user has a valid session
        if (!$request->session()->has('user')) {
            return redirect()->route('home');
        }

        return $next($request);
    }
}