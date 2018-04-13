<?php
  //requerimos el archivo execQuery
  require('functions/execQuery.php');
  //verificamos que los datos no estén vacíos.
  if( !empty($_POST['area_id']) and 
      !empty($_POST['cod_pomdihma']) and
      !empty($_POST['cod_ppto']) and
      !empty($_POST['fecha']) and
      !empty($_POST['fecha_atendido']) and
      !empty($_POST['fecha_pc']) and
      !empty($_POST['npedido']) and
      !empty($_POST['tipo']) and
      !empty($_POST['seguimiento'])
    ){
    $area_id        =  $_POST['area_id'];
    $cod_pomdihma   =  $_POST['cod_pomdihma'];
    $cod_ppto       =  $_POST['cod_ppto'];
    $fecha          =  $_POST['fecha'];
    $fecha_atendido =  $_POST['fecha_atendido'];
    $fecha_pc       =  $_POST['fecha_pc'];
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
      // realizamos la actualización, si es falsa me da un error 3
      if(!execQuery("UPDATE `order` SET `id_area`='$area_id',`tracing`='$seguimiento',
      `type`='$tipo',`cod_poi`='$cod_ppto',`cod_pomdihma`='$cod_pomdihma',
      `order_date`='$fecha',`served_date`='$fecha_atendido',`service_date`='$fecha_pc' WHERE `number`='$npedido'")){
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