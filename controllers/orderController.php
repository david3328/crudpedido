<?php
  if(isset($_SESSION[MY_SESSION])){
    include('views/html/order.html');
  }else{
    header('location:?view=index');
  }
?>