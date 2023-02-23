import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { randFloat, randInt } from "three/src/math/MathUtils";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.x = 0;
camera.position.y = 80;
camera.position.z = 125;
camera.rotation.x = 6.7;

renderer.render(scene, camera);
/*
const geometry = new THREE.TorusGeometry(10,3,16,100)
const material= new THREE.MeshStandardMaterial({color:0xff0000})
const torus = new THREE.Mesh(geometry,material)
scene.add(torus)
*/
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(
  camera.position.x,
  camera.position.y,
  camera.position.z
);
const intensity = 1;
const ambientLight = new THREE.AmbientLight(0x000000, intensity);
scene.add(pointLight, ambientLight);
const spotLight = new THREE.SpotLight(0xffffff);
spotLight.angle = 0;
spotLight.penumbra = 0.2;
spotLight.position.set(2, 3, 3);
spotLight.castShadow = true;
spotLight.shadow.camera.near = 3;
spotLight.shadow.camera.far = 10;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
scene.add(spotLight);
/*
const gridHelper = new THREE.GridHelper(200,50)
const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(gridHelper,lightHelper)
*/
const spaceTexture = new THREE.TextureLoader().load("wp4579352.webp");
//scene.background = spaceTexture

const loader = new GLTFLoader();

var car2;
loader.load(
  "/models/octane_-_rocket_league_car/scene.gltf",
  function (gltf) {
    car2 = gltf.scene;
    car2.position.x = 0;
    car2.position.y = 80;
    car2.position.z = 0;
    car2.rotation.y = 0.5;
    car2.rotation.z = 0.5;
    car2.scale.set(0.3, 0.3, 0.3);

    scene.add(car2);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);
const BoostTexture = new THREE.TextureLoader().load("/octaník.png");

const geometriese = new THREE.PlaneGeometry(835, 497);
const materialase = new THREE.MeshBasicMaterial({
  map: BoostTexture,
  transparent: true,
});
const planecar = new THREE.Mesh(geometriese, materialase);

planecar.position.x = 0;
planecar.position.y = 12.5;
planecar.position.z = 0;
planecar.rotation.x = 0;
planecar.scale.set(0.3, 0.3, 0.3);

planecar.scale.set(0.05, 0.05, 0.05);
scene.add(planecar);

const BoostTextur = new THREE.TextureLoader().load(
  "/[CITYPNG.COM]HD Fire Rocket Flame Exhaust Jet PNG - 532x1152.png"
);

const geometries = new THREE.PlaneGeometry(532, 1152);
const materialas = new THREE.MeshBasicMaterial({
  map: BoostTextur,
  transparent: true,
});
const plane = new THREE.Mesh(geometries, materialas);
plane.position.x = -33;
plane.position.y = 70;
plane.position.z = 25;
plane.rotation.y = 0.5;

plane.rotation.z = 1.571 + 0.5;
plane.scale.set(0.05, 0.05, 0.05);
scene.add(plane);

var ball;
loader.load(
  "/models/ball/scene.gltf",
  function (gltf) {
    ball = gltf.scene;
    ball.position.x = 25;
    ball.position.y = 105;
    ball.position.z = -15;
    ball.rotation.z = 0.5;
    ball.rotation.y = +3.1415926536;
    ball.scale.set(12, 12, 12);

    scene.add(ball);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

const pointLight2 = new THREE.PointLight(0xffffff, 10);
pointLight2.position.set(200, 200, 0);
scene.add(pointLight2);
const lightHelper2 = new THREE.PointLightHelper(pointLight2);
scene.add(lightHelper2);

const pointLight3 = new THREE.PointLight(0xffffff, 1);
pointLight3.position.set(0, 0, 200);
scene.add(pointLight3);

function addLinePoint(start, end) {
  var LinePoints = [];
  var Prob = start - end;

  for (var i = 0; i < 100; i++) {
    LinePoints.push((Prob / 100) * i + start);
  }
  return LinePoints;
}

function addFire() {
  var PonitsX = addLinePoint(0, 50);
  var PonitsY = addLinePoint(0, 50);

  for (var i = 0; i < 100; i++) {
    const rad = randFloat(0.5, 3); // ui: radius
    const detail = 1; // ui: detail
    const geometr = new THREE.IcosahedronGeometry(rad, detail);
    switch (randInt(0, 5)) {
      case 0:
        var materiaal = new THREE.MeshBasicMaterial({ color: 0xffaf00 });
        break;
      case 1:
        var materiaal = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        break;
      case 2:
        var materiaal = new THREE.MeshBasicMaterial({ color: 0xfffa00 });
        break;
      case 3:
        var materiaal = new THREE.MeshBasicMaterial({ color: 0xff5500 });
        break;
      case 4:
        var materiaal = new THREE.MeshBasicMaterial({ color: 0xcc5500 });
        break;
      case 5:
        var materiaal = new THREE.MeshBasicMaterial({ color: 0xff5f00 });
        break;
    }

    const fire = new THREE.Mesh(geometr, materiaal);
    fire.position.set(PonitsX[i], PonitsY[i], 0);
    console.log("true");
    scene.add(fire);
  }
}
/*addFire();
 */

const radius = 7; // ui: radius
const segments = 24; // ui: segments
const geometry = new THREE.CircleGeometry(radius, segments);
const EarthTextur = new THREE.TextureLoader().load("/Grass_001_COLOR.jpg");

const normalEarthTextur = new THREE.TextureLoader().load("/Grass_001_NORM.jpg");
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  map: EarthTextur,
  normalMap: normalEarthTextur,
});
const earth = new THREE.Mesh(geometry, material);
earth.rotation.x = -1.517;

scene.add(earth);

earth.scale.set(15, 15, 15);
pointLight.intensity = 5;
pointLight.position.set(0, 80, 50);

const controls = new OrbitControls(camera, renderer.domElement);
/*
camera.position.x = 40.63810459268703;
camera.position.y = 92.48556168757217;
camera.position.z = 36.882442998741666;
camera.rotation.x = 0.01639613007512799;
camera.rotation.y = 0.3962955941961987;
camera.rotation.z = -0.006329449466082911;*/

camera.position.x = -10.25979479412354;
camera.position.y = 12.8813883007432;
camera.position.z = 39.022817924497254;
camera.rotation.x = 0.0210720522423324;
camera.rotation.y = 0.121007626369135675;
camera.rotation.z = -0.0021856340186275767;

function animate() {
  requestAnimationFrame(animate);

  //  car.rotateY(0.001)
  //controls.update
  renderer.render(scene, camera);

  /*
first scene::
pos x  -10.25979479412354
pos y  12.8813883007432
pos z  39.022817924497254
rot x  0.0210720522423324
rot y  0.121007626369135675
rot z  -0.0021856340186275767
*/
  /*
second scene::
pos x  40.63810459268703
pos y  92.48556168757217
pos z  36.882442998741666
rot x  0.01639613007512799
rot y  0.3962955941961987
rot z  -0.006329449466082911
*/
}

/*
  console.log("pos x " + camera.position.x);
  console.log("pos y " + camera.position.y);
  console.log("pos z " + camera.position.z);
  console.log("rot x " + camera.rotation.x);
  console.log("rot y " + camera.rotation.y);
  console.log("rot z " + camera.rotation.z);
*/
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  if (-t < 800) {
    var deltaPosX = -10.25979479412354 - 40.63810459268703;
    var deltaPosY = 12.8813883007432 - 92.48556168757217;
    var deltaPosZ = 39.022817924497254 - 36.882442998741666;
    var deltaRotX = 0.0210720522423324 - 0.01639613007512799;
    var deltaRotY = 0.121007626369135675 - 0.3962955941961987;
    var deltaRotZ = -0.0021856340186275767 - -0.006329449466082911;

    var AddPosX = (deltaPosX / 800) * t + -10.25979479412354;
    var AddPosY = (deltaPosY / 800) * t + 12.8813883007432;
    var AddPosZ = (deltaPosZ / 800) * t + 39.022817924497254;
    var AddRotX = (deltaRotX / 800) * t + 0.0210720522423324;
    var AddRotY = (deltaRotY / 800) * t + 0.121007626369135675;
    var AddRotZ = (deltaRotZ / 800) * t + -0.0021856340186275767;

    camera.position.x = AddPosX;
    camera.position.y = AddPosY;
    camera.position.z = AddPosZ;
    camera.rotation.x = AddRotX;
    camera.rotation.y = AddRotY;
    camera.rotation.z = AddRotZ;
    console.log(t);
  }
}
document.body.onscroll = moveCamera;
animate();
