<script setup lang="ts">
import {onMounted} from "vue";
import {camera, scene, stats, webGLRender} from "@/views/three/bufferGeometry/scene";
import {pointModel} from "@/views/three/bufferGeometry/point";

onMounted(() => {
  // 网页画布
  const renderCanvas = document.getElementById('mainScene') as HTMLElement
  // 定义渲染输出的画布尺寸宽
  const width = renderCanvas.clientWidth
  // 定义渲染输出的画布尺寸宽
  const height = renderCanvas.clientHeight

  // 将模型添加到场景中
  scene.add(pointModel)

  camera.aspect = width / height
  camera.updateProjectionMatrix();

  // 设置渲染器的渲染大小
  webGLRender.setSize(width, height)
  //执行渲染方法
  webGLRender.render(scene, camera)
  // 挂载dom
  renderCanvas.appendChild(webGLRender.domElement)
  renderCanvas.appendChild(stats.domElement)
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
