<?php 
/*
 Creamos la clase conexion, modificando el contructor para hacer la conexion
 le pasamos los parametros HOST, USER_NAME, PASS, BD_NAME
 los valores de estos estan en el archiv config/core.php, que ya se incluyen en el index del proyecto
*/
  class Conexion extends Mysqli {
    public function __construct() {
      parent::__construct(HOST, USER_NAME, PASS, BD_NAME);
      $this-> connect_error  ? die('error al conectar'):'';
    }
  }
 ?>