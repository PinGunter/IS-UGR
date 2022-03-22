function mostrarComentarios(){
    var comentarios = document.getElementById("seccion-comentarios");
    var visible = comentarios.getAttribute("class") === "comentarios-no-visibles";
    var boton = document.getElementById("toggle-comments");
    if (visible){
        comentarios.setAttribute("class", "comentarios-visibles");
        boton.innerHTML = "<i class=\"fa fa-comment\"> Ocultar comentarios</i>";
    } else{
        comentarios.setAttribute("class", "comentarios-no-visibles");
        boton.innerHTML = "<i class=\"fa fa-comment\"> Mostrar comentarios</i>";
    }
}

function censuraComentarios(){
    var comenario = document.getElementById("comment-form").value;
    if (comentario.includes("tonto")){
        comentario.replace("tonto", "*****");
    }
}

var emailInput = document.getElementById("email-form");
emailInput.addEventListener("InputEvent",censuraComentarios());
var botonEnviar = document.getElementById("send-form");
alert("ola");
// botonEnviar.addEventListener();