import * as THREE from '../libs/three.module.js'

class Pendulo extends THREE.Object3D{
    constructor(gui, tit1, tit2){
        super();
        this.longitudPendulo = 5;
        this.rotacion = 0;
        this.longitudSegundo = 10;
        this.posicionSegundo = 10;
        this.alturaCaja = 4;
        this.createGUI(gui, tit1, tit2);

        //  primer pendulo
        // Tuerca del eje
        var tuercaGeo = new THREE.CylinderGeometry(1,1,2.5,6);
        tuercaGeo.rotateX(Math.PI/2);
        var tuercaMat = new THREE.MeshPhongMaterial({color: "pink"});
        this.tuerca = new THREE.Mesh(tuercaGeo, tuercaMat);

        // Caja verde superior
        var cajaVSupGeo = new THREE.BoxGeometry(2,this.alturaCaja,2);
        var cajaVSupMat = new THREE.MeshPhongMaterial({color: "green"});
        this.cajaVSup = new THREE.Mesh(cajaVSupGeo, cajaVSupMat);

        // Caja roja flexible
        var cajaMedioGeo = new THREE.BoxGeometry(2,this.longitudPendulo,2);
        var cajaMedioMat = new THREE.MeshPhongMaterial({color: "red"});
        cajaMedioGeo.translate(0,-this.longitudPendulo/2,0);
        this.cajaMedio = new THREE.Mesh(cajaMedioGeo,cajaMedioMat);

        // Caja verde inferior
        var desplazamiento = -this.alturaCaja/2 - this.longitudPendulo;
        var cajaVInfGeo = new THREE.BoxGeometry(2,this.alturaCaja,2);
        var cajaVInfMat = new THREE.MeshPhongMaterial({color: "green"});
        this.cajaVInf = new THREE.Mesh(cajaVInfGeo, cajaVInfMat);
        this.cajaVInf.position.set(0,desplazamiento,0);


        this.objFlex = new THREE.Object3D();
        this.objFlex.add(this.cajaMedio);
        this.objFlex.add(this.cajaVInf);
        this.objFlex.translateY(-this.alturaCaja/2);

        this.add(this.tuerca);
        this.add(this.cajaVSup);
        this.add(this.objFlex);


        // segundo pendulo
        //pendulo
        var segundoGeo = new THREE.BoxGeometry(1,this.longitudSegundo,1);
        var matSegundo = new THREE.MeshPhongMaterial({color: "blue"});
        this.segundo = new THREE.Mesh(segundoGeo, matSegundo);
        this.segundo.position.set(0,-this.longitudSegundo/2 +1,0);
        // tuerca
        var tuerca2geo = new THREE.CylinderGeometry(0.5,0.5,1.3);
        tuerca2geo.rotateX(Math.PI/2);
        var matTuerca2 = new THREE.MeshPhongMaterial({color: "green"});
        this.tuerca2 = new THREE.Mesh(tuerca2geo, matTuerca2);

        this.pendulo2 = new THREE.Object3D();
        this.pendulo2.add(this.segundo);
        this.pendulo2.add(this.tuerca2);
        this.pendulo2.position.set(0,-this.alturaCaja/2-0.1*this.longitudPendulo,1.5);
        this.add(this.pendulo2);


    }

    update(){
        var escalado = this.guiControlsPrimero.longitud / this.longitudPendulo;
        this.rotation.set(0,0,this.guiControlsPrimero.rotacion);
        this.cajaMedio.scale.y = escalado;
        this.cajaVInf.position.set(0,-this.alturaCaja/2 - this.guiControlsPrimero.longitud,0);
        
        var escalado2 =1;
        this.pendulo2.rotation.set(0,0,this.guiControlsSegundo.rotacion);
        this.segundo.scale.y = escalado2;
    }

    createGUI(gui, tit1, tit2){
        this.guiControlsPrimero = {
            longitud : this.longitudPendulo,
            rotacion : this.rotacion,
        }

        var carpetaPrimero = gui.addFolder(tit1);
        carpetaPrimero.add(this.guiControlsPrimero, 'longitud', 5, 10, 1).name("Longitud: ").listen();
        carpetaPrimero.add(this.guiControlsPrimero, 'rotacion', -Math.PI/4, Math.PI/4, 0.05).name("Rotacion: ").listen();

        this.guiControlsSegundo = {
            longitud: this.longitudSegundo,
            posicion: this.posicionSegundo,
            giro: 0,
        }

        var carpetaSegundo = gui.addFolder(tit2);
        carpetaSegundo.add(this.guiControlsSegundo,'longitud',10,20,1).name("Longitud").listen();
        carpetaSegundo.add(this.guiControlsSegundo, 'posicion', 10, 90, 1).name("Posicion %: ").listen();
        carpetaSegundo.add(this.guiControlsSegundo, 'giro', -Math.PI, Math.PI, 0.05).name("Giro: ").listen();
    }
}

export {Pendulo};