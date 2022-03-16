import * as THREE from '../libs/three.module.js'

class ObjRevolucion extends THREE.Object3D {
    constructor(gui, titleGui){
        super();

        this.puntos = [];

        this.angle = Math.PI;
        this.resolution = 5;

        this.createGUI(gui,titleGui);
       
        // Puntos que definen al peon
        this.puntos.push(new THREE.Vector3(0.0,-1.4,0.0));
        this.puntos.push(new THREE.Vector3(1.0, -1.4, 0.0));
        this.puntos.push(new THREE.Vector3(1.0, -1.1, 0.0));
        this.puntos.push(new THREE.Vector3(0.5, -0.7, 0.0));
        this.puntos.push(new THREE.Vector3(0.4, -0.4, 0.0));
        this.puntos.push(new THREE.Vector3(0.4, 0.5, 0.0));
        this.puntos.push(new THREE.Vector3(0.5, 0.6, 0.0));
        this.puntos.push(new THREE.Vector3(0.3, 0.6, 0.0));
        this.puntos.push(new THREE.Vector3(0.5, 0.8, 0.0));
        this.puntos.push(new THREE.Vector3(0.55, 1.0, 0.0));
        this.puntos.push(new THREE.Vector3(0.5, 1.2, 0.0));
        this.puntos.push(new THREE.Vector3(0.3, 1.4, 0.0));
        this.puntos.push(new THREE.Vector3(0.0,1.4,0.0));
        
        // Creacion de la malla

        var geo = new THREE.LatheGeometry(this.puntos, this.resolution, 0, this.angle);
        this.material = new THREE.MeshNormalMaterial({flatShading: true})
        this.material.needsUpdate = true;
        this.obj = new THREE.Mesh(geo, this.material);

        // Creacion de una linea visible
        var lineGeometry = new THREE.BufferGeometry();
        lineGeometry.setFromPoints(this.puntos);
        this.line = new THREE.Line(lineGeometry, this.material);

        this.obj.position.set(2.5,1.4,0);
        this.line.position.set(-2.5,1.4,0);
        this.add(this.obj);
        this.add(this.line);
    }

    createGUI(gui, titleGui){
        this.guiControls = {
            resolution: this.resolution,
            angle: this.angle,
        };

        var folder = gui.addFolder(titleGui);

        folder.add(this.guiControls, "resolution", 1, 15, 1).name("Resolución").onChange( (value) => this.updateRes(value) );
        folder.add(this.guiControls, "angle", 1, 2*Math.PI, 0.5).name("Ángulo").onChange( (value) => this.updateAngle(value) );

    }

    reconstruir(){
        this.obj.geometry.dispose();
        this.obj.geometry = new THREE.LatheGeometry(this.puntos, this.resolution, 0, this.angle);        

    }

    updateAngle(angle){
        this.angle = angle;
        this.reconstruir();
    }

    updateRes(res){
        this.resolution = res;
        this.reconstruir();
    }

    update(){
        this.obj.position.set(2.5,1.4,0);
        this.line.position.set(-2.5,1.4,0);
    }
    
}

export { ObjRevolucion };