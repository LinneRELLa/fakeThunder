<template>
	
	<div style="position: relative;" id="Process">
	<div style="width: 100%;height: 40px;">
		  <div id="downcont" class="line" ></div>
      <div id="down" class="line" ref="Line"></div>
      
	</div>
	</div>
</template>

<script>
	export default {
		props:['percent'],
		data(){
                 return {
                 	pro:0,
                 } 
		},
		watch:{
           percent:{
           	handler(e){
  this.pro=e;
  this.$nextTick(()=>{this.$refs.Line.style.width=`${this.pro*320}px`});
},
immediate:true
           }
		},

mounted(){

setTimeout(()=>{

	this.$refs.Line.style.width=`${this.pro*320}px`;},1000)


	}
}
</script>
<style scoped>
    .line{
    		position: absolute;
		left: 50%;
		bottom: 20px;
			height: 3px;
			transform: perspective(2000px) rotate3d(1,0,0,45deg) ;;
			margin-left: -160px;
    }

	#down{
	transform: perspective(2000px) rotate3d(1,0,0,45deg) ;
		
		width: 0;
	
transform-style: preserve-3d;
	
		background: rgba(132,150,255,0.9);
		transition: transform 1s ease,width 1s ease;
	
	}
	#downcont{
		width: 320px;
		
background: white;
	}
	#Process:hover #down{
		transform: perspective(2000px) rotate3d(1,0,0,45deg) ;
		transition: transform 1s ease,width 1s ease;;
	}
</style>