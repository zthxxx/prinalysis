import Vue from 'vue'
import ElementUI from 'element-ui'
Vue.use(ElementUI)

export const creatVM = (component, propsData, mount = true) => {
  let constructor = Vue.extend(component)
  let instance = new constructor({ propsData })
  if (mount) instance.$mount()
  return instance
}
