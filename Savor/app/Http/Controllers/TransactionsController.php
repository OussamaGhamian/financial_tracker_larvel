<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Transaction;

class TransactionsController extends Controller
{
    //
    function index()
    {
        $trans = Transaction::all();
        return response()->json([
            "success" => true,
            "data" => $trans,
        ], 200);
    }
    public function store(Request $request)
    {
        $inputs = $request->only(['title', 'description', 'amount', 'categories_id', 'start_date', 'end_date', 'user_id', 'intervalo', 'type', 'currencies_id']);

        $trans = new Transaction();
        $trans->fill($inputs);
        $trans->save();
        return response()->json([
            "success" => true,
            "data" => null
        ], 200);
    }
    public function show($id)
    {
        $trans = Transaction::find($id);
        if (isset($trans)) {
            return response([
                "success" => true,
                "data" => $trans
            ], 200);
        } else {
            return response([
                "success" => false,
                "data" => null
            ], 400);
        }
    }
    public function update(Request $request, $id)
    {
        $inputs = $request->all();
        $trans = Transaction::where('id', $id)->first();
        // dd($category);
        $trans->update($inputs);
        $trans->save();
    }
    public function destroy($id)
    {
        $trans = Transaction::find($id)->delete();
    }
}
