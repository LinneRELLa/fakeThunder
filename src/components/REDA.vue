
<!-- 
这是一个VUE组件
模板内容是一个可自由调整拖动的雷达图


请以','分割的字符串形式传入数据
由于已知但是懒得修复的bug，垂直方向的拖动存在问题
所以不支持可编辑的四边形雷达图

需要注意的是本组件并不完全符合VUE规范
因为包含了大量对于原生dom的操作
但也因此不需要任何外置包引入,小巧轻便








 -->






<template>
  <div>
<canvas ref="canvas" id="canvas" :class="{tiny:this.tiny,
                                          small:this.small
}"></canvas>
</div>
</template>
<script type="text/javascript">

export default {
  data(){
return {
  updated:''
  }
},

props:{
  description:{type:String,
              default:'音效,画面,导演,剧情,印象'
  },
data:{type:String,
              default:'80,80,80,80,80'
  },
editable:{type:Number,
              default:1
  },
  tiny:{
       type:Boolean,
              default:false

  },
  small:{    type:Boolean,
              default:false}
},
mounted(){

let REDA=(text,$str1)=>{

  let vc=this;
let index='?';
var  prerecord=$str1.split(',');

    
 var canvas = this.$refs.canvas;

 canvas.width=600;
 canvas.height=300;
 canvas.length=text.split(',').length;
 text=text.split(',');
  var context = canvas.getContext('2d');
/*绘制内部*/
 context.clearRect(0, 0, canvas.width, canvas.height);

var midx=1/2*canvas.width;
var midy=1/2*canvas.height;

/*var text=['题材','音乐','伏笔','叙事','作画']*/
var xx= [];
var xo= [];
var yy= [];
var yo= [] ;
var dst=[];
var xp=[];
var yp=[];
/*获取每集评分*/

for (var i = prerecord.length - 1; i >= 0; i--) {
  if(prerecord[i]=="")
  {

    prerecord[i]=0;
  }



}




var pingjia=prerecord;
var pub=[91,92,99,90,90];
for (var i = 0; i <= pingjia.length - 1; i++) {


   xo.push(Math.cos(2*i*Math.PI/pingjia.length)*100+midx)
  yo.push(midy-Math.sin(2*i*Math.PI/pingjia.length)*100)
   xx.push(Math.cos(2*i*Math.PI/pingjia.length)*pingjia[i]+midx)
  yy.push(midy-Math.sin(2*i*Math.PI/pingjia.length)*pingjia[i])
xp.push(Math.cos(2*i*Math.PI/pingjia.length)*pub[i]+midx)
yp.push(midy-Math.sin(2*i*Math.PI/pingjia.length)*pub[i])


       dst.push (Math.round(Math.sqrt(Math.pow(midx - xx[i], 2)
        + Math.pow(midy - yy[i], 2))));





 context.globalAlpha = 0.85;
      context.beginPath();
      context.arc(xx[i], yy[i], 4, 0, Math.PI * 2);


      context.fillStyle = "red";
   
      context.fill();
  


}

  context.moveTo(xx[0], yy[0]);

   context.beginPath();
    context.lineWidth = 4;
context.font = 'bold 14px normal ';
   context.fillStyle='#1478FA';
for (var i = 0; i <= pingjia.length - 1; i++) {


  
     context.lineTo(xx[i], yy[i]);


}

context.closePath();
      context.fillStyle = "rgba(100,100,255,0.8)";
    context.fill();
    context.strokeStyle = "#9d4dca";
    context.stroke();
/*绘制外部框*/
context.beginPath();
    context.lineWidth = 1;

for (var i = 0; i <= pingjia.length - 1; i++) {


  
     context.lineTo(xo[i], yo[i]);
context.fillText(text[i]+dst[i],xo[i]+20*Math.cos(i*2*Math.PI/pingjia.length), yo[i]-20*Math.sin(i*2*Math.PI/pingjia.length))

}

context.closePath();
 
    context.strokeStyle = "black";
    context.stroke();
context.moveTo(midx,midy);
    context.lineWidth = 2;

for (var i = 0; i <= pingjia.length - 1; i++) {


  
     context.lineTo(xo[i], yo[i]);

context.closePath();
 
    context.strokeStyle = "rgba(255,255,255,0.1)";
    context.stroke();
}







  //线段的点的集合
  var points = [];
  //可拖动圆圈的点的集合
  var circles = [];
  //整体移动点位
  var allpoints = []
  var isDragging = false
  //是否在绘制区域内
  var isInOut = false
  //记录鼠标点击位置
  var downx = 0
  var downy = 0






  //每一个点的对象
  function Point(x, y) {
    this.x = x;
    this.y = y;
  }
  //圆圈对象
  function Circle(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 10;
    this.color = "blue";
    //拖拽点的标记
    this.isSelected = false;
  }

  
if(this.editable){

  canvas.onmousedown=function(e){
  


  var clickX = e.offsetX;
    var clickY = e.offsetY;
  

    downx = clickX
    downy = clickY


    if (isInt(clickX, clickY)) {
      isInOut = true
      return
    } else {
      isInOut = false
    }

    //判断当前点击点是否在已经绘制的圆圈上，如果是执行相关操作，并return，不进入画线的代码
    for (var i = 0; i < pingjia.length; i++) {
      var circle = circles[i];
      //使用勾股定理计算这个点与圆心之间的距离
      var distanceFromCenter = Math.sqrt(Math.pow(xx[i] - clickX, 2)
        + Math.pow(yy[i] - clickY, 2));

      // 如果是其他的点，则设置可以拖动
      if (distanceFromCenter <= 15) {
        // 清除之前选择的圆圈
        index = i;
        isDragging = true;
      
      
        //停止搜索
        return;
      }
    }
  }
}
function debounce(fn,wait){
let timerx=null
return function (){

if(timerx){
  clearTimeout(timerx);
   console.log('debouncce')  
}

  timerx=setTimeout(()=>{


    fn.call(this)},wait);
 

}
}
const fn=()=>{vc.$bus.$emit('RC',dst.join(','));}
const emit=debounce(fn,1000)
  canvas.onmousemove = function (e) {

    // 取得鼠标位置
    var x1 = e.offsetX;
    var y1 = e.offsetY;
      
 


  if (isDragging == true) {   



      if( Math.round((x1-midx)/Math.cos(index*2*Math.PI/this.length))>=0&&Math.round((x1-midx)/Math.cos(index*2*Math.PI/this.length))<=100){

  xx[index] = x1;

      yy[index] =midy-Math.tan(index*2*Math.PI/this.length)*(x1-midx);
       dst[index]= Math.round((x1-midx)/Math.cos(index*2*Math.PI/this.length))
    
      context.clearRect(0, 0, canvas.width, canvas.height);
    vc.updated=dst.join(',');

for (var i = 0; i <= pingjia.length - 1; i++) {

 context.globalAlpha = 0.85;
      context.beginPath();
      context.arc(xx[i], yy[i], 4, 0, Math.PI * 2);


      context.fillStyle = "red";
   
      context.fill();
  


}

context.moveTo(xx[0], yy[0]);

   context.beginPath();
    context.lineWidth = 4;
context.font = 'bold 14px normal ';
   context.fillStyle='#1478FA';
for (var i = 0; i <= pingjia.length - 1; i++) {


  
     context.lineTo(xx[i], yy[i]);


}

context.closePath();
      context.fillStyle = "rgba(100,100,255,0.8)";
    context.fill();
    context.strokeStyle = "#9d4dca";
    context.stroke();
/*绘制外部框*/
context.beginPath();
    context.lineWidth = 1;

for (var i = 0; i <= pingjia.length - 1; i++) {


  
     context.lineTo(xo[i], yo[i]);
context.fillText(text[i]+dst[i],xo[i]+20*Math.cos(i*2*Math.PI/pingjia.length), yo[i]-20*Math.sin(i*2*Math.PI/pingjia.length))

}

context.closePath();
 
    context.strokeStyle = "black";
    context.stroke();
context.moveTo(midx,midy);
    context.lineWidth = 2;

for (var i = 0; i <= pingjia.length - 1; i++) {


  
     context.lineTo(xo[i], yo[i]);

context.closePath();
 
    context.strokeStyle = "rgba(255,255,255,0.1)";
    context.stroke();


}





emit();








}
      }


    }



 canvas.onmouseup = function () {


    isDragging = false;
    isInOut = false

    allpoints = JSON.parse(JSON.stringify(circles))
    
  
  };

    function isInt(x, y) {
    if (!points[2]) {
      return
    }
    var pt = {
      x: x,
      y: y
    }
    var poly = points
    return PointInPoly(pt, poly)
  }


  return canvas;
}

REDA(this.description,this.data);



}

}




</script>

<style lang="less" scoped>
  
.small{width: 400px;
  height: 200px;


}
.tiny{width: 300px;
  height: 150px;

}


</style>