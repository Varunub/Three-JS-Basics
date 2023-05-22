import * as THREE from 'three';
import './style.css';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap';
//scene
const scene = new THREE.Scene();

//create sphere

const geometry = new THREE.SphereGeometry(3,64,64);

const materail=new THREE.MeshStandardMaterial({color:"#00ff83"})

const sphere=new THREE.Mesh(geometry,materail)

scene.add(sphere);
//sizes
const sizes={
    width:window.innerWidth,
    height:window.innerHeight
}

//Light
const light =new THREE.PointLight(0xffffff,1,100)
light.castShadow = true
light.position.set(0,10,10)
light.intensity=1.25
scene.add(light);

//camera
const camera=new THREE.PerspectiveCamera(45,sizes.width/sizes.height,0.1,100)
camera.position.z=20
scene.add(camera)



//renderer
const canvas =document.querySelector(".glf")

const renderer=new THREE.WebGL1Renderer({canvas});
renderer.setSize(sizes.width,sizes.height);
// renderer.pixelRatio(2)
renderer.render(scene,camera)

//Controls

const controls = new OrbitControls(camera,canvas)
controls.enableDamping  = false
controls.enablePan=false
controls.enableZoom=false
controls.autoRotate=true
controls.autoRotateSpeed = 5

//resize
window.addEventListener("resize",()=>{
    sizes.width=window.innerWidth;
    sizes.height=window.innerHeight
    //update camera position
    camera.aspect=sizes.width/sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width,sizes.height)
})

const loop=()=>{
    controls.update()
    renderer.render(scene,camera)
    window.requestAnimationFrame(loop)
}
loop()

//TimeLine Magic

const t1=gsap.timeline({defaults:{duration:1}})
t1.fromTo(sphere.scale,{z:0,x:0,y:0},{z:1,x:1,y:1})

//Mouse Animate color

let mouseDown=false
let rgb=[];
window.addEventListener('mousedown',()=>{
    console.log('mouseDown');
    mouseDown=true
})

window.addEventListener('mouseup',()=>{
    mouseDown=false
})

window.addEventListener('mousemove',(e)=>{
    if(mouseDown){
        rgb=[
            Math.round((e.pageX/sizes.width)*255),
            Math.round((e.pageY/sizes.width)*255),
            150,
        ]
        console.log(rgb)
    }
    let newcolor =new THREE.Color(`rgb(${rgb.join(",")})`)
    gsap.to(sphere.material.color ,{
        r:newcolor.r,
        g:newcolor.g,
        b:newcolor.b,
    })
})

