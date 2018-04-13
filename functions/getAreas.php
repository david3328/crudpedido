<?php
  //requerimos el archivo getData
  require('functions/getData.php');
  // Realizamos la consulta para buscar las areas.
  $squery = "SELECT * FROM area";
  // Ejecutamos la función getData
  $datos=getData($squery);
  // Devuelve la información
  echo json_encode($datos);
  
?>