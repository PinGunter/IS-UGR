import * as THREE from '../libs/three.module.js'

class ColumnaTrebol extends THREE.Object3D{
    constructor(){
        super();
        var curva = new THREE.CatmullRomCurve3(
            [
                new THREE.Vector3(9,-6.7,0),
                new THREE.Vector3(1,0.6,0),
                new THREE.Vector3(10.6,7.88,0),
                new THREE.Vector3(2.7,11.1,0),
                new THREE.Vector3(5,1,0)
            ]
        );
        var trebolShape = new THREE.Shape();
        trebolShape.arc(2,2,4,Math.PI,2*Math.PI+2);
        trebolShape.arc(-2,4,4,3*Math.PI/2+0.7,3*Math.PI+0.9)
        trebolShape.arc(-2,-4,4)

        const geometry = new THREE.ExtrudeGeometry( trebolShape, {extrudePath: curva});
        geometry.scale(0.1,0.1,0.1);
        geometry.translate(0.23,-0.2,-0.03)
        geometry.rotateZ(Math.PI / 100);
        this.trebol = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial({color: "blue"}) );

        
        this.add(this.trebol);
    }

    update(){

    }
}

export { ColumnaTrebol };