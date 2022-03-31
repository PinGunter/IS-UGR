import { CSG } from '../libs/CSG-v2.js';
import * as THREE from '../libs/three.module.js';

class Tuerca extends THREE.Object3D{
    constructor(){
        super();
        // construccion de las geometrias
        var material = new THREE.MeshNormalMaterial();

        var cilinExt = new THREE.CylinderGeometry(5,5,4,6,1);
        var c1 = new THREE.CylinderGeometry(3.1,3.1,0.2,24,1);
        var c2 = new THREE.CylinderGeometry(3.1,3.1,0.2,24,1);
        var c3 = new THREE.CylinderGeometry(3.1,3.1,0.2,24,1);
        var c4 = new THREE.CylinderGeometry(3.1,3.1,0.2,24,1);
        var c5 = new THREE.CylinderGeometry(3.1,3.1,0.2,24,1);
        var c6 = new THREE.CylinderGeometry(3.1,3.1,0.2,24,1);
        var c7 = new THREE.CylinderGeometry(3.1,3.1,0.2,24,1);
        var c8 = new THREE.CylinderGeometry(3.1,3.1,0.2,24,1);
        var c9 = new THREE.CylinderGeometry(3.1,3.1,0.2,24,1);
        var c10 = new THREE.CylinderGeometry(3.1,3.1,0.2,24,1);
        var c11 = new THREE.CylinderGeometry(3.1,3.1,0.2,24,1);
        var c12 = new THREE.CylinderGeometry(3.1,3.1,0.2,24,1);
        var cilinInt = new THREE.CylinderGeometry(3,3,5,24,1);

        // posicionamiento
        c1.translate(0,0.5,0);
        c2.translate(0,1,0);
        c3.translate(0,1.5,0);
        c4.translate(0,2,0);
        c5.translate(0,2.5,0);
        c6.translate(0,3,0);

        c7.translate(0,0,0);
        c8.translate(0,-0.5,0);
        c9.translate(0,-1,0);
        c10.translate(0,-1.5,0);
        c11.translate(0,-2,0);
        c12.translate(0,-2.5,0);


        // creamos los mesh
        var cilinExtMesh = new THREE.Mesh(cilinExt, material);
        var cilinIntMesh = new THREE.Mesh(cilinInt, material);
        var c1M = new THREE.Mesh(c1, material);
        var c2M = new THREE.Mesh(c2, material);
        var c3M = new THREE.Mesh(c3, material);
        var c4M = new THREE.Mesh(c4, material);
        var c5M = new THREE.Mesh(c5, material);
        var c6M = new THREE.Mesh(c6, material);
        var c7M = new THREE.Mesh(c7, material);
        var c8M = new THREE.Mesh(c8, material);
        var c9M = new THREE.Mesh(c9, material);
        var c10M = new THREE.Mesh(c10, material);
        var c11M = new THREE.Mesh(c11, material);
        var c12M = new THREE.Mesh(c12, material);

        // creamos el csg
        var csg = new CSG();

        // operamos
        csg.union([cilinExtMesh]);
        csg.subtract([c1M, c2M, c3M, c4M, c5M, c6M, c7M, c8M, c9M, c10M, c11M, c12M, cilinIntMesh]);
        this.tuerca = csg.toMesh();

        this.add(this.tuerca);
    }

    update(){
        this.rotation.y += 0.01;
    }
}

export { Tuerca };