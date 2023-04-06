// 创建点光源
import * as THREE from "three";

const pointLight = new THREE.PointLight(0xffffff, 1)
// 点光源位置
pointLight.position.set(-300, 300, 300)
//创建环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)

export {
    pointLight,
    ambientLight
}
