<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $user = User::create([
            'email' => $request->email,
            'name' => $request->name,
            'password' => $request->password,
            'image' => $request->image,
            'currencies_id' => $request->currencies_id,
        ]);
        $token = auth()->login($user);
        return $this->respondWithToken($token);
    }
    public function login()
    {
        $credentials = request(['email', 'password']);
        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        return $this->respondWithToken($token);
    }
    
   public function logout(Request $request)
    {
        $this->validate($request, [
            'token' => 'required'
        ]);

        try {
            JWTAuth::invalidate($request->token);

            return response()->json([
                'success' => true,
                'message' => 'User logged out successfully'
            ]);
        } catch (JWTException $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Sorry, the user cannot be logged out'
            ], 500);
        }
    }
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
    public function storeimg(Request $req)
    {
        $file = $req->file('image');
        $name = $file->getClientOriginalName();
        $file->move('images/', $name);

        // $data = array_merge(['photo' => "images/client/{$name}"], $req->all());

        // Project::create($data);

        return 'Done';
        // header('Access-Control-Allow-Origin: *');
        // header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
        // header('Access-Control-Max-Age: 1000');
        // header('content-type', 'multipart/form-data');
        // header('Content-Type: application/json; charset=utf-8');
        // echo "ASDA";
        // var_dump($_);
        // var_dump($_FILES['image']['error']);
        // if (isset($_FILES['image'])) {

        //     $file = $_FILES['image'];
        //     $fileName = $file['name'];
        //     $fileTmpName = $file['tmp_name'];
        //     $fileSize = $file["size"];
        // $fileErr = $file["error"];
        // $fileExt = strtolower(end(explode(".", $fileName)));
        // $allowed = ["jpeg", "jpg", "png", "pdf"];


        // $fileNewName = (explode(".", $fileName))[0] . uniqid('', true) . '.' . $fileExt;
        // $fileDest = 'public/' . $fileName;
        // move_uploaded_file($fileTmpName, $fileDest);

    }
}
