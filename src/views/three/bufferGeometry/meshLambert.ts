import * as THREE from "three";

const vertices = new Float32Array([
    0, 0, 0,
    0, 0, 100,
    100, 0, 100,

    0, 0, 0,
    100, 0, 100,
    100, 0, 0,

])

const normal = new Float32Array([
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,

    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
])

// 创建属性缓冲对象
const bufferAttribute = new THREE.BufferAttribute(vertices, 3)
// 创建类型几何体
const geometry = new THREE.BufferGeometry()
// 设置几何体attribute位置属性
geometry.attributes.position = bufferAttribute
// 设置顶点法向量
geometry.attributes.normal = new THREE.BufferAttribute(normal, 3)

// 创建线模型材质
const meshLambertMaterial = new THREE.MeshLambertMaterial({color: 0xffff00, side: THREE.DoubleSide})
// 定义线模型
const meshLambertModel = new THREE.Mesh(geometry, meshLambertMaterial)

export {
    meshLambertModel
}
