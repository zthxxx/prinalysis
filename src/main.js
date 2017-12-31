import Vue from 'vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './style/fontawesome-prefix.less'
import App from './App.vue'
import popups from '$@/Popups'
import { routeIdentify } from './utils/tools'

Vue.use(ElementUI)
Vue.use(popups)

Vue.mixin({
  store
})

router.beforeEach((to, from, next) => {
  let user = store.state.user.user
  routeIdentify(to.matched, user)
    .then(() => next())
    .catch(() => next({ name: 'index' }))
})

new Vue({
  router,
  render: h => h(App)
}).$mount('main')
