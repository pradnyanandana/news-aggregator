<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/auth/register', [AuthController::class, 'createUser']);
Route::post('/auth/login', [AuthController::class, 'loginUser']);
Route::get('/auth/logout', [AuthController::class, 'logoutUser'])->middleware('auth:sanctum');
Route::get('/auth/user', [AuthController::class, 'getUser'])->middleware('auth:sanctum');

Route::get('/news', [NewsController::class, 'getNews']);
Route::post('/news/search', [NewsController::class, 'getNewsSearch']);
Route::post('/news/category', [NewsController::class, 'getNewsByCategory']);

Route::get('/user/preferences', [UserController::class, 'getPreferences'])->middleware('auth:sanctum');
Route::post('/user/preferences', [UserController::class, 'savePreferences'])->middleware('auth:sanctum');