<?php
  //requerimos el archivo execQuery
  require('functions/execQuery.php');
  require('functions/getData.php');
  //verificamos que los datos no estén vacíos.
  if( !empty($_POST['area_id']) and 
      !empty($_POST['cod_pomdihma']) and
      !empty($_POST['cod_ppto']) and
      !empty($_POST['fecha']) and
      !empty($_POST['npedido']) and
      !empty($_POST['tipo']) and
      !empty($_POST['detalles']) and 
      !empty($_POST['seguimiento']) 
    ){
    $area_id        =  $_POST['area_id'];
    $cod_pomdihma   =  $_POST['cod_pomdihma'];
    $cod_ppto       =  $_POST['cod_ppto'];
    $detalles       =  json_decode($_POST['detalles'],true);
    $fecha          =  $_POST['fecha'];
    $npedido        =  $_POST['npedido'];
    $tipo           =  $_POST['tipo'];
    $seguimiento    =  $_POST['seguimiento'];
    // verificamos que el id sea númerico
    if(!is_numeric($npedido)){
      echo 1;
    //verificamos que el nombre no sea númerico
    }else if(is_numeric($tipo)){
      echo 2;
    }else{
      // realizamos la inserción, si es falsa me da un error 3
      if(!execQuery("INSERT INTO `order`( `number`,`cod_poi`,`cod_pomdihma`,`type`,`order_date`,`id_area`,`tracing`) 
                    VALUES ('$npedido','$cod_ppto','$cod_pomdihma','$tipo','$fecha','$area_id','$seguimiento')"))
      {
        echo 3;
      }else{
        // el valor 4 indica que se realizo la inserción
        $id_order = getData("SELECT id FROM `order` WHERE number = '$npedido'")[0]["id"];      
        foreach($detalles as $detalle){
          $descripcion    = $detalle["description"];
          $cantidad       = $detalle["quantity"];
          $unidad         = $detalle["unit"];
          $costo_estimado = $detalle["estimated_cost"];
          $costo_real     = $detalle["real_cost"];
          execQuery("INSERT INTO `order_detail` (`id_order`,`description`,`quantity`,`unit`,`estimated_cost`,`real_cost`)
                    VALUES ('$id_order','$descripcion','$cantidad','$unidad','$costo_estimado','$costo_real')");
        }
        echo 4;
      }
    }
  }else{
    echo 0;
  }

  /*
    0: Datos vacíos
    1: datos no númericos(deberían ser númericos)
    2: datos númericos (no deben ser númericos)
    3: error al insertar
    4: Inserción exitosa
  */
?>