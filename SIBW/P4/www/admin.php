<?php
    require_once "/usr/local/lib/php/vendor/autoload.php";
    include ("./bd.php");

    $loader = new \Twig\Loader\FilesystemLoader('templates');
    $twig = new \Twig\Environment($loader);


    session_start();

    $usuario = []; // valor por defecto

    if (isset($_SESSION['username'])){
        $usuario = getUser($_SESSION['username']);
        if (!$usuario['super']){
            echo "No tienes permisos para acceder a esta página";
        }else{
            echo $twig->render('admin.html', ['usuario' => $usuario]);
        }
    } else{
        echo "Debes iniciar sesión como superusuario para acceder aquí";
    }

?>