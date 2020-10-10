import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/Doll.vue').default
    },
    // {
    //   path: '/mini',
    //   name: 'landing-page',
    //   component: require('@/components/Mini').default
    // },
    // {
    //   path: '/drink',
    //   name: 'drink',
    //   component: require('@/components/drinkWater').default
    // },
    // {
    //   path: '/doll',
    //   name: 'doll',
    //   component: require('@/components/Doll').default
    // },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
