import { CSG } from '../libs/CSG-v2.js';
import * as THREE from '../libs/three.module.js';

class PiezaL extends THREE.Object3D{
    constructor(){
        super();
        // el plan de de construccion es dos cajas que forman la L
        // se añade caja para la curva
        // se le quita un cilindro a la ultima caja (para la curva)
        // se le quitan cilindros en forma de embudo para los agujeros

        var material = new THREE.MeshNormalMaterial();


        // creacion de geometrias
        var cajaSup = new THREE.BoxGeometry(12,1,3);
        var cajaIzq = new THREE.BoxGeometry(1,13,3);
        var cajaRedonda = new THREE.BoxGeometry(4,4,3);
        var curva = new THREE.CylinderGeometry(3.5,3.5,4,24,24);
        var embudo1 = new THREE.CylinderGeometry(0.4,1,1);
        var embudo2 = new THREE.CylinderGeometry(1,0.4,1);
        // posicionamos las geometrias

        cajaSup.translate(0,12,0);
        cajaIzq.translate(-6.5,6,0);
        cajaRedonda.translate(-4,10,0);
        curva.rotateX(Math.PI/2.0);
        curva.translate(-2.5,8.05,0);
        embudo1.translate(2,12,0)
        embudo2.rotateZ(-Math.PI/2);
        embudo2.translate(-6.5,2,0);
        // construimos los mesh
        var cajaSupMesh = new THREE.Mesh(cajaSup, material);
        var cajaIzqMesh = new THREE.Mesh(cajaIzq, material);
        var cajaRedondaMesh = new THREE.Mesh(cajaRedonda, material);
        var curvaMesh = new THREE.Mesh(curva,material);
        var embudo1Mesh = new THREE.Mesh(embudo1, material);
        var embudo2Mesh = new THREE.Mesh(embudo2, material);

        // operamos 
        var csg = new CSG();
        csg.union([ cajaIzqMesh, cajaSupMesh, cajaRedondaMesh]);
        csg.subtract([curvaMesh, embudo1Mesh, embudo2Mesh]);

        this.pieza = csg.toMesh();
        this.pieza.position.set(6.5,0,0);
        this.add(this.pieza);
    }

    update(){

    }
}

export {PiezaL};