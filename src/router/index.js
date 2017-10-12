import Vue from 'vue';
import Router from 'vue-router';

const home = () => import('@/pages/Home');
const print = () => import('@/pages/Print');
const user = () => import('@/pages/User');
import order from '@/components/ManageBoard/Order';
import personal from '@/components/ManageBoard/Personal';

Vue.use(Router);

const routes = [
  {
    path: '/',
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
    name: 'library'
  },
  {
    path: '/user',
    redirect: '/user/order',
    component: user,
    name: 'user',
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
  }
];

export default new Router({
  mode: 'history',
  routes,
  strict: process.env.NODE_ENV !== 'production'
});
