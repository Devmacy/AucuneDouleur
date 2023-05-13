import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

// 创建一个三维场景
const scene = new THREE.Scene()

const initGrid = () =>{
    const gridHelper = new THREE.GridHelper(1000, 50);
    scene.add(gridHelper)
}

//创建环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 1)

// 创建一个透视投影相机
const camera = new THREE.PerspectiveCamera(76, 14 / 9, 0.1, 200000)
// 设置相机所在位置
camera.position.set(1000, 1000, 1000)
// 设置相机对准的位置
camera.lookAt(0, 0, 0)

// 创建一个三维坐标参考系
const axesHelper = new THREE.AxesHelper(300)

// 创建一个webGl渲染器
const webGLRender = new THREE.WebGLRenderer()

// 创建相机轨道控制器
const controls = new OrbitControls(camera, webGLRender.domElement)
controls.target.set(0, 0, 0)
controls.update()
controls.addEventListener('change', () => {
    webGLRender.render(scene, camera)
})

// 将三维坐标参考系添加到场景中
scene.add(axesHelper)
// 将光源添加到场景中
scene.add(ambientLight)

export {
    webGLRender,
    camera,
    axesHelper,
    ambientLight,
    controls,
    scene
}
