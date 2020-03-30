<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Currency;

class CurrencyController extends Controller
{
    function index()
    {
        $currencies = Currency::all();
        return $currencies;
    }
    // function show($id)
    // {
    //     $currency = Currency::findOrFail($id);
    //     return $currency;
    // }
}
