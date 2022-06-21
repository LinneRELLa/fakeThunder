<template>
	<div id="root">






	<div class="lefttab">
	
		<router-link :to="{
			name:'FilmToEdit'
		}"><i class="el-icon-film"> </i>
			
			编辑电影
		</router-link><br>
	
		<!-- <router-link :to="{
			name:'FilmEdit'
		}"><i class="el-icon-notebook-2"> </i>
			
			添加排片
		</router-link> -->
		
	</div>
	<div class="rightc">
<keep-alive include="FilmToEdit">

		<router-view>
			
		</router-view>
</keep-alive>
	</div>















	</div>

</template>
<script type="text/javascript">
	export default{
name:'Edit',
created(){
setTimeout(()=>{this.aloading=0},1000);
},
data(){
	return {aloading:1}
}




	}




</script>
<style lang="less" scoped>
	.lefttab{width: 200px;
		background: rgba(36,40,47,0.8);
		text-align: center;
		font-size: 25px;
		height: 100%;
		flex-grow: 0;}
	#root{width: 100%;
		height: 100%;
		overflow: hidden;
display: flex;
flex-wrap: nowrap;
flex-direction: row;
justify-content: space-around;
position: relative;
min-width: 800px;
	}
.rightc{
	flex: 1;
height: 100%;
	min-width: 600px;
	
	background:rgba(36, 40, 47, 0.8);
overflow: auto;
}


</style>