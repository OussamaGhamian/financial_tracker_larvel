<?php
if(!function_exists('sendResponse')){
  function sendResponse( $success , $message , $code , $data , $errors = []){
    return response([
      "success" => $success,
      "message" => $message,
      "code" => $code,
      "data" => $data
  ], $code);
  }
}