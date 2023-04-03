// 定义顶点坐标数据(类型化数组）
import * as THREE from "three";

const vertices = new Float32Array([
    0, 0, 0,
    50, 100, 50,
    0, 0, 100,
    100, 0, 100,
    100, 0, 0,
    50, 100, 50,
    100, 0, 100
])
// 创建属性缓冲对象
const bufferAttribute = new THREE.BufferAttribute(vertices, 3)

// 创建类型几何体
const geometry = new THREE.BufferGeometry()
// 设置几何体attribute位置属性
geometry.attributes.position = bufferAttribute

// 创建线模型材质
const lineMaterial = new THREE.LineBasicMaterial({color: 0xffff00})
// 定义线模型
const lineModel = new THREE.Line(geometry, lineMaterial)

export {
    lineModel
}
