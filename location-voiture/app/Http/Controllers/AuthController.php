<?php
namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = Client::where('email', $credentials['email'])->first();
        if (!$user) {
            $user = Admin::where('email', $credentials['email'])->first();
        }

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        // Create token without session dependency
        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => $user,
            'user_type' => $user instanceof Client ? 'client' : 'admin'
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        redirect('https://daimondcar.vercel.app/');
        return response()->json(['message' => 'Logged out successfully',]);
    }

    public function checkAuth(Request $request)
    {
        if (Session::has('user')) {
            return response()->json([
                'isAuthenticated' => true,
                'user' => Session::get('user'),
                'user_type' => Session::get('user_type')
            ]);
            
        }
        return response()->json(['isAuthenticated' => false], 401);
    }
}