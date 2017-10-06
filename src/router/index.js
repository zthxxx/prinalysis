import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const home = () => import('@/pages/Home');
const print = () => import('@/pages/Print');
const user = () => import('@/pages/User');
import orderList from '@/components/manageBoard/OrderList'

const routes = [
  {
    path: '/',
    redirect: {name: 'home'}
  },
  {
    path: '/home',
    component: home,
    name: 'home',
  },
  {
    path: '/print',
    component: print,
    name: 'print',
  },
  {
    path: '/library',
    name: 'library',
  },
  {
    path: '/user',
    redirect: '/user/order',
    component: user,
    name: 'user',
    children: [
      {
        path: 'order',
        component: orderList,
        meta: {header: orderList.header}
      }
    ]
  }
];

export default new Router({
  mode: 'history',
  routes,
  strict: process.env.NODE_ENV !== 'production'
})
