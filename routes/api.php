<?php

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FrontEndController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/products/{category}', [FrontEndController::class, 'show']);
Route::get('/getCategory',[CategoryController::class, 'index']);
Route::get('/getAllCategory',[CategoryController::class, 'allCategories']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/getMostOrdered/{filter}',[OrderController::class, 'mostOrdered']);

Route::group([
    'middleware' => ['auth:sanctum']
], function () {
    Route::get('/getOrderInfo',[OrderController::class, 'index']);
    Route::post('/storeOrder',[OrderController::class, 'store']);

    Route::post('/store',[FrontEndController::class, 'store']);
    Route::post('/update/{id}',[FrontEndController::class, 'update']);
    Route::post('/createCategory',[CategoryController::class, 'store']);
    Route::post('/updateCategory/{id}',[CategoryController::class, 'update']);
    Route::delete('/delete/{id}',[FrontEndController::class, 'destroy']);
    Route::delete('/deleteCategory/{id}',[CategoryController::class, 'destroy']);
});
