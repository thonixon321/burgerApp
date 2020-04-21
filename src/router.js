import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login'
import Profile from './views/Profile'
import BurgerStore from './views/BurgerStore'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path:'/profile/:username',
      name: 'profile',
      component: Profile,
      props: true,
      beforeEnter: (to, from, next) => {
        if(from.name === 'login' || from.name === 'burger-store') {
          next()
        }
        else{
          next('/')
        }
      }
    },
    {
      path:'/burger-store',
      name: 'burger-store',
      component: BurgerStore,
      props: true
    },

  ]
})
