import * as THREE from '../libs/three.module.js'
import { Tronco } from './Tronco.js'
class Trebol extends THREE.Object3D{
    constructor(){
        super();
        
        var trebolShape = new THREE.Shape();
        trebolShape.moveTo(0,4);
        trebolShape.quadraticCurveTo(0,0,4,0);
        trebolShape.quadraticCurveTo(10,0,7.5,5.4);
        trebolShape.quadraticCurveTo(4.5,9,2,7.2);
        trebolShape.quadraticCurveTo(12,14.7,0,16);

        const geometry = new THREE.ExtrudeGeometry( trebolShape, {depth: 0.1});
        this.trebol = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial({color: "blue"}) );
        // this.trebol.scale.set(0.6,0.6,0.6);
        this.tronco = new Tronco("blue");
        this.add(this.trebol);
        // this.add(this.tronco);
    }

    update(){

    }
}

export { Trebol };