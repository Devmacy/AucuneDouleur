<script setup lang="ts">
import * as THREE from "three";
import {onMounted, reactive} from "vue";
import {ambientLight, axesHelper, camera, controls, pointLight, stats, webGLRender} from "@/views/three/scene";
import {model} from "@/views/three/object3D/v3";
import {group} from "@/views/three/object3D/group";

const generalState = reactive({
  type: '矢量'
})

// 创建一个三维场景
const scene = new THREE.Scene()
// 将三维坐标参考系添加到场景中
scene.add(axesHelper)
// 将光源添加到场景中
scene.add(pointLight)
// 将光源添加到场景中
scene.add(ambientLight)
controls.addEventListener('change', () => {
  webGLRender.render(scene, camera)
})

const setType = (value: string) => {
  // eslint-disable-next-line no-undef
  scene.remove(model, group)
  if (value === '矢量') {
    scene.add(model)
  }
  if (value === 'group') {
    scene.add(group)
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

  camera.aspect = width / height
  camera.updateProjectionMatrix();

  // 点光源位置
  pointLight.position.set(-300, 300, 300)

  generalState.type === '矢量' ? scene.add(model) : ''

  // 设置渲染器的渲染大小
  webGLRender.setSize(width, height)
  //执行渲染方法
  webGLRender.render(scene, camera)
  // 挂载dom
  renderCanvas.appendChild(webGLRender.domElement)
  const tab = document.getElementById('tab') as HTMLElement
  stats.domElement.style.top = tab.offsetHeight + 'px'
  renderCanvas.appendChild(stats.domElement)

  // const render = () => {
  //   model.rotation.x += 0.01
  //   model.rotation.y += 0.03
  //   webGLRender.render(scene, camera)
  //   stats.update()
  //   requestAnimationFrame(render)
  // }
  // render()

  // 4号楼的位置
  const positionV3 = new THREE.Vector3()
  group.traverseVisible((item) => {
    if (item.name === '洋房：4号楼') {
      item.getWorldPosition(positionV3)
      const helper = new THREE.AxesHelper(10)
      item.add(helper)
    }
  })
})

</script>

<template>
  <div class="main">
    <div id="tab" class="tab">
      <el-radio-group v-model="generalState.type" @change="setType">
        <el-radio-button label="矢量"/>
        <el-radio-button label="group"/>
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
