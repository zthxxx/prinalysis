import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const home = r => require.ensure([], () => r(require('@/pages/Home')), 'home');
const print = r => require.ensure([], () => r(require('@/pages/Print')), 'print');
const user = r => require.ensure([], () => r(require('@/pages/User')), 'user');

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
    component: user,
    name: 'user'
  }
];

export default new Router({
  routes,
  strict: process.env.NODE_ENV !== 'production'
})
