import * as THREE from '../libs/three.module.js';
import * as TWEEN from '../libs/tween.esm.js';
import { CSG } from '../libs/CSG-v2.js';

class Cascos extends THREE.Object3D{
    constructor(gui, title){
        super();
        // vamos a hacer unos cascos, operando con csg
        var material = new THREE.MeshNormalMaterial();
        // primero, la diadema
        var barridoShape = new THREE.Shape();
        barridoShape.moveTo(-1.7,0);
        barridoShape.bezierCurveTo(-1,2,1,2,1.7,0);
        var puntos = barridoShape.extractPoints(50).shape;
        puntos = this.vector2toVector3(puntos);

        var diademaShape = new THREE.Shape();
        diademaShape.moveTo(-1,0);
        diademaShape.quadraticCurveTo(0,1,1,0);

        var diademaBorrarShape = new THREE.Shape();
        diademaBorrarShape.moveTo(-0.8,0);
        diademaBorrarShape.quadraticCurveTo(0,0.5,0.8,0);

        var path = new THREE.CatmullRomCurve3(puntos);
        var diademaGeo = new THREE.ExtrudeGeometry(diademaShape, {extrudePath: path, steps: 50})
        this.diadema = new THREE.Mesh(diademaGeo, material);
        var diademaBorrarGeo = new THREE.ExtrudeBufferGeometry(diademaBorrarShape, {extrudePath: path, steps: 50})
        var diademaBorrado = new THREE.Mesh(diademaBorrarGeo, material);

        // orejera
        // - orejera exterior
        var orejeraExtIzqGeo = new THREE.SphereGeometry(1.3,20,20);
        orejeraExtIzqGeo.translate(-2,-1,0);
        var orejeraExtIzqMesh = new THREE.Mesh(orejeraExtIzqGeo, material);
        var orejeraExtDerGeo = new THREE.SphereGeometry(1.3,20,20);
        orejeraExtDerGeo.translate(2,-1,0);
        var orejeraExtDerMesh = new THREE.Mesh(orejeraExtDerGeo, material);
        // - borde orejera exterior
        var bordeIzqGeo = new THREE.CylinderGeometry(1.4,1.4,0.7,24,24);    
        bordeIzqGeo.rotateZ(Math.PI/2);
        bordeIzqGeo.translate(-2,-1,0);
        var bordeIzq = new THREE.Mesh(bordeIzqGeo, material);
        var bordeDerGeo = new THREE.CylinderGeometry(1.4,1.4,0.7,24,24);  
        bordeDerGeo.rotateZ(Math.PI/2);
        bordeDerGeo.translate(2,-1,0);
        var bordeDer = new THREE.Mesh(bordeDerGeo, material)

        // - orejeera interior
        var orejeraIntIzqGeo = new THREE.SphereGeometry(1.3,20,20);
        orejeraIntIzqGeo.translate(-1.3,-1,0);
        var orejearIntIzq = new THREE.Mesh(orejeraIntIzqGeo, material);

        var orejeraIntDerGeo = new THREE.SphereGeometry(1.3,20,20);
        orejeraIntDerGeo.translate(+1.3,-1,0);
        var orejearIntDer = new THREE.Mesh(orejeraIntDerGeo, material);
        
        var csg = new CSG();
        csg.union([this.diadema, orejeraExtIzqMesh, orejeraExtDerMesh, bordeIzq, bordeDer]);
        csg.subtract([diademaBorrado, orejearIntIzq, orejearIntDer]);
        this.meshCSG = csg.toMesh();
        this.meshCSG.scale.set(0.5,0.5,0.5);
        this.add(this.meshCSG);

        // definimos la trayectoria de los cascos
        this.curva = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-5,0,0),
            new THREE.Vector3(0,5,0),
            new THREE.Vector3(5,0,0),
        ]);

        var origen = {p:0};
        var destino = {p:1};
        var that = this;

        var movimiento = new TWEEN.Tween(origen)
        .to(destino,2000)
        .easing(TWEEN.Easing.Linear.None)
        .onUpdate( () => {
            var t = origen.p;
            var posicion = that.curva.getPointAt(t);
            that.meshCSG.position.copy(posicion);
        })
        .yoyo(true)
        .repeat(Infinity)
        .start();
    }

    vector2toVector3(puntos){
        var v3 = [];
        puntos.forEach((v) => {
            v3.push(new THREE.Vector3(v.x, v.y, 0));
        });
        return v3;
    }

    update(){
        this.meshCSG.rotation.y += 0.01;
        TWEEN.update(); 
    }
}

export { Cascos };