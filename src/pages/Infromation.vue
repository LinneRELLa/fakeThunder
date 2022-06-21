<template>
	<div class="outer">
		<div class="rtc">
		  <el-image style="width: 200px; height: 200px"
    :src="infos.头像" 
    :preview-src-list="[infos.头像]"
    class="touxiang"
    >
  </el-image>

<div class="rt">
		<big>{{infos.昵称}}</big><br>
<span>UID  <span class="blue">    {{infos.UID}}</span></span><br>
<span class="bigger">
<i class="el-icon-wallet"/>￥{{infos.余额}}
</span>
	</div>
	</div>
	<div class="rrt"><span class="edw">LV.{{infos.等级}}</span>
		<br><span class="smaller">阅片量:{{infos.阅片量}}</span>
	</div>

	<div class="downer"> <el-divider></el-divider>


    <div class="downleft">
      <el-button type="primary">我的订单</el-button>
<span v-if="orders.size==0">

暂无已购影票</span>




<div v-for="x of orders" class="ticket">


<el-image  
:src="x.封面"  class="tickets" lazy>
	
</el-image>
<div class="des">
{{x.FilmName}}<br>{{x.放映厅}}号厅   {{x.座位号}}号座<br>
{{x.StartTime.slice(0,5)}}场
{{end(x.StartTime,x.片长)}}
<!-- {{moment(x.StartTime.slice(0,5),"MM:ss")}} -->



</div>

</div>





    </div>
    <div class="downright">

<el-button type="danger" @click="logout">退出登录</el-button>

    </div>
	</div>
	</div>


</template>
<script>
import qs from 'qs'

import moment from 'moment'
	export default {


mounted(){

	if(this.$store.state.AC[0]==undefined){
this.$router.push({
	path:'/AccountInfo',
	query:{force:1}
})

	}

this.axios(

{


   method:'post',
	url:'/api/ac/orders',
	data:qs.stringify({UID:this.infos.UID})
}).then((res)=>{


	this.orders=res.data;

},
(err)=>{
	console.log(err);

}
)


},
data(){


	return {orders:{}}
},
components:{


},



computed:{
	infos(){
		return this.$store.state.AC[0];
	},
	
},
methods:{

	logout(){


			localStorage.removeItem('RORELTOKEN');
location.reload();
	
	},
	end(time,len){
	
		let current=moment().format("HH:mm");
let dif=current.slice(0,2)*60+current.slice(3,5)*1-time.slice(0,2)*60-time.slice(3,5)*1

if(dif>0&&dif<len){
return '放映中';}
if(dif<0){
	if(-60<dif){
		return '即将开始';
	}
	return '未开场';
	}
	return '已结束'

	}
}


	}


</script>
<style lang="less" scoped>
	
.avator{
	border-radius: 180px;
	width:180px;
	height: 180px;
	margin:5px 40px;

}
.outer{
	z-index: 2;
	padding: 100px;
	
	min-width: 1rem;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	.downer{

    flex-basis:100%;
    display: flex;
    justify-content: space-around;
flex-wrap: wrap;
   div{
   	text-align: center;
   }
    .downtitle{
    	width: 100%;
    	height: 20px;
    	background: black;
    }
   .downleft{
 flex-basis:80%;
 overflow: auto;
height: 500px;
text-align: left;


   }
   .downright{
flex-basis:20%;

   }




	}

}
big{

	font-size: 40px;}
.blue{
	color:#409EFF
}
.touxiang{
	border-radius: 200px;
	box-sizing: border-box;
	border: 0 solid black;
	
	&:hover{

		border: 1px solid black;}
	margin-right:20px;

}
.bigger{
	font-size: 30px;
}
.rtc{
		flex:1;
		display: flex;
		justify-content: center;
}
.rt{
	display: flex;
	flex-direction: column;
	justify-content: center;

}
.rrt{
flex:1;
justify-content: center;
align-items: center;
display: flex;
flex-direction: column;
}
.edw{
	font-family: 'Edwardian Script ITC';
	font-size: 120px;
}
.smaller{

	font-size: 25px;
}
.tickets{
	width: 200px;
	object-fit:cover;
	height: 150px;
}
.ticket{
	 display: flex;
 justify-content: space-around;
border:1px solid #1e1e1e;
 align-items:center;
	height: 150px;
	overflow: hidden;
	flex-wrap: wrap;
	margin: 10px;

}
.des{flex: 1;
	font-size: 20px;
}
</style>