<?php
  //requerimos el archivo getData
  require('functions/getData.php');
  // Realizamos la consulta para buscar los pedidos.
  $id_order = $_POST['id_order'];
  $squery = "SELECT * FROM `order_detail` WHERE id_order = '$id_order'";
  // Ejecutamos la función getData
  $datos=getData($squery);
  // Devuelve la información
  echo json_encode($datos);  
?>