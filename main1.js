/* eslint-disable no-unused-vars */
import * as THREE from 'three'

import * as dat from 'dat.gui'

import nebuls from './src/img/nebula.jpg'
import star from './src/img/stars.jpg'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'

const dog=new URL("./src/assets/Shiba/scene.gltf",import.meta.url)

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { render } from 'react-dom';
const renderer=new THREE.WebGL1Renderer();
renderer.shadowMap.enabled=true;
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera= new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight,0.1,1000);
const accesshelper=new THREE.AxesHelper(5);
scene.add(accesshelper)

const Orbit=new OrbitControls(camera,renderer.domElement);
camera.position.set(-10,30,30)
Orbit.update();




const geometry=new THREE.BoxGeometry();
const material=new THREE.MeshBasicMaterial({color:"red"})
const cube= new THREE.Mesh(geometry, material)

scene.add(cube)

const planeGeometry=new THREE.PlaneGeometry(30,30);
const PlaneMaterial=new THREE.MeshStandardMaterial({color:"white",side:THREE.DoubleSide});
const plane=new THREE.Mesh(planeGeometry, PlaneMaterial);
plane.receiveShadow = true;

scene.add(plane)
plane.rotation.x=-0.5*Math.PI;


const gridhelper=new THREE.GridHelper(30,10);
scene.add(gridhelper)


const sgeomatry=new THREE.SphereGeometry(4,50,50)
const smaterial=new THREE.MeshStandardMaterial({color:0x0000FF,wireframe:false})
const sphere=new THREE.Mesh(sgeomatry, smaterial)
scene.add(sphere)
sphere.castShadow=true


sphere.position.set(-10,10,0);

const textureLoader=new THREE.TextureLoader()
// scene.background=textureLoader.load(star)
const cubeeTextureLoader=new THREE.CubeTextureLoader();
scene.background=cubeeTextureLoader.load([nebuls,nebuls,star,star,star,star])

const box2MultiMaterial=[
    new THREE.MeshBasicMaterial({map:textureLoader.load(star)}),
    new THREE.MeshBasicMaterial({map:textureLoader.load(star)}),
    new THREE.MeshBasicMaterial({map:textureLoader.load(nebuls)}),
    new THREE.MeshBasicMaterial({map:textureLoader.load(star)}),
    new THREE.MeshBasicMaterial({map:textureLoader.load(nebuls)}),
    new THREE.MeshBasicMaterial({map:textureLoader.load(star)})

]
const box2geoomaetry=new THREE.BoxGeometry(4,4,4,)
const materialbox=new THREE.MeshBasicMaterial({
    map:textureLoader.load(nebuls)
})
const box2=new THREE.Mesh(box2geoomaetry, box2MultiMaterial)

scene.add(box2)
box2.position.set(0,15,10)


const gui=new dat.GUI();
// const ambientLight=new THREE.AmbientLight(0x33333333);
// scene.add(ambientLight)

// directional Light

// const directionalLight=new THREE.DirectionalLight(0xffffffff,1.25)
// scene.add(directionalLight)
// directionalLight.position.set(-30,30,0);
// directionalLight.castShadow=true
// directionalLight.shadow.camera.bottom=-12

// const dLightHelper=new THREE.DirectionalLightHelper(directionalLight,5);
// scene.add(dLightHelper)

// const directionLightShadowHelper=new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(directionLightShadowHelper)

const spotlight = new THREE.SpotLight(0xFFFFFF)
spotlight.position.set(-100,100,0)
spotlight.castShadow=true
spotlight.angle=0.2
scene.add(spotlight)

const spotlighthelper=new THREE.SpotLightHelper(spotlight)
scene.add(spotlighthelper)


// scene.fog=new THREE.Fog(0xFFFFFF,0,200)
// scene.fog=new THREE.FogExp2(0xFFFFFF,0)


renderer.setClearColor(0XFFEA00)
let step=0;
// let speed=0.05;

// const mousePointer=new THREE.Vector2();
// window.addEventListener("mousemove").onChange.add(e=>{
//     mousePointer.x=(e.clientX/window.innerWidth)*2-1;
//     mousePointer.y=(e.clientY/window.innerHeight)*2-1;
// })

// const raycaster=new THREE.Raycaster();

const assetLoader =new GLTFLoader();

assetLoader.load(dog.href,function(gltf){
    const model = gltf.scene
    scene.add(model)
    model.position.set(-12,2,10);
},undefined,function(err){
    console.error(err)
})


const options={
    sphereColor:'#ffea00',
    wireframe:false,
    speed:0.01,
    angle:0.2,
    penumbra:0.1,
    intensity:0.1
}

gui.addColor(options,'sphereColor').onChange(function(e){
    sphere.material.color.set(e)
})
gui.add(options,'wireframe').onChange(function(e){
    // console.log(e)
    sphere.material.wireframe=e
})
gui.add(options,'speed',0,1)
gui.add(options,'angle',0,1)
gui.add(options,'penumbra',0,1)
gui.add(options,'intensity',0,1)

function animate(){
    requestAnimationFrame(animate)
    cube.rotation.x+=0.01;
    cube.rotation.y+=0.01;
    step+=options.speed;
    spotlight.angle=options.angle
    spotlight.intensity=options.intensity
    spotlight.penumbra=options.penumbra
    spotlighthelper.update()

    // raycaster.setFromCamera(mousePointer,camera);
    // const intersects=raycaster.intersectObjects(scene.children)
    // console.log(intersects)

    sphere.position.y=10*Math.abs(Math.sin(step));
    renderer.render(scene,camera)
}


window.addEventListener('resize',function(){
    camera.aspect=this.window.innerWidth/this.window.innerHeight
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight)
})

animate()





 
