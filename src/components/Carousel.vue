<template>
  <el-carousel :interval="5000" height="600px" type="card">
    <el-carousel-item v-for="item in 4" :key="item">
     <img :src="toshow[item]">
    </el-carousel-item>
  </el-carousel>
</template>






<script>
  export default{
name:'Carousel',
props:['items'],
computed:{

  toshow(){
    
let items=[...this.items]

let sorted=items.sort((a,b)=>a.FilmNo-b.FilmNo);
let dup=[];
for (let value of sorted){
dup.push(value.封面)


  }
 return [...new Set([...dup].reverse())]
}
}


  }
</script>




<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
img{width: 100%;
 
 }
.el-carousel{
  width: 900px;
border-radius: 10px;

  align-self: center;
}

</style>