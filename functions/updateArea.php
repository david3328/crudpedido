<?php
  //requerimos el archivo execQuery
  require('functions/execQuery.php');
  //verificamos que los datos no estén vacíos.
  if(!empty($_POST['id']) && !empty($_POST['name']) && !empty($_POST['oldId'])){
    $oldId= $_POST['oldId']; // asignamos a la variable oldId la antigua id recibida por la petición post 
    $id =   $_POST['id'];  // asignamos a la variable id el id recibido por la petición post
    $name = $_POST['name']; // asignamos a la variable name el nombre recibidio por la petición post

    // verificamos que el id sea númerico
    if(!is_numeric($id)){
      echo 1;
    //verificamos que el nombre no sea númerico
    }else if(is_numeric($name)){
      echo 2;
    }else{
      // realizamos la actualización, si es falsa me da un error 3
      if(!execQuery("UPDATE `area` SET `number`='$id',`name`='$name' WHERE number=$oldId ")){
        echo 3;
      }else{
        // el valor 4 indica que se realizo la actualización
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
    3: error al actualizar
    4: actualización exitosa
  */
?>