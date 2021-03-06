import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
const Home = () => import('@/views/Home')
const Find = () => import('@/views/Find')
const Information = () => import('@/views/Information')
const My = () => import('@/views/My')
const Login = () => import('@/views/Login')
const Registe = () => import('@/views/Registe')
const Collection = () => import('@/views/Collection')
const Rent = () => import('@/views/Rent')
const City = () => import('@/views/Home/components/City.vue')
const GoRent = () => import('@/views/Home/components/GoRent.vue')
const Adress = () => import('@/views/Home/components/Adress.vue')
const Details = () => import('@/views/Details')
const Map = () => import('@/views/Map')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      { path: 'find', component: Find },
      {
        path: 'home',
        component: Home
      },
      { path: 'information', component: Information },
      { path: 'my', component: My }
    ]
  },
  { path: '*', redirect: '/home' },
  { path: '/login', component: Login },
  { path: '/registe', component: Registe },
  { path: '/collection', component: Collection },
  { path: '/rent', component: Rent },
  { path: '/city', component: City },
  { path: '/goRent', component: GoRent },
  { path: '/adress', component: Adress },
  { path: '/details/:houseImg', component: Details },
  { path: '/map', component: Map }
]

const router = new VueRouter({
  routes
})

export default router
