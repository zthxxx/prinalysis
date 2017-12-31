import Vue from 'vue'
import Router from 'vue-router'

const home = () => import('@/pages/Home')
const print = () => import('@/pages/Print')
const library = () => import('@/pages/Library')
const user = () => import('@/pages/User')
import order from '$@/Business/ManageBoard/Order'
import personal from '$@/Business/ManageBoard/Personal'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: { name: 'home' }
  },
  {
    path: '/home',
    component: home,
    name: 'home'
  },
  {
    path: '/print',
    component: print,
    name: 'print'
  },
  {
    path: '/library',
    component: library,
    name: 'library'
  },
  {
    path: '/user',
    redirect: '/user/order',
    component: user,
    name: 'user',
    meta: { access: ['user', 'vendor', 'manager'] },
    children: [
      {
        path: 'order',
        name: 'user-order',
        component: order,
        meta: { header: order.header }
      },
      {
        path: 'info',
        component: personal,
        meta: { header: personal.header }
      }
    ]
  },
  {
    path: '*',
    redirect: { name: 'index' }
  }
]

export default new Router({
  mode: 'history',
  routes,
  strict: process.env.NODE_ENV !== 'production'
})
