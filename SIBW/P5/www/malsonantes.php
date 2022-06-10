<?php
    include ("./bd.php");
    $malsonantes = getPalabrasFeas();
    echo json_encode($malsonantes);
?>