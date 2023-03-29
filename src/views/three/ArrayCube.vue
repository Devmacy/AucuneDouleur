<script setup lang="ts">
import {onMounted} from "vue";
import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

onMounted(() => {
  // 网页画布
  const renderCanvas = document.getElementById('mainScene') as HTMLElement
  // 定义渲染输出的画布尺寸宽
  const width = renderCanvas.clientWidth
  // 定义渲染输出的画布尺寸宽
  const height = renderCanvas.clientHeight

  // 创建一个三维场景
  const scene = new THREE.Scene()
  // 创建一个几何体
  const cube = new THREE.BoxGeometry(10, 10, 10)
  // 创建兰伯特（漫反射）网格材质，受光照影响
  const material = new THREE.MeshLambertMaterial({color: 0x00ffff, transparent: true, opacity: 0.8})
  // 沿着x轴创建一个网格模型
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      for (let k = 0; k < 10; k++) {
        // 创建一个网格模型
        const mesh = new THREE.Mesh(cube, material)
        // 定义网格模型的位置
        mesh.position.set(i * 20, j * 20, k * 20)
        // 将网格模型添加到场景中
        scene.add(mesh)
      }
    }
  }
  // 创建点光源
  const pointLight = new THREE.PointLight(0xffffff, 1)
  // 点光源位置
  pointLight.position.set(-300, 300, 100)
  //创建环境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
  // 创建一个三维坐标参考系
  const axesHelper = new THREE.AxesHelper(300)
  // 创建一个透视投影相机
  const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 2000)
  // 设置相机所在位置
  camera.position.set(300, 300, 300)
  // 设置相机对准的位置
  camera.lookAt(0, 0, 0)
  // 创建一个webGl渲染器
  const webGLRender = new THREE.WebGLRenderer()

  // 创建相机轨道控制器
  const controls = new OrbitControls(camera, webGLRender.domElement)
  controls.target.set(0, 0, 0)
  controls.update()
  controls.addEventListener('change', () => {
    webGLRender.render(scene, camera)
  })
  /**
   * 引入性能监视器
   */
  const stats = new (Stats as any)()
  // 设置监视器位置
  stats.domElement.style.position = 'absolute'
  stats.domElement.style.left = '0px'
  stats.domElement.style.top = '0px'
  renderCanvas.appendChild(stats.domElement)

  // 将三维坐标参考系添加到场景中
  scene.add(axesHelper)
  // 将光源添加到场景中
  scene.add(pointLight)
  // 将光源添加到场景中
  scene.add(ambientLight)

  // 设置渲染器的渲染大小
  webGLRender.setSize(width, height)
  //执行渲染方法
  webGLRender.render(scene, camera)
  // 挂载dom
  renderCanvas.appendChild(webGLRender.domElement)

  /**
   * 监听窗口变化
   */
  window.addEventListener('resize', () => {
    // 网页画布
    let container = document.getElementById('mainScene') as HTMLElement

    // 重置canvas画布大小
    webGLRender.setSize(container.clientWidth, container.clientHeight)
    // 设置观察范围比
    camera.aspect = container.clientWidth / container.clientHeight
    camera.updateProjectionMatrix()
  })
})
</script>

<template>
  <div class="main">
    <div class="main-scene" id="mainScene"/>
  </div>
</template>

<style scoped lang="scss">
.main {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  position: relative;

  .main-scene {
    height: 100%;
    width: 100%;
    box-sizing: border-box
  }
}
</style>
