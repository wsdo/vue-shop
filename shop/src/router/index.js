import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '~/GoodsList'
import Cart from '~/Cart'

Vue.use(Router)

export default new Router({
  'mode': 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: GoodsList
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    }
  ]
})
