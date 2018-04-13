<?php
  //requerimos el archivo getData
  require('functions/getData.php');

  //verificamos que los datos no estén vacíos.
  if(!empty($_POST['user']) and !empty($_POST['pass'])){
    $user = $_POST['user']; // asignamos a la variable user el valor user recibido mediante petición POST
    $pass = $_POST['pass']; // asignamos a la variable pass el valor pass recibido mediante petición POST
    // Realizamos la consulta para buscar el usuario.
    $squery = "SELECT username, password FROM user WHERE username='$user' and password='$pass'";
    // Ejecutamos la función getData
    $datos=getData($squery);
    // Si encuentra datos crea la sesión
    if($datos){
      session_start();
      //guardamos los datos obtenidos en la sesión
      $_SESSION[MY_SESSION] = $datos;
      // devolvemos un valor tipo 1 
      echo 1;
    }else{
      // de no encontrar datos devolvemos el valor tipo 2
      echo 2;
    }
  }else{
    echo 0;
  }

  /*
    para controlar los tipos de errores realizamos un echo que será recibido por el AJAX en index.js
    0 : los valores se encuentran vacíos.
    1 : la conexión se realizo correctamente
    2 : la consulta devolvió un error (usuario o password incorrecto) 
  */
?>