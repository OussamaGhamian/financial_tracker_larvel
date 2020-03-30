<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
//Currencies
Route::get('/currencies', 'CurrencyController@index');
// Route::get('/currency/{id}', 'CurrencyController@show');
//Categories
Route::get('/categories', 'CategoryController@index');
Route::get('/category/{id}', 'CategoryController@show');
Route::post('/category', 'CategoryController@store');
Route::post('/category/{id}', 'CategoryController@update');
Route::delete('/category/{id}', 'CategoryController@destroy');