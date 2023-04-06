<script setup lang="ts">
import {onMounted} from "vue";
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {ambientLight, pointLight} from "@/views/three/uv/light";
import {camera} from "@/views/three/uv/camera";
import {mesh, mesh1, mesh2, mesh3} from "@/views/three/uv/mesh";

// 创建一个三维场景
const scene = new THREE.Scene()
// 创建一个webGl渲染器
const webGLRender = new THREE.WebGLRenderer()

// 将光源添加到场景中
scene.add(pointLight)
// 将光源添加到场景中
scene.add(ambientLight)

// 创建相机轨道控制器
const controls = new OrbitControls(camera, webGLRender.domElement)
controls.addEventListener('change', () => {
  webGLRender.render(scene, camera)
})

onMounted(() => {
  // 网页画布
  const renderCanvas = document.getElementById('mainScene') as HTMLElement
  // 定义渲染输出的画布尺寸宽
  const width = renderCanvas.clientWidth
  // 定义渲染输出的画布尺寸宽
  const height = renderCanvas.clientHeight

  camera.aspect = width / height
  camera.updateProjectionMatrix();

  scene.add(mesh, mesh1, mesh2, mesh3)

  // 设置渲染器的渲染大小
  webGLRender.setSize(width, height)
  //执行渲染方法
  webGLRender.render(scene, camera)
  // 挂载dom
  renderCanvas.appendChild(webGLRender.domElement)
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
  display: flex;
  flex-direction: column;

  .main-scene {
    flex: 1;
    width: 100%;
    box-sizing: border-box
  }
}
</style>

