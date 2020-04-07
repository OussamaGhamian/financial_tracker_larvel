<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Content-Type: application/json; charset=utf-8');
// echo "ASDA";
// var_dump($_);

if (isset($_FILES['image'])) {

  $file = $_FILES['image'];
  $fileName = $file['name'];
  $fileTmpName = $file['tmp_name'];
  $fileSize = $file["size"];
  $fileErr = $file["error"];
  $fileExt = strtolower(end(explode(".", $fileName)));
  // $allowed = ["jpeg", "jpg", "png", "pdf"];
  if ($fileSize <= 100000000000) {

    // $fileNewName = (explode(".", $fileName))[0] . uniqid('', true) . '.' . $fileExt;
    $fileDest = 'public/images' . $fileName;
    move_uploaded_file($fileTmpName, $fileDest);
  }
}
