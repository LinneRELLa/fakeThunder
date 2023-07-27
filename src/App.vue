<template>

 
<div id="root">

	<div id="top">

		<img src="../public/xunlei.png">
		<div class="close" @click="closewin">X</div>
         <div class="minimize" @click="minimize">一</div>
	</div> 



	<div id="bottom">
	<div id="left">
	
		

  <router-link replace :to="`/Message`" class="icon" active-class="active-icon"><i class="el-icon-download"/>下载</router-link>

	</div>
	<div id="rightout">


<div id="rightin">


<keep-alive :include="/^((?!RD).)+$/">
<router-view ></router-view>
</keep-alive>
</div>
</div>
</div>
  </div>

</template>
<script>



/*import 'animate.css'*/



	export default {
	/*	
*/
name:'App',


data(){





	return {icon:'R',
	response:{},
	sloaded:0,
	keepalive:['Record','FilmToEdit','SheduleLists']
}
},




mounted(){
	/*
	this.$refs.default.$el.click();*/
	this.$bus.$on('sloaded',(status)=>{

    this.sloaded=status;
    

	})
},
methods:{
	minimize(){
this.$electron.ipcRenderer.send('window-min');
	},
closewin () {
	console.log('1');
     this.$electron.ipcRenderer.send('window-close');
}
	,

	jieliu(){




	}
}
/*computed(){



}*/


	
}


</script>

<style lang="less" scoped>
@dborder:1px solid rgba(242,242,242,0.6);
.contentmiddle(){

	display: flex;
	justify-content: center;
	align-items: center;
}

a:visited{
text-decoration: none;
color: none;
}
	#root{
		width:100%;height:100%;justify-content:space-around;border:1px solid #000;align-content:flex-start;
		flex-direction: column;

overflow: hidden;
position: relative;

		}
		#root #top{height:42px;width:100%;
			color: white;
			background:rgb(237,238,242);

          overflow: hidden;
			img{float: left;}
		

}


#top{
font-family: 'Vivaldi';


			}
			#root #left{
background:rgba(244,245,247);
				width:150px;border:1px solid @dborder;
display: flex;
flex-direction: column;
align-items: center;


.icon{

width: 80%;
text-align: center;
font-size: 20px;

text-decoration: none;
/*color: white;*/
border-radius: 5px;
color:rgba(63,133,255);
margin-top: 10px;

}
.icon:hover{color:rgba(63,133,255);}
.active-icon{
	background:rgb(225,234,248);
}

			}


#bottom{display: flex;

height: calc(100% - 20px);

}

#rightin{
	overflow: auto;
	flex: 1;
	display: flex;

}

#rightout{

	overflow: auto;
	flex: 1;
	display: flex;
}









</style>

<style lang="less">
.contentmiddle(){

	display: flex;
	justify-content: center;
	align-items: center;
}

		.loading{
		z-index: 3;
		background:black;
		color: white;
	position: absolute;
		width: 100%;
		height: 100%;
		font-size: 120px;
		.contentmiddle();
		font-family: 'Edwardian Script ITC';
		

	}
	.loadicon{animation: loadAnime 1s ease alternate infinite;}
	@keyframes loadAnime{
		0%{opacity: 0;}
		100%{opacity: 1;}
	}
	*::-webkit-scrollbar {
		display: none;
	}

a {
    text-decoration: none;
    color:white;
}
	
	#top{-webkit-app-region: drag;
	
	

	

	}
	.close:hover{
		 cursor: pointer;
		 color: red;
	}
			.close{
				-webkit-app-region: no-drag;
				position: absolute;
				right: 15px;
				font-family: 微软雅黑;
				top: 50%;
				top: 10px;
				color: black;
				z-index: 1;
			

			
                
			}	
				.minimize:hover{
		 cursor: pointer;
		 color: red;
	}
			.minimize{
				-webkit-app-region: no-drag;
				position: absolute;
				right: 30px;
				
				top: 50%;
				top: 10px;
				color: black;
				z-index: 1;
			

			
                
			}
	.quit{

	-webkit-app-region: no-drag;
	font-size:26px;color:white;
	line-height: 100%;

	height: 100%;
user-select:none;
position: absolute;
right: 4px;
top:-4px;
&:hover{color: rgb(33,120,255);}
			}

		
		
</style>

<!-- 
用于组件测试 -->

<!-- <template>

   
<div id="root">

</div>


</template>
<script>

import SheduleLists from './components/SheduleLists'

	export default {

name:'App',
	components:{
		SheduleLists
	}
}


</script>

<style lang="less" scoped>


</style> -->