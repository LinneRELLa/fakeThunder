<template>
	

	<div class="Detail">
<div class="mask" v-if="topay"></div>
<div class="confirm" v-if="topay">
	<span id="tt">{{msg}}</span>
	  <el-button type="success" icon="el-icon-check" 
	  :disabled="paying"
circle
@click="pay"
></el-button>
	   <el-button type="danger" icon="el-icon-close" circle
@click="topay=0;"
	   ></el-button>

</div>
<el-button 

@click="$router.go(-1)"
circle
>
<i class="el-icon-arrow-left"/>
</el-button>

    
	{{x.FilmName}}


	<div class="rtc">
<img :src="x.封面" class="left" >
<span class="Name">{{x.FilmName}}</span>
<span class="class">{{x.类型}}</span>
<span class="class">￥{{x.票价}}</span>
<span>{{x.厅名}} {{x.StartTime.slice(0,5)}}场</span>
<span v-if="!isNaN(selected)">{{Math.ceil((selected*1+1)/8)}}排{{(selected*1+1)%8==0?8:(selected*1+1)%8}}座</span>
<span v-if="!end(x.StartTime)">已结束</span>
	<div class="seats" v-if="end(x.StartTime)">
<div :class="{
	seat:true,
	preorder:status==1?true:false,
	select:index==selected?true:false
}" v-for="(status,index) in x.LeftSeat.split('')"
   @click="select(index,status)"



></div></div>
好评率:
<Sector v-if="!end(x.StartTime)"/>
<bar/>
<REDA :editable="0" :data="x.评价"/>

<el-button 
type="primary" 
v-if="!logined"
:disabled="isNaN(selected)"
@click="topay=1;"

>
购票</el-button>

<router-link :to="{
	name:'login'
}">
<el-button type="primary" v-if="logined">登录后购票</el-button>

</router-link>
<Cinema :SeatNo="isNaN(selected)?80:selected" v-if="!isNaN(selected)" />
</div>
</div>
</template>
<script>
	
import REDA from '../components/REDA.vue'
import Sector from '../components/sector'
 import bar from '../components/bar.vue'

import qs from 'qs'


import moment from 'moment'





const Cinema=()=>import('../components/Cinema');







	export default{

name:'SD',

data(){

	return {
		
		selected:NaN,
		topay:false,
		msg:'确认购票?',
		paying:false
	}
}
,created(){

	if(this.$store.state.AC.status==0){
	
	this.axios({

   method:'post',
	url:'/api/ac/infos',

}).then((res)=>{

	
this.aloading=0;

if(res.data!='expired'){
this.$store.dispatch('ac',res.data);
	
}
})

}






}





,
methods:{
end(time){
let current=moment().format("HH:mm");
let dif=current.slice(0,2)*60+current.slice(3,5)*1-time.slice(0,2)*60-time.slice(3,5)*1;
return dif>0?false:true

},

	select(index,status){
if(status!=1)
		{


			this.selected=index;}
		
	},
	pay(){
		this.msg='正在处理请求';
		this.paying=true;
this.axios({

   method:'post',
	url:'/api/ac/buyticket',
	data:qs.stringify({
Schno:this.x.排片号,
Seatno:this.selected,
  

  })

}).then((res)=>{

this.msg=res.data.msg;
setTimeout(()=>{location.reload()


},4000)


	})}
},
	

computed:{
x(){

let allFilms=this.$store.state.data.data

for(let value of allFilms){

	if(value.排片号==this.$route.query.id)
	{
		return value;
		
	}
}
return 'not found'
},

logined(){

	return this.$store.state.AC.status==0;
},


},

components:{
	REDA,
	Sector,
	Cinema,
	bar
}


	}
</script>


<style lang="less" scoped>
	.Detail{
width: 100%;
height: calc(100% - 20px);
background: black;
position: absolute;
	z-index: 4;
	overflow: hidden;
	color: white;
	
}
.seat{
	background:rgba(255,255,255,0.6);
 flex: 0 0 12.5%;

 height: 25px;
padding: 5px;
box-sizing: border-box;
background-clip: content-box;
cursor: pointer;

}
.seats{
	display: flex;
width: 200px;
 flex-wrap: wrap;
 height: 200px;



}
.preorder{
	background:red;
	cursor: default;
	background-clip: content-box;
}
.select{
	background:white;
}
.rtc{
	flex-direction: column;
	align-items:center;
	display: flex;
	align-content:center;
	justify-content: center;
	flex-wrap:wrap;
	height: 800px;
}
.left{
	   flex-basis:100%;
	  height: 100%;
}
.class{
	font-size: 25px;
}
.Name{
	font-size: 30px;
}
.confirm{
	z-index: 4;
	position:fixed;
	display: flex;

	background:rgba(255,255,255,0.9);
	color:black;
	border:1px solid black;
	left: 50%;
	top: 50%;
	width: 400px;
	height: 400px;
	margin-left:-200px;
	margin-top:-200px;
	font-size: 40px;
	flex-wrap:wrap;
	justify-content: center;
	align-items:center;
	span{
		flex-basis: 100%;
		text-align: center;
	}
}
.mask{
	position:fixed;
	z-index: 3;
	width: 100%;
	height: 100%;
	background:rgba(0,0,0,0.7);
}
</style>