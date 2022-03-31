import { CSG } from '../libs/CSG-v2.js'
import * as THREE from '../libs/three.module.js'

class Taza extends THREE.Object3D{
    constructor(){
        super();
        var material = new THREE.MeshNormalMaterial();
        var cilinExt = new THREE.CylinderGeometry(5,5,10,24,1);
        var cilinInt = new THREE.CylinderGeometry(4.7, 4.7, 10, 24, 1);
        var toro = new THREE.TorusGeometry(3,0.5,24,24);

        //posicionamos las geometrias
        cilinInt.translate(0,0.3,0); //lo ponemos encima para poder hacer la base de la taza
        toro.translate(-5, 0,0); // a un lado para tener el mango

        // construimos los meshes
        var cilinExtMesh = new THREE.Mesh(cilinExt, material);
        var cilinIntMesh = new THREE.Mesh(cilinInt, material);
        var toroMesh = new THREE.Mesh(toro, material);

        // creamos el objeto CSG
        var csg = new CSG();
        csg.union ([cilinExtMesh, toroMesh]);
        csg.subtract([cilinIntMesh]);

        this.tazaMesh = csg.toMesh();

        this.add(this.tazaMesh);
    }

    update(){
        this.rotation.y += 0.01;
    }
}

export { Taza };