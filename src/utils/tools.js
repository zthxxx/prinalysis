import Vue from 'vue'
import _ from 'lodash'
import moment from 'moment'
import { mapMutations, mapState } from 'vuex'
import { POPUP_LOGIN } from '$@/Popups'

/**
 * 把人名币分值格式化到元
 * @param cents {Number} 以分为单位的人名币数值
 * return 以元为单位的人名币数值
 */
export const formatCNY = cents => new Intl.NumberFormat(
  'zh-CN',
  {
    style: 'currency',
    currency: 'CNY'
  }).format(cents / 100)

/**
 * 格式化 UNXI 时间戳
 * @param {string | number} timestamp - UNXI 时间戳，毫秒
 * @return {string} - '年-月-日 时:分' 方式显示的时间
 */
export const formatTime = timestamp => moment(Number(timestamp)).format('YYYY-MM-DD HH:mm')
/**
 * 格式化 UNXI 时间戳到日期
 * @param {string | number} timestamp - UNXI 时间戳，毫秒
 * @return {string} - '年-月-日' 方式显示的日期
 */
export const formatDate = timestamp => moment(Number(timestamp)).format('YYYY-MM-DD')

export const sideMap = {
  oneside: 1,
  duplex: 2
}

export const printTypeMap = {
  mono: '黑白',
  colorful: '彩色',
  '1': '单面',
  '2': '双面'
}

/**
 * 获取打印计费项目名称
 * @param {string} size
 * @param {string} caliper
 * @param {string} color
 * @param {string | number} side - 1 或 2
 * @return {string} - 计费项目名
 */
export const getBillingItem = ({ size, caliper, color, side }) =>
  `${size} ${caliper}纸${printTypeMap[color]}${printTypeMap[side]}`

export const orderStateMap = {
  PAYING: '待支付',
  PAID: '已支付',
  PRINTED: '待取件',
  FINISH: '已取件',
  CANCEL: '已取消',
  REFUNDING: '待退款',
  REFUNDED: '已退款'
}

/**
 * 获取对象或列表的第一个键（值）
 * 如果预设值在映射的键或列表的值中就直接返回，否则就取第一个键或值
 * @param {Array | object} map - 数据映射或列表
 * @param {string} current - 当前预设值
 * @param {boolean} defaultAll - 对于列表，预设不存在时是否默认为 ALL；为`false`表示取第一项
 * @returns {string} - 取值
 */
export const getFirstKey = (map, current, defaultAll = true) => {
  if (map instanceof Array) {
    if (map.includes(current)) return current
    return defaultAll ? 'ALL' : _.find(map)
  }
  if (_.has(map, current)) return current
  return _.findKey(map)
}

export const checkset = (price, setting) => {
  if (!price) return setting
  let reset = {}
  let types = null
  price.forEach(({ size, caliper, money }) => {
    if (setting['size'] === size && setting['caliper'] === caliper) {
      types = money
    }
  })
  if (!types) {
    let { size, caliper, money } = price[0]
    reset = { size, caliper }
    types = money
  }
  let color = setting.color
  if (!_.has(types, color)) {
    color = _.keys(types).sort().shift()
    reset.color = color
  }
  types = types[color]

  if (!_.has(types, _.invert(sideMap)[setting.side])) {
    reset.side = _.get(sideMap, _.keys(types).shift())
  }

  return {
    ...setting,
    ...reset
  }
}

export const presetPrint = (pageInfo, point) => {
  let defaults = {
    copies: 1,
    size: 'A4',
    caliper: '70g',
    color: 'mono',
    side: 1,
    row: 1,
    col: 1,
    startPage: 1,
    endPage: _.get(pageInfo, ['pageCount'], 1)
  }
  return checkset(_.get(point, 'price'), defaults)
}

/**
 * 去抖动函数，等多次频繁调用的函数在全部调用完后才执行
 * @param {function} func - 待执行去抖动的函数
 * @param {number} wait - 等待时间，毫秒
 * @returns {Function}
 */
export const debounce = (func, wait) => {
  let timeout = null
  return function (...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * 节流函数，多次频繁调用的函数按固定时间间隔执行
 * @param {function} func - 待执行节流的函数
 * @param {number} wait - 等待时间，毫秒
 * @returns {Function}
 */
export const throttle = (func, rate) => {
  let timeout = null
  let start = new Date()
  return function (...args) {
    let current = new Date()
    clearTimeout(timeout)
    if (current - start >= rate) {
      func(...args)
      start = current
    } else {
      timeout = setTimeout(() => func(...args), rate)
    }
  }
}

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

export const routeIdentify = (matches, user) => {
  const permission = (access) => {
    if (!access) return true
    if (!user) return false
    return access.includes(user.access)
  }
  for (let matched of matches) {
    let { access } = matched.meta
    if (!permission(access)) {
      let login = new Vue()[POPUP_LOGIN]
      return login()
        .then(() => {
          if (!permission(access)) {
            throw Error('User logged in now, but also not permission')
          }
        })
    }
  }
  return new Promise(resolve => resolve())
}

export const userCheckRules = {
  username: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^[0-9]{11}$/, message: '请输入正确长度的手机号', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 8, max: 20, message: '请输入8-20位密码', trigger: 'blur' }
  ],
  nickname: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { max: 20, message: '名字不能超过20位哦', trigger: 'blur' }
  ],
  captcha: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { min: 6, max: 6, message: '请输入 6 位验证码', trigger: 'blur' }
  ]
}
