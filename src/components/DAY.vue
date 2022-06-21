<template>
	
	<div class="day">
		<div id="dayy">{{time.slice(0,9)}}</div>
<div id="time">{{time.slice(10)}}</div> <div id="info"><span>{{length}}</span>场热映</div>
</div>
</template>
<script>
	import moment from 'moment'
	let timeformat='YYYY年M月D日 HH:mm:ss'
	export default {



data(){


	return {

		time:moment().format(timeformat),
		timer:{}
	}
	},
	mounted(){

		this.timero=setInterval(()=>{
			this.time=moment().format(timeformat);},1000);


	},
	beforeDestroy(){
        clearInterval(this.timero);

	},
	computed:{
length(){

	return this.$store.state.data.data.length
}



	}
}




	


</script>



<style scoped lang="less">
	
.day{
user-select: none;
	font-weight: 800;
display: flex;
height: 100%;
flex-wrap: wrap;
flex:1;
justify-content: space-around;
background: rgb(67,168,218);
color: white;
font-size: 20px;
text-align: center;
border:2px solid rgba(255,255,255,0.1);

}
#time{flex:1;
	border:2px solid rgba(255,255,255,0.1);
	justify-content: center;
	align-items:center;
	display: flex;
&:hover{
		background:rgb(67,168,255);
	}

}
#info{flex:1;
&:hover{
		background:rgb(67,168,255);
	}
}
#dayy{
	border:2px solid rgba(255,255,255,0.1);
	display: flex;
	justify-content: center;
	align-items:center;
	flex: 0 0 100%;
&:hover{
		background:rgb(67,168,255);
	}
}
span{font-size: 30px;}
</style>