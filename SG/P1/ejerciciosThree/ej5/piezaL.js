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
        var rojo = new THREE.MeshPhongMaterial({color: "red"});
        var verde = new THREE.MeshPhongMaterial({color: "green"});
        var azul = new THREE.MeshPhongMaterial({color: "blue"});


        // creacion de geometrias
        var cajaSup = new THREE.BoxGeometry(12,1,3);
        var cajaIzq = new THREE.BoxGeometry(1,13,3);
        var cajaRedonda = new THREE.BoxGeometry(4,4,3);
        var curva = new THREE.CylinderGeometry(3.2,3.2,4,24,1);
        var embudo = new THREE.CylinderGeometry(3,2,0.4);

        // posicionamos las geometrias

        cajaSup.translate(0,12,0);
        cajaIzq.translate(-6.5,6,0);
        cajaRedonda.translate(-4,10,0);
        curva.rotateX(Math.PI/2.0);
        curva.translate(-2.9,8.4,0);

        // construimos los mesh
        var cajaSupMesh = new THREE.Mesh(cajaSup, rojo);
        var cajaIzqMesh = new THREE.Mesh(cajaIzq, verde);
        var cajaRedondaMesh = new THREE.Mesh(cajaRedonda, azul);
        var curvaMesh = new THREE.Mesh(curva,material);


        // operamos 
        var csg = new CSG();
        csg.union([ cajaIzqMesh, cajaSupMesh, cajaRedondaMesh]);
        csg.subtract([curvaMesh]);

        this.pieza = csg.toMesh();
        // this.add(curvaMesh)
        this.add(this.pieza);
    }

    update(){

    }
}

export {PiezaL};