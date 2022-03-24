import * as THREE from '../libs/three.module.js'
import { Pica } from './Pica.js'
import { Corazon } from './Corazon.js'
import { Diamante } from './Diamante.js'
import { Trebol } from './Trebol.js'

class Cartas extends THREE.Object3D{
    constructor(){
        super();
        this.pica = new Pica();
        this.corazon = new Corazon();
        this.diamante = new Diamante();
        this.trebol = new Trebol();

        this.pica.position.set(-3,3,0);
        this.corazon.position.set(-3,-3,0);
        this.diamante.position.set(3,3,0);
        this.trebol.position.set(3,-3,0);
        this.trebol.scale.set(1.2,1.2,1.2);

        this.add(this.pica);
        this.add(this.corazon);
        this.add(this.diamante);
        this.add(this.trebol);
    }

    update(){
        this.pica.update();
        this.corazon.update();
        this.diamante.update();
        this.trebol.update();
        this.rotation.z += 0.01;
    }
}


export { Cartas };