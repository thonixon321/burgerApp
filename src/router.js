import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login'
import Profile from './views/Profile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path:'/profile',
      name: 'profile',
      component: Profile,
      props: true
    }
  ]
})
