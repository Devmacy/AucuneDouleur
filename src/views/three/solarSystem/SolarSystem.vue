<script setup lang="ts">
import {onMounted} from "vue";
import {camera, scene, webGLRender} from "@/views/three/solarSystem/scene";
import {GenerateMesh} from "@/views/three/solarSystem/generateMesh";
import * as THREE from "three";
import Mercury from "@/assets/texture/2k_mercury.jpg";
import Venus from "@/assets/texture/2k_venus_surface.jpg";
import Earth from "@/assets/texture/2k_earth_daymap.jpg";
import Mars from "@/assets/texture/2k_mars.jpg";
import Jupiter from "@/assets/texture/2k_jupiter.jpg";
import Saturn from "@/assets/texture/2k_saturn.jpg";
import Uranus from "@/assets/texture/2k_uranus.jpg";
import Neptune from "@/assets/texture/2k_neptune.jpg";

const textureLoad = new THREE.TextureLoader()
const mercuryTexture = textureLoad.load(Mercury)
const venusTexture = textureLoad.load(Venus)
const earthTexture = textureLoad.load(Earth)
const marsTexture = textureLoad.load(Mars)
const jupiterTexture = textureLoad.load(Jupiter)
const saturnTexture = textureLoad.load(Saturn)
const uranusTexture = textureLoad.load(Uranus)
const neptuneTexture = textureLoad.load(Neptune)

onMounted(async () => {
  // 网页画布![](../../../assets/texture/2k_mercury.jpg)
  const renderCanvas = document.getElementById('mainScene') as HTMLElement
  // 定义渲染输出的画布尺寸宽
  const width = renderCanvas.clientWidth
  // 定义渲染输出的画布尺寸宽
  const height = renderCanvas.clientHeight

  camera.aspect = width / height
  camera.updateProjectionMatrix();

  const Mercury = new GenerateMesh(38, mercuryTexture).getSphereGeometry()
  const Venus = new GenerateMesh(94, venusTexture).getSphereGeometry()
  const Earth = new GenerateMesh(100, earthTexture).getSphereGeometry()
  const Mars = new GenerateMesh(53.2, marsTexture).getSphereGeometry()
  const Jupiter = new GenerateMesh(1121, jupiterTexture).getSphereGeometry()
  const Saturn = new GenerateMesh(945, saturnTexture).getSphereGeometry()
  const Uranus = new GenerateMesh(401, uranusTexture).getSphereGeometry()
  const Neptune = new GenerateMesh(388, neptuneTexture).getSphereGeometry()

  const AU = 2000
  const rotation = 180 * Math.PI

  Mercury.position.x += 0.39 * AU
  Venus.position.x += 0.72 * AU
  Earth.position.x += AU
  Mars.position.x += 1.52 * AU
  Jupiter.position.x += 5.20 * AU
  Saturn.position.x += 9.58 * AU
  Uranus.position.x += 19.18 * AU
  Neptune.position.x += 30.07 * AU

  Mercury.rotateZ(0.034 / rotation)
  Venus.rotateZ(2.64 / rotation)
  Earth.rotateZ(23.44 / rotation)
  Mars.rotateZ(25.19 / rotation)
  Jupiter.rotateZ(3.12 / rotation)
  Saturn.rotateZ(26.73 / rotation)
  Uranus.rotateZ(97.77 / rotation)
  Neptune.rotateZ(28.32 / rotation)
  scene.add(Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune)

  const earthRadius = Earth.position.x
  const clock = new THREE.Clock()
  const renderer = () => {
    const elapsedTime = clock.getElapsedTime()
    Earth.rotation.y += 0.001
    Earth.position.x = Math.cos(elapsedTime) * earthRadius
    Earth.position.z = Math.sin(elapsedTime) * earthRadius
    //执行渲染方法
    webGLRender.render(scene, camera)
    requestAnimationFrame(renderer)
  }

  // 设置渲染器的渲染大小
  webGLRender.setSize(width, height)

  // 挂载dom
  renderCanvas.appendChild(webGLRender.domElement)

  renderer()
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
