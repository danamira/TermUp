import Vue from 'vue'
import VueRouter from 'vue-router'
import Board from '../views/Board.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Board',
    component: Board
  },
  {
    path: '/contributors',
    name: 'Credits',
    component: () => import('../views/About.vue')
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
