<?php
  //requerimos el archivo getData
  require('functions/getData.php');

  //Obtenemos los id de los pedidos
  $id_order =  json_decode($_POST['id_order'],true);
  $sql_id   = "";

  foreach($id_order as $id){
    $sql_id .= $id.',';
  }
  $sql_id = substr($sql_id,0,strlen($sql_id)-1);
  // Realizamos la consulta para buscar los pedidos.
  $squery = "SELECT O.id, O.number, cod_poi, cod_pomdihma, type, order_date, served_date, service_date, area.number as number_area, description, quantity, unit, estimated_cost, real_cost 
  from order_detail 
  inner join `order` O on O.id = order_detail.id_order
  inner join area on area.id = O.id_area
  where O.id in ($sql_id)";
  // Ejecutamos la función getData
  $datos=getData($squery);
  // Devuelve la información
  echo json_encode($datos);
  
?>

