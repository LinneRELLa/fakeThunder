<template>
	
<div id="acroot">


	<transition 
appear   
 name="animate__animated animate__slideInLeft"

    leave-active-class="animate__bounceOutRight">
<div class="loading" v-if="aloading" ><i class="el-icon-user loadicon"/></div>
</transition>


<router-view class="view"/>

</div>

</template>
<script>





	export default {
beforeRouteUpdate(to,from,next){

	if(from.path.split('/')[1]=='AccountInfo'&&to.path=='/AccountInfo'&&to.query.force!=1){
return 
	}

	next();
	
},
activated(){



	
this.axios({

   method:'post',
	url:'/api/ac/infos',

}).then((res)=>{

setTimeout(()=>{	
this.aloading=0},500);

if(res.data!='expired'){
this.$store.dispatch('ac',res.data);
	this.$router.replace({
		name:'infos'
	})
}
else{
	console.log('exp')
	localStorage.removeItem('RORELTOKEN');
	this.$router.replace({
		name:'login'
	})
}

},
	(err)=>{
		console.log('err');
	})


},




name:'AccountInfo',
data(){


	return {
		aloading:1,
		response:''
	}
}












}


</script>

<style lang="less" scoped>
#acroot{background: linear-gradient(to bottom right,rgba(0,0,0,0.6),rgba(0,0,0,1));
color: white;
flex: 1;
min-width: 600px;
overflow:auto;

}
.downloading{
	width: 100%;
	height: calc(100% - 20px);
	background:black;
	color: white;
	z-index: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 120px;
	position: absolute;
}
</style>