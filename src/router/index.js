import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const home = () => import('@/pages/Home');
const print = () => import('@/pages/Print');
const user = () => import('@/pages/User');

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
    path: '/user/:id',
    component: user,
    name: 'user'
  },
  {
    path: '/user',
    redirect: '/user/order'
  }
];

export default new Router({
  mode: 'history',
  routes,
  strict: process.env.NODE_ENV !== 'production'
})
