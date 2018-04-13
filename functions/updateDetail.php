<?php
  //requerimos el archivo execQuery
  require('functions/execQuery.php');
  if(
    !empty($_POST['id_detalle']) and 
    !empty($_POST['descripcion']) and 
    !empty($_POST['cantidad']) and 
    !empty($_POST['unidad']) and 
    !empty($_POST['costo_estimado'])
  ){
    $id_detalle     = $_POST['id_detalle'];
    $descripcion    = $_POST['descripcion'];
    $cantidad       = $_POST['cantidad'];
    $unidad         = $_POST['unidad'];
    $costo_estimado = $_POST['costo_estimado'];
    $costo_real     = $_POST['costo_real'];

    if(!execQuery("UPDATE `order_detail` SET `description`='$descripcion',`quantity`='$cantidad',
      `unit`='$unidad',`estimated_cost`='$costo_estimado',`real_cost`='$costo_real'
       WHERE `id`='$id_detalle'")){
        echo 1;
      }else{
        // el valor 4 indica que se realizo la actualización
        echo 2;
      }

  }else{
    echo 0;
  }

?>