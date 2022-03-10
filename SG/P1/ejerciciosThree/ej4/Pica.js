import * as THREE from '../libs/three.module.js'

class Pica extends THREE.Object3D {

    constructor(){
        super();
        var heartShape = new THREE.Shape();
        
        heartShape.moveTo( 2.5, 2.5 );
        heartShape.bezierCurveTo( 2.5, 2.5, 2.0, 0, 0, 0 );
        heartShape.bezierCurveTo( - 3.0, 0, - 3.0, 3.5, - 3.0, 3.5 );
        heartShape.bezierCurveTo( - 3.0, 5.5, - 1.0, 7.7, 2.5, 9.5 );
        heartShape.bezierCurveTo( 6.0, 7.7, 8.0, 5.5, 8.0, 3.5 );
        heartShape.bezierCurveTo( 8.0, 3.5, 8.0, 0, 5.0, 0 );
        heartShape.bezierCurveTo( 3.5, 0, 2.5, 2.5, 2.5, 2.5 );
        
        
        const geometry = new THREE.ExtrudeGeometry( heartShape, {depth: 0.1});
        
        this.mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial({color: "red"}) );

        this.mesh.position.set(0,0,-10); 
        this.add(this.mesh);
    }

    update(){
        this.mesh.rotation.y += 0.01;
        this.mesh.position.set(0,0,-10); 
        this.add(this.mesh);
    }
}

export { Pica };