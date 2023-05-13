import * as THREE from 'three'

class GenerateMesh {
    radius: number
    map: THREE.Texture

    constructor(radius: number, map: THREE.Texture) {
        this.radius = radius
        this.map = map
    }

    getSphereGeometry() {
        const geometry = new THREE.SphereGeometry(this.radius, 80, 80)
        const material = new THREE.MeshLambertMaterial({
            map: this.map
        })
        return new THREE.Mesh(geometry, material)
    }
}

export {
    GenerateMesh
}
