<?php
    require_once "/usr/local/lib/php/vendor/autoload.php";
    include ("./bd.php");
    include ("./utils.php");

    $loader = new \Twig\Loader\FilesystemLoader('templates');
    $twig = new \Twig\Environment($loader);



    if ($_SERVER['REQUEST_METHOD'] === 'POST'){
        $username = $_POST['username'];
        $pass = $_POST['passwd'];
        $valido = verificarDatosLogin(['username' => $username, 'passwd' => $pass]);
        if ($valido){
            if (checkLogin($username, $pass)){
                session_start();
                $_SESSION['username'] = $username;
                $_SESSION['falloLogin'] = false;
                header("Location: index.php");
                exit();

            } else{
                $_SESSION['falloLogin'] = true;
            }
        } else{
            $_SESSION['datosIncorrectos'] = true;
        }
    }

    $fallo = $_SESSION['falloLogin'];
    $datosIncorrectos = $_SESSION['datosIncorrectos'];
    

    echo $twig->render('login.html', ['accion' => 'login.php', 'fallo' => $fallo, 'datosIncorrectos' => $datosIncorrectos]);
?>