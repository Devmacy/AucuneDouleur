<script setup lang="ts">
import {onMounted, reactive} from "vue";
import {camera, scene, stats, webGLRender} from "@/views/three/bufferGeometry/scene";
import {pointModel} from "@/views/three/bufferGeometry/point";
import {lineModel} from "@/views/three/bufferGeometry/line";
import {meshModel} from "@/views/three/bufferGeometry/mesh";
import {meshLambertModel} from "@/views/three/bufferGeometry/meshLambert";

const generalState = reactive({
  type: '点模型'
})

const setType = (value: string) => {
  scene.remove(lineModel)
  scene.remove(pointModel)
  scene.remove(meshModel)
  scene.remove(meshLambertModel)

  if (value === '点模型') {
    scene.add(pointModel)
  }
  if (value === '线模型') {
    scene.add(lineModel)
  }
  if (value === '网格模型') {
    scene.add(meshModel)
  }
  if (value === '网格Lambert模型') {
    scene.add(meshLambertModel)
  }
  webGLRender.render(scene, camera)
}

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
  stats.domElement.style.top = '40px'
  renderCanvas.appendChild(stats.domElement)
})
</script>

<template>
  <div class="main">
    <div class="tab">
      <el-radio-group v-model="generalState.type" @change="setType">
        <el-radio label="点模型" border/>
        <el-radio label="线模型" border/>
        <el-radio label="网格模型" border/>
        <el-radio label="网格Lambert模型" border/>
      </el-radio-group>
    </div>
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

  .tab {

  }

  .main-scene {
    flex: 1;
    width: 100%;
    box-sizing: border-box
  }
}
</style>
