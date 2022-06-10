<?php

    $mysqli = NULL;

    // conectamos con la base de datos una unica vez
    function conectarBD(){
        global $mysqli;

        if ($mysqli == NULL or $mysqli->ping() == false){
            $mysqli = new mysqli ("mysql", "fruity_user", "!RO1MjRTR9Mc[n.Y", "fruity_db");
        
            if ($mysqli->connect_errno){
                echo ("Fallo al conectar: " . $mysqli->connect_error);
            }
        }

    }

    function getProducto($pid){
        global $mysqli;
        conectarBD();
        // prepared statement, stage 1: prepare
        if (!($stmt = $mysqli->prepare("SELECT productos.nombre, precio, descripcion, productos.id, marcas.nombre nombre_marca, publicado  FROM productos, marcas WHERE productos.id = ? and productos.id_marca = marcas.id"))) {
            echo "Falló la preparación: (" . $mysqli->errno . ") " . $mysqli->error;
        }
        // prepared statement, stage 2: bind and execute
        if (!$stmt->bind_param("i", $pid)) {
            echo "Falló la vinculación de parámetros: (" . $stmt->errno . ") " . $stmt->error;
        }
        if (!$stmt->execute()) {
            echo "Falló la ejecución: (" . $stmt->errno . ") " . $stmt->error;
        }

        $res = $stmt->get_result();

        // array por defecto
        $producto = array('nombre' => '', 'precio' => '', 'descripcion' => '', 'nombre_marca' => '', 'id' => '');

        if ($res->num_rows > 0){
            $row = $res->fetch_assoc();
            $nombre = $row["nombre"];
            $precio = $row["precio"];
            $marca = $row["nombre_marca"];
            $descripcion = $row["descripcion"];
            $id = $row["id"];
            $publicado = $row["publicado"];

            // cuando sea valido
            $producto = array('nombre' => $nombre, 'precio' => $precio, 'descripcion' => $descripcion, 'marca' => $marca, 'id' => $id, 'publicado' => $publicado);
        }
        return $producto;
    }

    function getImgs($pid){
        global $mysqli;
        conectarBD();
        // prepared statement, stage 1: prepare
        if (!($stmt = $mysqli->prepare("SELECT ruta, pie FROM imagenes WHERE imagenes.id_producto = ?"))) {
            echo "Falló la preparación: (" . $mysqli->errno . ") " . $mysqli->error;
        }
        // prepared statement, stage 2: bind and execute
        if (!$stmt->bind_param("i", $pid)) {
            echo "Falló la vinculación de parámetros: (" . $stmt->errno . ") " . $stmt->error;
        }
        if (!$stmt->execute()) {
            echo "Falló la ejecución: (" . $stmt->errno . ") " . $stmt->error;
        }

        $res = $stmt->get_result();

        // array por defecto
        $img = array();

        while ($row = $res->fetch_assoc()){
            $ruta = $row["ruta"];
            $pie = $row["pie"];
          
            // cuando sea valido
            $img[]= array('ruta' => $ruta, 'pie' => $pie);
        }
        return $img;
    }

    function getComentario($id){
        global $mysqli;
        conectarBD();
        // prepared statement, stage 1: prepare
        if (!($stmt = $mysqli->prepare("SELECT * FROM comentarios WHERE id = ?"))) {
            echo "Falló la preparación: (" . $mysqli->errno . ") " . $mysqli->error;
        }
        // prepared statement, stage 2: bind and execute
        if (!$stmt->bind_param("i", $id)) {
            echo "Falló la vinculación de parámetros: (" . $stmt->errno . ") " . $stmt->error;
        }
        if (!$stmt->execute()) {
            echo "Falló la ejecución: (" . $stmt->errno . ") " . $stmt->error;
        }

        $res = $stmt->get_result();

        // array por defecto
        $comentarios = array();

        if ($row = $res->fetch_assoc()){
            $id = $row["id"];
            $autor = $row["autor"];
            $fecha = $row["fecha"];
            $cuerpo = $row["cuerpo"];
            $comentarios= array('autor' => $autor, 'fecha' => $fecha, 'cuerpo' => $cuerpo, 'id' => $id);
        }
        return $comentarios;
    }

    function getComentarios($pid){
        global $mysqli;
        conectarBD();
        // prepared statement, stage 1: prepare
        if (!($stmt = $mysqli->prepare("SELECT * FROM comentarios WHERE id_producto = ? ORDER BY fecha DESC"))) {
            echo "Falló la preparación: (" . $mysqli->errno . ") " . $mysqli->error;
        }
        // prepared statement, stage 2: bind and execute
        if (!$stmt->bind_param("i", $pid)) {
            echo "Falló la vinculación de parámetros: (" . $stmt->errno . ") " . $stmt->error;
        }
        if (!$stmt->execute()) {
            echo "Falló la ejecución: (" . $stmt->errno . ") " . $stmt->error;
        }

        $res = $stmt->get_result();

        // array por defecto
        $comentarios = array();

        while ($row = $res->fetch_assoc()){
            $id = $row["id"];
            $autor = $row["autor"];
            $fecha = $row["fecha"];
            $cuerpo = $row["cuerpo"];
            $comentarios[]= array('autor' => $autor, 'fecha' => $fecha, 'cuerpo' => $cuerpo, 'id' => $id);
        }
        return $comentarios;
    }

    function getProductos(){
        global $mysqli;
        conectarBD();
        // prepared statement, stage 1: prepare
        if (!($stmt = $mysqli->prepare("SELECT id, nombre, icono, publicado from productos"))) {
            echo "Falló la preparación: (" . $mysqli->errno . ") " . $mysqli->error;
        }
        // prepared statement, stage 2: bind and execute
        if (!$stmt->execute()) {
            echo "Falló la ejecución: (" . $stmt->errno . ") " . $stmt->error;
        }

        $res = $stmt->get_result();

        // array por defecto
        $productos = array();

        while ($row = $res->fetch_assoc()){
            $id = $row["id"];
            $nombre = $row["nombre"];
            $icono = $row["icono"];
            $publicado = $row["publicado"];

            // cuando sea valido
            $productos[]= array('id' => $id, 'nombre' => $nombre, 'icono' => $icono, 'publicado' => $publicado);
        }
        return $productos;
    }

    function getPalabrasFeas(){
        global $mysqli;
        conectarBD();
        // prepared statement, stage 1: prepare
        if (!($stmt = $mysqli->prepare("SELECT palabra FROM malsonantes"))) {
            echo "Falló la preparación: (" . $mysqli->errno . ") " . $mysqli->error;
        }
        // prepared statement, stage 2: bind and execute
        if (!$stmt->execute()) {
            echo "Falló la ejecución: (" . $stmt->errno . ") " . $stmt->error;
        }

        $res = $stmt->get_result();

        // array por defecto
        $palabras = array();

        while ($row = $res->fetch_assoc()){
            $palabra = $row["palabra"];

            // cuando sea valido
            $palabras[]= $palabra;
        }
        return $palabras;
    }

    function checkLogin($username, $pass){
        global $mysqli;
        conectarBD();
        // prepared statement, stage 1: prepare
        if (!($stmt = $mysqli->prepare("SELECT nick, pass FROM usuario WHERE nick = ?"))) {
            echo "Falló la preparación: (" . $mysqli->errno . ") " . $mysqli->error;
        }
        // prepared statement, stage 2: bind and execute
        if (!$stmt->bind_param("s", $username)) {
            echo "Falló la vinculación de parámetros: (" . $stmt->errno . ") " . $stmt->error;
        }
        if (!$stmt->execute()) {
            echo "Falló la ejecución: (" . $stmt->errno . ") " . $stmt->error;
        }

        $res = $stmt->get_result();

        if ($res->num_rows > 0){
            $row = $res->fetch_assoc();
            $username = $row["nick"];
            $password = $row["pass"];

        }
        
        if (password_verify($pass, $password)){
            return true;
        }

        return false;
    }

    function getUser($username){
        global $mysqli;
        conectarBD();
        // prepared statement, stage 1: prepare
        if (!($stmt = $mysqli->prepare("SELECT nick, nombre, apellidos, email, moderador, gestor, super  FROM usuario WHERE nick=?"))) {
            echo "Falló la preparación: (" . $mysqli->errno . ") " . $mysqli->error;
        }
        // prepared statement, stage 2: bind and execute
        if (!$stmt->bind_param("s", $username)) {
            echo "Falló la vinculación de parámetros: (" . $stmt->errno . ") " . $stmt->error;
        }
        if (!$stmt->execute()) {
            echo "Falló la ejecución: (" . $stmt->errno . ") " . $stmt->error;
        }

        $res = $stmt->get_result();

        // array por defecto
        $usuario = array('nick' => '', 'nombre' => '', 'apellidos' => '', 'email' => '', 'mod' => '', 'gestor' => '', 'super' => '');

        if ($res->num_rows > 0){
            $row = $res->fetch_assoc();
            $nick = $row["nick"];
            $nombre = $row["nombre"];
            $apellidos = $row["apellidos"];
            $email = $row["email"];
            $mod = $row["moderador"];
            $gestor = $row["gestor"];
            $super = $row["super"];

            // cuando sea valido
            $usuario = array('nick' => $nick, 'nombre' => $nombre, 'apellidos' => $apellidos, 'email' => $email, 'mod' => $mod, 'gestor' => $gestor, 'super' => $super);
        }
        return $usuario;
    }

    function registrarUsuario($datos){
        global $mysqli;
        conectarBD();
        if (!($stmt = $mysqli->prepare("INSERT INTO usuario (nombre, apellidos, nick, email, pass, moderador, gestor, super) VALUES (?,?,?,?,?, 0,0,0)"))){
            echo "Falló la preparación: (" . $mysqli->errno . ") " . $mysqli->error;
        }

        $pass = password_hash($datos['passwd'], PASSWORD_DEFAULT);

        if (!$stmt->bind_param("sssss", $datos['nombre'], $datos['apellidos'], $datos['username'], $datos['email'], $pass)) {
            echo "Falló la vinculación de parámetros: (" . $stmt->errno . ") " . $stmt->error;
        }

        if (!$stmt->execute()) {
            // echo "Falló la ejecución: (" . $stmt->errno . ") " . $stmt->error;
            return false;
        }
        return true;
    }


    function registrarAdmin(){
        global $mysqli;
        conectarBD();
        if (!($stmt = $mysqli->prepare("INSERT INTO usuario (nick, pass, moderador, gestor, super) VALUES ('admin', ? , 0,0,1)"))){
            echo "Falló la preparación: (" . $mysqli->errno . ") " . $mysqli->error;
        }

        $pass = password_hash("admin", PASSWORD_DEFAULT);
        echo $pass;

        if (!$stmt->bind_param("s", $pass)){
            echo "Falló la vinculación de parámetros: (" . $stmt->errno . ") " . $stmt->error;
        }

        if (!$stmt->execute()) {
            // echo "Falló la ejecución: (" . $stmt->errno . ") " . $stmt->error;
            return false;
        }
        return true;
    }

    function registrarComentario($pid, $comentario, $usuario){
        global $mysqli;
        conectarBD();
        if (!($stmt = $mysqli->prepare("INSERT INTO comentarios (autor, fecha, cuerpo, id_producto) VALUES (?, current_timestamp(), ?, ?)"))){
            echo "Falló la preparación: (" . $mysqli->errno . ") " . $mysqli->error;
        }

        $nombre_completo = $usuario['nombre'].' '.$usuario['apellidos'];
        if (!$stmt->bind_param("ssi", $nombre_completo, $comentario, $pid)){
            echo "Falló la vinculación de parámetros: (" . $stmt->errno . ") " . $stmt->error;
        }

        if (!$stmt->execute()) {
            echo "Falló la ejecución: (" . $stmt->errno . ") " . $stmt->error;
            return false;
        }
        return true;
    }

    function actualizarDetalles($nick, $usuario){
        global $mysqli;
        conectarBD();
        if (!($stmt = $mysqli->prepare("UPDATE usuario SET nombre=?, apellidos=?, email=? WHERE nick=?"))){
            echo "Falló la preparación: (" . $mysqli->errno . ") " . $mysqli->error;
        }
        if (!$stmt->bind_param("ssss", $usuario['nombre'], $usuario['apellidos'], $usuario['email'], $nick)){
            echo "Falló la vinculación de parámetros: (" . $stmt->errno . ") " . $stmt->error;
        }

        if (!$stmt->execute()) {
            echo "Falló la ejecución: (" . $stmt->errno . ") " . $stmt->error;
            return false;
        }
        return true;
    }

    function actualizarPassword($nick, $pass){
        global $mysqli;
        conectarBD();
        if (!($stmt = $mysqli->prepare("UPDATE usuario SET pass=? WHERE nick=?"))){
            echo "Falló la preparación: (" . $mysqli->errno . ") " . $mysqli->error;
        }
        if (!$stmt->bind_param("ss", $pass, $nick)){
            echo "Falló la vinculación de parámetros: (" . $stmt->errno . ") " . $stmt->error;
        }

        if (!$stmt->execute()) {
            echo "Falló la ejecución: (" . $stmt->errno . ") " . $stmt->error;
            return false;
        }
        return true;
    }

    function getAllComentarios(){
        global $mysqli;
        conectarBD();

        // prepared statement, stage 1: prepare
        if (!($stmt = $mysqli->prepare("SELECT comentarios.id id_c, autor, fecha, cuerpo, productos.nombre nombre_p FROM comentarios, productos WHERE productos.id = comentarios.id_producto ORDER BY id_producto,fecha DESC"))) {
            echo "Falló la preparación: (" . $mysqli->errno . ") " . $mysqli->error;
        }
        // prepared statement, stage 2: bind and execute

        if (!$stmt->execute()) {
            echo "Falló la ejecución: (" . $stmt->errno . ") " . $stmt->error;
        }

        $res = $stmt->get_result();

        // array por defecto
        $comentarios = array();

        while ($row = $res->fetch_assoc()){
            $id = $row["id_c"];
            $autor = $row["autor"];
            $fecha = $row["fecha"];
            $cuerpo = $row["cuerpo"];
            $producto = $row['nombre_p'];
            $comentarios[$producto] []= array('autor' => $autor, 'fecha' => $fecha, 'cuerpo' => $cuerpo, 'nombre_p' => $producto, 'id' => $id);
            
        }
        return $comentarios;
    }

    function borrarComentario($id){
        global $mysqli;
        conectarBD();
        if (!($stmt = $mysqli->prepare("DELETE FROM comentarios WHERE id=?"))){
            echo "Falló la preparación: (" . $mysqli->errno . ") " . $mysqli->error;
        }
        if (!$stmt->bind_param("i", $id)){
            echo "Falló la vinculación de parámetros: (" . $stmt->errno . ") " . $stmt->error;
        }

        if (!$stmt->execute()) {
            echo "Falló la ejecución: (" . $stmt->errno . ") " . $stmt->error;
            return false;
        }
        return true;
    }

    function borrarProducto($pid){
        global $mysqli;
        conectarBD();

        // primero tenemos que borrar la entrada del producto en etiquetasProductos
        if (!($stmt = $mysqli->prepare("DELETE FROM etiquetasProductos WHERE id_p=?"))){
            echo "Falló la preparación: (" . $mysqli->errno . ") " . $mysqli->error;
        }
        if (!$stmt->bind_param("i", $pid)){
            echo "Falló la vinculación de parámetros: (" . $stmt->errno . ") " . $stmt->error;
        }
        if (!$stmt->execute()) {
            echo "Falló la ejecución: (" . $stmt->errno . ") " . $stmt->error;
            return false;
        }

        // luego las imagenes

        if (!($stmt = $mysqli->prepare("DELETE FROM imagenes WHERE id_producto=?"))){
            echo "Falló la preparación: (" . $mysqli->errno . ") " . $mysqli->error;
        }
        if (!$stmt->bind_param("i", $pid)){
            echo "Falló la vinculación de parámetros: (" . $stmt->errno . ") " . $stmt->error;
        }
        if (!$stmt->execute()) {
            echo "Falló la ejecución: (" . $stmt->errno . ") " . $stmt->error;
            return false;
        }

        //finalmente, los comentarios
        if (!($stmt = $mysqli->prepare("DELETE FROM comentarios WHERE id_producto=?"))){
            echo "Falló la preparación: (" . $mysqli->errno . ") " . $mysqli->error;
        }
        if (!$stmt->bind_param("i", $pid)){
            echo "Falló la vinculación de parámetros: (" . $stmt->errno . ") " . $stmt->error;
        }
        if (!$stmt->execute()) {
            echo "Falló la ejecución: (" . $stmt->errno . ") " . $stmt->error;
            return false;
        }

        if (!($stmt = $mysqli->prepare("DELETE FROM productos WHERE id=?"))){
            echo "Falló la preparación: (" . $mysqli->errno . ") " . $mysqli->error;
        }
        if (!$stmt->bind_param("i", $pid)){
            echo "Falló la vinculación de parámetros: (" . $stmt->errno . ") " . $stmt->error;
        }

        if (!$stmt->execute()) {
            echo "Falló la ejecución: (" . $stmt->errno . ") " . $stmt->error;
            return false;
        }
        return true;
    }

    function editarComentario($id, $nuevoCommentario){
        global $mysqli;
        conectarBD();
        if (!($stmt = $mysqli->prepare("UPDATE comentarios SET cuerpo=? WHERE id=?"))){
            echo "Falló la preparación: (" . $mysqli->errno . ") " . $mysqli->error;
        }
        if (!$stmt->bind_param("si", $nuevoCommentario, $id)){
            echo "Falló la vinculación de parámetros: (" . $stmt->errno . ") " . $stmt->error;
        }

        if (!$stmt->execute()) {
            echo "Falló la ejecución: (" . $stmt->errno . ") " . $stmt->error;
            return false;
        }
        return true;
    }

    function getEtiquetas(){
        global $mysqli;
        conectarBD();

        // prepared statement, stage 1: prepare
        if (!($stmt = $mysqli->prepare("SELECT distinct id, nombre FROM etiqueta"))) {
            echo "Falló la preparación: (" . $mysqli->errno . ") " . $mysqli->error;
        }
        // prepared statement, stage 2: bind and execute

        if (!$stmt->execute()) {
            echo "Falló la ejecución: (" . $stmt->errno . ") " . $stmt->error;
        }

        $res = $stmt->get_result();

        // array por defecto
        $etiquetas = array();

        while ($row = $res->fetch_assoc()){
            $etiquetas []= array('id_e' => $row["id"], 'nombre' => $row["nombre"]);
        }
        return $etiquetas;
    }

    function getEtiquetasProducto($pid){
        global $mysqli;
        conectarBD();

        // prepared statement, stage 1: prepare
        if (!($stmt = $mysqli->prepare("SELECT id_e, id_p FROM productos, etiquetasProductos where productos.id=etiquetasProductos.id_p and productos.id=?"))) {
            echo "Falló la preparación: (" . $mysqli->errno . ") " . $mysqli->error;
        }
        // prepared statement, stage 2: bind and execute
        if (!$stmt->bind_param("i", $pid)){
            echo "Falló la vinculación de parámetros: (" . $stmt->errno . ") " . $stmt->error;
        }

        if (!$stmt->execute()) {
            echo "Falló la ejecución: (" . $stmt->errno . ") " . $stmt->error;
        }

        $res = $stmt->get_result();

        // array por defecto
        $etiquetas = array();

        while ($row = $res->fetch_assoc()){
            $etiquetas []= $row["id_e"];
        }
        return $etiquetas;
    }

    function getEtiquetasNombre($pid){
        global $mysqli;
        conectarBD();

        // prepared statement, stage 1: prepare
        if (!($stmt = $mysqli->prepare("SELECT etiqueta.nombre n_e FROM etiqueta, productos, etiquetasProductos where productos.id=etiquetasProductos.id_p and etiqueta.id = etiquetasProductos.id_e and productos.id=?"))) {
            echo "Falló la preparación: (" . $mysqli->errno . ") " . $mysqli->error;
        }
        // prepared statement, stage 2: bind and execute
        if (!$stmt->bind_param("i", $pid)){
            echo "Falló la vinculación de parámetros: (" . $stmt->errno . ") " . $stmt->error;
        }

        if (!$stmt->execute()) {
            echo "Falló la ejecución: (" . $stmt->errno . ") " . $stmt->error;
        }

        $res = $stmt->get_result();

        // array por defecto
        $etiquetas = array();

        while ($row = $res->fetch_assoc()){
            $etiquetas []= $row["n_e"];
        }
        return $etiquetas;
    }

    function getMarcas(){
        global $mysqli;
        conectarBD();

        // prepared statement, stage 1: prepare
        if (!($stmt = $mysqli->prepare("SELECT * FROM marcas"))) {
            echo "Falló la preparación: (" . $mysqli->errno . ") " . $mysqli->error;
        }
        // prepared statement, stage 2: bind and execute

        if (!$stmt->execute()) {
            echo "Falló la ejecución: (" . $stmt->errno . ") " . $stmt->error;
        }

        $res = $stmt->get_result();

        // array por defecto
        $marcas = array();

        while ($row = $res->fetch_assoc()){
            $marcas []= array('id' => $row["id"], 'nombre' => $row["nombre"]);
        }
        return $marcas;
    }

    function editarProducto($datos, $imgs){
        global $mysqli;
        conectarBD();

        // primero añadimos las imagenes (si existen) y las etiquetas
        if (isset($imgs)){
            $borrarIMGS = "DELETE FROM imagenes WHERE imagenes.id_producto=?";
            if (!($stmt = $mysqli->prepare($borrarIMGS))) {
                echo "Falló la preparación: (" . $mysqli->errno . ") " . $mysqli->error;
                return false;
            }
            if (!$stmt->bind_param("i", $datos["pid"])){
                echo "Falló la vinculación de parámetros: (" . $stmt->errno . ") " . $stmt->error;
                return false;
            }
            if (!$stmt->execute()) {
                echo "Falló la ejecución: (" . $stmt->errno . ") " . $stmt->error;
                return false;
            }

            // ahora insertamos las nuevas
            $insertarIMGs = "INSERT INTO imagenes (ruta, id_producto) VALUES (?, ?)";
            if (!($stmt = $mysqli->prepare($insertarIMGs))) {
                echo "Falló la preparación: (" . $mysqli->errno . ") " . $mysqli->error;
                return false;
            }
            foreach ($imgs as $img){
                if (!$stmt->bind_param("si", $img, $datos["pid"])){
                    echo "Falló la vinculación de parámetros: (" . $stmt->errno . ") " . $stmt->error;
                    return false;
                }
                if (!$stmt->execute()) {
                    echo "Falló la ejecución: (" . $stmt->errno . ") " . $stmt->error;
                    return false;
                }
               }
        }

        // primero borramos las etiquetas actuales y luego insertamos las nuevas
        $borrarEtiquetas = "DELETE FROM etiquetasProductos WHERE etiquetasProductos.id_p=?";
        if (!($stmt = $mysqli->prepare($borrarEtiquetas))) {
            echo "Falló la preparación: (" . $mysqli->errno . ") " . $mysqli->error;
            return false;
        }
        if (!$stmt->bind_param("i", $datos["pid"])){
            echo "Falló la vinculación de parámetros: (" . $stmt->errno . ") " . $stmt->error;
            return false;
        }
        if (!$stmt->execute()) {
            echo "Falló la ejecución: (" . $stmt->errno . ") " . $stmt->error;
            return false;
        }

        // insertamos las nuevas

        $nuevasEtiquetas = "INSERT INTO etiquetasProductos (id_e, id_p) VALUES (?, ?)";
        if (!($stmt = $mysqli->prepare($nuevasEtiquetas))) {
            echo "Falló la preparación: (" . $mysqli->errno . ") " . $mysqli->error;
            return false;
        }
        $etiquetas = $datos["id_e"];
        if (!empty($etiquetas)){
            for ($i =0; $i < count($etiquetas); $i++){
                if (!$stmt->bind_param("ii", $etiquetas[$i], $datos["pid"])){
                    echo "Falló la vinculación de parámetros: (" . $stmt->errno . ") " . $stmt->error;
                    return false;
                }
                if (!$stmt->execute()) {
                    echo "Falló la ejecución: (" . $stmt->errno . ") " . $stmt->error;
                    return false;
                }
            }
        }

        // ahora actualizamos los datos de la tabla producto
        $nuevosDatos = "UPDATE productos set nombre=?, descripcion=?, precio=?, id_marca=?, publicado=? WHERE id=?";
        if (!($stmt = $mysqli->prepare($nuevosDatos))) {
            echo "Falló la preparación: (" . $mysqli->errno . ") " . $mysqli->error;
            return false;
        }
        if (!$stmt->bind_param("ssdiii", $datos["nombre"], $datos["descripcion"], $datos["precio"], $datos["id_marca"], $datos["publicado"], $datos["pid"])){
            echo "Falló la vinculación de parámetros: (" . $stmt->errno . ") " . $stmt->error;
            return false;
        }
        if (!$stmt->execute()) {
            echo "Falló la ejecución: (" . $stmt->errno . ") " . $stmt->error;
            return false;
        }

        // si se ha modificado el icono
        if (isset($datos['icono'])){
            $nuevoIcon = "UPDATE productos set icono=? WHERE id=?";
            if (!($stmt = $mysqli->prepare($nuevoIcon))) {
                echo "Falló la preparación: (" . $mysqli->errno . ") " . $mysqli->error;
                return false;
            }
            if (!$stmt->bind_param("si", $datos["icono"], $datos["pid"])){
                echo "Falló la vinculación de parámetros: (" . $stmt->errno . ") " . $stmt->error;
                return false;
            }
            if (!$stmt->execute()) {
                echo "Falló la ejecución: (" . $stmt->errno . ") " . $stmt->error;
                return false;
            }
        }
        return true;
    }

    function nuevaEtiqueta($nombre){
        global $mysqli;
        $nuevaEtiqueta = "INSERT INTO etiqueta (nombre) VALUES (?)";
        if (!($stmt = $mysqli->prepare($nuevaEtiqueta))) {
            echo "Falló la preparación: (" . $mysqli->errno . ") " . $mysqli->error;
            return false;
        }
        if (!$stmt->bind_param("s", $nombre)){
            echo "Falló la vinculación de parámetros: (" . $stmt->errno . ") " . $stmt->error;
            return false;
        }
        if (!$stmt->execute()) {
            echo "Falló la ejecución: (" . $stmt->errno . ") " . $stmt->error;
            return false;
        }
        return true;
    }

    function nuevaMarca($nombre){
        global $mysqli;
        $nuevaMarca = "INSERT INTO marcas(nombre) VALUES (?)";
        if (!($stmt = $mysqli->prepare($nuevaMarca))) {
            echo "Falló la preparación: (" . $mysqli->errno . ") " . $mysqli->error;
            return false;
        }
        if (!$stmt->bind_param("s", $nombre)){
            echo "Falló la vinculación de parámetros: (" . $stmt->errno . ") " . $stmt->error;
            return false;
        }
        if (!$stmt->execute()) {
            return false;
        }

        return true;
    }

    function getUsers(){
        global $mysqli;
        $getUsers = "SELECT * FROM usuario";
        if (!($stmt = $mysqli->prepare($getUsers))) {
            echo "Falló la preparación: (" . $mysqli->errno . ") " . $mysqli->error;
            return false;
        }
        if (!$stmt->execute()) {
            echo "Falló la ejecución: (" . $stmt->errno . ") " . $stmt->error;
            return false;
        }
        $result = $stmt->get_result();
        $usuarios = array();
        while ($row = $result->fetch_assoc()) {
            $usuarios[] = $row;
        }
        return $usuarios;
    }
    
    function actualizarPermisos($nick, $mod, $gestor, $super){
        global $mysqli;
        $actualizarPermisos = "UPDATE usuario SET moderador=?, gestor=?, super=? WHERE nick=?";
        if (!($stmt = $mysqli->prepare($actualizarPermisos))) {
            echo "Falló la preparación: (" . $mysqli->errno . ") " . $mysqli->error;
            return false;
        }
        if (!$stmt->bind_param("iiis", $mod, $gestor, $super, $nick)){
            echo "Falló la vinculación de parámetros: (" . $stmt->errno . ") " . $stmt->error;
            return false;
        }
        if (!$stmt->execute()) {
            echo "Falló la ejecución: (" . $stmt->errno . ") " . $stmt->error;
            return false;
        }
        return true;
    }


    function nuevoProducto($datos, $imgs){
        global $mysqli;
        conectarBD();

        $pid = -1;

        // primero creamos la entrada del producto
        $nuevosDatos = "INSERT INTO productos (nombre,descripcion, precio, id_marca, publicado) VALUES (?,?,?,?,?)";
        if (!($stmt = $mysqli->prepare($nuevosDatos))) {
            echo "Falló la preparación: (" . $mysqli->errno . ") " . $mysqli->error;
            return false;
        }
        if (!$stmt->bind_param("ssdii", $datos["nombre"], $datos["descripcion"], $datos["precio"], $datos["id_marca"], $datos['publicado'])){
            echo "Falló la vinculación de parámetros: (" . $stmt->errno . ") " . $stmt->error;
            return false;
        }
        if (!$stmt->execute()) {
            echo "Falló la ejecución: (" . $stmt->errno . ") " . $stmt->error;
            return false;
        }

        // obtenemos el id del producto
        $pid = $mysqli->insert_id;

        if (isset($datos['icono'])){
            $nuevoIcon = "UPDATE productos set icono=? WHERE id=?";
            if (!($stmt = $mysqli->prepare($nuevoIcon))) {
                echo "Falló la preparación: (" . $mysqli->errno . ") " . $mysqli->error;
                return false;
            }
            if (!$stmt->bind_param("si", $datos["icono"], $pid)){
                echo "Falló la vinculación de parámetros: (" . $stmt->errno . ") " . $stmt->error;
                return false;
            }
            if (!$stmt->execute()) {
                echo "Falló la ejecución: (" . $stmt->errno . ") " . $stmt->error;
                return false;
            }
        }

        if (isset($imgs)){
            $insertarIMGs = "INSERT INTO imagenes (ruta, id_producto) VALUES (?, ?)";
            if (!($stmt = $mysqli->prepare($insertarIMGs))) {
                echo "Falló la preparación: (" . $mysqli->errno . ") " . $mysqli->error;
                return false;
            }
            foreach ($imgs as $img){
                if (!$stmt->bind_param("si", $img, $pid)){
                    echo "Falló la vinculación de parámetros: (" . $stmt->errno . ") " . $stmt->error;
                    return false;
                }
                if (!$stmt->execute()) {
                    echo "Falló la ejecución: (" . $stmt->errno . ") " . $stmt->error;
                    return false;
                }
               }
        }

        // insertamos las nuevas etiquetas

        $nuevasEtiquetas = "INSERT INTO etiquetasProductos (id_e, id_p) VALUES (?, ?)";
        if (!($stmt = $mysqli->prepare($nuevasEtiquetas))) {
            echo "Falló la preparación: (" . $mysqli->errno . ") " . $mysqli->error;
            return false;
        }
        $etiquetas = $datos["id_e"];
        if (!empty($etiquetas)){
            for ($i =0; $i < count($etiquetas); $i++){
                if (!$stmt->bind_param("ii", $etiquetas[$i], $pid)){
                    echo "Falló la vinculación de parámetros: (" . $stmt->errno . ") " . $stmt->error;
                    return false;
                }
                if (!$stmt->execute()) {
                    echo "Falló la ejecución: (" . $stmt->errno . ") " . $stmt->error;
                    return false;
                }
            }
        }
        return true;
    }

    function search($usuario, $query){
        global $mysqli;
        conectarBD();
        if ($usuario['gestor'] == 1 || $usuario['super'] == 1){
            $search = "SELECT * FROM productos WHERE nombre LIKE '%$query%' or descripcion LIKE '%$query%'";
        } else{
            $search = "SELECT * FROM productos WHERE publicado=1 and (nombre LIKE '%$query%' or descripcion like '%$query%')";
        }
        if (!($stmt = $mysqli->prepare($search))) {
            echo "Falló la preparación: (" . $mysqli->errno . ") " . $mysqli->error;
            return false;
        }
        if (!$stmt->execute()) {
            echo "Falló la ejecución: (" . $stmt->errno . ") " . $stmt->error;
            return false;
        }
        $result = $stmt->get_result();
        $productos = array();
        while ($row = $result->fetch_assoc()) {
            $productos[] = $row;
        }
        return $productos;
    }
?>