import * as THREE from '../libs/three.module.js'

class Reloj extends THREE.Object3D{
    constructor(gui,title){
        super();

        this.velocidad = 1;
        this.radio = 4;
        this.createGUI(gui,title);

        // creamos las marcas

        var marcasGeo = new THREE.SphereGeometry(0.3,10,10);
        var marcasMat = new THREE.MeshPhongMaterial({color: "green"});
        var marcas = []
        for (var i=0; i < 12; i++){
            marcas.push(new THREE.Mesh(marcasGeo, marcasMat));
            var x = Math.cos(i*2*Math.PI / 12);
            var z = Math.sin(i*2*Math.PI/12);
            marcas[i].position.set(this.radio*x,0,this.radio*z);
            this.add(marcas[i]);
        }
        this.manecilla = new THREE.Mesh(marcasGeo, new THREE.MeshPhongMaterial({color: "red"}));
        this.manecilla.position.set(3.5* Math.cos(i*2*Math.PI / 12),0,0);
        this.manecillaGiratoria = new THREE.Object3D();
        this.manecillaGiratoria.add(this.manecilla);
        this.add(this.manecillaGiratoria);
        this.clock = new THREE.Clock();
    }

    createGUI(gui,title){
        this.guiControls = {
            velocidad: this.velocidad,
        }

        var folder = gui.addFolder(title);
        folder.add(this.guiControls,'velocidad',-12,12,1).name("Velocidad (marcas/s): ").listen();
    }

    update(){
        this.velocidad = this.guiControls.velocidad;
        var segundosTranscurridos = this.clock.getDelta();
        this.manecillaGiratoria.rotation.y -= segundosTranscurridos *(Math.PI/6 * this.velocidad);
    }
}

export {Reloj};