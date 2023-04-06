// 创建一个透视投影相机
import * as THREE from "three";

const camera = new THREE.PerspectiveCamera(40, 14 / 9, 0.1, 2000)
// 设置相机所在位置
camera.position.set(300, 300, 300)
// 设置相机对准的位置
camera.lookAt(0, 0, 0)

export {
    camera
}
