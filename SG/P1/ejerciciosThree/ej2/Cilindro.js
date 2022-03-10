import *  as THREE from '../libs/three.module.js'

class Cilindro extends THREE.Object3D {
    constructor(gui, titleGui){
        super();
        
        // radios, altura y resolucion
        this.radioInf = 1;
        this.radioSup = 1;
        this.altura = 1;
        this.res = 5;

        this.createGUI(gui,titleGui);

        var geoCilin = new THREE.CylinderBufferGeometry(this.radioSup, this.radioInf, this.altura, this.res);
        this.matCilin = new THREE.MeshNormalMaterial({flatShading: true});
        this.cilindro = new THREE.Mesh(geoCilin, this.matCilin);

        this.eje = new THREE.AxesHelper(5);

        this.position.set(0,-3,0);
        this.add(this.eje);
        this.add(this.cilindro);
        
        this.rotationSpeed = 0.01;
    }

    createGUI(gui, titleGui){
        this.guiControls = {
            radioInf: this.radioInf,
            radioSup: this.radioSup,
            altura: this.altura,
            res: this.res,
            autoRot: true,
            axis: true,
        }

        var folder = gui.addFolder(titleGui);
        folder.add(this.guiControls,'radioInf', 0.1,3,0.1).name("Radio Inferior").onChange( (value) => this.updateRadioInf(value));
        folder.add(this.guiControls,'radioSup', 0.1,3,0.1).name("Radio Superio").onChange( (value) => this.updateRadioSup(value));
        folder.add(this.guiControls,'altura', 0,10,1).name("Altura").onChange( (value) => this.updateAltura(value));
        folder.add(this.guiControls,'res', 0,15,1).name("Resolución").onChange( (value) => this.updateRes(value));
        folder.add (this.guiControls, 'autoRot').name('Rotación Automática').onChange ( (value) => this.autoRotate(value));
        folder.add (this.guiControls, 'axis').name('Ejes: ').onChange( (value) => this.setAxisVisible(value));

    }

    reconstruir(){
        this.cilindro.geometry.dispose();
        this.remove(this.cilindro);
        var geoNueva = new THREE.CylinderBufferGeometry(this.radioSup, this.radioInf, this.altura, this.res);
        this.cilindro = new THREE.Mesh(geoNueva, this.matCilin);
        this.add(this.cilindro);
    }

    updateRadioInf(valor){
        this.radioInf = valor;
        this.reconstruir();
    }

    updateRadioSup(valor){
        this.radioSup = valor;
        this.reconstruir();
    }

    updateAltura(valor){
        this.altura = valor;
        this.reconstruir();
    }

    updateRes(valor){
        this.res = valor;
        this.reconstruir();
    }

    setAxisVisible (valor) {
        this.eje.visible = valor;
    }

    autoRotate(value){
        if (value === true){
            this.rotationSpeed = 0.01;
        } else{
            this.rotationSpeed = 0;
        }
    }

    update(){
        this.position.set(0,-3,0);
        this.cilindro.rotation.y += this.rotationSpeed;
    }
}

export { Cilindro };