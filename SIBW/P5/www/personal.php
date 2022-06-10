<?php
    require_once "/usr/local/lib/php/vendor/autoload.php";
    include ("./bd.php");
    include("./utils.php");

    $loader = new \Twig\Loader\FilesystemLoader('templates');
    $twig = new \Twig\Environment($loader);


    session_start();

    $usuario = []; // valor por defecto
    if (isset($_SESSION['username'])){
        $usuario = getUser($_SESSION['username']);
    } else{
        echo "Debes iniciar sesión para acceder aquí";
        exit();
    }


    if ($_SERVER['REQUEST_METHOD'] === 'POST'){
        $datosIncorrectos = 0;
        $datos = array('nombre' => $_POST['nombre'],
                       'apellidos' => $_POST['apellidos'], 
                       'email' => $_POST['email'], 
                       'passwd' => $_POST['password'],
                       'passwd2' => $_POST['password-confirm']);
        $valido = verificarDatosUpdate($datos);
        if ($valido){ // si los datos son correctos (formato y contraseñas iguales)
            if (actualizarDetalles($usuario['nick'], $datos)){ // comprobar si falla al insertar
                $_SESSION['falloUpdate'] = false;
                $_SESSION['datosIncorrectos'] = 2;
                $datosIncorrectos = 2;
                if (isset($_POST['password'])){
                    if (isset($_POST['password-confirm'])){
                        if (!empty($_POST['password'] && !empty($_POST['password-confirm']))){
                            if ($_POST['password'] === $_POST['password-confirm']){
                                $pass = password_hash($_POST['password'], PASSWORD_DEFAULT);
                                if (actualizarPassword($usuario['nick'], $pass)){
                                    $_SESSION['falloUpdate'] = false;
                                    $_SESSION['datosIncorrectos'] = 2;
                                    $datosIncorrectos = 2;
                                } else{
                                    $_SESSION['falloUpdate'] = true;
                                    $_SESSION['datosIncorrectos'] = 1;
                                    $datosIncorrectos = 1;
                                }   
                            } else{
                                $_SESSION['falloUpdate'] = true;
                                $_SESSION['datosIncorrectos'] = 1;
                                $datosIncorrectos = 1;
                            }
                        }
                    }else{
                        $_SESSION['falloUpdate'] = true;
                        $_SESSION['datosIncorrectos'] = 1;
                        $datosIncorrectos = 1;
                }
            }

            } else{ // falla al actualizar la bd
                $_SESSION['falloUpdate'] = true;

            }


        } else{
            $_SESSION['datosIncorrectos'] = 1;
            $datosIncorrectos = 1;
        }
    }else{
        unset($_SESSION['falloUpdate']);
        $datosIncorrectos = 0;
    }

    $falloUpdate = $_SESSION['falloUpdate'];
    //actualizamos los datos del usuario
    $usuario = getUser($_SESSION['username']);

    echo $twig->render('personal.html', ['usuario' => $usuario, 'fallo' => $falloUpdate, 'datosIncorrectos' => $datosIncorrectos]);

?>