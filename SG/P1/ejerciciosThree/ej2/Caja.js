import * as THREE from '../libs/three.module.js'

class Caja extends THREE.Object3D{
    constructor(gui, titleGui){
        super();

        // creamos la GUI que usaremos para manejar
        // las propiedades de la caja
        this.createGUI(gui, titleGui);

        var geoCaja = new THREE.BoxBufferGeometry(1,1,1);
        var matCaja = new THREE.MeshNormalMaterial({flatShading: true});
        var caja = new THREE.Mesh(geoCaja,matCaja);

        this.add(caja);
    }
}