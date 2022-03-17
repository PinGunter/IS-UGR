import * as THREE from '../libs/three.module.js'

class Diamante extends THREE.Object3D {
    constructor(){
        super();

        var diamanteShape = new THREE.Shape();
        diamanteShape.moveTo(0,0);
        diamanteShape.lineTo(1,1);
        diamanteShape.lineTo(0,2);
        diamanteShape.lineTo(-1,1);
        var geometry = new THREE.ExtrudeGeometry(diamanteShape, {depth: 0.1});

        var material = new THREE.MeshPhongMaterial({color: "red"})
        this.diamante = new THREE.Mesh(geometry, material);
        this.diamante.position.set(0,-1,0);
        this.add(this.diamante);
    }

    update(){
        this.diamante.rotation.y += 0.01;

    }
}

export { Diamante };