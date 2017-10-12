import Vue from 'vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import './style/fontawesome-prefix.less';
import App from './App.vue';
import popups from '@/components/Popups';

Vue.use(ElementUI);
Vue.use(popups);

Vue.mixin({
  store
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
