<?php
    include("./bd.php");

    if (isset($_GET['query'])){
        $query = $_GET['query'];
    } else{
        $query = "";
    }

    session_start();

    $usuario = []; // valor por defecto

    if (isset($_SESSION['username'])){
        $usuario = getUser($_SESSION['username']);
    }

    if (!empty($query)){
        echo(json_encode(search($usuario, $query)));
    }
?>