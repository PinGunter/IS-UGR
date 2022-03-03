import * as THREE from '../libs/three.module.js'

class Caja extends THREE.Object3D{
    constructor(gui, titleGui){
        super();

        // creamos la GUI que usaremos para manejar
        // las propiedades de la caja
        this.createGUI(gui, titleGui);

        var geoCaja = new THREE.BoxBufferGeometry(1,1,1);
        var matCaja = new THREE.MeshNormalMaterial({flatShading: true});
        this.caja = new THREE.Mesh(geoCaja,matCaja);
        this.eje = new THREE.AxesHelper(5);

        this.add(this.caja);
        this.add(this.eje);
        this.rotationSpeed = 0.01;

    }

    createGUI(gui,titleGui){
        this.guiControls = {
            tamX: 1.0,
            tamY: 1.0,
            tamZ: 1.0,
            autoRot: true,
            axis: true,
        }

        var folder = gui.addFolder(titleGui);
        folder.add (this.guiControls, 'tamX', 0.1,5.0,0.1).name("Dimensión X: ");
        folder.add (this.guiControls, 'tamY', 0.1,5.0,0.1).name("Dimensión Y: ");
        folder.add (this.guiControls, 'tamZ', 0.1,5.0,0.1).name("Dimensión Z: ");
        folder.add (this.guiControls, 'autoRot').name('Rotación Automática').onChange ( (value) => this.autoRotate(value));
        folder.add (this.guiControls, 'axis').name('Ejes: ').onChange( (value) => this.setAxisVisible(value));
    }

    setAxisVisible (valor) {
        this.eje.visible = valor;
      }

    update(){
        this.scale.set(this.guiControls.tamX, this.guiControls.tamY, this.guiControls.tamZ);
        this.caja.rotation.y += this.rotationSpeed;
    }

    autoRotate(value){
        if (value === true){
            this.rotationSpeed = 0.01;
        } else{
            this.rotationSpeed = 0;
        }
    }

}

export { Caja };