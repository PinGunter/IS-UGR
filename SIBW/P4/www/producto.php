<?php
    require_once "/usr/local/lib/php/vendor/autoload.php";
    include ("./bd.php");
    include("./utils.php");

    $loader = new \Twig\Loader\FilesystemLoader('templates');
    $twig = new \Twig\Environment($loader);

    
     
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
    
    // informacion del producto
    $producto = getProducto($pid);

    // imagenes del producto
    $imgs = getImgs($pid);

    // comentarios
    $comentarios = getComentarios($pid);

    //palabras feas
    $malsonantes = getPalabrasFeas();

    // etiquetas
    $etiquetas = getEtiquetasNombre($pid);
    
    if ($producto['nombre'] === ""){
        echo $twig->render('404.html', []);
        exit();
    } 


    session_start();

    $usuario = [];

    if (isset($_SESSION['username'])){
        $usuario = getUser($_SESSION['username']);

        if ($_SERVER['REQUEST_METHOD'] === 'POST'){
            $comentario = $_POST['comentario'];
            $valido = !empty($comentario);
            $comentario = censurar($comentario, $malsonantes);
            if ($valido){
                if (registrarComentario($pid, $comentario, $usuario)){
                    $_SESSION['comentarioVacio'] = false;
                    $_SESSION['falloGuardarComentario'] = false;
                    header("Location: producto.php?pid=$pid");
                    exit();
                } else{
                    $_SESSION['falloGuardarComentario'] = true;
                }
            } else{
                $_SESSION['comentarioVacio'] = true;
            }
        }
    }

    $falloGuardarComentario = $_SESSION['falloGuardarComentario'];
    $comentarioVacio = $_SESSION['comentarioVacio'];

    echo $twig->render('producto.html', ['producto' => $producto, 'etiquetas' => $etiquetas, 'imagenes' => $imgs, 'comentarios' => $comentarios, 'usuario' => $usuario, 'falloGuardarComentario' => $falloGuardarComentario, 'comentarioVacio' => $comentarioVacio]);
?>