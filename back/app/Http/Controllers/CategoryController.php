<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Category;
use Exception;

class CategoryController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $categories = $user->categories;
        if ($categories) {
            return sendResponse(true, 200,$categories);
       }
        return sendResponse(false, 401, null, ["No Categories for user with ID : " . $user->id]);
    }




    public function store()
    {
        $data = request()->validate([
            "name" => 'required',
        ]);
        $data['user_id'] = auth()->user()->id;
        $category = Category::create($data);
        if ($category) {
            return sendResponse(true, 200, "Category was created");
        }
        return sendResponse(false, 401, null, ["Could not create a new category"]);
    }
    public function show($id)
    {
        $category = auth()->user()->categories->find($id);
        if (isset($category)) {
            return sendResponse(true, 200, $category,);
        }
        return sendResponse(false, 401, null, ["No category with id : ${id} for this user"]);
    }
    public function update($id)
    {
        $data = request()->validate([
            "name" => 'required',
        ]);
        // $category = Category::where('id', $id)->first();
        $category = auth()->user()->categories->find($id);
        if ($category) {
            $category->update($data);
            $category->save();
            return sendResponse(true, 200, "Category was updated");
        }
        return sendResponse(false, 401, null, ["No category with ID : ${id} to update"]);
    }
    public function destroy($id)
    {
        $category = auth()->user()->categories->find($id);
        if ($category) {
            $category->delete();
            return sendResponse(true, 200, null,);
        }
        return sendResponse(false, 200, null, ["No category with ID : ${id} to delete"]);
    }
}
