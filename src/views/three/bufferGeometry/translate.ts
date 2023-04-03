import * as THREE from "three";
import {DoubleSide} from "three";

// 创建类型几何体
const planeGeometry = new THREE.PlaneGeometry(100, 100)
planeGeometry.scale(2, 2, 1)
planeGeometry.translate(100, 0, 0)
planeGeometry.rotateX(-45)
// planeGeometry.center()
//创建材质
const material = new THREE.MeshLambertMaterial({
    color: 0x00ffff,
    side: DoubleSide
})
const planeMeshModel = new THREE.Mesh(planeGeometry, material)
export {
    planeMeshModel
}
