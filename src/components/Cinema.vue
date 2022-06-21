<template>
  <div>
  <div id="myStatus"></div>
<div id="container"></div>
</div>
</template>
<script>
import * as tjs from '../../libs/three.module.cus.js'


  export default {
name:'Cinema',
data(){
return {
  ctrlObj:{},
  p:{},
}
},
props:{
SeatNo:{
  default:1
}},
watch:{

SeatNo:{
  handler(n,o){

    this.ctrlObj.SeatNo=n
    this.p={
  x:-120+n%8*30,
  y:Math.floor(n/8)*15+100,
  z:400+Math.floor(n/8)*30+5
}
console.log(n)
console.log( this.p)
  }
}

},
mounted(){

this.ctrlObj={
  x:0,
  y:160,
  z:535,
     imgscalex:3,
      imgscaley:3,
      SeatNo:50,
}

this.ctrlObj.SeatNo=this.SeatNo;

    console.log(tjs)
  const scene=new tjs.Scene()
  const ambientLight=new tjs.AmbientLight(0x112299)
  
   const render=new tjs.WebGLRenderer({
     antialias:true,
     alpha:true
   })
   render.setSize(470,280)
   const planegeo=new tjs.PlaneGeometry(800,1200)

   let material=new tjs.MeshLambertMaterial({color:0x002299,
transparent:true,
opacity:0.5
   });
    const plane=new tjs.Mesh(planegeo,material)
   plane.position.set(15,0,0);
    plane.rotation.x=-0.5*Math.PI
     plane.receiveShadow=true;
   scene.add(plane)
  scene.add(ambientLight)
const camera=new tjs.PerspectiveCamera(75,1920/1080,0.1,2000);


camera.position.set(-120+this.SeatNo%8*30,Math.floor(this.SeatNo/8)*15+100,400+Math.floor(this.SeatNo/8)*30+5)






camera.p=camera.position

const seatgeo=new tjs.BoxGeometry(20,20,20)

const seatmat=new tjs.MeshLambertMaterial({color:0xffffff,
opacity:0.6,
transparent:true
})
for(let x=0;x<8;x++){
  for (let y=0;y<8;y++)
  {const seat=new tjs.Mesh(seatgeo,seatmat)
seat.position.set(30*(y-4),x*15+100,400+30*(x+1))


scene.add(seat)




       
  }
}











// 平面几何体
var planeGeometry = new tjs.PlaneBufferGeometry( 240, 135);



 // 平面几何体位置
// 背景纹理
var planeTexture = new tjs.TextureLoader().load('https://cdn.rellal.com/1920px-Yurucamp_Series_Visual.jpg');
// 背景材料
var planeMaterial = new tjs.MeshBasicMaterial({
    map: planeTexture,
    side:tjs.DoubleSide
});
// 背景网格
var planeImg = new tjs.Mesh(planeGeometry, planeMaterial);
planeImg.castShadow=true
// 将背景添加到场景

scene.add(planeImg)

 const renderScene=function (){


if(camera.position.x<this.p.x){
  camera.position.x++
}
if(camera.position.x>this.p.x){
  camera.position.x--
}
if(camera.position.y<this.p.y){
  camera.position.y++
}
if(camera.position.y>this.p.y){
  camera.position.y--
}



if(camera.position.z<this.p.z){
  camera.position.z++
}
if(camera.position.z>this.p.z){
  camera.position.z--
}



  planeImg.scale.x=this.ctrlObj.imgscalex
  planeImg.scale.y=this.ctrlObj.imgscaley
  planeImg.position.set(0, this.ctrlObj.imgscaley*planeGeometry.parameters.height/2, 0);
camera.lookAt(planeImg.position)

  render.render(scene,camera)
  
  requestAnimationFrame(renderScene)
 }.bind(this)
renderScene()
 document.getElementById("container").appendChild(render.domElement)
}

  }

</script>
<style type="text/css">
  

.dg.ac{z-index: 9}
</style>