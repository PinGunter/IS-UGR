import * as THREE from '../libs/three.module.js'
import { Tronco } from './Tronco.js'
class Trebol extends THREE.Object3D{
    constructor(){
        super();
        
        var trebolShape = new THREE.Shape();
        trebolShape.arc(2,2,4,Math.PI,2*Math.PI+2);
        trebolShape.arc(-2,4,4,3*Math.PI/2+0.7,3*Math.PI+0.9)
        trebolShape.arc(-2,-4,4)

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