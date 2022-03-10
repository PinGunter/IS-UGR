import * as THREE from '../libs/three.module.js'

class Tronco extends THREE.Object3D {
    constructor(matColor){
        super();

        this.puntos = [];
        
        // Creamos los puntos para el tronco
        this.puntos.push(new THREE.Vector3(0,0,0));
        this.puntos.push(new THREE.Vector3(1,0,0));
        this.puntos.push(new THREE.Vector3(0.5,0.5,0));
        this.puntos.push(new THREE.Vector3(0.5,1.5,0));
        this.puntos.push(new THREE.Vector3(0,1.5,0));

        //Creamos la geometria, material y objeto
        var geo = new THREE.LatheGeometry(this.puntos);
        var mat = new THREE.MeshPhongMaterial({color: matColor});
        this.tronco = new THREE.Mesh(geo,mat);
        this.add(this.tronco);
    }

    update(){
        // no hace nada
    }
}

export { Tronco };