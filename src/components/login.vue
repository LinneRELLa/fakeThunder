<template>
	<div class="loginroot">
		<div class="logincont">

 <el-button type="primary">登录</el-button>


<router-link replace :to="{
	name:'Register'
}">

  <el-button type="primary">注册</el-button>
</router-link>

			<form>
<el-input
  placeholder="请输入账号"
  v-model="input.ac"
  clearable>
</el-input>
<el-input placeholder="请输入密码" v-model="input.pass" show-password></el-input>

   <el-button type="primary" icon="el-icon-check" circle
   @click="submit" id="sub"></el-button>
</form>
</div>
</div>
</template>

<script >
	export default {
name:'login',
data(){
	return {input:{ac:'',
	               pass:''}
               




	}
},
methods:{
	submit(){

		console.log(this);
	}
}



	}


</script>
<style lang="less" scoped>
	
.loginroot{

	display: flex;
	justify-content: center;
	align-items: center;
	align-content:center;
	width: 100%;
	height: 100%;
	flex-direction: column;
}
form{
display: flex;
	justify-content: center;
	align-items: center;
	align-content:center;
flex-direction: column;

}
.el-input{
	margin-top: 10px;
}
.logincont{

width: 300px;


}
.el-button{
	align-self:center;
}
#sub{margin-top: 10px;}
</style>