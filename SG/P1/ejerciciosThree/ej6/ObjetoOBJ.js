import * as THREE from '../libs/three.module.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'

class ObjetoOBJ extends THREE.Object3D{
    constructor(){
        super();
        var materialLoader = new MTLLoader();
        var objectLoader = new OBJLoader();
        materialLoader.load('mustang.mtl',
        (materials) =>{
            objectLoader.setMaterials(materials);
            objectLoader.load('mustang.obj',
            (object) =>{
                this.add(object);
            }, null, null);
        });
    }

    update(){
    }
}

export {ObjetoOBJ};