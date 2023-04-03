import * as THREE from "three";

const cubeGeometry = new THREE.BoxGeometry(100, 100, 100)

const cubeMaterial = new THREE.MeshLambertMaterial({
    color: 0x00fffff
})

const model = new THREE.Mesh(cubeGeometry, cubeMaterial)

const v3 = new THREE.Vector3(0, 100, 0)
v3.normalize()
// model.position.x = 100
// model.position.x = 0
// model.scale.x = 1.5
// model.scale.x = 1
// model.translateZ(100)
// model.translateZ(-100)
// model.rotateX(30)
// model.rotateX(-30)
model.material.setValues({
    wireframe: true
})
model.translateOnAxis(v3, 50)
export {
    model
}
