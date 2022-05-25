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
        echo "Debes iniciar sesión como gestor para acceder aquí";
        exit();
    }
    
   if (isset($_GET['pid']) && is_numeric($_GET['pid'])){
        if ($_GET['pid'] >= 0){
            $pid = $_GET['pid'];
        }
        else {
            $pid = -1;
        }
   } else{
         $pid = -1;
   }

   if ($pid != -1){
        if (borrarProducto($pid)){
            $_SESSION['borrado_p'] = 2;
            header("Location: gestion.php");
        } else{
            $_SESSION['borrado_p'] = 1;
            header("Location: gestion.php");
        }
   }
?>