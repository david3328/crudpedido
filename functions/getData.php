<?php
  // requerimos la clase conexión
  require_once('models/class.Conexion.php');
  // la función recibe un parametro que es la consulta que va a realizar
  function getData($query) {
    // creamos una nueva conexión
    $bd=new Conexion();
    // realizamos la consulta
    $sql = $bd->query($query);
    // si el número de filas obtenidas es mayor a cero, realizo la consulta correctamente
    // en caso no devuelva filas no encontro datos en la consulta realizada 
    if(mysqli_num_rows($sql) > 0){
        // creamos un array el cual devolvera los datos
        $return_array = array();
        //mientras encuentre filas, estas son arreglos que se agregaran al arreglo anterior
        while($row = mysqli_fetch_assoc($sql)){
            array_push($return_array,$row);
        }
        //devolvemos el arreglo
        return $return_array;
        /*
          El arreglo devuelto será del tipo 
          array(
            array(...),
            array(...)
          )
          esto según el número de filas que encuentre
        */ 
    }else{
        return false;
    }
  }
?>