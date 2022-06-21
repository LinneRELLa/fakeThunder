<template>
	
	<div>
		<div id="title">		
			{{this.$route.query.id}}
		<br>
		{{this.$route.query.Name}}
		</div>
		<div ref="main" style="width: 1200px;height: 500px;"></div>
        <div class="files">
        	<div class="title">文件列表</div>
            <div v-for="x of this.files"
           class="file" 
            ><div>{{x.name}} </div> <div>{{x.process}}</div></div>
        </div>
        <div class="peers">
        	<div class="title">用户列表</div>
        	<div v-for="x of this.peers" class="peer">
        		{{x.ip+':'+x.port}} 
        		{{x.seeder=='true'?'贡献中':''}} {{'上传速度:'+x.downloadSpeed}}
        		{{x.peerChoking=='true'?'获取中':''}} 
        		{{'下载速度:'+x.uploadSpeed}}
        	</div>

        </div>
	</div>
</template>
<script>
	 import * as echarts from '../../libs/echarts.js'

	export default{
name:'DetailInfo',
watch:{
   $route:{
   	handler(n){
   	this.files=[];
   	this.option.series[0].data=[0,0,0,0,0,0,0]
   },
   deep:true
   }
},
data(){
return {
	count:0,
	Name:'获取中',
	files:[],
	peers:[],
	option:{
	color:['#B4CDF8'],
myChart:null,
  xAxis: {
    type: 'category',
    data: [1,2,3,4,5,6,7],
 axisLabel: {
            textStyle: {
             
          }}

  },
  yAxis: {
    type: 'value',
     axisLabel: {
            textStyle: {
              
          }}

  },
  series: [
    {
      data: [0,0,0,0,0,0,0],
      type: 'line',
      smooth: true,
      areaStyle:{}
    }
  ]
}

}
},
mounted(){
	const vc=this;
	console.log(this.$route.query.id)
	var chartDom =this.$refs.main

var myChart = echarts.init(chartDom);
this.myChart=myChart;
const option=this.option;



option && myChart.setOption(option);



},
created(){
	const ws=new WebSocket('ws://localhost:6800/jsonrpc');
	const vc=this;
	(async function (){

	await new Promise(resolve=>{
    ws.addEventListener('open',function(){
	resolve();})
})   



   ws.addEventListener('message',(e)=>{

    const res=JSON.parse(e.data)





if(res.id&&res.id.match(/^DetInfo.*/)){
   	setTimeout(()=>{GetInfo(vc.$route.query.id)},1000);
vc.Name=vc.$route.query.Name;
if(vc.files==false){
for (let i=0;i<res.result.files.length&&i<=50;i++) {

	const x=res.result.files[i].path.split('/')
	const y=x[x.length-1]
	const p=res.result.files[i].completedLength/res.result.files[i].length*100+'%'
	vc.files.push({name:y,process:p})
}
}

vc.option.series[0].data.shift();
vc.option.series[0].data.push(res.result.downloadSpeed/1024);
vc.myChart.setOption(vc.option);



}

if(res.id&&res.id.match(/^GetPeers.*/)){
   	
	  const res=JSON.parse(e.data)
	 	  vc.peers=res.result;
}




   })
GetInfo(vc.$route.query.id)
function GetInfo(x){
   ws.send(JSON.stringify(
    {'jsonrpc':'2.0', 
    'id':`DetInfo${vc.count++}`,
    'method':'aria2.tellStatus', 
    'params':[x]}))

      ws.send(JSON.stringify(
    {'jsonrpc':'2.0', 
    'id':`GetPeers${vc.count++}`,
    'method':'aria2.getPeers', 
    'params':[x]}))

}

})()


		
}

	}

</script>
<style scoped>
	#title{
		font-size: 22px;
		font-family: '微软雅黑';
		white-space: nowrap;
	}
	.files{
		max-height: 300px;
		overflow: auto;
		font-family: '微软雅黑';
		font-size: 16px;
		white-space: nowrap;
		padding: 0 20px;
	}
	.file{
		display: flex;
		justify-content: space-between;
		padding: 0 40px;
		background-clip: padding-box;
	}
	.file:hover{
cursor: pointer;
background: rgba(239,236,254,0.6);
	}
	.title{font-size: 22px;}
	.peers{
			max-height: 300px;
		overflow: auto;
		font-family: '微软雅黑';
		font-size: 16px;
		white-space: nowrap;
		padding: 0 20px;
	}
	.peer{
		font-size: 13px;
		padding: 0 40px;
	}
</style>