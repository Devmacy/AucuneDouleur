import * as THREE from "three";

const top = [50, 100, 50]
const origin = [0, 0, 0]
const xAxisPos = [100, 0, 0]
const yAxisPos = [0, 100, 0]
const zAxisPos = [0, 0, 100]
const xyAxisPos = [100, 100, 0]
const xzAxisPos = [100, 0, 100]
const zyAxisPos = [0, 100, 100]

// const vertices = new Float32Array([
//     ...origin, 0, 0, 100, ...top,
//     ...origin, ...top, 100, 0, 0,
//     0, 0, 100, 100, 0, 100, ...top,
//     100, 0, 100, 100, 0, 0, ...top,
//     ...origin, 100, 0, 100, 0, 0, 100,
//     ...origin, 100, 0, 0, 100, 0, 100
// ])

const simpleVertices = new Float32Array([
    ...origin,
    ...top,
    ...xAxisPos,
    ...yAxisPos,
    ...zAxisPos,
    ...xyAxisPos,
    ...xzAxisPos,
    ...zyAxisPos
])

// 定义索引
const index = new Uint16Array([
    0, 4, 1,
    4, 6, 1,
    6, 2, 1,
    0, 2, 1,
    0, 4, 6,
    0, 2, 6
])

// 创建属性缓冲对象
const bufferAttribute = new THREE.BufferAttribute(simpleVertices, 3)

// 创建类型几何体
const geometry = new THREE.BufferGeometry()
// 设置几何体attribute位置属性
geometry.attributes.position = bufferAttribute
// 定义缓冲对象
geometry.index = new THREE.BufferAttribute(index, 1)

// 创建线模型材质
const meshMaterial = new THREE.MeshBasicMaterial({color: 0xffff00, side: THREE.DoubleSide})
// 定义线模型
const meshModel = new THREE.Mesh(geometry, meshMaterial)

export {
    meshModel
}
