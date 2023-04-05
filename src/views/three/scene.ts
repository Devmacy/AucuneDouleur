import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";

// 创建点光源
const pointLight = new THREE.PointLight(0xffffff, 1)
// 点光源位置
pointLight.position.set(-300, 300, 100)
//创建环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)

// 创建一个透视投影相机
const camera = new THREE.PerspectiveCamera(40, 14 / 9, 0.1, 2000)
// 设置相机所在位置
camera.position.set(300, 300, 300)
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

//引入性能监视器
// eslint-disable-next-line
const stats = new (Stats as any)()
// 设置监视器位置
stats.domElement.style.position = 'absolute'
stats.domElement.style.left = '0px'
stats.domElement.style.top = '0px'

export {
    webGLRender,
    camera,
    axesHelper,
    pointLight,
    ambientLight,
    stats,
    controls
}
