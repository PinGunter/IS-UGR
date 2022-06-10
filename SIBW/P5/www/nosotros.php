<?php
    require_once "/usr/local/lib/php/vendor/autoload.php";
    include ("./bd.php");

    $loader = new \Twig\Loader\FilesystemLoader('templates');
    $twig = new \Twig\Environment($loader);


    $productos = getProductos();

    session_start();

    $usuario = []; // valor por defecto

    if (isset($_SESSION['username'])){
        $usuario = getUser($_SESSION['username']);
    }

    echo $twig->render('nosotros.html', ['productos' => $productos, 'usuario' => $usuario]);
?>