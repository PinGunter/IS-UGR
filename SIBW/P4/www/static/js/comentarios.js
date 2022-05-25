var palabrasFeotas;


function mostrarComentarios() {
    var comentarios = document.getElementById("seccion-comentarios");
    var visible = comentarios.getAttribute("class") === "comentarios-no-visibles";
    var boton = document.getElementById("toggle-comments");
    if (visible) {
        comentarios.setAttribute("class", "comentarios-visibles");
        boton.innerHTML = "<a><i class=\"fa fa-comment \"></i> Ocultar comentarios</a>";
    } else {
        comentarios.setAttribute("class", "comentarios-no-visibles");
        boton.innerHTML = "<a><i class=\"fa fa-comment \"></i> Mostrar comentarios</a>";
    }
}

function crearError(mensaje) {
    var elementoError = document.createElement("span");
    var mensajeError = document.createTextNode(mensaje);
    elementoError.setAttribute("class", "mensaje-error");
    elementoError.appendChild(mensajeError);
    return elementoError;
}

function checkForm() {
    //Borramos mensajes de error que hayamos podido encontrar antes
    var erroresAnteriores = document.getElementsByClassName("mensaje-error");
    var n_errores = erroresAnteriores.length
    for (var i = 0; i < n_errores; i++) {
        erroresAnteriores[0].remove();
    }


    var comentario = document.getElementById("comment-form").value;
    var comentarioCorrecto = !(/^ *$/.test(comentario) || !comentario);

    if (!comentarioCorrecto) {
        var elementoError = crearError("El comentario no puede ser vacío");
        document.getElementById("send-form").insertAdjacentElement("afterend", elementoError);
    }
   
    return nombreCorrecto && emailCorrecto && comentarioCorrecto;
}

function obtenerPalabrasFeas(){
    var peticion = new Request('/malsonantes.php');
    fetch(peticion).then(
        function(response){
            if (response.ok){
                response.json().then(
                    function(data){
                        palabrasFeotas = data;
                    }
                );
            }
        }
    )

}

function censurarComentarios(event) {
    if (event.key === " ") {
        palabrasFeotas.forEach(
            palabra => this.value = this.value.replace(new RegExp(palabra, "i"), palabra.replace(/./gi, "*"))
        );
    }
}

function numMenor10(num) {
    res = num
    if (num < 10) {
        res = `0${num}`;
    }
    return res;
}

function crearComentario(nombre, comentario, fecha) {
    if (fecha === undefined) {
        fecha = new Date();
    }

    //div que contiene el resto de elementos
    var divComentario = document.createElement("div");
    divComentario.setAttribute("class", "comment-div");

    // span con la fecha
    var spanFecha = document.createElement("span");
    spanFecha.setAttribute("class", "comment-date");
    var dia = fecha.getDate();
    var mes = fecha.getMonth() + 1;
    var anio = fecha.getFullYear();
    var hora = fecha.getHours();
    var min = fecha.getMinutes();
    var sec = fecha.getSeconds();
    dia = numMenor10(dia);
    mes = numMenor10(mes);
    hora = numMenor10(hora);
    min = numMenor10(min);
    sec = numMenor10(sec);


    spanFecha.innerHTML = `<i class=\"fa fa-calendar\"></i> ${dia}/${mes}/${anio} - ${hora}:${min}:${sec}`;

    // span con el usuario
    var spanUsuario = document.createElement("span");
    spanUsuario.setAttribute("class", "comment-author");
    var usuarioTexto = document.createTextNode(` @ ${nombre}`);
    spanUsuario.appendChild(usuarioTexto);
    spanUsuario.appendChild(document.createElement("br"));

    // span con el comentario en sí
    var spanComentario = document.createElement("span");
    spanComentario.setAttribute("class", "comment-body");
    var commentarioTexto = document.createTextNode(comentario);
    spanComentario.appendChild(commentarioTexto);

    // añadimos los elementos al div principal
    divComentario.appendChild(spanFecha);
    divComentario.appendChild(spanUsuario);
    divComentario.appendChild(spanComentario);

    return divComentario;
}

function enviarComentario() {
    if (checkForm()) {
        //censurar por ultima vez por si la ultima palabra es una palabra "fea"
        const eventoCensurar = new KeyboardEvent("keydown");
        document.getElementById("comment-form").dispatchEvent(eventoCensurar);
        // añadir comentario
        var textoComentario = document.getElementById("comment-form").value;
        var usuario = document.getElementById("nombre-form").value;

        var elementoComentario = crearComentario(usuario, textoComentario);
        var seccionComentarios = document.getElementById("lista-comentarios");
        seccionComentarios.insertBefore(elementoComentario, seccionComentarios.firstChild);
    }
}
obtenerPalabrasFeas();
botonComentarios = document.getElementById("toggle-comments");
botonComentarios.addEventListener("click", mostrarComentarios);
botonEnviar = document.getElementById("send-form");
botonEnviar.addEventListener("click", enviarComentario);
seccionComentarios = document.getElementById("comment-form");
seccionComentarios.addEventListener("keydown", censurarComentarios);


