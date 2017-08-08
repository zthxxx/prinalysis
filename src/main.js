import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import './style/fontawesome-prefix.less'

Vue.use(ElementUI);

new Vue({
  el: '#app',
  render: createElement => createElement(App)
});
