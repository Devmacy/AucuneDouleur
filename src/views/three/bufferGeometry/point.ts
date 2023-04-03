// 定义顶点坐标数据(类型化数组）
import * as THREE from "three";

const vertices = new Float32Array([
    0, 0, 0,
    100, 0, 0,
    0, 100, 0,
    0, 0, 100,
    0, 100, 100,
    100, 0, 100,
    100, 100, 0,
    100, 100, 100,
])
// 创建属性缓冲对象
const bufferAttribute = new THREE.BufferAttribute(vertices, 3)

// 创建类型几何体
const geometry = new THREE.BoxGeometry()
// 设置几何体attribute位置属性
geometry.attributes.position = bufferAttribute

// 创建点模型材质
const pointsMaterial = new THREE.PointsMaterial({color: 0xffff00, size: 10})
// 定义点模型
const pointModel = new THREE.Points(geometry, pointsMaterial)

export {
    pointModel
}
