var input = document.getElementById("search-input");
var docResults = document.getElementById("search-results");

function mostrarResultados(query, resultados){
    docResults.innerHTML = "";
    var querySinTilde = query.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    resultados.forEach(res => {
        var resDiv = document.createElement("div");
        resDiv.setAttribute("class", "search-result");
        var titulo = res["nombre"];
        var tituloH = document.createElement("a");
        tituloH.setAttribute("href", `/producto.php?pid=${res['id']}`);
        var tituloSinTilde = titulo.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        var inicioSubs = tituloSinTilde.indexOf(querySinTilde);
        var boldText = "";
        if (inicioSubs != -1){
            for (var i=0; i < inicioSubs; i++){
                boldText += titulo[i];
            }
            for (var i=inicioSubs; i < querySinTilde.length + inicioSubs; i++){
                if (i == inicioSubs){
                    boldText += "<b>"
                }
                boldText += titulo[i];
            }
            boldText += "</b>"
            for (var i=querySinTilde.length+inicioSubs; i < titulo.length; i++){
                boldText += titulo[i];
            }
        } else{
            boldText = titulo;
        }
        tituloH.innerHTML = boldText;
        resDiv.appendChild(tituloH);
        docResults.appendChild(resDiv);
    });
}

function busqueda(){
    var query = this.value;
    var url = new Request(`/search.php?query=${query}`);
    fetch(url)
    .then((response) => {
        if (response.ok)
            response.json().then((data) => {
                mostrarResultados(query, data);
            })
    })

}

input.addEventListener("keydown", busqueda)
input.addEventListener("keyup", busqueda)