import * as THREE from '../libs/three.module.js'

class Icosaedro extends THREE.Object3D {
    constructor(gui, titleGui){
        super();
        this.radio = 1;
        this.subdiv = 1;


        this.createGUI(gui, titleGui);


        var geoIco = new THREE.IcosahedronBufferGeometry(this.radio, this.subdiv);
        this.matIco = new THREE.MeshNormalMaterial({flatShading: true});
        this.icosaedro = new THREE.Mesh(geoIco,this.matIco);
        this.eje = new THREE.AxesHelper(5);
        this.position.set(0,7,-7);
        
        this.add(this.eje);
        this.add(this.icosaedro);

        this.rotationSpeed = 0.01;
    }

    createGUI(gui, titleGui){

        this.guiControls = {
            radio: this.radio,
            subdiv: this.subdiv,
            autoRot: true,
            axis: true,
        }

        var folder = gui.addFolder(titleGui);
        folder.add(this.guiControls,'radio',1,5,0.5).name("Radio").onChange( (value) => this.updateRadio(value));
        folder.add(this.guiControls,'subdiv',1,5,1).name("Subdivisiones").onChange( (value) => this.updateSubdiv(value));
        folder.add (this.guiControls, 'autoRot').name('Rotación Automática').onChange ( (value) => this.autoRotate(value));
        folder.add (this.guiControls, 'axis').name('Ejes: ').onChange( (value) => this.setAxisVisible(value));
    }

    reconstruir(){
        this.icosaedro.geometry.dispose();
        this.remove(this.icosaedro);
        var geoNueva = new THREE.IcosahedronBufferGeometry(this.radio, this.subdiv);
        this.icosaedro = new THREE.Mesh(geoNueva, this.matIco);
        this.add(this.icosaedro);
    }

    updateRadio(valor){
        this.radio = valor;
        this.reconstruir();        
    }

    updateSubdiv(valor){
        this.subdiv = valor;
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
        this.position.set(0,7,-7);
        this.icosaedro.rotation.y += this.rotationSpeed;
    }
}

export { Icosaedro };