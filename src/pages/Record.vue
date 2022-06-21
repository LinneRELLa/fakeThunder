<template>
	

	<div id="root">
			<transition 
appear   
 name="animate__animated animate__slideInLeft"

    leave-active-class="animate__bounceOutRight">


<div class="loading" v-if="loading" ><i class="el-icon-s-comment loadicon"/></div>
</transition>
<div class="total">

	<router-link :to="{
path:'/RecordDetail',
query:{No:x[0].片号,
       Name:x[0].FilmName
}
			}"  v-for="x of data" :key="x[0].片号">
		<div class="cont" >
		
		
		<div class="front">
		<img :src="Number(x[0].片号)" alt="" class="fronts" /> 
		</div>
		<div>
			<LineChart v-if="!loading" :data="x[0].总评"/>
		</div>
<div class="innercont">
	<div class="leftcontent">
<div class="title">{{x[0].FilmName}}</div>
<div class="redacont">

		<REDA :data="x[0].总评" v-if="x[0].总评" :editable="0" :small="true" />
</div>
</div>

	<div class="rt" v-if="x[0].UID" :key="x[0].时间">
		<div class="content">
			<div class="newest">最新评价</div>
			
<div class="touxiang">
	
<el-image :src="x[0].头像" v-if="x[0].头像"/>
</div>
<div class="name">
{{x[0].昵称}}<br>
<span style="color:gray">{{ti(x[0].时间)}}</span>
</div>

<br><br>
	<div class="comment">{{x[0].短评}}</div>
</div>


	<div class="redacont1"><REDA :data="x[0].打分" v-if="x[0].打分" :editable="0" :tiny="true"/>
</div>	
			</div>
			</div>
</div>
		
</router-link>

</div>
	</div>
</template>
<script>
	import REDA from '../components/REDA'
import LineChart from '../components/LineChart'
export default{
	mounted(){
	},
	name:'Record',
	deactivated(){
		
	

},

created(){


this.Firstget().then(()=>{


this.data=this.SortedRecord()
this.$nextTick(()=>{this.lazyload()});
});


},

	data(){

return {
data:[],
	loading:1}
	},
	methods:{
lazyload(){
	const lload=function(entries,observer){
	
for(let entry of entries){
const src=entry.target.src.split('/')[entry.target.src.split('/').length-1]
	if(entry.isIntersecting){
if(Number(src)){
	for(let x of this.data){
		if(src==x[0].片号){
			entry.target.src=x[0].封面
			console.log(src)
		}
	}
	
						}
					}
				}
}.bind(this)
		const observer=new IntersectionObserver(lload,{
			root:document.querySelectorAll('#root')[1],
			threshold:1.0
		})
const fronts=document.querySelectorAll('.fronts')
console.log(fronts)
 

for(let x of fronts){
	observer.observe(x)
}
},
SortedRecord(){
	if(this.$store.state.Record.length){
   let x=this.$store.state.Record.sort((a,b)=>{return a.片号-b.片号});

   let sorted=[];
   let Index=0;
   for(let i in x){
   	if(x[i].时间==null){
x[i].时间=0;

   	}
    if(i==0){
    	sorted[Index]=[];
    	sorted[Index].push(x[i]);
    	
    }
    else{
          if(x[i].片号==x[i-1].片号){
          	sorted[Index].push(x[i]);
          }
          else{
 sorted[Index].sort((a,b)=>{
 	return moment(b.时间).format('X')*1-moment(a.时间).format('X')*1});

           
          	Index++;
          	sorted[Index]=[];
             sorted[Index].push(x[i]);

          }




    }
    

   }
sorted[Index].sort((a,b)=>{
 	return moment(b.时间).format('X')*1-moment(a.时间).format('X')*1});
   function sum(input) {
  let  s = 0;
let arr=input.split(',')
  for (var i=arr.length-1; i>=0; i--) {
    s += parseInt(arr[i]);
  }
  return s;
}

sorted.sort((a,b)=>{
	return sum(b[0].总评)-sum(a[0].总评)})

return sorted;
  }
return [];

},

Firstget(){
			return this.axios({
		method:'post',
		url:'api/Record'
	}).then((res)=>{
		this.loading=0;

		this.$store.dispatch('record',res.data);})
	},
	ti(x){
return moment(x).format('YYYY-M-D H:mm:ss');
},	








	},
	components:{
		REDA,
		LineChart
	},
activated(){


this.data=this.SortedRecord();

},






}


</script>



<style lang="less" scoped>
	
.cont{
		border-top: gray 1px dotted;
		padding:10px 0;
   display: flex;
	height: 282px;
	width: 1400px;
	&:hover{
		background:rgb(14,14,14);
	}
	.front{

		height: 100%;
		width: 200px;
	}
	.innercont{flex: 1;
		display: flex;
		flex-wrap: wrap;
.title{
	width: 100%;
	font-size: 25px;
	text-align: center;

}
.redacont{
width: 300px;
position: relative;

display: flex;
flex-direction: column;
justify-content: center;
}
.rt{border-radius: 5px;
flex: 1;
height: 100%;
display: flex;
	border:gray 1px solid;
width:400px;
flex-wrap: wrap;
.content{

display: flex;
flex-wrap: wrap;
width: 50%;
.newest{width: 100%;

	}
	.touxiang{


width: 40px;
height: 40px;
border-radius:40px;
overflow: hidden;

	}
	.name{
		flex: 1;
		white-space: nowrap;
		flex-wrap: wrap;

	}





}
.comment{
	width: 100px;

	padding: 10px;
}
	.redacont1{
		flex: 1;
		overflow: hidden;
		position:relative;
		left: -50px;
		display: flex;
		flex-direction: column;
		justify-content: center;

	}

}

	}



}
#root{
	overflow: auto;
	background: black;
	color:white;


}
.el-image{
		width: 100%;
		height: 100%;
	}
	.total{
		display: flex;
		flex-direction: column;
		align-items:center;
		width: 100%;
		min-width:1480px;
	}
	.leftcontent{
		width: 50%;
	}
.fronts{
	width: 100%;
	height: 100%;
}

</style>