<?php
  //requerimos el archivo execQuery
  require('functions/execQuery.php');
  //verificamos que los datos no estén vacíos.
  if(!empty($_POST['id']) and !empty($_POST['name'])){
    $id =   $_POST['id'];
    $name=  $_POST['name'];
    // verificamos que el id sea númerico
    if(!is_numeric($id)){
      echo 1;
    //verificamos que el nombre no sea númerico
    }else if(is_numeric($name)){
      echo 2;
    }else{
      // realizamos la inserción, si es falsa me da un error 3
      if(!execQuery("INSERT INTO `area`(`number`, `name`) VALUES ('$id','$name')")){
        echo 3;
      }else{
        // el valor 4 indica que se realizo la inserción
        echo 4;
      }
    }
  }else{
    echo 0;
  }

  /*
    0: Datos vacíos
    1: el ID no es número
    2: el nombre es un número
    3: error al insertar
    4: Inserción exitosa
  */
?>