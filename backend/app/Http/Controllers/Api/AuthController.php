<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    /**
     * Registro de usuarios
     */


public function register(Request $request)
{
    try {
        $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => bcrypt($request->password),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        Log::info('Usuario registrado correctamente', ['email' => $user->email]);

        return response()->json([
            'user'  => $user,
            'token' => $token,
            'token_type' => 'Bearer'
        ], 201);

    } catch (ValidationException $e) {
        Log::warning('❌ Error de validación en registro', [
            'errors' => $e->errors(),
            'input' => $request->all(),
        ]);

        return response()->json([
            'message' => 'Datos inválidos',
            'errors' => $e->errors(),
        ], 422);
    } catch (\Exception $e) {
        Log::error('❌ Error inesperado en registro', [
            'message' => $e->getMessage(),
            'input' => $request->all(),
        ]);

        return response()->json([
            'message' => 'Ocurrió un error en el servidor',
        ], 500);
    }
}


    /**
     * Login de usuarios
     */
    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required|string'
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Las credenciales no son correctas.'],
            ]);
        }

        // Revoca tokens anteriores (opcional)
        $user->tokens()->delete();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user'  => $user,
            'token' => $token,
            'token_type' => 'Bearer'
        ]);
    }

    /**
     * Logout (revocar token actual)
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Sesión cerrada correctamente'
        ]);
    }
}