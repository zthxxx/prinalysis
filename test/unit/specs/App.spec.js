import { Vue, router } from '../util'
import App from '@/App.vue'

describe('App.vue', () => {
  it('It shoule be a app', () => {
    const Constructor = Vue.extend(App)
    const vm = new Constructor({router}).$mount()
    expect(vm).to.equal(vm)
  })
})
