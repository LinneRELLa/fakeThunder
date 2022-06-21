<template>
	<div class="loginroot">
		<div class="logincont">

<router-link replace :to="{
	name:'login'
}">
 <el-button type="primary">去登录</el-button>
</router-link>

 



			<form>
<el-input
  placeholder="昵称(2-8位数字,字母,汉字组合)"
  v-model="input.name"
  clearable>
</el-input>

<el-input
  placeholder="账号(4-12位数字,字母组合)"
  v-model="input.ac"
  clearable>
</el-input>












<el-input placeholder="密码(4-12位数字,字母组合)" v-model="input.pass" show-password></el-input>

<el-input
placeholder="确认密码" v-model="input.confirm" show-password>
</el-input>
  <el-alert
  v-if="!AllCorrect"
    :title="msg"
    type="error" 
    :closable="false">
  </el-alert>
   <el-alert
  v-if="succ"
    title="注册成功，即将跳转"
    type="error" 
    :closable="false">
  </el-alert>

   <el-button type="primary" icon="el-icon-check" circle
   @click="throsub" id="sub"
:disabled="!AllCorrect"
   ></el-button>
</form>
</div>
</div>
</template>

<script >
	import qs from 'qs'
	let RegofPass=new RegExp("^[a-zA-Z0-9]{4,20}$");

let RegofNicheng=new RegExp("^[a-zA-Z0-9\u4e00-\u9fa5]{2,8}$");
let RegofAc=new RegExp("^[a-zA-Z0-9]{4,12}$");
	export default {



name:'Register',
data(){
	return {input:{ac:'',
	               pass:'',
                   confrim:'',
                   name:''
	           },
	           msg:'存在格式错误',
	           succ:0

               




	}
},
methods:{
	throlotte(fn,wait){
let old=0;
return function(){
if(Date.now()-old>wait){
	fn.call(this);
old=Date.now();
}
else{
	console.log('节流');
}
	
}

	}


	,submit(){
console.log('sub')
		this.axios({

	method:'post',
	url:'/api/Register',
      headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data:qs.stringify({
  	Account:this.input.ac,
  	pass:this.input.pass,
  	name:this.input.name

  })

}).then(response=>{

	alert(response.data.msg);

if(response.data.status==1){
this.succ=1;
	setTimeout(()=>{this.$router.replace({
		name:'login'
	})},2000);
}


},err=>{
	console.log(err)
})
	}
},
computed:{

throsub(){

return this.throlotte(this.submit,1000);

}
,
nameCorrect(){
return RegofNicheng.test(this.input.name)
},
acCorrect(){

	return RegofAc.test(this.input.ac)

},
passCorrect(){
	return RegofPass.test(this.input.pass)
},
AllCorrect(){
	return RegofNicheng.test(this.input.name)&&RegofAc.test(this.input.ac)&&RegofPass.test(this.input.pass)&&(this.input.pass==this.input.confirm)
},
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
.el-alert{
	margin: 5px;
}
</style>