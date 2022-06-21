
<template>
<div class="block">
  <el-timeline>

    
    <el-timeline-item v-for="(activity, index) in Nodes"
    
      :key="index"
      :icon="status(activity.timestamp,activity.length).icon"
      :type="activity.type"
      :color="status(activity.timestamp,activity.length).color"
      :size="'large'"
      :timestamp="activity.timestamp"
      >
            <router-link   
:to="{
    name:'ScheduleDetail',
    query:{id:activity.id}

}">


     <div>{{activity.content}}
</div> 
  </router-link>

    </el-timeline-item>

  </el-timeline>
</div>
</template>
<script>
  import moment from 'moment'
  export default {
  props:['Nodes'],
 methods:{
status(time,length){
let current=moment().format("HH:mm");
let dif=current.slice(0,2)*60+current.slice(3,5)*1-time.slice(0,2)*60-time.slice(3,5)*1
if(dif<0){
return {color:'',
icon:'',
}
}
else{

  if(dif<length){
    return {color:'#409EFF',
     type: 'primary',
   icon: 'el-icon-video-camera',
  }
  }
  else{
 return {color:'#0BBD87',
    icon:'el-icon-check',
  }

  }
}
}
}




  }





  




  ;
</script>

<style lang="less" scoped>
  .block{
    margin-top:20px;

  }
.el-timeline{
  font-size: 20px;
  font-weight: 800;
}

</style>