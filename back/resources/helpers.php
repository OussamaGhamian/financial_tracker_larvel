<?php
if(!function_exists('sendResponse')){
  function sendResponse( $success, $code , $data , $errors = []){
    return response([
      "success" => $success,
      "code" => $code,
      "data" => $data,
      "error(s)" => $errors,
  ]);
  }
}