import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/SearchView.vue')
  },  
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/SearchView2.vue')
  }, 
  {
    path: '/addlist',
    name: 'addlist',
    component: () => import('../views/AddView.vue')
  }, 
  {
    path: '/test2',
    name: 'test2',
    component: () => import('../views/AddView2.vue')
  },
    {
    path: '/list',
    name: 'list',
    component: () => import('../views/ListView.vue')
  },
  {
    path: '/baseball',
    name: 'etc',
    component: () => import('../components/BaseballGame.vue')
  },
  {
    path: '/etc',
    name: 'etc',
    component: () => import('../views/GamePage.vue')
  },

  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
