import * as THREE from '../libs/three.module.js'

class Esfera extends THREE.Object3D {
    constructor(gui, titleGui){
        super();

        // radio y resolucion
        this.radio = 1;
        this.resEcu = 3;
        this.resMeri = 3;

        this.createGUI(gui,titleGui);

        var geoEsfer = new THREE.SphereBufferGeometry(this.radio, this.resEcu, this.resMeri);
        this.matEsfer = new THREE.MeshNormalMaterial({flatShading: true});
        this.esfera = new THREE.Mesh(geoEsfer, this.matEsfer);
        this.eje = new THREE.AxesHelper(5);
        this.position.set(0,7,0);

        this.add(this.esfera);
        this.add(this.eje);

        this.rotationSpeed = 0.01;
    }

    createGUI(gui, titleGui){
        this.guiControls = {
            radio: this.radio,
            resEcu: this.resEcu,
            resMeri: this.resMeri,
            autoRot: true,
            axis: true,
        }

        var folder = gui.addFolder(titleGui);
        folder.add(this.guiControls,'radio',1,5,0.5).name("Radio").onChange( (value) => this.updateRadio(value));
        folder.add(this.guiControls,'resEcu',1,15,1).name("Res. Ecuador").onChange( (value) => this.updateResEcu(value));
        folder.add(this.guiControls,'resMeri',1,15,1).name("Res. Meridiano").onChange( (value) => this.updateResMeri(value));
        folder.add (this.guiControls, 'autoRot').name('Rotación Automática').onChange ( (value) => this.autoRotate(value));
        folder.add (this.guiControls, 'axis').name('Ejes: ').onChange( (value) => this.setAxisVisible(value));
    }

    reconstruir(){
        this.esfera.geometry.dispose();
        this.esfera.geometry = new THREE.SphereBufferGeometry(this.radio, this.resEcu, this.resMeri);
    }

    updateRadio(valor){
        this.radio = valor;
        this.reconstruir();
    }

    updateResEcu(valor){
        this.resEcu = valor;
        this.reconstruir();
    }

    updateResMeri(valor){
        this.resMeri = valor;
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
        this.position.set(0,7,0);
        this.esfera.rotation.y += this.rotationSpeed;
    }
}

export { Esfera };