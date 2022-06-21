<template>
	<div class="allfilms">
			<transition 
 appear   
 name="animate__animated animate__slideInLeft"
 leave-active-class="animate__bounceOutRight">
<div class="loading" v-if="aloading" ><i class="el-icon-edit"/></div>
</transition>

		<div class="filmcard" v-for="film of films">
			<img :src="film.封面" class="cover">
			{{film.FilmName}}
			<br>
			<br>
			<br>
			<router-link :to="{
           name:'FilmEdit',
           query:film
			}">
			<span>编辑电影</span></router-link>
         <!--    <router-link> -->
         	<router-link :to="{
           name:'ScheduleEdit',
           query:{fn:film.片号}
			}">
			<span>编辑排片</span>
		</router-link>
		<!--     </router-link> -->
			
		</div>
		<div class="filmcard">
			
			<br>
			<br>
			<br>
			
			<router-link :to="{
           name:'FilmEdit',
           query:{
           	FilmName:'',
           	片号:'服务器生成',
           	片长:0,
           	类型:'',
           	评价:'50,50,50,50,50',
           	封面:'http://r.photo.store.qq.com/psc?/V53ZbwIa09kn2Q0usRF00zmUxK3YRSXK/45NBuzDIW489QBoVep5mcVunig8u.neSyFzJnAVs2NYv4wCXzHcQ3BzquOmk*KqXAfzHAWskCYzYX.5*g1FzXCwCQeV2I1kgE39BxGyNK1A!/r'
           }
			}">
			<span><i class="el-icon-circle-plus-outline"></i>
			添加</span></router-link>
		
         <!--    <router-link> -->
			<span></span>
		<!--     </router-link> -->
			
		</div>
		
	</div>

</template>
<script >

export default{
	name:'FilmToEdit',
	components:{

	
	},
mounted(){
	this.update();
},
deactivated(){

	clearInterval(this.timer);

},
activated(){

 	this.timer=setInterval(()=>{console.log('EDIT更新')

this.update()

 },30000);

},




data(){

	return {
		films:null,
		aloading:1
	}
},
methods:{update(){
	this.axios({
		url:'api/FilmsToEdit',
		method:'post'
	}).then((res)=>{
setTimeout(()=>{	
this.aloading=0},500);
		
		this.films=res.data;})

}

}










}
















</script>
<style lang="less" scoped>
	.allfilms{
display: flex;
flex-wrap: wrap;


	}
	.filmcard{
height: 300px;
background: white;
min-width: 200px;
max-width: 250px;
flex-basis: calc(15% - 10px);
box-sizing:  border-box;
margin: 5px 5px;
  &>img{
		height: 200px;
		width: 100%;
		object-fit: cover;
}
span{margin: 0 10px;color: rgba(56,144,231);}
}


</style>
