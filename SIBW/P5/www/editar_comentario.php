<?php
    require_once "/usr/local/lib/php/vendor/autoload.php";
    include ("./bd.php");

    $loader = new \Twig\Loader\FilesystemLoader('templates');
    $twig = new \Twig\Environment($loader);

    
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
 
    session_start();

    $usuario = [];

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

    if ($_SERVER['REQUEST_METHOD'] === 'POST'){
        $nuevoTexto = $_POST['nuevo-comment'];
        if (!empty($nuevoTexto)){
            $nuevoComment = 'Editado por un moderador'.': '.$nuevoTexto;
            if (editarComentario($id, $nuevoComment)){
                $_SESSION['editado'] = 2;
            } else{
                $_SESSION['editado'] = 1;
            }
        } else{
            $_SESSION['editado'] = 3;
        }
    }

    $comentario = getComentario($id);

    echo $twig->render('editar_comentario.html', ['usuario' => $usuario, 'comentario' => $comentario, 'editado' => $_SESSION['editado']]);
    
    if ($_SESSION['editado'] != 0){
        $_SESSION['editado'] = 0;
    }
?>