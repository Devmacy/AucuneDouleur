import * as THREE from "three";

const top = [50, 100, 50]
const origin = [0, 0, 0]

const vertices = new Float32Array([
    ...origin, 0, 0, 100, ...top,
    ...origin, ...top, 100, 0, 0,
    0, 0, 100, 100, 0, 100, ...top,
    100, 0, 100, 100, 0, 0, ...top,
    ...origin, 100, 0, 100, 0, 0, 100,
    ...origin, 100, 0, 0, 100, 0, 100
])

// 创建属性缓冲对象
const bufferAttribute = new THREE.BufferAttribute(vertices, 3)

// 创建类型几何体
const geometry = new THREE.BufferGeometry()
// 设置几何体attribute位置属性
geometry.attributes.position = bufferAttribute

// 创建线模型材质
const meshMaterial = new THREE.MeshBasicMaterial({color: 0xffff00, side: THREE.DoubleSide})
// 定义线模型
const meshModel = new THREE.Mesh(geometry, meshMaterial)

export {
    meshModel
}
