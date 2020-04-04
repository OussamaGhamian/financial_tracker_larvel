<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Transaction;

class TransactionsController extends Controller
{

    function index()
    {
        $transactions = auth()->user()->transactions;
        if ($transactions) return sendResponse(true, 200, $transactions,);
        return sendResponse(false, 401, null, ['No transactions to retrieve']);
    }
    public function store(Request $request)
    {
        $data = request()->validate([
            'title' => 'required', 'description' => 'required', 'amount' => 'required', 'categories_id' => 'required', 'start_date' => 'required', 'end_date' => 'required'
            // , 'user_id' => 'required'
            , 'intervalo' => 'required', 'type' => 'required', 'currencies_id' => 'required'
        ]);
        $data['user_id'] = auth()->user()->id;
        $transaction = Transaction::create($data);
        if ($transaction) return sendResponse(true, 200, $transaction,);
        return sendResponse(false, 401, null, ['Could not create transaction']);
    }
    public function show($id)
    {
        $transaction = auth()->user()->transactions->find($id);
        if (isset($transaction))
            return sendResponse(true, 200, $transaction,);
        return sendResponse(false, 401, null, ["No transaction with ID : ${id}"]);
    }
    public function update(Request $request, $id)
    {
        $data = $request->all();
        $transaction = auth()->user()->transactions->find($id);
        if ($transaction) {
            $transaction->update($data);
            $transaction->save();
            return sendResponse(true, 200, $transaction,);
        }
        return sendResponse(false, 401, null, ['No transaction with ID : ${id} to delete']);
    }
    public function destroy($id)
    {
        $transaction = auth()->user()->transactions->find($id);
        if ($transaction) {
            $transaction->delete();
            return sendResponse(true, 200, null);
        }
        return sendResponse(false, 401, null, ["No transaction with id : ${id} to delete"]);
    }
}
