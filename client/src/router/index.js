import Vue from 'vue'
import Router from 'vue-router'
import CDs from '@/components/CDs'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CDs',
      component: CDs,
      props: true
    },
    { 
      path: '*', 
      redirect: '/'
    }
  ],
  mode: 'history',
  base: __dirname
})