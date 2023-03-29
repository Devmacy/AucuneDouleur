<script setup lang="ts">
import * as THREE from 'three'
import {onMounted, reactive} from "vue";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import {getRandomNumberR} from "@/utils/number/randomNumbe";

const threeState = reactive({
  fps: ''
})

onMounted(() => {
  // 创建一个三维场景
  const scene = new THREE.Scene()

  // 定义几何体长宽高
  const boxParameter = {
    width: 80,
    height: 40,
    depth: 10
  }
  // 创建一个几何体
  const cube = new THREE.BoxGeometry(boxParameter.width, boxParameter.height, boxParameter.depth)

  // 定义材质
  const materialParameter = {
    color: 0xff0000,
    transparent: true,//开启透明
    opacity: 0.9,//透明度
  }
  // 基础网格材质,不受光照影响
  // const material = new THREE.MeshBasicMaterial(materialParameter)
  // 兰伯特（漫反射）网格材质，受光照影响
  const material = new THREE.MeshLambertMaterial(materialParameter)

  // 创建一个网格模型
  const mesh = new THREE.Mesh(cube, material)

// 定义网格模型的位置
  const meshPos = {
    x: 40,
    y: 20,
    z: 5
  }
  mesh.position.set(meshPos.x, meshPos.y, meshPos.z)

  // 创建点光源
  const pointLight = new THREE.PointLight(0xffffff, 1)
  //创建环境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
  // 创建一个平行光
  const directionLight = new THREE.DirectionalLight(0xff0000, 0.45)
  directionLight.position.set(140, 120, 100)
  directionLight.target = mesh
  // 创建平行光可视化
  // const directionLightHelper = new THREE.DirectionalLightHelper(directionLight)
  // 创建点光源可视化
  // const pointLightHelper = new THREE.PointLightHelper(pointLight)
  // 更换位置
  pointLight.position.set(0, 0, 0)

  // 创建一个三维坐标参考系
  const axesHelper = new THREE.AxesHelper(300)

  // 将网格模型添加到场景中
  scene.add(mesh)
  // 将三维坐标参考系添加到场景中
  scene.add(axesHelper)
  // 将光源添加到场景中
  scene.add(pointLight)
  // 将光源添加到场景中
  scene.add(ambientLight)
  // 将光源添加到场景中
  // scene.add(directionLight)
  // 将光源辅助添加到场景中
  // scene.add(pointLightHelper)
  // 将光源辅助添加到场景中
  // scene.add(directionLightHelper)

  // 创建一个webGl渲染器
  const webGLRender = new THREE.WebGLRenderer()

  // 网页画布
  const renderCanvas = document.getElementById('mainScene') as HTMLElement

  // 定义渲染输出的画布尺寸高和宽
  const width = renderCanvas.clientWidth
  const height = renderCanvas.clientHeight
  // 创建一个透视投影相机
  const cameraParams = {
    fov: 50,
    aspect: width / height,
    near: 1,
    far: 2000
  }
  const camera = new THREE.PerspectiveCamera(cameraParams.fov, cameraParams.aspect, cameraParams.near, cameraParams.far)
  // 设置相机所在位置，是在mesh的内部还是外部
  const cameraPosition = {
    x: 200,
    y: 200,
    z: 200
  }
  camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z)
  const cameraLookAt = {
    x: 0,
    y: 0,
    z: 0
  }
  // 设置相机对准的位置
  camera.lookAt(cameraLookAt.x, cameraLookAt.y, cameraLookAt.z)

  // 设置渲染器的渲染大小
  webGLRender.setSize(width, height)

  //执行渲染方法
  webGLRender.render(scene, camera)

  renderCanvas.appendChild(webGLRender.domElement)

  /**
   * 引入性能监视器
   */
  const stats = new (Stats as any)()
  // 设置监视器位置
  stats.domElement.style.position = 'absolute'
  stats.domElement.style.left = '0px'
  stats.domElement.style.top = '0px'
  renderCanvas.appendChild(stats.domElement)

  /**
   * 批量创建长方体，测试性能
   */
  const randomBoxNum = 800
  for (let i = 0; i < randomBoxNum; i++) {
    // 创建一个几何体
    const cube = new THREE.BoxGeometry(getRandomNumberR(0, 20), getRandomNumberR(0, 20), getRandomNumberR(0, 20))
    // 定义材质
    const materialParameter = {
      color: 0xff00ff,
    }
    // 兰伯特（漫反射）网格材质，受光照影响
    const material = new THREE.MeshLambertMaterial(materialParameter)
    // 创建一个网格模型
    const mesh = new THREE.Mesh(cube, material)
    mesh.position.set(getRandomNumberR(-100, 100), getRandomNumberR(-100, 100), getRandomNumberR(-100, 100))
    scene.add(mesh)
  }

  // 创建clock对象
  // 帧数 frames/time
  const clock = new THREE.Clock()
  const render = () => {
    // 计算时间间隔(ms)
    const spt = clock.getDelta() * 1000
    threeState.fps = (1000 / spt).toFixed(2)
    mesh.rotateY(0.01)
    mesh.rotateX(0.01)
    mesh.rotateZ(0.01)
    stats.update()
    //执行渲染方法
    webGLRender.render(scene, camera)
    // 理想情况1s 60times
    requestAnimationFrame(render)
  }
  render()

  // 创建相机轨道控制器，
  const controls = new OrbitControls(camera, webGLRender.domElement)
  controls.addEventListener('change', () => {
    //不和循环渲染同时使用
    //webGLRender.render(scene, camera)
  })

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
    <div v-if="false" class="tip">fps:{{ threeState.fps }}</div>
    <div class="main-scene" id="mainScene"/>
  </div>
</template>

<style scoped lang="scss">
.main {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  position: relative;

  .tip {
    position: absolute;
    color: #ffffff
  }

  .main-scene {
    height: 100%;
    width: 100%;
    border: 1px solid #333333;
    box-sizing: border-box
  }
}
</style>
