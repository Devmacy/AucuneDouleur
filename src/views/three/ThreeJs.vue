<script setup lang="ts">
import * as THREE from 'three'
import {onMounted} from "vue";

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
  // 创建点光源
  const pointLight = new THREE.PointLight(0xffffff, 0.8)
  // 更换位置
  pointLight.position.set(200,120,100)

// 创建一个网格模型
  const mesh = new THREE.Mesh(cube, material)

// 定义网格模型的位置
  const meshPos = {
    x: 40,
    y: 20,
    z: 5
  }
  mesh.position.set(meshPos.x, meshPos.y, meshPos.z)

  // 创建一个三维坐标参考系
  const axesHelper = new THREE.AxesHelper(100)

  // 将网格模型添加到场景中
  scene.add(mesh)
  // 将三维坐标参考系添加到场景中
  scene.add(axesHelper)
  // 将光源添加到场景中
  scene.add(pointLight)

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
    far: 300
  }
  const camera = new THREE.PerspectiveCamera(cameraParams.fov, cameraParams.aspect, cameraParams.near, cameraParams.far)
  // 设置相机所在位置，是在mesh的内部还是外部
  const cameraPosition = {
    x: 200,
    y: 120,
    z: 100
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
})
</script>

<template>
  <div class="main-scene" id="mainScene"/>
</template>

<style scoped lang="scss">
.main-scene {
  border: 1px solid #333333;
  height: 100%;
  width: 100%;
  box-sizing: border-box
}
</style>
