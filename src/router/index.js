
 import Router from 'vue-router'

const ScheduleDetail =()=>import('../pages/ScheduleDetail')
import login from '../pages/login'
import Register from '../pages/Register'

import infos from '../pages/Infromation'
import SheduleLists from '../pages/SheduleLists'

const AccountInfo = () => import('../pages/AccountInfo')
const Edit=()=>import('../pages/edit')
const FilmEdit=()=>import('../pages/FilmEdit')
const FilmToEdit=()=>import('../pages/FilmToEdit')

const ScheduleEdit=()=>import('../pages/ScheduleEdit')
const Record=()=>import('../pages/Record');

const RecordDetail=()=>import('../pages/RecordDetail')

const Message=()=>import('../pages/Message')

const DetailInfo=()=>import('../pages/DetailInfo')
console.log('rt');



 export default new Router({
routes:[

{

	path:'/SheduleLists',
 component:SheduleLists,
 children:[
			{
   name:'ScheduleDetail',
	path:'ScheduleDetail',
	component:ScheduleDetail
				}


 ]

},
{
path:'/AccountInfo',
 component:AccountInfo,
 children:[
			{
   name:'login',
	path:'login',
	component:login
				},
				{
   name:'Register',
	path:'Register',
	component:Register
				},
							{
   name:'infos',
	path:'infos',
	component:infos
				}



 ]
},
{

	path:'/Edit',
	name:'Edit',
	component:Edit,
	children:[
    {
    	path:'FilmToEdit',
    	name:'FilmToEdit',
    	component:FilmToEdit,
    	
    
    },     {path:'FilmEdit',
    	name:'FilmEdit',
    	component:FilmEdit,},

{path:'ScheduleEdit',
    	name:'ScheduleEdit',
    	component:ScheduleEdit,}
	]
}
,
{	path:'/Record',
	name:'Record',
	component:Record,

},
{	path:'/RecordDetail',
	name:'RecordDetail',
	component:RecordDetail,

},
{	path:'/Message',
	name:'Message',
	component:Message,
	children:[
     {path:'DetailInfo',
     name:'DetailInfo',
     component:DetailInfo
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