<?php
  //verificamos que las peticiones se realicen por POST o GET
  if($_POST or $_GET){
    //requirimos el archivo de configuración
    require('config/core.php');
    //verificamos si existe el parametro mode, si existe toma su valor sino sería nulo
    switch(isset($_GET['mode']) ? $_GET['mode'] : null){
      // si el modo es login, requerimos la función goLogin
      case 'login':
        require('functions/goLogin.php');
        break;
      // modo getAreas, requerimos la función getArea
      case 'getAreas':
        require('functions/getAreas.php');
        break;
      // modo addArea, requerimos la función addArea
      case 'addArea':
        require('functions/addArea.php');
        break;
      // modo deleteArea, requerimos la función deleteArea
      case 'deleteArea':
        require('functions/deleteArea.php');
        break;
      // modo updateArea, requerimos la función updateArea
      case 'updateArea':
        require('functions/updateArea.php');
        break;
      // modo getOrders, requerimos la función getOrders
      case 'getOrders':
        require('functions/getOrders.php');
        break;
      // modo addOrder, requerimos la función addOrder
      case 'addOrder':
        require('functions/addOrder.php');
        break;
      // modo addOrder, requerimos la función addOrder
      case 'updateOrder':
        require('functions/updateOrder.php');
        break;
      case 'updateDetail':
        require('functions/updateDetail.php');
        break;
      case 'getDetails':
        require('functions/getDetails.php');
        break;
      case 'getReport':
        require('functions/getReport.php');
        break;
      // por defecto nos redirige al index.        
      default:
        header('location:index.php');
        break;
    }
  }else{
    header('location:index.php');
  }

?>