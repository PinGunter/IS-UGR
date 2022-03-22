function mostrarComentarios(){
    var comentarios = document.getElementById("seccion-comentarios");
    var visible = comentarios.getAttribute("class") === "comentarios-no-visibles";
    if (visible){
        comentarios.setAttribute("class", "comentarios-visibles");
    } else{
        comentarios.setAttribute("class", "comentarios-no-visibles");
    }
}