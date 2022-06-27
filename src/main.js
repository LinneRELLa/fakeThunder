

import Vue from 'vue'
import less from 'less'
import router from 'vue-router'



import Vuex from 'vuex'
import moment from 'moment'
import axios from 'axios'

import App from './App.vue'
import RealRouter from './router'
import './CSS/element-ui-reset.less'



import store from './store'


/*Vue.use(animate)*/

/*Vue.use(moment)


Vue.use(less)*/


/*Vue.use(ElementUI)*/
/*Vue.use(Element)
*/


/*Vue.use(router)*/
Vue.config.productionTip = false

new Vue({

beforeCreate(){
	Vue.prototype.$bus=this;
	/*全局事件总线*/
	Vue.prototype.axios = axios;

},
created(){
  /*登录*/
  

},

  render: h => h(App),
  router:RealRouter,
  store,

}).$mount('#App')
