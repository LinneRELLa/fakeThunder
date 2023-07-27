<template>
	
	<div id="bkg">

    <div id="MessageLeft">
    <div id="confirm" v-if="todel" class="toollip">
      确认删除?
     <el-button type="success" icon="el-icon-check" circle
@click="del()"
     ></el-button>
     <el-button type="danger" icon="el-icon-delete" circle
@click="Todel()"
     ></el-button>
    </div>

<div id="newTask" v-if="newTask!=null"  class="toollip">
  <div style="font-weight: 400;width: 100%;text-align: center;margin: 20px 0;">添加链接或口令</div>

<textarea v-model="newTask" class="textarea" rows="8"></textarea>
<p style="font-size: 10px;">下载到:</p>
<div class="outin"><input class="input"></div>
<div :class="Rdnd" @click='Post'>立即下载</div>
</div>








    <div id="mask" v-if="todel||newTask!=null" @click="back()"></div>


    <button id="dnd" @click="dnd">+  新建</button>
  
		<div  id="msg" :class="{red:aria2.con=='下载引擎未连接'}">
{{aria2.con}}
      <div id="Aria2status">
    {{aria2.status}} 

    Aria2路径:<input  v-model="publicpath" class="path"> 
    </div>


  </div>

  <div class="btntop" @click="openAria2" v-if="aria2.con=='下载引擎未连接'">
    尝试连接
  </div>
  <div v-else class="red btntop" @click="closeEngine">
    关闭下载引擎
  </div>

  
    
        <br>
           <div id="display"></div>
          <div class="tasktitle">下载/做种中</div>
 <div id="active" class="tasks">
  <router-link v-for="x of tasks.active" :key="x.gid" :to="{name:'DetailInfo',
   query:{
    id:x.gid,
    Name:x.bittorrent?(x.bittorrent.info?x.bittorrent.info.name:x.infoHash):x.infoHash
   }


  }" v-if="x.bittorrent">
         <div  class="task">
        <!--   <div >GID:{{x.gid}}</div> -->
       <div class="title">
           {{x.bittorrent.info?x.bittorrent.info.name:'种子下载中'}}
           <div

          class="content" 
           >
          <div>{{completed(x)}}</div><div>{{x.downloadSpeed/1024}}kb/s</div>
           </div>
     </div>    
          <Process :percent="percent(x)"/>

<div class="operate">
          <i class="el-icon-delete btn" @click="Todel(x)"></i>
       <i class="el-icon-video-pause btn" @click="Pause($event,x)"></i>
       <i class="el-icon-files btn" @click="tst(x)"></i>
</div>

        </div>
        </router-link>

          </div>
          <div class="tasktitle">暂停中
          </div>
          <div id="active" class="tasks">
            <router-link v-for="x of tasks.waiting" :key="x.gid" :to="{name:'DetailInfo',
   query:{
    id:x.gid,
    Name:x.bittorrent?(x.bittorrent.info?x.bittorrent.info.name:x.infoHash):x.infoHash
   }


  }" v-if="x.bittorrent">
         <div class="task">
   
      
        <div class="title">
          {{x.bittorrent.info?x.bittorrent.info.name:x.infoHash}}   

  <div class="content">
          {{completed(x)}}
          </div>
           </div>
          <br>
          <Process :percent="percent(x)"/>
          <div class="operate">
        <i class="el-icon-delete btn" @click="Todel(x)"></i>
       <i class="el-icon-refresh-left btn" @click="UnPause(x)"></i>
     </div>
        </div>
      </router-link>
</div>
<div class="tasktitle">任务完成</div>
 <div class="tasks">
  <router-link v-for="x of tasks.stopped" :key="x.gid" :to="{name:'DetailInfo',
   query:{
    id:x.gid,
    Name:x.bittorrent?(x.bittorrent.info?x.bittorrent.info.name:x.infoHash):x.infoHash
   }


  }" v-if="x.bittorrent&&x.bittorrent.info">
         <div  class="task">
        <!--   <div >GID:{{x.gid}}</div> -->
       <div class="title">

           {{x.bittorrent.info?x.bittorrent.info.name:x.infoHash}}
           <br> 

             <div class="content">{{completed(x)}}</div>
     </div>    
          
    <div class="operate">
          <i class="el-icon-delete btn" @click="Todel(x)"></i>
          <i class="el-icon-files btn" @click="tst(x)"></i>
       
</div>
        </div>
        </router-link>

          </div>

          </div>
          <div id="MessageRight">
            <router-view> </router-view>
            <div id="Msgup" class="Logo" v-if="this.$route.name!='DetailInfo'">R</div>
            <div id="Msgdown" class="Logo" v-if="this.$route.name!='DetailInfo'">R</div>
          </div>
 
	</div>
</template>


<script>

  const { ipcRenderer, remote } = window.require('electron')
const fs = window.require('fs')
const iconv = require('iconv-lite');
/*const kill=window.require('tree-kill');*/

iconv.skipDecodeWarning = true;

const proc = window.require('child_process');
const path = window.require('path');


	const Process=()=>import('../components/Process');
 
	export default{
  name:'Message',
  components:{
    Process,
  },
data(){
	return {data:'sth to send',
         todel:null,
         newTask:null,
         publicpath:'./public/aria2',
          tasks:{
            active:[],
            waiting:[],
            stopped:[], 
                     

          },
          ws:null,
          count:0,
          ToRemoved:[],
          aria2:{
            con:'下载引擎未连接',
            status:'',
            pid:null,
          }
  }
}
  ,
mounted(){

},
  created(){


     const vc=this;
    
    (async function(){

await vc.getStatus();

vc.openAria2();

    })()




 

const ws=new WebSocket('ws://localhost:6800/jsonrpc');
vc.ws=ws




console.log(this);
(async function conncet(){
	await new Promise(resolve=>{
     ws.addEventListener('open',function(){
      console.log(ws)
     	console.log('con');
                 vc.$nextTick(()=>{
vc.aria2.con='下载引擎已连接';
resolve();

            })
     })
  })


 
 vc.getInfo();
})()




 vc.$nextTick(()=>{

})

ws.addEventListener('message',(e)=>{

 vc.$nextTick(()=>{


const div=document.querySelector('#display')
const res=JSON.parse(e.data)

if(res.id&&res.id.match(/^ROREL_.*/)){
 vc.tasks.active=res.result[0][0]
vc.tasks.waiting=res.result[1][0]
vc.tasks.stopped=res.result[2][0]
setTimeout(vc.getInfo,500);
}

if(res.method&&res.method=='aria2.onDownloadStop'){
  const RealRemove=res.params[0].gid
  console.log(this.ToRemoved)
  console.log(RealRemove)
  console.log(this.ToRemoved.indexOf(RealRemove))
  if(this.ToRemoved.indexOf(RealRemove)!=-1){
vc.ws.send(JSON.stringify(
    {'jsonrpc':'2.0', 
    'id':`delres${this.count++}`,
    'method':'aria2.removeDownloadResult', 
    'params':[RealRemove]}))

  }


}
if(!res.error){



}

           }) 	


          
 

})
ws.addEventListener('close',()=>{
console.log('服务器连接断开')





})










	},

	beforeDestroy(){
   closeEngine();
		ws.close();
   
	},
  computed:{
Rdnd(){

  return this.newTask.match(/^magnet:\?xt=urn:btih:[0-9a-fA-F]{40,}.*$/)?'Rdnd-active':'Rdnd'
}


  },



  methods:{ 
    refresh(){
location.reload();
    },
    openAria2:async function(){
     
  await this.getStatus();

if(this.aria2.status.match(/信息: 没有运行的任务匹配指定标准。/)||this.aria2.status.match(/INFO: No tasks are running which match the specified criteria/)){
   this.aria2.con='正在尝试连接'
         
  await proc.exec('cd '+ `"${path.resolve('./public/aria2/')}"`+'&aria2c.exe --conf-path=aria2.conf',{ encoding: 'buffer' },(err,res)=>{
  console.log(err,iconv.decode(res,'cp936'))
resolve();


})
    this.aria2.con='下载引擎已连接'
   await this.getStatus();
}

},
    closeEngine:async function(){
await this.getStatus();
            if(this.aria2.pid){
              console.log('尝试关闭中')
console.log(`taskkill /pid ${this.aria2.pid}`)
         await proc.exec(`taskkill /F /pid  ${this.aria2.pid}`,(err,res)=>{
          this.aria2.con='下载引擎未连接';
          console.log('unc')
          resolve()
            
          })
     await  this.getStatus();
            }
    },
    getStatus(){
      const vc=this;
      return new Promise((resolve,reject)=>{
        console.log('getstatus')
      console.log(`${path.resolve(vc.publicpath,'Status.bat')}`)
const sta=proc.exec(`H:\\ROREL\\aria2-1.36.0-win-64bit-build1\\Status.bat`,{ encoding: 'buffer' },(err,res)=>{
 
  this.aria2.status=iconv.decode(res,'CP936');

      const status=iconv.decode(res,'CP936');
      if(status.match(/PID:.*?([0-9]{1,})/)){
vc.aria2.pid=status.match(/PID:.*?([0-9]{1,})/)[1]||null
}
console.log(vc.aria2.pid);
  resolve(iconv.decode(res,'CP936'))
})

setTimeout(() => {

  sta.kill()

 

},1000);


      })

    }
    ,
    tst(x){

      const p=path.resolve(this.publicpath,x.dir)
     


console.log('explorer '+`"${p}"`)
proc.exec('explorer '+`"${p}"`,(err,res)=>{
  console.log(err||res)
})



    },
    Post(){

if(this.newTask.match(/^magnet:\?xt=urn:btih:[0-9a-fA-F]{40,}.*$/)){

this.ws.send(JSON.stringify(
    {'jsonrpc':'2.0', 
    'id':`Rdnd${this.count++}`,
    'method':'aria2.addUri', 
    'params':[[this.newTask]]}))

this.newTask=null;
   
}

    },
   back(){
this.todel=null;
this.newTask=null;
   },
   percent(x){
return x.completedLength/x.totalLength

   }

    ,UnPause(x){
this.ws.send(JSON.stringify(
    {'jsonrpc':'2.0', 
    'id':`pause${this.count++}`,
    'method':'aria2.unpause', 
    'params':[x.gid]}))

    },
    Pause(e,x){
      e.target.className='el-icon-loading'
this.ws.send(JSON.stringify(
    {'jsonrpc':'2.0', 
    'id':`pause${this.count++}`,
    'method':'aria2.pause', 
    'params':[x.gid]}))

  }
    ,
    Todel(x){
      if(this.todel==null){
           this.todel=x;
      }
      else{
        this.todel=null
      }
  
    },
    del(){



       this.ws.send(JSON.stringify(
    {'jsonrpc':'2.0', 
    'id':`del${this.count++}`,
    'method':'aria2.remove', 
    'params':[this.todel.gid]}))
this.ToRemoved.push(this.todel.gid)
  this.todel=null;
  }

    ,

  dnd(){
this.newTask='磁力链接';

  },


  getInfo(){
    this.ws.send(JSON.stringify({
  "jsonrpc": 2,
  "id": `ROREL_${this.count++}`,
  "method": "system.multicall",
  "params": [
    [
      {
        "methodName": "aria2.tellActive"
      },
      {
        "methodName": "aria2.tellWaiting",
        "params": [
          0,
          100
        ]
      },
         {
        "methodName": "aria2.tellStopped",
        "params": [
          0,
          100
        ]
      },
      {
        "methodName": "aria2.getGlobalStat"
      }
    ]
  ]
}));
  },
      completed(x){
        if(this.ToRemoved.indexOf(x.gid)==-1){
    return `${Math.round(x.completedLength/1024/1024*10)/10}MB/${Math.round(x.totalLength/1024/1024*10)/10}MB ${Math.round(x.completedLength/x.totalLength*100)}% `
  }
  else return '删除中'
  },
  },
  destroyed(){
          
  }
}
</script>

<style lang="less">

#msg{
  #Aria2status{
position: absolute;
display: none;
width: 200px;
background:rgb(244,245,247);
z-index: 3;
}

&:hover{
    #Aria2status{
display: block;
}
}


}
  .tasks{
  
  
   width: 400px;
    min-height: 200px;
    max-height: 400px;
    overflow: auto;
    position: relative;
  }
.task:nth-of-type(1){


}

  .task:hover{
background: rgba(229,240,254,0.9);
  }

#mask{
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  z-index: 3;
}
.toollip{
   position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  width: 500px;
  height: 413px;
  background: rgba(255,255,255,1);
  z-index: 4;
  border-radius: 3px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0 30px;
  flex-direction: column;
}
.title{
  font-size: 16px;
  font-weight: 400;
color: black;
  padding: 15px 40px;
}
#bkg{
  background: rgba(250,250,250);
  width: 100%;
    min-width: 728px;
 
}
.btn:hover{
  cursor: pointer;
  color: rgba(10,10,10,0.5);

}
.btn{
 color: black;

}

#MessageRight{
  overflow: hidden;
  
  height: 100%;
  font-size: 128px;
  color: black;
  font-family: 'Vivaldi';
  position: relative;

}

#MessageLeft{

  float: left;
  border-right: 1px solid rgba(4,4,4,0.3);
height:100%;

}
#Msgup{
animation: come 1s ease ;

}
#Msgdown{
animation: come1 1s ease;
}

@keyframes come{
  0%{transform: perspective(2000px) 
  
    translate3d(30px,30px,0);}
  100%{transform: perspective(2000px) 
  
    ;}
}
@keyframes come1{
  0%{transform: perspective(2000px) 
    translate3d(-30px,-30px,0)
 ;}
  100%{transform: perspective(2000px) 
    translate3d(0,0,0)

    ;

   }
}
.Logo{
  transform-style: preserve-3d;
  position: absolute;
margin: -64px -64px;
  left: 50%;
  top: 50%;

}
.tasktitle{
  
width: calc(100% - 20px);
background: rgb(250,250,250);
overflow: hidden;
padding: 5px 10px;

}
.content{
   display: flex;justify-content: space-between;font-size: 13px;color: rgb(211,214,218);
}
.operate{
  font-size: 20px;
  text-align: center;
}
.input{
  width: calc(100% - 70px);
  border: 1px solid rgb(230,230,230);
  border-radius: 3px;
  height:36px;
  padding-left: 50px;
  padding-right: 20px;
}
.textarea{
    width: 100%;
  border: 1px solid rgb(230,230,230);
  border-radius: 3px;
}
.textarea:focus-visible{
  border: 1px solid rgb(63,133,255);
}
textarea:focus{
  border: 1px solid rgb(63,133,255);
  outline: none;
}
input:focus{
  border: 1px solid rgb(63,133,255);
  outline: none;
}
.outin{width: 100%;}
.outin::before{
content: "电脑";

display: inline-block;

width: 40px;

height:40px;
line-height: 40px;


position: absolute;
left: 40px;


}
.Rdnd{
  height: 44px;
  width: 100%;
  text-align:center;
  cursor: pointer;
  background: rgb(245,245,245);
  line-height: 44px;
  margin: 20px 0;
  color:rgb(204,204,211);
}
.Rdnd-active{
    height: 44px;
  width: 100%;
  text-align:center;
  cursor: pointer;
  background: rgb(38,112,234);
  line-height: 44px;
  margin: 20px 0;
  color:white;

}
#dnd{
  border: none;
  border-radius: 3px;
  background: rgba(231,239,251,0.8);
  color: rgba(63,133,255);
  cursor: pointer;
  font-size: 18px;
  float: left;
   margin: 10px 20px;
}
#dnd:hover{
  background: rgba(231,239,251,1);
}
#msg{
    border: none;
  border-radius: 3px;
  background: rgba(231,239,251,0.8);
  color: rgba(63,133,255);
  font-size: 18px;
  float: left;
  user-select: none;
  margin: 10px 20px;
}

.btntop{
  border: none;
  border-radius: 3px;
  background: rgba(231,239,251,0.8);
  color: rgba(63,133,255);
  cursor: pointer;
font-size: 18px;
  float: left;
   margin: 10px 20px;
}
.red{
  color:red;
}
.path{
  width: 200px;
 
}
</style>