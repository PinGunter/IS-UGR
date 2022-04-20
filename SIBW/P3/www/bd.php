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
        if (!($stmt = $mysqli->prepare("SELECT productos.nombre, precio, descripcion, productos.id, marcas.nombre nombre_marca  FROM productos, marcas WHERE productos.id = ? and productos.id_marca = marcas.id"))) {
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

            // cuando sea valido
            $producto = array('nombre' => $nombre, 'precio' => $precio, 'descripcion' => $descripcion, 'marca' => $marca, 'id' => $id);
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
            $autor = $row["autor"];
            $fecha = $row["fecha"];
            $cuerpo = $row["cuerpo"];
            $comentarios[]= array('autor' => $autor, 'fecha' => $fecha, 'cuerpo' => $cuerpo);
        }
        return $comentarios;
    }

    function getProductos(){
        global $mysqli;
        conectarBD();
        // prepared statement, stage 1: prepare
        if (!($stmt = $mysqli->prepare("SELECT id, nombre, icono from productos"))) {
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

            // cuando sea valido
            $productos[]= array('id' => $id, 'nombre' => $nombre, 'icono' => $icono);
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
?>