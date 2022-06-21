<template>
	
<div id="content">
	<transition 
appear   
 name="animate__animated animate__slideInLeft"

    leave-active-class="animate__bounceOutRight">


<div class="loading" v-if="loading" ><i class="el-icon-s-ticket loadicon"/></div>
</transition>
<div v-if="!loading" id="rx">
	<router-view></router-view>
<div id="r0">
<div id="r1">
	<DAY/>

</div>
<div id="r2">
	<div class="SwitchIcon" @click="switchMethod(1)" 
	:class="!IconActive?'IconActive':''">
	<i class="el-icon-s-ticket"/>按电影</div>

    <div class="SwitchIcon" @click="switchMethod(0)" 
    :class="IconActive?'IconActive':''">
    <i class="el-icon-video-camera-solid"/>按放映厅</div>


</div>
<div id="r3">

	<div v-for="value in TimeList" :key="TimeList.title" class="Left-ScheduleContainers">
		{{value.title}}
	

<TimeLine :Nodes="value.contend"/>


 <el-divider><i class="el-icon-c-scale-to-original"/></el-divider>
</div> 



</div>

</div>



<div id="r4">	
<Carousel :items="Carousel"/>
	
<div class="schedules">
<div v-for="value in SortedSchedules" :key="value.title" class="Schedule">
		
	<div v-for="(val,key) in value.contend" :key="val.排片号" class="cardcontainer">
<Card :key="val.排片号" :Data="val"/>




</div>

 <el-divider><i class="el-icon-arrow-up"/>{{value.title}}<i class="el-icon-arrow-up"/></el-divider>
</div>
</div> 


</div>



</div>
</div>

</template>
<script>


import Carousel from '../components/Carousel'
import Tree from '../components/Tree'
import TimeLine from '../components/TimeLine'
import Card from '../components/Card'

import DAY from '../components/DAY'

	export default {
		/*--------------------------------------*/
beforeMount:
function (){
if(this.$store.state.data.data==undefined){
this.axios({

	method:'post',
	url:'/api/Films'
 

}).then(data=>{

	this.response=data;
	
	this.$bus.$emit('sloaded',1);
	this.$store.dispatch('allFilms',{data})
	setTimeout(()=>{  this.loading=0;},500);
 
 


});}
else{
this.response.data=this.$store.state.data.data;
console.log(this.response)
	this.loading=0
}
	
		},
		/*--------------------------------------*/

name:'SheduleLists',
        /*--------------------------------------*/
beforeCreate:
function(){

	this.loading=1;

	},
       /*--------------------------------------*/

beforeDestroy(){
	this.loading=0;
	this.$bus.$emit('sloaded',1);
},   
/*--------------------------------------*/    
data(){
	return {
 
		name:'Rella',
		response:{},
		method:{sort:'放映厅',
		titlesort:'厅名',
		showinfo:'FilmName',
		imgloading:1
		
	},
	loading:1,

	}


	},
	    /*--------------------------------------*/
mounted(){


},

	    /*--------------------------------------*/
computed:{

	SortedSchedules(){


		let sortmethod=this.method.sort;
		let titles=this.method.titlesort;
  /*分类*/
if(this.response.data){
let q=this.simpleclone(this.response.data)
let Sorted=q.sort((front,after)=>front[sortmethod]-after[sortmethod])
let containers=[];
let index=0;
for (let n in Sorted){
	if(n==0){
		containers.push({
         title:Sorted[n][titles],
         contend:[Sorted[n]]

		})
		
	}
	else{
     if(Sorted[n][sortmethod]==Sorted[n-1][sortmethod])
     {
     	
containers[index].contend.push(Sorted[n]);

     }
     else{

index++;
	containers.push({
         title:Sorted[n][titles],
         contend:[Sorted[n]]

		})

     }




	}
}

/*按时间升序*/
for (let value of containers){
	
	value.contend.sort((a,b)=>a.StartTime.slice(0,2)*60+a.StartTime.slice(3,5)*1-b.StartTime.slice(0,2)*60-b.StartTime.slice(3,5)*1)
}



return containers;

}
else{
	return [];
}









	},
	Carousel(){
let a=this.response.data
if(a){
return a;
}
else{
	return [];
	}
},
Tree(){

let q=[...this.SortedSchedules];
let ForTree=[];
for (let value of q){

	ForTree.push({label:value.title,
		children:[]})




}
let y=0;
for (let value of q){

for (let x in value.contend){

	ForTree[y].children.push({label:value.contend[x].StartTime.slice(0,5)+value.contend[x].FilmName})
}
y++;
}


return ForTree;


},
IconActive(){
	return this.method.sort=='放映厅'
},
TimeList(){
let q=[...this.SortedSchedules];
let x=[];
for (let n in q){
x.push({title:q[n].title,
       contend:[]
})
for (let value of q[n].contend){
x[n].contend.push({
	content:value[this.method.showinfo],
	timestamp:value['StartTime'].slice(0,5),
	id:value.排片号,
	length:value.片长
})

}


}
return x;
}








},
         /*--------------------------------------*/
methods:{
switchMethod(x){
	switch(x){


		case 0:{
			this.method={
				showinfo:"FilmName",
sort:"放映厅",
titlesort:"厅名"
}
 
break;
		}
		case 1:this.method={
			showinfo:"厅名",
sort:"FilmNo",
titlesort:"FilmName"

		}
		
		break;

	}

}

},








components:{
	Carousel,
	Tree,
	TimeLine,
	Card,
	DAY

},
updated(){

	this.$store.dispatch('method',this.method);
}


}




</script>

<style lang="less" scoped>
@dborder:none;
@edw:'Edwardian Script ITC';
@icon:'Vivaldi';
#r2{display: flex;
	  background:rgb(23,33,43);
	  justify-content: space-around;
}
.SwitchIcon{
	display: flex;
    flex-direction: column;
    align-items: center;
    margin: 3px;
    color: white;
    &:hover{
cursor: pointer;
color: rgb(67,128,218);

    }


}
.IconActive{

	color: rgba(67,128,218);
}

.contentmiddle(){

	display: flex;
	justify-content: center;
	align-items: center;
}




	#content{
		min-width: 600px;

		flex: 1;
		display: flex;
		flex-wrap: nowrap;
	}
	#r0{
display: flex;
flex-direction: column;
justify-content: space-around;
       
#r1{
      	height: 100px;
      }
#r2{height: 50px;
background:rgb(14,22,33);
font-weight: 300;



}
#r3{flex: 1;
/*max-height: calc(100% - 150px);*/
overflow: auto;
background:rgb(14,22,33);
font-weight: 300;}
       & >div{width:300px;

border:@dborder;

       }
   }
#r4{flex: 1;

	overflow: auto;
	color: white;
	background: rgb(12,12,12);
/*	font-family: @edw;*/

	flex-direction: column;
	
}
.Schedule
{color:white;
	flex-wrap:wrap;
	}


	.Left-ScheduleContainers{
		font-size: 18px;
color: white;
display: flex;
flex-direction: column;

font-family: "仓耳舒圆体W05";

	}
	.Left-Schedules{
	
		
		margin: 5px 5px;
		width: 90%;
	min-height: 30px;




	}
	.Left-Schedules:hover{

background:rgb(50,58,75);
cursor: pointer;


	}
	.schedules{
		flex: 1;
		overflow: auto;
	}
	#rx{
		display: flex;
		flex: 1;
	}
.Schedule{
	display: flex;
	justify-content: space-around;
}
.cardcontainer{
	width: 200px;
	margin-top:20px;
}
.el-carousel{
	margin: 0 auto;
}
.Left-ScheduleContainers{
	padding:10px;

}

</style>