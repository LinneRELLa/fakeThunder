<template>
<el-tree :data="dt"  @node-click="handleNodeClick"></el-tree>
</template>
<script>
  export default {
   
    methods: {
      handleNodeClick(data) {
        console.log(data);
      }
    },
  props:['dt']
  };
</script>
<style type="text/css" scoped>
  .el-tree-node__content{
    padding-left: 0;
  }
.el-tree{background: rgb(57,61,67);
  color: white;


}

</style>