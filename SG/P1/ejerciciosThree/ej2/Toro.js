import * as THREE from '../libs/three.module.js'

class Toro extends THREE.Object3D {
    constructor(gui, titleGui){
        super();
        this.radioMain = 1;
        this.radioTubo = 0.4;
        this.resToro = 3;
        this.resTubo = 3;

        this.createGUI(gui, titleGui);

        var geoToro = new THREE.TorusBufferGeometry(this.radioMain,this.radioTubo,this.resTubo,this.resToro);
        this.matToro = new THREE.MeshNormalMaterial({flatShading: true});
        this.toro = new THREE.Mesh(geoToro, this.matToro);
        this.eje = new THREE.AxesHelper(5);

        this.position.set(0,7,7);

        this.add(this.toro);
        this.add(this.eje);

        this.rotationSpeed = 0.01;
    }

    createGUI(gui, titleGui){

        this.guiControls = {
            radioMain: this.radioMain,
            radioTubo: this.radioTubo,
            resToro: this.resToro,
            resTubo: this.resTubo,
            autoRot: true,
            axis: true,
        }

        var folder = gui.addFolder(titleGui);
        folder.add(this.guiControls,'radioMain',0.2,3,0.5).name("Radio Principal").onChange( (value) => this.updateRadioMain(value));
        folder.add(this.guiControls,'radioTubo',0.2,2,0.2).name("Radio Tubo").onChange( (value) => this.updateRadioTubo(value));
        folder.add(this.guiControls,'resToro',3,15,1).name("Res. Toro").onChange( (value) => this.updateResToro(value));
        folder.add(this.guiControls,'resTubo',3,15,1).name("Res. Tubo").onChange( (value) => this.updateResTubo(value));
        folder.add (this.guiControls, 'autoRot').name('Rotación Automática').onChange ( (value) => this.autoRotate(value));
        folder.add (this.guiControls, 'axis').name('Ejes: ').onChange( (value) => this.setAxisVisible(value));
    }

    reconstruir(){
        this.toro.geometry.dispose();
        this.toro.geometry = new THREE.TorusBufferGeometry(this.radioMain,this.radioTubo,this.resTubo,this.resToro);
    }

    updateRadioMain(valor){
        this.radioMain = valor;
        this.reconstruir();
    }

    updateRadioTubo(valor){
        this.radioTubo = valor;
        this.reconstruir();
    }

    updateResToro(valor){
        this.resToro = valor;
        this.reconstruir();
    }

    updateResTubo(valor){
        this.resTubo = valor;
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
        this.position.set(0,7,7);
        this.toro.rotation.y += this.rotationSpeed;
    }
}

export { Toro };