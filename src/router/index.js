import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import Signin from '@/components/Signin.vue'
import Signup from '@/components/Signup.vue'
import Loans from '@/components/Loans.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/loans',
      name: 'Loans',
      component: Loans
    }
  ]
})
