<?php
    require_once "/usr/local/lib/php/vendor/autoload.php";
    include ("./bd.php");

    $loader = new \Twig\Loader\FilesystemLoader('templates');
    $twig = new \Twig\Environment($loader);


    session_start();

    $usuario = []; // valor por defecto

    if (isset($_SESSION['username'])){
        $usuario = getUser($_SESSION['username']);
        if (!$usuario['super']){
            echo "No tienes permisos para acceder a esta página";
            exit();
        }
    } else{
        echo "Debes iniciar sesión como superusuario para acceder aquí";
        exit();
    }

    $usuarios = getUsers();

    if ($_SERVER['REQUEST_METHOD'] === 'POST'){
        if ($usuario['super']){
            for ($i=0; $i < count($usuarios); $i++){
                $permisoMod = $usuarios[$i]['nick'].'-perm-mod';
                $permisoGestor = $usuarios[$i]['nick'].'-perm-gestor';
                $permisoSuper = $usuarios[$i]['nick'].'-perm-super';

                $mod = false;
                $gestor = false;
                $super = false;

                if (isset($_POST[$permisoMod])){
                    $mod = true;
                } else{
                    $mod = false;
                }
                
                if (isset($_POST[$permisoGestor])){
                    $gestor = true;
                } else{
                    $gestor = false;
                }

                if (isset($_POST[$permisoSuper]) ){
                    $super = true;
                } else{
                    $super = false;
                }

                if ($usuarios[$i]['nick'] === $usuario['nick'])
                    $super = true;

                if (actualizarPermisos($usuarios[$i]['nick'], $mod, $gestor, $super)){
                    $exito = "Permisos actualizados correctamente";
                } else{
                    $error = "Error al actualizar los permisos";
                }
            }
        } else{
            echo "No tienes permisos para realizar esta petición";
            exit();
        }
    }
    // hay que obtenerlos de nuevo, con los permisos actualizados
    $usuarios = getUsers();

    echo $twig->render('admin.html', ['usuario' => $usuario, 'usuarios' => $usuarios, 'exito' => $exito, 'error' => $error]);

?>