<?php
  //requerimos el archivo getData
  require('functions/getData.php');
  // Realizamos la consulta para buscar los pedidos.
  $squery = "SELECT O.id, O.number, cod_poi, cod_pomdihma, type, order_date, served_date, service_date, tracing, area.id as id_area, area.number as number_area ,area.name as name_area from `order` O
  inner JOIN area on area.id = O.id_area order by O.id";
  // Ejecutamos la función getData
  $datos=getData($squery);
  // Devuelve la información
  echo json_encode($datos);
  
?>