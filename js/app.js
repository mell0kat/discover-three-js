const container = document.querySelector('#scene-container')

const scene = new THREE.Scene()

scene.background = new THREE.Color('skyblue')

const FOV = 35
const aspectRatio = container.clientWidth / container.clientHeight
const NEAR = 0.1
// A scene 100m big is a decent size for a scene
const FAR = 100

// viewing fustrum = four-sided rectangular prism with top cut off
const camera = new THREE.PerspectiveCamera(FOV, aspectRatio, NEAR, FAR)

camera.position.set(0, 0, 10)

// BufferGeometry = newer and faster version of geometry
const geometry = new THREE.BoxBufferGeometry(2, 2, 2)

// Mesh Basics completely ignore light
const material = new THREE.MeshBasicMaterial()

// Meshes are the most common kind of visible object in 3D computer graphics
const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)
// could do scene.remove() if we needed to

const renderer = new THREE.WebGLRenderer()

renderer.setSize(container.clientWidth, container.clientHeight)
// this helps with mobile responsiveness
renderer.setPixelRatio(window.devicePixelRatio)

container.appendChild(renderer.domElement)

renderer.render(scene, camera)
