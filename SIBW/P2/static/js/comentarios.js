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
botonComentarios = document.getElementById("toggle-comments");
botonComentarios.addEventListener("click", mostrarComentarios);

