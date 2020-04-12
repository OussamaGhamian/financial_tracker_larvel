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
//Route::post('/user', 'UserController@store');
Route::post('/user/{id}', 'UserController@update');
Route::delete('/user/{id}', 'UserController@destroy');
//Auth
Route::post('/register', 'AuthController@register');
Route::post('/login', 'AuthController@login');

//Currencies
Route::post('/storeimg', 'AuthController@storeimg');
Route::get('/currencies', 'CurrencyController@index');
// Route::get('/currency/{id}', 'CurrencyController@show');



Route::post('/images/{name}', 'AuthController@displayImage');

//need to be authenticated

Route::group(['middleware' => ['jwt.verify']], function () {
    Route::get('/logout', 'AuthController@logout');

    //Categories
    Route::get('/categories', 'CategoryController@index');
    Route::post('/categories', 'CategoryController@store');
    Route::get('/categories/{id}', 'CategoryController@show');
    Route::post('/categories/{id}', 'CategoryController@update');
    Route::delete('/categories/{id}', 'CategoryController@destroy');
    // Transaction
    Route::get('/transactions', 'TransactionsController@index');
    Route::get('/transIncomes', 'TransactionsController@showTypeIncomes');
Route::get('/transExpenses', 'TransactionsController@showTypeExpenses');

    Route::get('/transactions/{id}', 'TransactionsController@show');
    Route::post('/transactions', 'TransactionsController@store');
    Route::post('/transactions/{id}', 'TransactionsController@update');
    Route::delete('/transactions/{id}', 'TransactionsController@destroy');
});
