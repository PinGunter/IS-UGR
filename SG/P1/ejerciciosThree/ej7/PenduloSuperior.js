import * as THREE from '../libs/three.module.js'

class PenduloSuperior extends THREE.Object3D{
    constructor(gui, titleGUI){
        super();
        this.longitudPendulo = 5;
        this.rotacion = 0;
        
        this.createGUI(gui, titleGUI);


        this.alturaCaja = 4;
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
        var desplazamiento = -this.alturaCaja/2 - this.longitudPendulo/2;
        var cajaFlexGeo = new THREE.BoxGeometry(2,this.longitudPendulo,2);
        var cajaFlexMat = new THREE.MeshPhongMaterial({color: "red"});
        this.cajaMedio = new THREE.Mesh(cajaFlexGeo,cajaFlexMat);
        this.cajaFlex = new THREE.Object3D();
        this.cajaFlex.add(this.cajaMedio);
        this.cajaFlex.position.set(0,desplazamiento,0);

        // Caja verde inferior
        desplazamiento = -this.alturaCaja - this.longitudPendulo;
        var cajaVInfGeo = new THREE.BoxGeometry(2,this.alturaCaja,2);
        var cajaVInfMat = new THREE.MeshPhongMaterial({color: "green"});
        this.cajaVInf = new THREE.Mesh(cajaVInfGeo, cajaVInfMat);
        this.cajaVInf.position.set(0,desplazamiento,0);

        this.add(this.tuerca);
        this.add(this.cajaVSup);
        this.add(this.cajaFlex);
        this.add(this.cajaVInf);
    }

    update(){
        var desplazamiento = -this.alturaCaja/2 - this.longitudPendulo/2;
        this.cajaFlex.position.set(0,desplazamiento,0);
        desplazamiento = -this.alturaCaja - this.longitudPendulo;
        this.cajaVInf.position.set(0,desplazamiento,0);
    }

    createGUI(gui, titleGUI){
        this.guiControls = {
            longitud : this.longitudPendulo,
            rotacion : this.rotacion,
        }

        var folder = gui.addFolder(titleGUI);
        folder.add(this.guiControls, 'longitud', 5, 10, 1).name("Longitud: ").onChange( (value) => {this.updateLongitud(value)});
        folder.add(this.guiControls, 'rotacion', -Math.PI/4, Math.PI/4, 0.05).name("Rotacion: ").onChange( (value) => {this.updateRotacion(value)});
    }

    updateLongitud(value){
        this.longitudPendulo = value;
        this.cajaMedio.scale.set(1,this.longitudPendulo,1);
    }

    updateRotacion(value){
        this.rotacion = value;
        this.rotation.set(0,0,this.rotacion);
    }

}

export {PenduloSuperior};