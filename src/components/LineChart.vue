







<template>

<div :class="classArr" ref="con" ></div>

</template>
<script type="text/javascript">

	export default{
		props:{
  data:{type:String,
              default:'40,50,30,20,60,80'}
              ,
 classArr:{type:String,
              default:'con small'

  }
  },
		mounted(){

	/*折线*/
	const con= this.$refs.con
	const canvas=document.createElement('canvas')
	canvas.className='canvas'
	canvas.width=280
	canvas.height=280
    const context=canvas.getContext('2d')
    function max(array){
    	let max=0
    	for(let x of array){
if(max<x){max=x}
    	}
    	return max;
    }
    function grid(context,canvas){

for(let x=1;x<10;x++){
	context.beginPath()
	context.strokeStyle='rgba(0,0,0,0.1)'
	context.lineWidth='1'
	context.moveTo((canvas.width-40)/10*x,canvas.height-40)
	context.lineTo((canvas.width-40)/10*x,20)
	context.stroke()
	context.moveTo(20,(canvas.height-40)/10*x)
	context.lineTo(canvas.width-40,(canvas.height-40)/10*x)
	context.stroke()
}

    }
    /*绘制边框*/
    function frame(context,canvas)

    {context.beginPath()
    	context.lineWidth='5'
    	context.strokeStyle='white'
    	context.moveTo(20,20)
    context.lineTo(20,canvas.height-20)
    context.lineTo(canvas.width-20,canvas.height-20)
	context.stroke()}
    /*同步绘制*/
	function syncpaint(data,context,canvas){
		context.beginPath()
		context.lineWidth='5'
		context.lineCap='round'
context.moveTo(20,canvas.height-20)

	const maxi=max(data)
	
for(let x in data){
Ycor=(canvas.height-20)*(1-1/maxi*data[x])
context.lineTo((canvas.width-20)/data.length*(x*1+1),Ycor)



}
context.stroke()

	}


/*异步绘制*/
async function asyncpaint(data,context,canvas,time){
	const maxi=max(data)+40
	const length=data.length
	function sync(data,maxi,length,context,canvas){

		
		/*frame(context,canvas);*/
		context.beginPath()
		context.lineWidth='3'
		context.strokeStyle='rgba(255,255,255,0.6)'
		context.moveTo(20,canvas.height-20)
		if(data.length>0){
		for(let y in data){
let Xcor=(canvas.width-40)/length*(y*1+1)
let Ycor=(canvas.height-20)*(1-1/maxi*data[y])
context.lineTo(Xcor,Ycor)
context.arc(Xcor,Ycor,3,0,Math.PI*2)


context.lineTo(Xcor,Ycor)
 
}

}

	}
	function synctext(data,maxi,length,context,canvas,n){

		context.lineWidth='3'
	context.font="20px Arial";
	context.fillStyle="white";
		if(n>0&&data.length>0){
		for(let y=0;y<n;y++){
let Xcor=(canvas.width-40)/length*(y*1+1)-10
let Ycor=(canvas.height-20)*(1-1/maxi*data[y])


if(((data[y-1]==undefined?0:data[y-1])-data[y])>=0&&((data[y+1]==undefined?0:data[y+1])-data[y])>=0)
{

	Ycor+=20

	
}
else{
	Ycor-=20
	
}

 context.fillText(data[y],Xcor,Ycor)


}



	}}





	/*for (let x in data){
		await new Promise((resolve)=>{




		})







	}*/

	let Xcor=20; let Ycor=canvas.width-20;


	for(let n in data ){ 

		sync(data.slice(0,n),maxi,length,context,canvas) 
		await new Promise((resolve)=>{



let syncXcor=0
let syncYcor=0
let xspeed=(canvas.width-40)/(data.length)*1/time
let  yspeed=0

if(n==0){

  
	xspeed=((canvas.width-40)/(data.length)-20)*1/time
syncXcor=20
syncYcor=canvas.height-20
yspeed=(data[n]/maxi*(canvas.height-20))*1/time

}
else{
	syncXcor=(canvas.width-40)/(data.length)*n
    syncYcor=(canvas.height-20)*(1-1/maxi*data[n-1])
 yspeed=(canvas.height-20)*(data[n]-data[n-1])/maxi*1/time

}
   
let x=0;
const timer=setInterval(()=>{
	  if(x==time)
           {
           	 
     


           	clearInterval(timer);
           	      if(n==data.length-1){
     context.clearRect(20,0,canvas.width-20,canvas.height-20)
     	sync(data.slice(0,n+1),maxi,length,context,canvas) 
          	  synctext(data,maxi,length,context,canvas,n+1) 
          	context.stroke()
          	return 
          }
           	resolve();
   

           }
      
           x++;
	context.clearRect(20,0,canvas.width-20,canvas.height-20)
	
    synctext(data,maxi,length,context,canvas,n) 
	context.lineTo(syncXcor,syncYcor);
	context.stroke()
	syncXcor+=xspeed;
	syncYcor-=yspeed;


         
}



	,1)



})
}

/*grid(context,canvas)*/
}









frame(context,canvas);
asyncpaint(this.data.split(',').map(x=>Number(x)),context,canvas,60)




con.appendChild(canvas)
}
}
</script>


	<style type="text/css">
		.canvas{
			
		}
		.small{
			width: 300px;
			height: 300px;
		}
		.con{
		
			background: rgba(0,0,0,0.3);
	
	
		display: flex;
		justify-content: center;
		align-items: center;
		align-content: center;
		}

@keyframes slowin{
	0%{transform: translate(-20px,0);}
	50%{transform: translate(20px,0);}
	100%{transform: translate(0,0);}
}

		body{
		display: flex;
		justify-content: center;
		align-items: center;
		align-content: center;
		}
	</style>