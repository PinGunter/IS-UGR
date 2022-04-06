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
    }

    update(){
        var escalado = this.guiControls.longitud / this.longitudPendulo;
        this.rotation.set(0,0,this.guiControls.rotacion);
        this.cajaMedio.scale.y = escalado;
        this.cajaVInf.position.set(0,-this.alturaCaja/2 - this.guiControls.longitud,0);
    }

    createGUI(gui, titleGUI){
        this.guiControls = {
            longitud : this.longitudPendulo,
            rotacion : this.rotacion,
        }

        var folder = gui.addFolder(titleGUI);
        folder.add(this.guiControls, 'longitud', 5, 10, 1).name("Longitud: ").listen();
        folder.add(this.guiControls, 'rotacion', -Math.PI/4, Math.PI/4, 0.05).name("Rotacion: ").listen();
    }

    updateLongitud(value){
        console.log(`Value: ${value} || Escalado: ${escalado}`);
        this.cajaMedio.scale.y = escalado;
        this.cajaVInf.position.set(0,-value,0);
    }

    updateRotacion(value){
        this.rotacion = value;
        this.rotation.set(0,0,this.rotacion);
    }

}

export {PenduloSuperior};