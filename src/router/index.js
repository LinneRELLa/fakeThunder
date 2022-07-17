
 import Router from 'vue-router'



import Message from '../pages/Message'
import DetaiInfo from '../pages/DetaiInfo'



console.log('rt');



 export default new Router({
routes:[



	
{	path:'/Message',
	name:'Message',
	component:Message,
	children:[

{path:'/DetaiInfo',
	name:'DetailInfo',
	component:DetaiInfo,
}
	]

},


{

	path: '/',
    redirect: '/Message'
},{

	path: '*',
    redirect: '/Message'
}



]



 })