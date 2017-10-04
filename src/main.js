import Vue from 'vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './style/fontawesome-prefix.less'
import App from './App.vue'
import loginCard from '@/components/LoginCard'
import filePreview from '@/components/FilePreview'
import payBox from '@/components/PayBox'

Vue.use(ElementUI);

Vue.use(loginCard);
Vue.use(filePreview);
Vue.use(payBox);

Vue.mixin({
  router,
  store
});

new Vue({
  el: '#app',
  render: h => h(App)
});
