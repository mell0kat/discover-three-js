let container, camera, renderer, scene, mesh

const init = () => {
  container = document.querySelector('#scene-container')

  scene = new THREE.Scene()

  scene.background = new THREE.Color(0x567528)

  const FOV = 35
  const aspectRatio = container.clientWidth / container.clientHeight
  const NEAR = 0.1
  // A scene 100m big is a decent size for a scene
  const FAR = 100

  // viewing fustrum = four-sided rectangular prism with top cut off
  camera = new THREE.PerspectiveCamera(FOV, aspectRatio, NEAR, FAR)

  camera.position.set(0, 0, 10)

  // BufferGeometry = newer and faster version of geometry
  const geometry = new THREE.BoxBufferGeometry(2, 2, 2)

  // Mesh Basics completely ignore light
  // whereas Mesh Standard is "physically correct", but lower performance
  const material = new THREE.MeshStandardMaterial({ color: 0x9d3750 })

  // Meshes are the most common kind of visible object in 3D computer graphics
  mesh = new THREE.Mesh(geometry, material)

  scene.add(mesh)
  // could do scene.remove() if we needed to

  const light = new THREE.DirectionalLight(0xffffff, 4.0)
  light.position.set(10, 10, 10)
  scene.add(light)

  renderer = new THREE.WebGLRenderer({ antialias: true })

  renderer.setSize(container.clientWidth, container.clientHeight)
  // this helps with mobile responsiveness
  renderer.setPixelRatio(window.devicePixelRatio)

  container.appendChild(renderer.domElement)
}

const update = () => {
  mesh.rotation.x += 0.01
  mesh.rotation.y += 0.01
  mesh.rotation.z += 0.01
}

const render = () => {
  renderer.render(scene, camera)
}

const onWindowResize = () => {
  camera.aspect = container.clientWidth / container.clientHeight

  // update camera's frustum
  camera.updateProjectionMatrix()

  renderer.setSize(container.clientWidth, container.clientHeight)
}

window.addEventListener('resize', onWindowResize)
/* The game(animation) loop:
  Get user input
  Update animations
  Render the frame
*/
init()

// setAnimationLoop abstracts away the logic of requestAnimationFrame, which behaves differently in WebXR
renderer.setAnimationLoop(() => {
  render()
  update()
})
// if we need to cancel animation, we can so renderer.setAnimationLoop(null);
