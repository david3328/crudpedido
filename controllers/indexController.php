<?php
 /*
    verificamos que exista una sesión ( debemos recordad que tenemos un sesion_star en el index del proyecto)
    de existir la sesión redirigimos a la vista administrador
      * debemos recordar que las vistas las controlamos con el parametro view
    si no existe la sesión tenemos acceso a la vista index.
 */
  if(!isset($_SESSION[MY_SESSION])){
    /*
    Realizamos el include del archivo html
    Aunque este archivo se encuentra en la carpeta controllers, se realiza la llamada desde el index del proyecto
    por lo tanto al llamar a la vista index (index.html) tenemos que tomar como referencia la raíz del proyecto
    por eso al llamar la ruta sería views/html/index.html
    */
    include('views/html/index.html');
  }else{
    header ('location:?view=admin');
  }
?>