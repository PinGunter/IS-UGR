 
import * as THREE from '../libs/three.module.js'
 
class Tobogan extends THREE.Object3D {
  constructor () {
    super();
    
    var materialR = new THREE.MeshPhongMaterial({color: 0xef1111});
    var materialV = new THREE.MeshPhongMaterial({color: 0x11ef11});
    
    // ******* SECCIÓN *******
    
    // hacemos el Shape de la manera habitual
    
    var shape = new THREE.Shape ();
    shape.moveTo ( 0, 0);
    shape.lineTo ( 0, 2);
    shape.lineTo ( 2, 2);
    shape.bezierCurveTo (2.5, 2, 2.5, 1.5, 2, 1.5);
    shape.quadraticCurveTo ( 0.5, 1.5, 0.5, 1);
    shape.lineTo (0.5, -1);
    shape.quadraticCurveTo (0.5, -1.5, 2, -1.5);
    shape.bezierCurveTo (2.5, -1.5, 2.5, -2, 2, -2);
    shape.lineTo (0, -2);
    shape.lineTo ( 0,  0);
    
    // ******* LINEA DIRECTRIZ PARA EL BARRIDO
    
    // Es necesario que sea un array de Vector3
    // Pero muchas veces es más fácil hacer la línea mediante un Shape y extraer del Shape el array de puntos
    
    var lineShape = new THREE.Shape();
    lineShape.moveTo (0, 10);
    lineShape.quadraticCurveTo (1,10, 2,9);
    lineShape.quadraticCurveTo (10,0, 15,0);
    var points = lineShape.extractPoints (12).shape;
    
    // Pero el array de puntos que extraemos son Vector2 (solo 2 coordenadas), no nos sirven
    // Lo convertimos en un array de Vector3 (de 3 coordenadas) añadiendo la tercera coordenada, aunque sea cero.
    // Lo hacemos con el método que os proporciono abajo
    
    var points = this.vector2toVector3 (points);
    
    // Y ahora usamos el array de Vector3 para instanciar el camino que usaremos en el barrido
    var path = new THREE.CatmullRomCurve3 (points);
    
    // ******* FIGURA POR BARRIDO 
    
    var toboganGeom = new THREE.ExtrudeGeometry (shape, {steps: 48, extrudePath: path});
    this.tobogan = new THREE.Mesh (toboganGeom, materialR);
    this.tobogan.position.y = 2;
    this.add (this.tobogan);
    
    // ******* COMPROBACIÓN
    
    // Lo visualizamos y vemos si sale bien.
    
    // Como no sale bien, vemos cuánto habría que rotar el shape,
    // lo rotamos con el método que os proporciono 
    // y hacemos el barrido y el mesh con el nuevo shape
    
    var shapeRotado = this.rotateShape (shape, Math.PI/2);
    
    var toboganRotadoGeom = new THREE.ExtrudeGeometry (shapeRotado, {steps: 48, extrudePath: path});
    this.toboganRotado = new THREE.Mesh (toboganRotadoGeom, materialV);
    this.toboganRotado.position.z = 10;
    this.add (this.toboganRotado);
  }
  
  /* Para rotar el shape extraemos los puntos en un array y los rotamos el
   * ángulo que le hemos proporcionado.
   * Con ese array de puntos rotados creamos un nuevo shape y lo devolvemos.
   * La resolucion que se le da es para indicar en cuántos tramos se subdivide cada curva del shape. He puesto 6 por defecto, que es válida la mayoría de las veces; pero podéis invocar el método con la resolución que deseéis.
   */
  rotateShape (aShape, angle, resolucion = 6) {
    var points = aShape.extractPoints (resolucion).shape;
    var center = points[0];
    points.forEach ((p) => {
      p.rotateAround (center,angle);
    });
    return new THREE.Shape (points);
  }

  /* Cuando necesitéis pasar un array de puntos 2D (THREE.Vector2) a un array de puntos 3D (THREE.Vector3) lo podéis hacer con este método.
   * No es más que un bucle que construye los nuevos puntos añadiendo un 0 como tercera coordenada.
   */
  vector2toVector3 (v2) {
    var v3 = [];
    
    v2.forEach ((v) => {
      v3.push (new THREE.Vector3 (v.x, v.y, 0));
    });
    
    return v3;
  }

  update () {
    
  }
}

export { Tobogan }

