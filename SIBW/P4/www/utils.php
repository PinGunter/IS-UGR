<?php

function verificarDatosRegistro($datos){
    $datos['nombre'] = trim($datos['nombre']);
    $datos['apellidos'] = trim($datos['apellidos']);
    $datos['username'] = trim($datos['username']);
    $datos['email'] = trim($datos['email']);
    $datos['passwd'] = trim($datos['passwd']);
    if (empty($datos['nombre'])){
        return false;
    }
    if (empty($datos['apellidos'])){
        return false;
    }
    if (empty($datos['username'])){
        return false;
    }

    if (empty($datos['email'])){
        return false;
    }else{
        if (!filter_var($datos['email'], FILTER_VALIDATE_EMAIL)){
            return false;
        }
    }
    
    if (empty($datos['passwd'])){
        return false;
    }

    return true;
}

function verificarDatosLogin($datos){
    $datos['username'] = trim($datos['username']);
    $datos['passwd'] = trim($datos['passwd']);
    if (empty($datos['username'])){
        return false;
    }
    if (empty($datos['passwd'])){
        return false;
    }

    return true;
}

function verificarDatosUpdate($datos){
    $datos['nombre'] = trim($datos['nombre']);
    $datos['apellidos'] = trim($datos['apellidos']);
    $datos['username'] = trim($datos['username']);
    $datos['email'] = trim($datos['email']);
    $datos['passwd'] = trim($datos['passwd']);
    if (empty($datos['nombre'])){
        return false;
    }
    if (empty($datos['apellidos'])){
        return false;
    }
    
    if (empty($datos['email'])){
        return false;
    }else{
        if (!filter_var($datos['email'], FILTER_VALIDATE_EMAIL)){
            return false;
        }
    }
    
    if (empty($datos['passwd'])){
        return false;
    }

    if (empty($datos['passwd2'])){
        return false;
    }

    if ($datos['passwd'] != $datos['passwd2']){
        return false;
    }
    return true;
}
?>