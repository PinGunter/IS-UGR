import * as THREE from '../libs/three.module.js'
import { Tronco } from './Tronco.js'
class Trebol extends THREE.Object3D{
    constructor(){
        super();
        
        var trebolShape = new THREE.Shape();
        trebolShape.arc(2,2,4,Math.PI,2*Math.PI+2);
        trebolShape.arc(-2,4,4,3*Math.PI/2+0.7,3*Math.PI+0.9)
        trebolShape.arc(-2,-4,4)

        const geometry = new THREE.ExtrudeGeometry( trebolShape, {depth: 0.6});
        geometry.scale(0.1,0.1,0.1);
        geometry.translate(0.23,-0.2,-0.03)
        geometry.rotateZ(Math.PI / 100);
        this.trebol = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial({color: "blue"}) );
        this.tronco = new Tronco("blue");
        this.tronco.scale.set(0.55,1.3,0.55);
        this.trebolCompleto = new THREE.Object3D();
        this.trebolCompleto.add(this.trebol);
        this.trebolCompleto.add(this.tronco);
        this.add(this.trebolCompleto);
    }

    update(){
        this.trebolCompleto.rotation.y += 0.01;
        this.rotation.z -= 0.01;

    }
}

export { Trebol };