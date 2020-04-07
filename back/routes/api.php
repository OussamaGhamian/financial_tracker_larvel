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

//users
Route::get('/users', 'UserController@index');
Route::get('/user/{id}', 'UserController@show');
// Route::post('/user', 'UserController@store');
Route::post('/user/{id}', 'UserController@update');
Route::delete('/user/{id}', 'UserController@destroy');
//Auth
Route::post('/register', 'AuthController@register');
Route::post('/login', 'AuthController@login');
//Currencies
Route::post('/storeimg', 'AuthController@storeimg');
Route::get('/currencies', 'CurrencyController@index');
// Route::get('/currency/{id}', 'CurrencyController@show');
//need to be authenticated
Route::group(['middleware' => ['jwt.verify']], function () {

    //Categories
    Route::get('/categories', 'CategoryController@index');
    Route::post('/category', 'CategoryController@store');
    Route::get('/category/{id}', 'CategoryController@show');
    Route::post('/category/{id}', 'CategoryController@update');
    Route::delete('/category/{id}', 'CategoryController@destroy');
    // Transaction
    Route::get('/transactions', 'TransactionsController@index');
    Route::get('/transaction/{id}', 'TransactionsController@show');
    Route::post('/transaction', 'TransactionsController@store');
    Route::post('/transaction/{id}', 'TransactionsController@update');
    Route::delete('/transaction/{id}', 'TransactionsController@destroy');
});