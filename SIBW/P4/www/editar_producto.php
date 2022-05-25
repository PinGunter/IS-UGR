<?php
    require_once "/usr/local/lib/php/vendor/autoload.php";
    include ("./bd.php");

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
 
    session_start();
    $usuario = [];

    if (isset($_SESSION['username'])){
        $usuario = getUser($_SESSION['username']);
        if (!($usuario['gestor'] || $usuario['super'])){
            echo "No tienes permisos para acceder a esta página";
            exit();
        }
    } else{
        echo "Debes iniciar sesión como moderador para acceder aquí";
        exit();
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST'){
        $nombre = $_POST['nombre'];
        $marca = $_POST['marca'];
        $precio = $_POST['precio'];
        $descripcion = $_POST['desc'];
        $etiquetas = $_POST['etiquetas'];
        $datos = array('pid' => $pid, 'nombre' => $nombre, 'id_marca' => $marca, 'precio' => $precio, 'descripcion' => $descripcion, 'id_e' => $etiquetas);
        if (isset($_FILES['imgs']['name'])){
            if (!empty($_FILES['imgs']['name'][0])){
                $imgs = $_FILES['imgs'];
                for ($i = 0; $i < sizeof($imgs['name']); $i++){
                    $img = $imgs['name'][$i];
                    $img_tmp = $imgs['tmp_name'][$i];
                    $img_size = $imgs['size'][$i];
                    $img_type = $imgs['type'][$i];
                    $img_ext = strtolower(end(explode('.',$imgs['name'][$i])));
                    $extensions= array("jpeg","jpg","png");
                    if (in_array($img_ext,$extensions) === false){
                        $errors[] = "IMG:" . $img . "Extensión no permitida, elige una imagen JPEG, PNG o GIF.";
                    }
                    if ($img_size > 2097152){
                        $errors[] =  "IMG:" . $img .  "Tamaño del fichero demasiado grande";
                    }
                    if (empty($errors) == true){
                        $fecha = new DateTime();
                        $newImg = "static/img/uploads/". 'upload_' . $fecha->getTimestamp().'_' . preg_replace("/\s+/", "", $img);
                        move_uploaded_file($img_tmp, $newImg);
                        $newDBImgs []= $newImg;
                    }
                }
            }
        }


        if (!empty($_FILES['icono']['name'])){
            $icono = $_FILES['icono'];
            $icon = $icono['name'];
            $icon_tmp = $icono['tmp_name'];
            $icon_size = $icono['size'];
            $icon_type = $icono['type'];
            $icon_ext = strtolower(end(explode('.',$icono['name'])));
            $extensions= array("jpeg","jpg","png");
            if (in_array($icon_ext,$extensions) === false){
                $errors[] = "ICONO:" . $icon . "Extensión no permitida, elige una imagen JPEG, PNG o GIF.";
            }
            if ($img_size > 2097152){
                $errors[] =  "ICONO:" . $icon .  "Tamaño del fichero demasiado grande";
            }
            if (empty($errors) == true){
                $fecha = new DateTime();
                $newImg = "static/img/uploads/". 'upload_' . $fecha->getTimestamp().'_' . $icon;
                move_uploaded_file($icon_tmp, $newImg);
                $datos['icono'] = $newImg;
            }
        }

        // que no sean vacíos
        if (empty($nombre) || empty($marca) || empty($precio) || empty($descripcion)){
            $errors[] = "Debes rellenar todos los campos";
        } else{
            if (editarProducto($datos, $newDBImgs)){
                $msgExito []= "Producto editado correctamente";
            } else{
                $errors[] = "Error al editar el producto, ¿hay algún campo vacío?";
            }
        }

    }

    $producto = getProducto($pid);
    $marcas = getMarcas();
    $etiquetas = getEtiquetas();
    $etiquetasProducto = getEtiquetasProducto($pid);

    echo $twig->render('editar_producto.html', ['usuario' => $usuario, 'producto' => $producto, 'marcas' => $marcas, 'etiquetas' => $etiquetas,'etiquetasProducto' => $etiquetasProducto, 'exitos' => $msgExito, 'errors' => $errors]);
?>