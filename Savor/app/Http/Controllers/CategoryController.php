<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Category;

class CategoryController extends Controller
{
    public function index()
    {
        $user_id = auth()->user()->id;
        //return the categories that belong the logged in user.
        $categories = Category::Where('user_id', $user_id)->get();
        if ($categories) {
            return sendResponse(true, 200, $categories,);
        }
        return sendResponse(false, 401, null, ["No Categories for user with ID : ${user_id}"]);
    }
    public function store(Request $request)
    {
        $inputs = $request->only(['name']);
        $inputs['user_id'] = auth()->user()->id;
        $category = new Category();
        $category->fill($inputs);
        $category->save();
        if ($category) {
            return sendResponse(true, 200, "Category was created");
        }
        return sendResponse(false, 401, null, ["Could not create a new category"]);
    }
    public function show($id)
    {
        $category = Category::findOrFail($id);
        if (isset($category) && $category->user_id == auth()->user()->id) {
            return sendResponse(true, 200, $category,);
        }
        return sendResponse(false, 401, null, ["New category was not created"]);
    }
    public function update(Request $request, $id)
    {
        $inputs = $request->all();
        $category = Category::where('id', $id)->first();
        $category->update($inputs);
        $category->save();
        var_dump($category);
        die();
        
    }
    public function destroy($id)
    {
        try {
            $category = Category::find($id)->delete();
            if ($category) {
                return sendResponse(true, 200, null,);
            }
            return sendResponse(false, 200, null, ["No category with ID : ${id} to deleted"]);
        } catch (\Exception $err) {
            $err->getMessage();
        }
    }
}
