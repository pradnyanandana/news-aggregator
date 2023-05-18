<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Get User
     * 
     * @param Request $request
     * 
     * @return User
     */
    public function getUser(Request $request)
    {
        try {
            return response()->json([
                'status' => true,
                'message' => 'User Authenticated',
                'token' => $request->user()
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Logout User
     * 
     * @param Request $request
     * 
     * @return User
     */
    public function logoutUser(Request $request)
    {
        try {
            $user = $request->user();
            $user->tokens()->where('id', $user->currentAccessToken()->id)->delete();
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Create User
     * 
     * @param Request $request
     * @return User 
     */
    public function createUser(Request $request)
    {
        try {
            $validateUser = Validator::make(
                $request->all(),
                [
                    'name' => 'required',
                    'username' => 'required|unique:users,username',
                    'password' => 'required',
                    'repassword' => 'required'
                ]
            );

            if ($request->password !== $request->repassword) {
                return response()->json([
                    'status' => false,
                    'message' => 'Password and Retype Password is not the same',
                    'errors' => $validateUser->errors()
                ], 401);
            }

            if (User::where('username', '=', $request->username)->count() > 0) {
                return response()->json([
                    'status' => false,
                    'message' => 'Username has taken',
                    'errors' => $validateUser->errors()
                ], 401);
            }

            if ($validateUser->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Please check your username and password',
                    'errors' => $validateUser->errors()
                ], 401);
            }

            $user = User::create([
                'name' => $request->name,
                'username' => $request->username,
                'password' => Hash::make($request->password),
                'preferences' => serialize([
                    'sources' => [],
                    'categories' => [],
                    'authors' => []
                ])
            ]);

            return response()->json([
                'status' => true,
                'message' => 'User Created Successfully',
                'token' => $user->createToken("API TOKEN")->plainTextToken
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Login User
     * 
     * @param Request $request
     * 
     * @return User
     */
    public function loginUser(Request $request)
    {
        try {
            $validateUser = Validator::make(
                $request->all(),
                [
                    'username' => 'required',
                    'password' => 'required'
                ]
            );

            if ($validateUser->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Please check your username and password',
                    'errors' => $validateUser->errors()
                ], 401);
            }

            if (!Auth::attempt($request->only(['username', 'password']))) {
                return response()->json([
                    'status' => false,
                    'message' => 'Username & Password does not match with our record.',
                ], 401);
            }

            $user = User::where('username', $request->username)->first();

            if ($user->preferences) {
                $user->preferences = unserialize($user->preferences);
            }

            return response()->json([
                'status' => true,
                'message' => 'User Logged In Successfully',
                'user' => $user,
                'token' => $user->createToken("API TOKEN")->plainTextToken
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
}
