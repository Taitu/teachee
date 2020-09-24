import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import Index from './pages/Index'
import Call from './pages/Call'
import '../assets/app.scss'
import 'normalize.css'

const routes = [
  { path: '/', component: Index },
  { path: '/call', component: Call }
]

const router = new VueRouter({
  routes
})

new Vue({
  router
}).$mount('#app')
