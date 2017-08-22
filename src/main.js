import Vue from 'vue'
import VueResource from 'vue-resource'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import './style/fontawesome-prefix.less'

Vue.use(ElementUI);
Vue.use(VueResource);

new Vue({
  el: '#app',
  router,
  store,
  render: createElement => createElement(App)
});
