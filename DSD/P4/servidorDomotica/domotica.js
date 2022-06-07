var http = require("http");
var url = require("url");
var fs = require("fs");
var path = require("path");
var socketio = require("socket.io");
var mimeTypes = { "html": "text/html", "jpeg": "image/jpeg", "jpg": "image/jpeg", "png": "image/png", "js": "text/javascript", "css": "text/css", "swf": "application/x-shockwave-flash" };

var MongoClient = require('mongodb').MongoClient;
var MongoServer = require('mongodb').MongoServer;

const MAX_TEMP = 40;
const MIN_TEMP = 15;
const MAX_LUZ = 10;
const MIN_LUZ = 1;

var allClients = new Array();

// Servidor Web
var httpServer = http.createServer(
    function (request, response) {
        var uri = url.parse(request.url).pathname;
        if (uri == "/server") uri = "/server.html";
        if (uri == "/client") uri = "/client.html";
        var fname = path.join(process.cwd(), uri);
        fs.exists(fname, function (exists) {
            if (exists) {
                fs.readFile(fname, function (err, data) {
                    if (!err) {
                        var extension = path.extname(fname).split(".")[1];
                        var mimeType = mimeTypes[extension];
                        response.writeHead(200, mimeType);
                        response.write(data);
                        response.end();
                    }
                    else {
                        response.writeHead(200, { "Content-Type": "text/plain" });
                        response.write('Error de lectura en el fichero: ' + uri);
                        response.end();
                    }
                }
                )
            } else {
                console.log("Petición invalida" + uri);
                response.writeHead(200, { "Content-Type": "text/plain" });
                response.write('404 Not Found\n');
                response.end();
            }
        });
    }
);

async function insertar(coleccion, objeto) {
    await coleccion.insertOne(objeto);
}

function prepararSocketIO(dbo) {
    httpServer.listen(8080);
    var io = socketio(httpServer);
    io.sockets.on('connection',
        function (client) {
            console.log(`Nuevo cliente conectado: {host: ${client.request.connection.remoteAddress} puerto: ${client.request.connection.remotePort}} `);
            allClients.push({ address: client.request.connection.remoteAddress, port: client.request.connection.remotePort });

            client.on("disconnect", function () {
                console.log("El cliente " + client.request.connection.remoteAddress + " se va a desconectar");
                console.log(allClients);

                var index = -1;
                for (var i = 0; i < allClients.length; i++) {
                    if (allClients[i].address == client.request.connection.remoteAddress
                        && allClients[i].port == client.request.connection.remotePort) {
                        index = i;
                    }
                }

                if (index != -1) {
                    allClients.splice(index, 1);
                } else {
                    console.log("EL USUARIO NO SE HA ENCONTRADO!")
                }
                console.log('El usuario ' + client.request.connection.remoteAddress + ' se ha desconectado');
            });

            client.on('obtener', function (data) {
                dbo.collection("alertas").find({}, { proyection: { tipo: 1, msg: 1, fecha: 1 } }).toArray(function (err, result) {
                    client.emit('nuevosDatos', result);
                });
            });

            client.on('nueva-temp', function (data) {
                var temperatura = data.temp;
                if (temperatura > MAX_TEMP) {
                    insertar(dbo.collection("alertas"), { tipo: "Temperatura", msg: `La temperatura es de ${temperatura} ºC, está por encima del limite de ${MAX_TEMP} ºC` })
                    insertar(dbo.collection("alertas"), { tipo: "AC", msg: `El AC se ha encendido`, valor: true })
                    // como ha superado la temperatura máxima se enciende el ac
                    io.sockets.emit("AC", true);
                    io.sockets.emit("temperatura", MAX_TEMP);
                    io.sockets.emit("actualizarBD"); // avisamos al cliente de que consulte la bd
                } else if (temperatura < MIN_TEMP) {
                    insertar(dbo.collection("alertas"), { tipo: "Temperatura", msg: `La temperatura es de ${temperatura} ºC, está por debajo del limite de ${MIN_TEMP} ºC ` })
                    insertar(dbo.collection("alertas"), { tipo: "AC", msg: `El AC se ha apagado`, valor: false })
                    io.sockets.emit("AC", false);
                    io.sockets.emit("temperatura", MIN_TEMP);
                    io.sockets.emit("actualizarBD"); // avisamos al cliente de que consulte la bd
                } else {
                    insertar(dbo.collection("alertas"), { tipo: "Temperatura", msg: `La temperatura es de ${temperatura} ºC` })
                    insertar(dbo.collection("sensores"), { tipo: "Temperatura", fecha: data.fecha, valor: temperatura })
                    io.sockets.emit("temperatura", temperatura);
                    io.sockets.emit("actualizarBD"); // avisamos al cliente de que consulte la bd
                }
            });



            client.on("nueva-luz", function(data){
                var luz = data.luz;
                if (luz > MAX_LUZ) {
                    insertar(dbo.collection("alertas"), { tipo: "Luz", msg: `La luz es de ${luz}, está por encima del limite de ${MAX_LUZ}` })
                    insertar(dbo.collection("alertas"), { tipo: "Persianas", msg: `Las persianas se han bajado`, valor: false })
                    // como ha superado la luz máxima se cierran las persianas
                    io.sockets.emit("persianas", false);
                    io.sockets.emit("luz", MAX_LUZ);
                    io.sockets.emit("actualizarBD"); // avisamos al cliente de que consulte la bd
                }
                else if (luz < MIN_LUZ) {
                    insertar(dbo.collection("alertas"), { tipo: "Luz", msg: `La luz es de ${luz}, está por debajo del limite de ${MIN_LUZ}` })
                    insertar(dbo.collection("alertas"), { tipo: "Persianas", msg: `Las persianas se han subido`, valor: true })
                    // como ha superado la luz máxima se cierran las persianas
                    io.sockets.emit("persianas", true);
                    io.sockets.emit("luz", MIN_LUZ);
                    io.sockets.emit("actualizarBD"); // avisamos al cliente de que consulte la bd
                }
                else {
                    insertar(dbo.collection("alertas"), { tipo: "Luz", msg: `La luz es de ${luz}` })
                    insertar(dbo.collection("sensores"), { tipo: "Luz", fecha: data.fecha, valor: luz })
                    io.sockets.emit("luz", luz);
                    io.sockets.emit("actualizarBD"); // avisamos al cliente de que consulte la bd
                }
            })


            client.on("AC", function (data) {
                insertar(dbo.collection("alertas"), { tipo: "AC", msg: `El AC se ha ${data ? "encendido" : "apagado"}`, valor: data })
                io.sockets.emit("actualizarBD"); 
                io.sockets.emit("AC", data);
            });

            client.on("persianas", function (data) {
                insertar(dbo.collection("alertas"), { tipo: "Persianas", msg: `Las persianas se han ${data ? "subido" : "bajado"}`, valor: data })
                io.sockets.emit("actualizarBD");
                io.sockets.emit("persianas", data);
            });

        }
    );

}

// Conexion con Mongo
MongoClient.connect("mongodb://localhost:27017/", { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    dbo = db.db("servidorDomoticaDB");
    prepararSocketIO(dbo);
})