<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Category;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        return response()->json([
            "success" => true,
            "data" => $categories
        ], 200);
    }
    public function store(Request $request)
    {
        $inputs = $request->only(['name', 'user_id']);

        $category = new Category();
        $category->fill($inputs);
        $category->save();
        return response()->json([
            "success" => true,
            "data" => null
        ], 200);
    }
    public function show($id)
    {
        $category = Category::find($id);
        if (isset($category)) {
            return response([
                "success" => true,
                "data" => $category
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
        $category = Category::where('id', $id)->first();
        // dd($category);
        $category->update($inputs);
        $category->save();
    }
    public function destroy($id)
    {
        $category = Category::find($id)->delete();
    }
}
