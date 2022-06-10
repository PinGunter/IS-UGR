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
    
   if (isset($_GET['id']) && is_numeric($_GET['id'])){
        if ($_GET['id'] >= 0){
            $id = $_GET['id'];
        }
        else {
            $id = -1;
        }
   } else{
         $id = -1;
   }

   if ($id != -1){
        if (borrarComentario($id)){
            $_SESSION['borrado'] = 2;
            header("Location: moderacion.php");
        } else{
            $_SESSION['borrado'] = 1;
            header("Location: moderacion.php");
        }
   }
?>