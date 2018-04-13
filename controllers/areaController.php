<?php
  if(isset($_SESSION[MY_SESSION])){
    include('views/html/area.html');
  }else{
    header('location:?view=index');
  }
?>