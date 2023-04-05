import * as THREE from "three";

const group = new THREE.Group()
const group1 = new THREE.Group()
const group2 = new THREE.Group()
group.name = '小区'
group1.name = '洋房'
group2.name = '高楼'
// 定义几何体
const geometry1 = new THREE.BoxGeometry(20, 30, 10)
// 定义几何体
const geometry2 = new THREE.BoxGeometry(20, 60, 10)

for (let i = 0; i < 8; i++) {
    // 定义材质
    const material = new THREE.MeshLambertMaterial({
        color: 0x00ffff,
    })
    const mesh = new THREE.Mesh(geometry1, material)
    mesh.position.x = i * 30
    mesh.name = `${group1.name}：${i + 1}号楼`
    group1.add(mesh)
}

for (let i = 0; i < 8; i++) {
    // 定义材质
    const material = new THREE.MeshLambertMaterial({
        color: 0xff00ff,
    })
    const mesh = new THREE.Mesh(geometry2, material)
    mesh.position.x = i * 30
    mesh.name = `${group2.name}：${i + 8 + 1}号楼`
    group2.add(mesh)
}

group1.position.set(0, 15, 40)
group2.position.set(0, 30, 0)

group.add(group1, group2)

const node = group.getObjectByName('洋房：4号楼') as THREE.Mesh
(node.material as THREE.MeshLambertMaterial).color.set(0xff0000)

export {
    group
}
