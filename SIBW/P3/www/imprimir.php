<?php
    require_once "/usr/local/lib/php/vendor/autoload.php";
    include ("./bd.php");

    $loader = new \Twig\Loader\FilesystemLoader('templates');
    $twig = new \Twig\Environment($loader);

    
    if (isset($_GET['pid'])){
        $pid = $_GET['pid'];
    } else{
        $pid = -1;
    }
    
    // informacion del producto
    $producto = getProducto($pid);

    // imagenes del producto
    $imgs = getImgs($pid);

    // if ($producto['nombre'] === ""){
    //     echo $twig->render('404.html', []);
    //     exit();
    // } 
    echo $twig->render('imprimir.html', ['producto' => $producto, 'imagenes' => $imgs]);
?>