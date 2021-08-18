import * as THREE from 'three'
import { Mesh } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
 import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import Stats from 'three/examples/jsm/libs/stats.module'

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x474747)
// scene.add(new THREE.AxesHelper(5))

 const light = new THREE.PointLight()
 light.position.set(2.5, 7.5, 3.5)
 scene.add(light)

const hemispherelight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 4)
scene.add (hemispherelight)

const spotlight = new THREE.SpotLight(0xffa95c,4);
scene.add (spotlight)

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    1000
)

camera.position.set(0,0.5,2);

 const renderer = new THREE.WebGLRenderer()
 renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 2.3;
renderer.shadowMap.enabled = true;
 renderer.setSize(window.innerWidth, window.innerHeight)
 document.body.appendChild(renderer.domElement)


const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true


     const loader = new GLTFLoader()
     loader.load(
         'models/magnum.glb',
         function (gltf) {
             gltf.scene.traverse(function (child) {
                 if ((child as THREE.Mesh).isMesh) {
                     const m = child as THREE.Mesh
                     m.receiveShadow = true
                     m.castShadow = true
                 }
                 if ((child as THREE.Light).isLight) {
                     const l = child as THREE.Light
                     l.castShadow = true
                     l.shadow.bias = -0.003
                     l.shadow.mapSize.width = 2048
                     l.shadow.mapSize.height = 2048
                 }
             })
             scene.add(gltf.scene)
         },
         (xhr) => {
             console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
         },
         (error) => {
             console.log(error)
         }
     )



window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

// const stats = Stats()
// document.body.appendChild(stats.dom)

function animate() {
    requestAnimationFrame(animate)

    controls.update()

    renderer.render(scene,camera);
    spotlight.position.set(
        camera.position.x +10,
        camera.position.y +10,
        camera.position.z +10,
    );


}

function render() {
    renderer.render(scene, camera)
    
}

animate()