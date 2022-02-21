<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FrontEndController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/products/{category}', [FrontEndController::class, 'show']);

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::group([
    'middleware' => ['auth:sanctum']
], function () {
    Route::post('/store',[FrontEndController::class, 'store']);
});
