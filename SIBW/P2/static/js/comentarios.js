function mostrarComentarios(){
    var comentarios = document.getElementById("seccion-comentarios");
    var visible = comentarios.getAttribute("class") === "comentarios-no-visibles";
    var boton = document.getElementById("toggle-comments");
    if (visible){
        comentarios.setAttribute("class", "comentarios-visibles");
        boton.innerHTML = "<a><i class=\"fa fa-comment \"></i> Ocultar comentarios</a>";
    } else{
        comentarios.setAttribute("class", "comentarios-no-visibles");
        boton.innerHTML = "<a><i class=\"fa fa-comment \"></i> Mostrar comentarios</a>";
    }
}

function checkForm(){
    // Hay que comprobar que el nombre no sea nulo y que el email sea válido
    var nombreInput = document.getElementById("nombre-form").value;
    console.log(nombreInput);
}

botonComentarios = document.getElementById("toggle-comments");
botonComentarios.addEventListener("click", mostrarComentarios);
botonEnviar = document.getElementById("send-form");
botonEnviar.addEventListener("click",checkForm);
seccionComentarios = document.getElementById("comment-form");


