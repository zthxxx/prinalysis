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
  for (let matched of to.matched) {
    let { access } = matched.meta;
    let user = store.state.user.user;
    if (access && !access.includes(user && user.access)) {
      router.app[POPUP_LOGIN]()
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
