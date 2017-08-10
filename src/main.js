import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import './style/fontawesome-prefix.less'

Vue.use(ElementUI);

new Vue({
  el: '#app',
  router,
  render: createElement => createElement(App)
});
