<?php
    require_once "/usr/local/lib/php/vendor/autoload.php";
    include ("./bd.php");

    $loader = new \Twig\Loader\FilesystemLoader('templates');
    $twig = new \Twig\Environment($loader);


    session_start();

    $usuario = []; // valor por defecto

    if (isset($_SESSION['username'])){
        $usuario = getUser($_SESSION['username']);
        if (!($usuario['mod'] || $usuario['super'])){
            echo "No tienes permisos para acceder a esta página";
            exit();
        }
    } else{
        echo "Debes iniciar sesión como moderador para acceder aquí";
        exit();
    }
    
    $comentarios = getAllComentarios();
    
    echo $twig->render('moderacion.html', ['usuario' => $usuario, 'comentarios' => $comentarios, 'borrado' => $_SESSION['borrado']]);
    if ($_SESSION['borrado'] != 0){
        $_SESSION['borrado'] = 0;
    }
?>