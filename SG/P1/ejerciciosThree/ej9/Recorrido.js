import * as THREE from '../libs/three.module.js';
import * as TWEEN from '../libs/tween.esm.js';

class Recorrido extends THREE.Object3D{
    constructor(){
        super();
        this.curvaIzq = new THREE.CatmullRomCurve3([
            new THREE.Vector3(0,2,-1), 
            new THREE.Vector3(-4,3,2),
            new THREE.Vector3(-6,0,3),  
            new THREE.Vector3(-2,2,-2),
            new THREE.Vector3(0,1,1),
        ]);

        this.curvaDer = new THREE.CatmullRomCurve3([
            new THREE.Vector3(0,1,1),
            new THREE.Vector3(2,1,4),
            new THREE.Vector3(3,4,1),
            new THREE.Vector3(0,2,-1)
        ])

        var puntosIzq = this.curvaIzq.getPoints(50);
        var geoIzq = new THREE.BufferGeometry().setFromPoints(puntosIzq);
        var mat = new THREE.LineBasicMaterial({color: "black"});
        this.trayectoriaIzq = new THREE.Line(geoIzq, mat);
        this.add(this.trayectoriaIzq);

        var puntosDer = this.curvaDer.getPoints(50);
        var geoDer = new THREE.BufferGeometry().setFromPoints(puntosDer);
        this.trayectoriaDer = new THREE.Line(geoDer, mat);
        this.add(this.trayectoriaDer)

        var geoNave = new THREE.ConeGeometry(0.5,1,3);
        var matNave = new THREE.MeshToonMaterial({color: 0xFFFFFF});
        this.nave = new THREE.Mesh(geoNave, matNave);
        this.nave.rotateX(Math.PI/2);

        this.naveCompleta = new THREE.Object3D();
        this.naveCompleta.add(this.nave);
        this.add(this.naveCompleta);

        var origen = {p:0};
        var destino = {p:1};
        var that = this;

        var movimientoDer = new TWEEN.Tween(origen)
        .to(destino, 8000)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(() => {
            var t = origen.p;
            var posicion = that.curvaDer.getPointAt(t);
            that.naveCompleta.position.copy(posicion);
            var tangente = that.curvaDer.getTangentAt(t);
            posicion.add(tangente);
            that.naveCompleta.lookAt(posicion);
        })
        .onComplete(() => origen.p = 0)
        .start();

        var movimientoIzq = new TWEEN.Tween(origen)
        .to(destino, 4000)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(() => {
            var t = origen.p;
            var posicion = that.curvaIzq.getPointAt(t);
            that.naveCompleta.position.copy(posicion);
            var tangente = that.curvaIzq.getTangentAt(t);
            posicion.add(tangente);
            that.naveCompleta.lookAt(posicion);
        })
        .onComplete(() => origen.p = 0);

        movimientoDer.chain(movimientoIzq);
        movimientoIzq.chain(movimientoDer);

    }

    update(){
        TWEEN.update();
    }
}

export { Recorrido };