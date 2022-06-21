<template>
	
<div class="ro">

	
	

	<!-- {{queryed.厅名}}--{{queryd.StartTime}}--{{queryd.排片号}} -->
	<el-row :gutter="10">
		<el-col :span="3">
放映厅
</el-col>
	<el-col :span="3">
开场时间 
</el-col>
	<el-col :span="3">
 排片号
</el-col>
</el-row>







<br>

<el-row v-for="(x,index) of queryed" :key="x.排片号" :gutter="10"> 
	<el-col :span="3">
 <el-select v-model="x.厅名" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</el-col>
	<el-col :span="3">
		<el-time-select
  v-model="x.StartTime"
  :picker-options="{
    start: '08:00',
    step: '00:30',
    end: '22:30'
  }"
  placeholder="选择时间">
</el-time-select>
</el-col>
	<el-col :span="3">
		<input :value="x.排片号" disabled>
	</el-col>
	
			<el-col :span="2">
			 <el-button type="danger" icon="el-icon-delete" circle
         @click="del(x.排片号)"
		 ></el-button>
		</el-col>
	</el-row>
		 
		
<br>

	
<div class="footer">
	<el-button type="success" icon="el-icon-plus" circle
         @click="addcom"
		 ></el-button>
	 <el-button type="primary" @click="$router.go(-1)">返回</el-button>
</div>
</div>

</template>
<script>
	export default{
name:'Se',
beforeDestroy()
	{clearTimeout(this.timer);},
         created(){
         	
         	if(this.$store.state.data.data==undefined){
this.firstget().then(()=>{
this.response=this.simpleclone(this.$store.state.data.data)


})
         	}
         	else{
         
this.response=this.simpleclone(this.$store.state.data.data)

         	}

         },

         data(){


         	return {


         		response:'Nores',
         		query:this.$route.query,
         		 options: [{
          value: '一号厅',
          label: '一号厅'
        }, {
          value: '二号厅',
          label: '二号厅'
        }, {
          value: '三号厅',
          label: '三号厅'
        }, {
          value: '四号厅',
          label: '四号厅'
        }],
  


         	}
         }
,computed:{

a(){
return this.debounce(this.sub,3000);
},
	queryed(){
		if(this.response!='Nores'){
		return this.response.filter((x)=>x.片号==this.$route.query.fn);
		}

		else{return []}
	},
addcom(){
	return this.add();
}
,
},

methods:{








   firstget(){


         		console.log('axios');
return this.axios({

	method:'post',
	url:'/api/Films'
 

}).then(data=>{

	

	this.$bus.$emit('sloaded',1);
	this.$store.dispatch('allFilms',{data:data})
});


   },
   localupdate(){
   	console.log('模拟请求')
 let text=['一','二','三','四','五','六','七','八','九','十'];
 for(let x of this.response){
 	x.放映厅=text.indexOf(x.厅名.slice(0,1))+1;
 }
this.$store.dispatch('update',this.simpleclone(this.response))
   }



	,del(x){
		this.response=this.response.filter((y)=>y.排片号!=x)
	},
	debounce(fn,wait){
		let vm=this;
      vm.timer=null;
       return function(){
       if(vm.timer){
       	clearTimeout(vm.timer);
       	vm.timer=setTimeout(fn,wait);
       }
       else{
       		vm.timer=setTimeout(fn,wait);
       }}

	},
	sub(){
	

		if(this.queryed.length==0){
			console.log(`empty FILM${this.$route.query.fn}`)
			return;
		}
for(let x of this.queryed){
for(let y in x){
	if(!x[y]){
		
console.log('存在空项')
		return}
}

}
		
		this.localupdate();
	},
	add(){

		return function(){

			let max=0;
		for(let x of this.response){
        if(max<x.排片号){
        	max=x.排片号;
        }
		}
let toadd={片号:this.$route.query.fn,
			排片号:`${Number(max)+1}`,
			FilmNo:this.$route.query.fn,
            厅名:null,
            StartTime:'00:00'



		};
  	for(let x of this.$store.state.data.data){
   			if(x.片号==this.$route.query.fn){

let temp={};
Object.assign(temp,x);
Object.assign(temp,toadd);
toadd=temp;
break;}
   			}
   	





	
		this.response.push(toadd)
	
		
		
	}.bind(this);
	}
},
watch:{
	response:{
deep:true,
handler(n,o){




	if(o!='Nores'){
		
		this.a();
	}
}

	}
}











	}


</script>
<style lang="less" scoped>
	
.form{



}
input{
		width: 100%;
background: rgba(255,255,255,0.3);
border:none;


text-align: center;
font-size: 20px;
box-sizing:border-box;
	}
div > span{
margin: 0 50px;
	font-size: 20px;
}
.ro{
	display: flex;
	flex-wrap: wrap;
	align-items: flex-start;
	overflow: auto;
	height: 100%;
	div{flex-basis: 100%;}
	.footer{text-align: left;
margin: 10px;

	}
	min-width: 800px;

}
.el-col{
	font-size: 25px;
}
.el-date-editor{
	width: 100%;
}
.ro{align-content: flex-start;
text-align: center;
}
</style>