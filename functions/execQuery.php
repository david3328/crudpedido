<?php
  // requerimos la clase conexión
  require_once('models/class.Conexion.php');
  // la función recibe un parametro que es la consulta que va a realizar
  function execQuery($query) {
    // creamos una nueva conexión
    $bd=new Conexion();
    // realizamos la consulta
    $sql = $bd->query($query);
    //Sí hay filas afectadas >0 devuelve un true, que nos indica que se realizo la inserción
    //De caso contrario nos devuelve un false, que indica que no se realizo
    if($bd->affected_rows>0){
      return true;
    }else{
      return false;
    }
  }

  /*
    La función execQuery:
    Inserta un dato,
    Elimina un dato,
  */
?>