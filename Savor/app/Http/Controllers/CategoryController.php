<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Category;

class CategoryController extends Controller
{
    public function index()
    {
        $user_id = auth()->user()->id;
        // var_dump((int)$user_id);
        // die();
        
        //return the categories that belong the logged in user.
        $categories = Category::Where('user_id' , $user_id)->get();
        // var_dump($categories);
        // die();
        
        return response()->json([
            "success" => true,
            "data" => $categories
        ], 200);
    }
    public function store(Request $request)
    {
        $inputs = $request->only(['name']);
        $inputs['user_id'] = auth()->user()->id;
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
        $category = Category::findOrFail($id);
        if (isset($category) && $category->user_id == auth()->user()->id) {
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
