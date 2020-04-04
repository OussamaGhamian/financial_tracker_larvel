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
//transactions
//Auth
Route::post('/register', 'AuthController@register');
Route::post('/login', 'AuthController@login');
//need to be authenticated
Route::group(['middleware' => ['jwt.verify']], function () {
    //Currencies
    Route::get('/currencies', 'CurrencyController@index');
    // Route::get('/currency/{id}', 'CurrencyController@show');
    //Categories
    Route::get('/categories', 'CategoryController@index');
    Route::get('/categories/{id}', 'CategoryController@show');
    Route::post('/categories', 'CategoryController@store');
    Route::post('/categories/{id}', 'CategoryController@update');
    Route::delete('/categories/{id}', 'CategoryController@destroy');
    // Transaction
    Route::get('/transaction', 'TransactionsController@index');
    Route::get('/transaction/{id}', 'TransactionsController@show');
    Route::post('/transaction', 'TransactionsController@store');
    Route::post('/transaction/{id}', 'TransactionsController@update');
    Route::delete('/transaction/{id}', 'TransactionsController@destroy');
});
