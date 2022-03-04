import * as THREE from '../libs/three.module.js'

class Cono extends THREE.Object3D {
    constructor(gui, titleGui){
        super();
        this.radio = 1;
        this.altura = 1,
        this.res = 5;


        this.createGUI(gui, titleGui);


        var geoCono = new THREE.ConeBufferGeometry(this.radio, this.altura, this.res);
        this.matCono = new THREE.MeshNormalMaterial({flatShading: true});
        this.cono = new THREE.Mesh(geoCono,this.matCono);
        this.eje = new THREE.AxesHelper(5);
        
        this.add(this.eje);
        this.add(this.cono);

        this.rotationSpeed = 0.01;
    }

    createGUI(gui, titleGui){

        this.guiControls = {
            radio: this.radio,
            altura: this.altura,
            res: this.res,
            autoRot: true,
            axis: true,
        }

        var folder = gui.addFolder(titleGui);
        folder.add(this.guiControls,'radio',1,5,0.5).name("Radio").onChange( (value) => this.updateRadio(value));
        folder.add(this.guiControls,'altura',1,10,1).name("Altura").onChange( (value) => this.updateAltura(value));
        folder.add(this.guiControls,'res',1,10,1).name("Resolución").onChange( (value) => this.updateRes(value));
        folder.add (this.guiControls, 'autoRot').name('Rotación Automática').onChange ( (value) => this.autoRotate(value));
        folder.add (this.guiControls, 'axis').name('Ejes: ').onChange( (value) => this.setAxisVisible(value));
    }

    updateRadio(valor){
        this.radio = valor;
        this.cono.geometry.dispose();
        this.remove(this.cono);
        var geoNueva = new THREE.ConeBufferGeometry(this.radio, this.altura, this.res);
        this.cono = new THREE.Mesh(geoNueva, this.matCono);
        this.add(this.cono);
    }

    updateAltura(valor){
        this.altura = valor;
        this.cono.geometry.dispose();
        this.remove(this.cono);
        var geoNueva = new THREE.ConeBufferGeometry(this.radio, this.altura, this.res);
        this.cono = new THREE.Mesh(geoNueva, this.matCono);
        this.add(this.cono);
    }

    updateRes(valor){
        this.res = valor;
        this.cono.geometry.dispose();
        this.remove(this.cono);
        var geoNueva = new THREE.ConeBufferGeometry(this.radio, this.altura, this.res);
        this.cono = new THREE.Mesh(geoNueva, this.matCono);
        this.add(this.cono);
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
        this.cono.rotation.y += this.rotationSpeed;
    }
}

export { Cono };