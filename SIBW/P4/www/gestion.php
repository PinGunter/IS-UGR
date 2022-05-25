<?php
    require_once "/usr/local/lib/php/vendor/autoload.php";
    include ("./bd.php");

    $loader = new \Twig\Loader\FilesystemLoader('templates');
    $twig = new \Twig\Environment($loader);


    session_start();

    $usuario = []; // valor por defecto

    if (isset($_SESSION['username'])){
        $usuario = getUser($_SESSION['username']);
        if (!($usuario['gestor'] || $usuario['super'])){
            echo "No tienes permisos para acceder a esta página";
            exit();
        }
    } else{
        echo "Debes iniciar sesión como moderador para acceder aquí";
        exit();
    }
    
    $productos = getProductos();
    
    echo $twig->render('gestion.html', ['usuario' => $usuario, 'productos' => $productos, 'borrado' => $_SESSION['borrado_p']]);
    if ($_SESSION['borrado_p'] != 0){
        $_SESSION['borrado_p'] = 0;
    }
?>