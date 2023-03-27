<script setup lang="ts">
import * as THREE from 'three'

// import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

// 创建一个三维场景
const scene = new THREE.Scene()

// 创建一个几何体
const cube = new THREE.BoxGeometry(100, 100, 100)

// 定义材质
const basicMaterial = new THREE.MeshBasicMaterial({color: 0xff0000})

// creat a mesh module
const mesh = new THREE.Mesh(cube, basicMaterial)

// definition a position
mesh.position.set(0, 0, 0)

// add mesh to a scene
scene.add(mesh)
</script>

<template>
  123
</template>

<style scoped lang="scss">
</style>
