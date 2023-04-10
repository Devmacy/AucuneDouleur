import * as THREE from 'three'
import earth from '@/assets/texture/land_ocean_ice_cloud_2048.jpg'
import {DoubleSide} from "three";

const geometry = new THREE.SphereGeometry(50, 64, 32)
const buffGeometry = new THREE.BufferGeometry()
const circleGeometry = new THREE.CircleGeometry(50, 64)
const planeGeometry = new THREE.PlaneGeometry(1000, 1000)

const vertices = new Float32Array([
    0, 0, 0,
    200, 0, 0,
    0, 100, 0,

    0, 100, 0,
    200, 0, 0,
    200, 100, 0,
])

// 创建纹理坐标
const uvs = new Float32Array([
    0, 0,
    0.5, 0,
    0, 0.5,
    0, 0.5,
    0.5, 0,
    0.5, 0.5
])

//创建一个纹理加载器
const textureLoad = new THREE.TextureLoader()
const textureRes = await textureLoad.loadAsync(earth)
textureRes.wrapS = THREE.RepeatWrapping
textureRes.wrapT = THREE.RepeatWrapping

// textureRes.wrapS = THREE.RepeatWrapping
// textureRes.wrapT = THREE.RepeatWrapping
// textureRes.repeat.set(4, 4)

// 创建属性缓冲对象
buffGeometry.attributes.position = new THREE.BufferAttribute(vertices, 3)
buffGeometry.attributes.uv = new THREE.BufferAttribute(uvs, 2)

const bufferMaterial = new THREE.MeshBasicMaterial({
    side: DoubleSide,
    map: textureRes,
    // 透明贴图设置此项
    // transparent: true
})

const mesh1 = new THREE.Mesh(buffGeometry, bufferMaterial)
const mesh2 = new THREE.Mesh(circleGeometry, bufferMaterial)
const mesh3 = new THREE.Mesh(planeGeometry, bufferMaterial)
mesh1.translateX(100)
mesh2.translateX(100)
mesh2.translateY(-100)
mesh3.rotateX(Math.PI / 2)

const material = new THREE.MeshLambertMaterial({
    map: textureRes
})

const mesh = new THREE.Mesh(geometry, material)

export {
    mesh,
    mesh1,
    mesh2,
    mesh3,
    textureRes
}
