import Vue from 'vue'
import VueRouter from 'vue-router'
import Board from '../views/Board.vue'

let availableMajors=['CivilEng','Math']
Vue.use(VueRouter)

const routes = [
  {path:'/',name:'Home',redirect:function(){
    let major=(localStorage.getItem('major'))
    if(availableMajors.includes(major)){
      return '/board/'+major;
    }
    return '/majors'
  }},
  {
    path: '/board/:major',
    name: 'Board',
    component: Board,
  },
  {
    path: '/result',
    name: 'Result',
    component:()=>import('../views/Result.vue')
  },
  {
    path: '/contributors',
    name: 'Credits',
    component: () => import('../views/About.vue')
  },
  {
    path:'/majors',
    name:'MajorSwitch',
    component:()=>import('../views/Majors.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
  // Making sure that the browser goes back to the default sroll position after switching pages.
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})

export default router
