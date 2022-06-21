<template>
<el-row>

    <el-card :body-style="{ padding: '0px' }" shadow="hover" >
      <el-image :src="Data.封面" class="image" />
      <div style="padding: 14px;">
        <span>{{Data[this.$store.state.METHOD.showinfo]}}</span>
        <div class="bottom clearfix">
      <span>{{Data.StartTime.slice(0,5)}}</span>
      <router-link  :to="{
        name:'ScheduleDetail',
        query:{id:Data.排片号},
  }" >
          <el-button type="text" class="button">选座购票</el-button>
        </router-link>
        </div>
      </div>
    </el-card>

</el-row>
</template>


<script>
export default {
props:['Data']
}
</script>
<style scoped lang="less">
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
  .el-image{
    height: 200px;
  }
  .el-image__inner{
    height: auto;
  }
  .el-row{
 
    transition: transform 0.5s ease;
    &:hover{  transition: transform 0.5s ease;
   transform: translate(3px,3px);};
  }

</style>