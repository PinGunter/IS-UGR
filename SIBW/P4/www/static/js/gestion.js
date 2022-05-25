var productos = document.getElementById("conjunto-productos");
var id;

for (var i=0; i < productos.children.length; i++){
    id = productos.children[i].children[1].innerText;
    productos.children[i].childNodes[5].childNodes[2].addEventListener("click", () => {
        if (confirm("¿Desea eliminar el producto?"))
            open("borrar_producto.php?pid="+id, "_self");
    })
}

