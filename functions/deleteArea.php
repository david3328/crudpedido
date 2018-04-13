<?php
  //requerimos el archivo execQuery
  require('functions/execQuery.php');
  //verificamos que los datos no estén vacíos.
  if(!empty($_POST['id'])){
    $id = $_POST['id'];  // asignamos a la variable id el id recibido por la petición post
    // realizamos la eliminación, si es falsa me da un error 1
    if(!execQuery("DELETE FROM `area` WHERE number= $id ")){
      echo 1;
    }else{
      echo 2;
    }
  }else{
    echo 0;
  }
  /*
    0 : Datos vacíos
    1 : Error al eliminar
    2 : Eliminación realizada
  */
?>