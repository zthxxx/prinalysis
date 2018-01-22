import { mapMutations, mapState } from 'vuex'
import _ from 'lodash'

/**
 * 映射双向绑定的 state 属性， get 获取，set 提交 mutation
 * 使用方式同 mapStates mapMutations https://vuex.vuejs.org/zh-cn/mutations.html#在组件中提交-mutations
 * @param {string} [namespace] - 指定 state 所属的模块名，可选项
 * @param {string[] | {string: string}} states - 指定 state 的变量名和对应 mutation 的名称
 * @return {{get, set}}
 */
export const mapModel = (namespace, states = namespace) => {
  let maps = {}
  if (_.isArray(states)) {
    let statemaps = {}
    states.forEach(x => { statemaps[x] = x })
    states = statemaps
  }
  for (let state in states) {
    let mutation = states[state]
    let gets = [{ get: state }]
    let sets = [{ set: mutation }]
    if (_.isString(namespace)) {
      gets.unshift(namespace)
      sets.unshift(namespace)
    }
    maps[state] = {
      ...mapState(...gets),
      ...mapMutations(...sets)
    }
  }
  return maps
}


const globalMount = (Vue, component, propsData) => {
  let constructor = Vue.extend(component)
  let instance = new constructor({ propsData })
  document.body.append(instance.$mount().$el)
  return instance.open()
}

/**
 * 生成全局挂载组件的 install 方法
 * @param {string} handle - 要注入到 Vue 原型上的方法调用名，以 `$` 开头
 * @param {ComponentOptions<Vue>} component - 作为全局挂载的 Vue 组件，组件必须包含 `open` 和 `close` 方法，
 * `close` 方法中应显式调用 $nextTick($destroy) 销毁自身示例
 * @return {function} - 返回一个组件的 install 方法，此方法中将在 Vue 原型上注入一个可以接收 props 的调用该组件的方法
 */
export const globalMountInstaller = (handle, component) => Vue => {
  Vue.prototype[handle] = (propsData = {}) => globalMount(Vue, component, propsData)
}

/**
 * 同步懒加载组件，生成全局挂载组件的 install 方法
 * @param {string} handle - 要注入到 Vue 原型上的方法调用名，以 `$` 开头
 * @param {function} loader - 使用 import() 异步加载的 vue component 的方法
 * @return {function} - 返回一个组件的 install 方法，此方法中将在 Vue 原型上注入一个可以接收 props 的调用该组件的方法
 */
export const asyncGlobalMountInstaller = (handle, loader) => Vue => {
  Vue.prototype[handle] = (propsData = {}) => loader()
    .then(({ default: component }) => globalMount(Vue, component, propsData))
}
