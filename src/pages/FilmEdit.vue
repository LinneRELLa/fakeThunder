
<template>
	<div class="all">
	<el-form ref="form"  label-width="80px" id="form">

 <el-form-item label="电影号">
{{film.片号}}
</el-form-item>


  <el-form-item label="电影名">
    <el-input v-model="film.FilmName"></el-input>
  </el-form-item>
<!--    <el-form-item label="放映厅">
    <el-select v-model="form.region" placeholder="请选择放映厅">
      <el-option label="一号厅" value="1"></el-option>
      <el-option label="二号厅" value="2"></el-option>
      <el-option label="三号厅" value="3"></el-option>
      <el-option label="四号厅" value="4"></el-option>
    </el-select>
  </el-form-item>  -->


  <el-form-item label="类型">
 <el-input v-model="film.类型" style="width: 200px;"></el-input>
</el-form-item>
 <el-form-item label="片长(分钟)" >
    <el-slider v-model="film.片长" :max="300"></el-slider>
</el-input>

  </el-form-item>







  <el-form-item label="封面">
    <el-input type="textarea" v-model="film.封面"></el-input>
  </el-form-item>
评价:
  <REDA :data="film.评价"/>
  <el-form-item>
    <el-button type="primary" @click="throsub">创建/修改</el-button>
  <el-button type="primary" @click="$router.go(-1)">返回</el-button>
  </el-form-item>
</el-form>
  <img :src="film.封面"  alt="未找到图片" 
  style="border: 1px solid white;
  font-size: 25px;
  margin-left: 15px;
  width: 300px;
  height: 400px; 
  object-fit: cover;
  ">


</div>
</template>
<script >
	import qs from 'qs'
import REDA from '../components/REDA'
	export default{
		created(){
			this.$bus.$on('RC',(res)=>{
		this.film.评价=res;
	})

		},
		name:'FilmEdit',
		components:{
			REDA
		},
data(){

this.$route.query.片长=Number(this.$route.query.片长);
return {

  film:this.$route.query
}


},

    methods: {
      onSubmit() {
      

       this.axios({
url:'/api/ac/FilmEdit',
method:'post',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
data:qs.stringify(this.film)

       }).then((res)=>{alert(res.data)})
      },
      throlotte(fn,wait){
let late=0;
return function(){
	let cur=Date.now();
if(cur-late>wait)
{
	fn.apply(this);
	late=cur;
}
else{
	console.log(`节流,${cur-late}ms后恢复`);
}

}
      }
    },
    computed:{

    	throsub(){
    		return this.throlotte(this.onSubmit,3000);
    	}
    }	
	}


</script>
<style scoped lang="less">
	
#form{
width: 600px;
margin-top: 20px;
color: white;

}
.all{
	display: flex;
}

</style>