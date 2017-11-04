import Vue from 'vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import './style/fontawesome-prefix.less';
import App from './App.vue';
import popups, { POPUP_LOGIN } from '$@/Popups';

Vue.use(ElementUI);
Vue.use(popups);

Vue.mixin({
  store
});

router.beforeEach((to, from, next) => {
  const permission = (access) => {
    if (!access) return true;
    let user = store.state.user.user;
    return access.includes(user && user.access);
  };
  for (let matched of to.matched) {
    let { access } = matched.meta;
    if (!permission(access)) {
      router.app[POPUP_LOGIN]()
        .then(() => {
          if (!permission(access)) {
            throw Error('User logged in now, but also not permission');
          }
        })
        .then(() => next())
        .catch(() => next({ name: 'index' }));
      return;
    }
  }
  next();
});

new Vue({
  router,
  render: h => h(App)
}).$mount('main');
