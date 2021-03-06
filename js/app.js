let container, camera, renderer, scene, mesh, controls

const init = () => {
  container = document.querySelector('#scene-container')

  scene = new THREE.Scene()

  scene.background = new THREE.Color(0xbed8a8)

  createCamera()
  createControls()
  createLights()
  createMeshes()
  createRenderer()

  // setAnimationLoop abstracts away the logic of requestAnimationFrame, which behaves differently in WebXR
  renderer.setAnimationLoop(() => {
    render()
    update()
  })
  // if we need to cancel animation, we can so renderer.setAnimationLoop(null);
}

function createCamera() {
  const FOV = 35
  const aspectRatio = container.clientWidth / container.clientHeight
  const NEAR = 0.1
  // A scene 100m big is a decent size for a scene
  const FAR = 100
  // viewing fustrum = four-sided rectangular prism with top cut off
  camera = new THREE.PerspectiveCamera(FOV, aspectRatio, NEAR, FAR)

  camera.position.set(-2, 2, 10)
}

function createControls() {
  controls = new THREE.OrbitControls(camera, container)
}

function createLights() {
  // global illumination = direct illumination (directional light) + indirect illumination (ambient light)
  const ambientLight = new THREE.HemisphereLight(
    0xddeeff, // bright sky color
    0x202020, // dim ground color,
    5 // intensity
  )
  scene.add(ambientLight)

  const mainLight = new THREE.DirectionalLight(0xffffff, 5)
  mainLight.position.set(10, 10, 10)
  scene.add(mainLight)
}

function createMeshes() {
  // BufferGeometry = newer and faster version of geometry
  const geometry = new THREE.BoxBufferGeometry(2, 2, 2)

  const textureLoader = new THREE.TextureLoader()

  const texture = textureLoader.load('textures/uv_test_bw.png')
  texture.encoding = THREE.sRGBEncoding

  // helps textures look good "at an angle"
  // high number = lower performance
  texture.anisotropy = 16

  // Mesh Basics completely ignore light
  // whereas Mesh Standard is "physically correct", but lower performance
  const material = new THREE.MeshStandardMaterial({
    // color map
    map: texture,
    color: 0x9d3750,
  })

  // Meshes are the most common kind of visible object in 3D computer graphics
  mesh = new THREE.Mesh(geometry, material)

  scene.add(mesh)
  // could do scene.remove() if we needed to
}

function createRenderer() {
  renderer = new THREE.WebGLRenderer({ antialias: true })

  renderer.setSize(container.clientWidth, container.clientHeight)
  // this helps with mobile responsiveness
  renderer.setPixelRatio(window.devicePixelRatio)

  // set gamma correction so output colors look correct on our screen
  renderer.gammaFactor = 2.2
  renderer.gammaOutput = true

  // use SI units
  renderer.physicallyCorrectLights = true

  container.appendChild(renderer.domElement)
}

// called once per frame
// avoid heavy computation
const update = () => {}

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
