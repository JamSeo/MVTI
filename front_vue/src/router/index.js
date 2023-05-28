import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView'
import ArticleView from '@/views/ArticleView'
import CreateView from '@/views/CreateView'
import DetailView from '@/views/DetailView'
import SignUpView from '@/views/SignUpView'
import LogInView from '@/views/LogInView'
import ProfileView from '@/views/ProfileView'
import MyProfileView from '@/views/MyProfileView'
import MovieDetailView from '@/views/MovieDetailView'
import MvtiView from '@/views/MvtiView'


Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/movie/:id',
    name: 'MovieDetail',
    component: MovieDetailView,
    props: true
  },
  {
    path: '/articles',
    name: 'ArticleView',
    component: ArticleView
  },
  {
    path: '/create',
    name: 'CreateView',
    component: CreateView
  },

  {
    path: '/signup',
    name: 'SignUpView',
    component: SignUpView
  },

  {
    path: '/login',
    name: 'LogInView',
    component: LogInView
  },

  {
    path: '/article/:id',
    name: 'DetailView',
    component: DetailView,
    props: true,
  },

  {
    path: '/profile/:username',
    name: 'ProfileView',
    component: ProfileView,
    props: true,
  },
  {
    path: '/profile/:loggedInUser',
    name: 'MyProfileView',
    component: MyProfileView,
    props: true,
  },
  {
    path: '/mvtitest/:loggedInUser',
    name: 'MvtiView',
    component: MvtiView,
    props: true,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

import store from '@/store'

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.state.token ? true : false

  if (to.path !== '/login' && to.path !== '/signup' && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})