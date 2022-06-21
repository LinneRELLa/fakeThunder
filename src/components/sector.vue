

<!-- /*踩坑记录*/  -->
<!-- 1.对不齐，前一个扇形和后一个有缝隙
     原因:delta的精度问题
     解决:别把delta转化为角度
     绘图的时候再转化
 -->


<template><div class="con" ref="con"></div></template>


<script type="text/javascript">
	export default{

		mounted(){
	const con=this.$refs.con
	/*调色板,若数据个数大于调色板则循环*/
const color=['#db5a6b','#00A74A','yellow','blue','black','gray']
/*数据*/
const data1=[20,40,60]

/*环状图*/
const canvas=document.createElement('canvas')
const context=canvas.getContext('2d')
canvas.width=200
canvas.height=200

let sum=0
for(let x of data1){
sum+=x
}
function syncpaint(start,sum,data1,n){

context.beginPath()
let last=(start/sum)
let index=0
for(let y=0;y<=n;y++){
let x=data1[y]

	context.fillStyle=color[index%color.length]
		context.shadowBlur=10;
context.shadowColor=color[index%color.length];
	index++;
	context.globalAlpha = 1;
let now=x/sum







context.beginPath()
context.moveTo(canvas.width/2,canvas.height/2)
context.arc(canvas.width/2,canvas.height/2,canvas.height/3,Math.PI*2*last,Math.PI*2*(last+now))
context.fill();
last+=now;


}
	context.beginPath()
context.moveTo(canvas.width/2,canvas.height/2)
context.fillStyle='black'
context.shadowBlur=0
context.globalAlpha = 1;
context.arc(canvas.width/2,canvas.height/2,canvas.height/3-10,0,Math.PI*2)
context.fill()
}
let start=0;

/*转起来了*/
/*setInterval(()=>{
console.log('转起来了')
	paint(x,sum,data1);x+=0.5}, 1);*/
	/*没转起来*/
	/*syncpaint(start,sum,data1,2)*/

async function asyncpaint(start,sum,data1)
{
let now=start;
const syncstart=start;

for(let index in data1){
	
	
	await new Promise((resolve,reject)=>{
	let delta=data1[index]

const timer=setInterval(()=>{

		now+=1;


	context.clearRect(0,0,canvas.width,canvas.height)

syncpaint(syncstart,sum,data1,index-1)
	context.beginPath()
	context.globalAlpha = 1;

	context.moveTo(canvas.width/2,canvas.height/2)
	context.arc(canvas.width/2,canvas.height/2,canvas.height/3,2*Math.PI*(start/sum),2*Math.PI*((now/sum)))
			
	
	context.fillStyle=color[index%color.length]
	context.shadowBlur=10;
context.shadowColor=color[index%color.length];
context.fill()
	
	context.beginPath()
context.moveTo(canvas.width/2,canvas.height/2)
context.fillStyle='black'
context.shadowBlur=0
context.globalAlpha = 1;
context.arc(canvas.width/2,canvas.height/2,canvas.height/3-10,0,Math.PI*2)
context.fill()



if((now-start)>=delta){

start=now;
	

clearInterval(timer);
	resolve()
}
},1);

})

}

/*最后小转一下*/
/*let x=50;
const timer1=setInterval(()=>{
context.clearRect(0,0,canvas.width,canvas.height)
	syncpaint(x,sum,data1,data1.length);
x+=1;
	if(x>=sum+50){
		clearInterval(timer1);}},10)

context.clearRect(0,0,canvas.width,canvas.height)
syncpaint(syncstart,sum,data1,data1.length)*/








}
asyncpaint(50,sum,data1)








con.appendChild(canvas)
}}
</script>

	<style type="text/css" scoped>
		.con{
		
		
		}

@keyframes slowin{
	0%{transform: translate(-20px,0);}
	50%{transform: translate(20px,0);}
	100%{transform: translate(0,0);}
}


	</style>