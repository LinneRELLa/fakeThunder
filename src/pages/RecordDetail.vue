<template>
	<div class="bg">



		<div style="white-space:nowrap;"><el-button type="primary" @click="$router.go(-1)" circle><i class="el-icon-arrow-left"></i></el-button><el-button type="primary" @click="()=>{this.input=!this.input;}" circle><i class="el-icon-s-comment"></i></el-button>{{this.$route.query.Name}}

		</div>

	  <transition-group 
   name="animate__animated animate__slideInLeft"

    enter-active-class="animate__backInLeft"
  >
		<el-row :gutter="20" v-for="(x,index) of records" v-if="records[0].Account" :key="x.时间" >
		
			<el-col :span="3" :offset="4" >
			
		<div class="content">
		
		<div class="acinfo">

<div class="touxiang">
<el-image :src="x.头像" v-if="x.头像"/>
</div>
<div class="info">
<div class="name">{{x.昵称}}<br></div>
<div class="time">{{time(x.时间)}}</div>
</div>	
</div>
<div class="comment">{{x.短评}}</div>

</div>
</el-col>

<el-col :span="3" :push="4">
<div class="REDA">
		<REDA :data="x.打分" v-if="x.打分" :editable="0" :tiny="true"/>
</div>
</el-col>
</el-row>

</transition-group>
<div class="footer" v-show="records.length>=5">加载更多</div>
<div style="min-width: 1060px;position: sticky;bottom: 0;
background: rgba(0,0,0,0.6);
">
<el-row v-if="input">
	<el-col :span="6"><el-input
  type="textarea"
  :rows="13"
  placeholder="请输入内容"
  v-model="comment">
</el-input></el-col>
	<el-col :span="14"><div style="position: relative;width: 400px;" ><REDA :editable="1"/></div></el-col>
	<el-col :span="4">
		<el-button type="primary" @click="throsub" circle><i class="el-icon-check"></i></el-button>
		<el-button type="danger" @click="()=>{this.input=!this.input;}" circle><i class="el-icon-delete"></i></el-button>
	</el-col>
</el-row>
</div>





</div>


</template>
<script type="text/javascript">
	import REDA from '../components/REDA'
	export default{
		name:'RD',
		computed:{
			throsub(){
        let x=this.throlote(this.sub,1000);
        return x;

    },
    infinitesub(){

    	 let x=this.throlote(this.infinitetest,30);
        return x;
		},
    },
created(){
		this.$bus.$on('RC',(res)=>{

		this.record=res;
		
		
	})

   this.update();
  
     },
     mounted(){
this.lazyload();
     },
activated(){
	
	if(this.records.length==0){
this.update();

}



},








     data(){

     	return {records:[],
comment:'',
input:0,
record:'80,80,80,80,80',
timenow:moment().year(2021),
infinitetimes:0,
     	}
     },
     	methods:{
     		lazyload(){
     			console.log('lzload')
	const lload=function(entries,observer){
	
if(entries[0].isIntersecting){
	console.log('infinite load')
	this.infinitesub();
	let x=0;




}
}.bind(this)
const root=document.querySelector('#rightin')
		const observer=new IntersectionObserver(lload,{
			root:root,
			threshold:1.0
		})
const target=document.querySelector('.footer')
 

	observer.observe(target)

},
time(x){
return moment(x).format('YYYY-M-D H:mm:ss');
},
throlote(fn,wait){

	let old=0;
	return function(){
let cur=Date.now();
if(cur-old>wait){
	fn.call(this,arguments);
	old=Date.now();
}

else{
	console.log(`节流,${wait-cur+old}ms后恢复`)
}





	}
},
sub(){
let toadd={};
Object.assign(toadd,this.records[0]);
let curac=this.$store.state.AC[0]?this.$store.state.AC[0]:{}
let annoy={Account:curac.Account?curac.Account:'uk',
           UID:curac.UID?curac.UID:'uk',
           头像:curac.头像?curac.头像:'http://r.photo.store.qq.com/psc?/V53ZbwIa09kn2Q0usRF00zmUxK3YRSXK/45NBuzDIW489QBoVep5mcVunig8u.neSyFzJnAVs2NYv4wCXzHcQ3BzquOmk*KqXAfzHAWskCYzYX.5*g1FzXAvshHSxLOXPnZ9ubScu2RA!/r',
           打分:this.record,
           时间:moment().format(),
           昵称:curac.昵称?curac.昵称:'匿名用户',
           短评:this.comment,
}
Object.assign(toadd,annoy);

	this.$store.dispatch('addrecord',toadd);
this.update();
},
infinitetest(){

let toadd={}
Object.assign(toadd,this.records[0]);
let curac=this.$store.state.AC[0]?this.$store.state.AC[0]:{}
let annoy={Account:curac.Account?curac.Account:'uk',
           UID:curac.UID?curac.UID:'uk',
           头像:curac.头像?curac.头像:'http://r.photo.store.qq.com/psc?/V53ZbwIa09kn2Q0usRF00zmUxK3YRSXK/45NBuzDIW489QBoVep5mcVunig8u.neSyFzJnAVs2NYv4wCXzHcQ3BzquOmk*KqXAfzHAWskCYzYX.5*g1FzXAvshHSxLOXPnZ9ubScu2RA!/r',
           打分:this.record,
           时间:this.timenow.subtract(this.infinitetimes,'seconds').format('YYYY-M-D H:mm:ss'),
           昵称:'无限加载测试',
           短评:'无限加载测试',
}
this.infinitetimes++;
Object.assign(toadd,annoy);

	this.$store.dispatch('addrecord',toadd);
this.update();

}


,
update(){ 
this.records=[];
     if(this.$store.state.Record.length==0){
         	this.$router.replace('/Record')
         } 
for(let x of this.$store.state.Record){

if(x.片号==this.$route.query.No){

	this.records.push(x);
	 this.records.sort((a,b)=>{return moment(b.时间).format('X')-moment(a.时间).format('X') })
}
}
}


	},

	components:{
		REDA
	}
}





	

</script>
<style lang="less" scoped>


	.title{
		width: 20px;
		font-size: 20px;
	}
	.touxiang{

		border-radius: 40px;
		width: 40px;
		height: 40px;
		flex-shrink: 0;
		align-self:flex-start;
		overflow: hidden;
	}
	.touxiang{display: inline-block;

	}
.rt{
display: flex;
	.content{
	
		display: flex;
		font-size: 35px;
		font-weight: 800;
	}
}
#canvas{width: 300px;
height: 150px;



}
.bg{
	position:relative;
	color: white;
	background: black;
	width: 100%;
	padding:60px 200px;
	height: calc(100% - 60px);
	overflow: auto;
}
.acinfo{
	display: flex;
	min-width: 200px;
	margin-bottom:20px;
	justify-content: space-around;
	.info{
		display: flex;
		flex-direction: column;
	.name{font-size: 25px;}
	.time{color:rgba(80,81,82);
font-size: 10px;
	}
}
}
.comment{
	margin: 20px;
	font-size: 20px;
	white-space: nowrap;
}
.el-row{
	border-bottom:gray 1px solid;
	padding: 10px;

	min-width: 650px;
}

.footer{position: relative;

text-align: center;
font-size:10px;

}

</style>