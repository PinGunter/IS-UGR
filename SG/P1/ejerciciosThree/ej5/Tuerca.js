import { CSG } from '../libs/CSG-v2.js';
import * as THREE from '../libs/three.module.js';

class Tuerca extends THREE.Object3D {
    constructor() {
        super();
        // construccion de las geometrias
        var material = new THREE.MeshNormalMaterial();
        var alturaTuerca = 5;
        var nRecortes = 20;
        var cilinExt = new THREE.CylinderGeometry(5, 5, alturaTuerca, 6, 1);
        var cilinInt = new THREE.CylinderGeometry(3, 3, alturaTuerca, 24, 1);
        var geoRecortes = []
        for (var i = 0; i < nRecortes; i++) {
            geoRecortes.push(new THREE.CylinderGeometry(3.1, 3.1, 0.1, 24, 1));
        }

        // posicionamiento
        var posicion = -alturaTuerca/2;
        var aumento = alturaTuerca/nRecortes;
        for (var i = 0; i < geoRecortes.length; i++) {
            geoRecortes[i].translate(0, posicion, 0);
            posicion += aumento;
        }

        // creamos los mesh
        var cilinExtMesh = new THREE.Mesh(cilinExt, material);
        var cilinIntMesh = new THREE.Mesh(cilinInt, material);
        var meshRecortes = [];
        for (var i=0; i < geoRecortes.length; i++){
            meshRecortes.push(new THREE.Mesh(geoRecortes[i],material));
        }

        // creamos el csg
        var csg = new CSG();

        // operamos
        csg.union([cilinExtMesh]);
        csg.subtract([cilinIntMesh]);
        csg.subtract(meshRecortes);
        this.tuerca = csg.toMesh();

        this.add(this.tuerca);
    }

    update() {
        this.rotation.y += 0.01;
    }
}

export { Tuerca };