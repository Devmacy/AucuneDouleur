import * as THREE from "three";

// 定义几何体
const geometry = new THREE.BoxGeometry(100, 100, 100)
// 定义材质
const material = new THREE.MeshLambertMaterial({
    color: 0x00ffff,
})

const mesh1 = new THREE.Mesh(geometry, material)
const mesh2 = new THREE.Mesh(geometry, material)
mesh2.translateY(150)

// 创建组对象
const group = new THREE.Group()
group.add(mesh1)
mesh1.add(mesh2)
group.rotateZ(Math.PI / 6)
group.scale.set(0.5, 0.5, 0.5)
export {
    group
}
