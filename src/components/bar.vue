<template>
	
<div id="WEBGL-OUTPUT"></div>


</template>
<script>
	
import {FontLoader,TextGeometry,OrbitControls,Scene,PerspectiveCamera,WebGLRenderer,MeshBasicMaterial,BoxGeometry,Mesh,AxesHelper,PlaneGeometry,MeshLambertMaterial,AmbientLight,SpotLight,Vector2,Color,SpotLightHelper,CameraHelper,Vector3} from "../../libs/three.module.cus.js"


export default{







    mounted(){



function max(array){

    return array.reduce((p,n)=>{
        return Math.max(p,n)
    })
}

/*初始化*/
   const scene=new Scene()
   const camera=new PerspectiveCamera(75,1920/1080,0.1,1000)
   const render=new WebGLRenderer({
    antialias:true
   })
   render.setSize(480,270)
    document.getElementById("WEBGL-OUTPUT").appendChild(render.domElement)
    const geometry=new BoxGeometry(8,8,8)
  
    let material=new MeshLambertMaterial({color:0x002299});




   


    /*地面*/
    const planeGeometry=new PlaneGeometry(100,100)
    const planeMatrial=new MeshLambertMaterial({color:0x222222})
    const plane=new Mesh(planeGeometry,planeMatrial)
    plane.rotation.x=-0.5*Math.PI
    plane.position.set(15,0,0);

    const ambientLight=new AmbientLight(0xFFFFFF)
    scene.add(ambientLight)
    render.render(scene,camera)

   



/*锥形光源*/
    var spotLight=new SpotLight(0xFFFFFF)
    spotLight.castShadow=true
    spotLight.shadow.mapSize=new Vector2(1024,1024)

    spotLight.position.set(25,40,12);
    scene.add(spotLight)

    render.shadowMap.enabled=true


    plane.receiveShadow=true;
    const axes=new AxesHelper(50);

console.log(axes)
  
 let gap=0
    let ctrlObj={rotationSpeed:0.01,jumpSpeed:0.01};














ctrlObj.intensity=1










const color=['#00FF00','#FFFF00','#CC0000'];
const data=[40,20,30]

const cubegeo=new BoxGeometry(3,1,3)
const cubes=[]
for(let x in data){

const cubematerial=new MeshLambertMaterial({

opacity:0.7,
transparent:true,
color:color[x%3]
})
const cube=new Mesh(cubegeo,cubematerial)
cube.position.set(x*4+1.5,1.5,0)
cube.castShadow=true
cubes.push(cube)
scene.add(cube)

}








const CameraP={
x:5,
y:5,
z:15
}


const controls=new OrbitControls(camera,render.domElement)
controls.target=new Vector3(5,5,0)
 camera.position.set(CameraP.x,CameraP.y,CameraP.z)


controls.update()

let loaded=0;
let font=null;
const loader=new FontLoader()
let TextMeshs=[];


async function createText(i){

if(!font){
font=await new Promise ((resolve,reject)=>{
loader.load('https://cdn.rellal.com/Vivaldi_Italic.json',(font)=>{

resolve(font)    
return ;


})})

}



for (let z of TextMeshs) {

    scene.remove(z)
z.geometry.dispose()
z.material.dispose()


}

for(let x in data){

const h=i*5<data[x]?Math.ceil(i*5):data[x]
const geometry=new TextGeometry(String(h),{
    font:font,
     size: 1,             // 字体大小，默认值为100
        height: 0.2,           // 挤出文本的厚度。默认值为50
        hover: 10,
        curveSegments: 10,   // 弧线分段数，使得文字的曲线更加光滑
        bevelThickness: 2,   // 文本上斜角的深度，默认值为20
        bevelSize: 1,        // 斜角与原始文本轮廓之间的延伸距离。默认值为8
        bevelSegments: 3,    // 斜角的分段数。默认值为3
        bevelEnabled: false  // 是否使用倒角，意为在边缘处斜切
})
const mat=new MeshLambertMaterial({
    opacity:0.4,
    transparent:true
    
})
const TextMesh=new Mesh(geometry,mat)
TextMesh.position.set(x*4+1,h/5+2,0)
TextMeshs[x]=TextMesh


}


for (let z of TextMeshs) {
    scene.add(z)
  
}





}
console.log(scene.position)


const des=['↑','-','↓']
const font1=null
async function createTextDes(i){

if(!font){
font=await new Promise ((resolve,reject)=>{
loader.load('https://cdn.rellal.com/FZYouXian-Z09S_Regular.json',(font)=>{

resolve(font)    
return ;


})})

}
for(let n in data){
    const geometry=new TextGeometry(des[n],{
    font:font,
    
     size: 1,             // 字体大小，默认值为100
        height: 0.2,           // 挤出文本的厚度。默认值为50
        hover: 10,
        curveSegments: 10,   // 弧线分段数，使得文字的曲线更加光滑
        bevelThickness: 2,   // 文本上斜角的深度，默认值为20
        bevelSize: 1,        // 斜角与原始文本轮廓之间的延伸距离。默认值为8
        bevelSegments: 3,    // 斜角的分段数。默认值为3
        bevelEnabled: false  // 是否使用倒角，意为在边缘处斜切
})
const mat=new MeshLambertMaterial({
    opacity:1,
    transparent:true,
    color:color[n],
})

const TextMesh=new Mesh(geometry,mat)
TextMesh.position.set(n*4+1,-2,0)
scene.add(TextMesh)
}

}






createTextDes()

    
let i=0;
    renderScene()
    function renderScene(){


controls.update()
    for(let n in data){ 
if(cubes[n].scale.y<Math.ceil(data[n]/5)){
    cubes[n].scale.y+=0.05
    cubes[n].position.y=(cubes[n].scale.y+1)/2
}


}

/*createText(String(i))*/
if(i<=Math.ceil(max(data)/5)){
i+=0.05;
createText(i)
}

        ambientLight.intensity=ctrlObj.intensity
        spotLight.intensity=1
    /*    cube.rotation.x+=0.01;
         cube.rotation.y+=0.01;
      cube.rotation.z+=0.01;
     gap+=0.05
cube.position.x=25+(20*(Math.sin(gap)))
cube.position.y=6+(20*Math.abs(Math.cos(gap)))*/

   
        requestAnimationFrame(renderScene);
        render.render(scene,camera);
    }
}

}
</script>

<style scoped>
	  
         body{
            margin: 0;
            overflow: hidden;
         }
    
</style>