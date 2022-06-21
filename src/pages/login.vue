<template>
	<div class="loginroot">
		<div class="logincont">



 
 <router-link replace :to="{
	name:'Register'
}">
  <el-button type="primary">去注册</el-button>

</router-link>
			<form>
<el-input
  placeholder="请输入账号"
  v-model="input.ac"
  clearable>
</el-input>
<el-input placeholder="请输入密码" v-model="input.pass" show-password></el-input>
 <el-alert
  v-if="msg!==''"
    :title="msg"
    type="error" 
    :closable="false">
  </el-alert>

   <el-button type="primary" icon="el-icon-check" circle
   @click="throsub" id="sub"></el-button>
</form>
</div>
</div>
</template>

<script >
import qs from 'qs'
	export default {


name:'login',
data(){
	return {input:{ac:'',
	               pass:'',
                
	           },
	             msg:''
               




	}
},
created(){


	this.throsub=this.throlette(this.submit,3000);

},


methods:{

     throlette(fn,wait){ 	
    let late=0
    return function(){
     let current=Date.now()
  
     	if(current-late>wait){
     		fn.apply(this);
     		late=Date.now()
     	}
     	else{
     		console.log(`节流,${current-late}ms后恢复`)
     	}
     }

     	
    },




	submit(){
			this.axios({

	method:'post',
	url:'/api/login',
      headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data:qs.stringify({
  	Account:this.input.ac,
  	pass:this.input.pass,
  	

  })

})

	.then((response)=>{

if(response.data.status){

	

	localStorage.setItem('RORELTOKEN',JSON.stringify(response.data));
location.reload();
	

}
else{
	console.log(response.data);
this.msg=response.data.msg;


}

	},(err)=>{
		console.log(err)
	})
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
</style>