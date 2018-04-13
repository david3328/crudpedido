<?php
//recupera la sesiones mientras navegamos 
session_start();
//obtenemos la configuración donde encontramos valores ya definidos
//usamos el require, lo que me permite que si no se encuentra el archivo el programa no continua (lo que lo diferencia del include que sí continua)
require('config/core.php');

/*
El condicional me permite controlar las rutas con sus respectivos controladores
* a traves del paramaetro view que viaja en la url (?view='') verificamos a que ruta se dirige el usuario
Ejemplo 
    localhost/crudpedido?view='administrador'  - se dirigre a la vista administrador
* file_exists verifica que exista el controlador, sino lo manda a un error 404 (erroController)
* si existe lo dirige a su controlador para las verificaciones necesarias. 
* en caso no exista el parametro 'view' este lo dirige por defecto al index
Por ejemplo: 
    localhost/crudpedido  -> se va al indexController
*/
if(isset($_GET['view'])){
    /* strtolower para que cualquier valor ingresado por el parametro view sea convertido a minusculas */ 
    if(file_exists('controllers/'.strtolower($_GET['view']).'Controller.php')){
        include('controllers/'.strtolower($_GET['view']).'Controller.php');
    }else{
        include('controllers/errorController.php');
    }
}else{
    include('controllers/indexController.php');
}

/*
Nota: debemos recordar que al hacer un include o require ( el código se incluye dentro del archivo)
      Por lo tanto a cualquier archivo tenemos que tomar referencia esta ruta
*/ 

?>
