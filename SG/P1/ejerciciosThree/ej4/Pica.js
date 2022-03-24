import * as THREE from '../libs/three.module.js'
import {Tronco} from './Tronco.js'
class Pica extends THREE.Object3D {

    constructor(){
        super();
        var picaShape = new THREE.Shape();

        picaShape.moveTo( 0,0 );
        picaShape.bezierCurveTo(1.5,0.5,0.6,1.9,0,3);
        picaShape.bezierCurveTo(-0.6,1.9, -1.5, 0.5,0,0);
        
        
        const geometry = new THREE.ExtrudeGeometry( picaShape, {depth: 0.1});
        this.pica = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial({color: "blue"}) );
        this.pica.scale.set(0.6,0.6,0.6);
        this.tronco = new Tronco("blue");
        this.picaCompleta = new THREE.Object3D();
        this.picaCompleta.add(this.pica);
        this.picaCompleta.add(this.tronco);
        this.padre = new THREE.Object3D();
        this.padre.add(this.picaCompleta);
        this.add(this.padre);
        this.position.y = -0.6;
    }

    update(){
        // this.padre.rotation.z -= 0.01;
        // this.padre.position.x = 4;
        // this.picaCompleta.rotation.y += 0.01;
    }
}

export { Pica };