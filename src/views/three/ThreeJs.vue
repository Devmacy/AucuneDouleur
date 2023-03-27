<script setup lang="ts">
import * as THREE from 'three'
import {onMounted} from "vue";

onMounted(() => {
  // 创建一个三维场景
  const scene = new THREE.Scene()

  // 定义几何体长宽高
  const cubeWidth = 50
  const cubeHeight = 50
  const cubeDepth = 50
  // 创建一个几何体
  const cube = new THREE.BoxGeometry(cubeWidth, cubeHeight, cubeDepth)

  // 定义材质
  const basicColor = {color: 0xff0000}
  const basicMaterial = new THREE.MeshBasicMaterial(basicColor)

// 创建一个网格模型
  const mesh = new THREE.Mesh(cube, basicMaterial)

// 定义网格模型的位置
  const meshPos = {
    x: 0,
    y: 0,
    z: 0
  }
  mesh.position.set(meshPos.x, meshPos.y, meshPos.z)

  // 将网格模型添加到场景中
  scene.add(mesh)

  // 创建一个webGl渲染器
  const webGLRender = new THREE.WebGLRenderer()

  // 网页画布
  const renderCanvas = document.getElementById('mainScene') as HTMLElement

  // 定义渲染输出的画布尺寸高和宽
  const width = renderCanvas.clientWidth
  const height = renderCanvas.clientHeight
  // 创建一个透视投影相机
  const fov = 50
  const aspect = width / height
  const near = 0.1
  const far = 2000
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  // 设置相机所在位置，是在mesh的内部还是外部
  const cameraPosition = {
    x: 100,
    y: 100,
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
