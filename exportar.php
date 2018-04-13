<?php

header("Content-Type: text/csv");
header("Content-Disposition: attachment; filename=file.csv");

function outputCSV($data) {
  $output = fopen("php://output", "w");
  foreach ($data as $row)
    fputcsv($output, $row); // cambiar delimitador
  fclose($output);
}

outputCSV(array(    // reemplazar array los resgitros, realizar nueva consulta a la base de datos
  array("name 1", "age 1", "city 1"),
  array("name 2", "age 2", "city 2"),
  array("name 3", "age 3", "city 3")
));

 ?>