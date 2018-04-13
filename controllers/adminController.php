<?php
  if(isset($_SESSION[MY_SESSION])){
    include('views/html/admin.html');
  }else{
    header('location:?view=index');
  }
?>