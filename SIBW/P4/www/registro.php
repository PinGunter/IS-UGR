<?php
    require_once "/usr/local/lib/php/vendor/autoload.php";
    include ("./bd.php");
    include ("./utils.php");

    $loader = new \Twig\Loader\FilesystemLoader('templates');
    $twig = new \Twig\Environment($loader);


    if ($_SERVER['REQUEST_METHOD'] === 'POST'){
        $datos = array('nombre' => $_POST['nombre'], 'apellidos' => $_POST['apellidos'], 'username' => $_POST['username'], 'email' => $_POST['email'], 'passwd' => $_POST['passwd']);
        $datosValidos = verificarDatosRegistro($datos);
        if ($datosValidos){
            if (registrarUsuario($datos)){
                session_start();
                $_SESSION['username'] = $_POST['username'];
                $_SESSION['falloRegistro'] = false;
                header("Location: index.php");
                exit();
            } else{
                $_SESSION['falloRegistro'] = true;
            }
        } else{
            $_SESSION['datosIncorrectos'] = true;
        }
        
    }

    $fallo = $_SESSION['falloRegistro'];
    $datosIncorrectos = $_SESSION['datosIncorrectos'];

    echo $twig->render('registro.html', ['accion' => 'registro.php', 'usuario' => $usuario, 'fallo' => $fallo, 'datosIncorrectos' => $datosIncorrectos]);
?>