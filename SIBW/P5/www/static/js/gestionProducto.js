var botonEliminar = document.getElementById("eliminar-producto");
var id = document.getElementById("product-id").innerText;

botonEliminar.addEventListener("click", () => {
    if (confirm("¿Desea eliminar el producto?"))
        open("borrar_producto.php?pid="+id, "_self");
})