import * as THREE from '../libs/three.module.js'

class ColumnaCorazon extends THREE.Object3D{
    constructor(){
        super();
        var corazonShape = new THREE.Shape();

        corazonShape.moveTo( 2,0 );
        corazonShape.bezierCurveTo(4,1,4,2,4,2);
        corazonShape.bezierCurveTo(4,4,2,3,2,2);
        corazonShape.bezierCurveTo(2,3,0,4,0,2);
        corazonShape.bezierCurveTo(0,2,0,1,2,0);
        
        var curva = new THREE.CatmullRomCurve3(
            [
                new THREE.Vector3( -10, 0 ,10 ),
                new THREE.Vector3( -5, 5,10 ),
                new THREE.Vector3( 0, 0,10 ),
                new THREE.Vector3( 5, -5,10 ),
                new THREE.Vector3( 10, 0,0 )
            ]
        );
        const geometry = new THREE.ExtrudeGeometry( corazonShape, {extrudePath: curva});
        geometry.scale(0.1,0.4,0.4);
        geometry.translate(0.23,-0.2,-0.03)
        geometry.rotateZ(Math.PI / 100);
        this.corazon = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial({color: "green"}) );

        this.add(this.corazon);
    }

    update(){
        this.rotation.z += 0.01;
        this.rotation.y += 0.01;
    }
}

export { ColumnaCorazon };