<?php
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('orders', OrderController::class)->except(['index', 'create', 'edit', 'update','destroy']);
});
Route::apiResource('products', ProductController::class)->only(['index','show']);
Route::post('/login', [AuthController::class, 'login']);

