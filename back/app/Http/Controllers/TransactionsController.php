<?php

namespace App\Http\Controllers;

use App\Transaction;
use Illuminate\Http\Request;

class TransactionsController extends Controller
{

    public function index()
    {
        $transactions = auth()->user()->transactions;
        if ($transactions) {
            return sendResponse(true, 200, $transactions, );
        }

        return sendResponse(false, 401, null, ['No transactions to retrieve']);

    }

    public function store(Request $request)
    {
        $data = request()->only([
            'title', 'description', 'amount', 'categories_id', 'start_date', 'end_date'
            , 'intervalo', 'type', 'currencies_id',
        ]);
        $data['user_id'] = auth()->user()->id;
        $transaction = Transaction::create($data);
        if ($transaction) {
            return sendResponse(true, 200, $transaction, );
        }

        return sendResponse(false, 401, null, ['Could not create transaction']);
    }
    public function show($id)
    {
        $transaction = auth()->user()->transactions->find($id);
        if (isset($transaction)) {
            return sendResponse(true, 200, $transaction, );
        }

        return sendResponse(false, 401, null, ["No transaction with ID : ${id}"]);
    }

    public function showTypeIncomes()
    {
         $user = auth()->user()->id;
        $trans = Transaction::query()->where('type', 'LIKE', 'incomes')->Where('user_id', '=', $user)->get();
        if (isset($trans)) {
            return sendResponse(true, 200, $trans, );
        }

        return sendResponse(false, 401, null, ["No transaction with ID : }"]);

    }

      public function showTypeExpenses()
    {
         $user = auth()->user()->id;
        $trans = Transaction::query()->where('type', 'LIKE', 'expenses')->Where('user_id', '=', $user)->get();
        if (isset($trans)) {
            return sendResponse(true, 200, $trans, );
        }

        return sendResponse(false, 401, null, ["No transaction with ID : }"]);

    }

    public function update(Request $request, $id)
    {
        $data = $request->all();
        $transaction = auth()->user()->transactions->find($id);
        if ($transaction) {
            $transaction->update($data);
            $transaction->save();
            return sendResponse(true, 200, $transaction, );
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
