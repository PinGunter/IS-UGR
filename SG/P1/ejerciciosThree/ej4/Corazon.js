import * as THREE from '../libs/three.module.js'

class Corazon extends THREE.Object3D {

    constructor(){
        super();
        var corazonShape = new THREE.Shape();

        corazonShape.moveTo( 2,0 );
        corazonShape.bezierCurveTo(4,1,4,2,4,2);
        corazonShape.bezierCurveTo(4,4,2,3,2,2);
        corazonShape.bezierCurveTo(2,3,0,4,0,2);
        corazonShape.bezierCurveTo(0,2,0,1,2,0);
        
        
        const geometry = new THREE.ExtrudeGeometry( corazonShape, {depth: 0.1});
        geometry.translate(-2,-1.7,0);
        this.corazon = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial({color: "red"}) );
        this.corazon.scale.set(0.6,0.6,0.6);
        this.padre = new THREE.Object3D();
        this.padre.add(this.corazon);
        this.add(this.padre);

    }

    update(){
        this.corazon.rotation.y += 0.01;
        this.padre.rotation.z -= 0.01;
    }
}

export { Corazon };