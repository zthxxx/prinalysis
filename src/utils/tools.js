import _ from 'lodash';
import moment from 'moment';
import crypto from 'crypto';
import { mapState, mapMutations } from 'vuex';

export const md5 = str => crypto.createHash('md5').update(str).digest('hex');

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
  }).format(cents / 100);

/**
 * 格式化 UNXI 时间戳
 * @param {string | number} timestamp - UNXI 时间戳，毫秒
 * @return {string} - 年月日方式显示的时间
 */
export const formatDate = timestamp => moment(Number(timestamp)).format('YYYY-MM-DD HH:MM');

export const sideMap = {
  oneside: 1,
  duplex: 2
};

export const printTypeMap = {
  mono: '黑白',
  colorful: '彩色',
  '1': '单面',
  '2': '双面'
};

/**
 * 获取打印计费项目名称
 * @param {string} size
 * @param {string} caliper
 * @param {string} color
 * @param {string | number} side - 1 或 2
 * @return {string} - 计费项目名
 */
export const getBillingItem = ({ size, caliper, color, side }) =>
  `${size} ${caliper}纸${printTypeMap[color]}${printTypeMap[side]}`;

export const orderStateMap = {
  PAYING: '待支付',
  PAID: '已支付',
  PRINTED: '待取件',
  FINISH: '已取件',
  CANCEL: '已取消',
  REFUNDING: '待退款',
  REFUNDED: '已退款'
};

export const checkset = (price, setting) => {
  if (!price) return setting;
  let checks = ['color', 'side'];
  let reset = {};
  let types = null;
  price.map(({ size, caliper, money }) => {
    if (setting['size'] == size && setting['caliper'] == caliper) {
      types = money;
    }
  });
  if (!types) {
    let { size, caliper, money } = price[0];
    reset = { size, caliper };
    types = money;
  }
  for (let key of checks) {
    let item = setting[key];
    if (!_.has(types, item)) {
      item = _.keys(types).sort().shift();
      reset[key] = item;
    }
    types = types[item];
  }
  if (_.has(reset, 'side')) {
    reset.side = sideMap[reset.side];
  }
  return {
    ...setting,
    ...reset
  };
};

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
  };
  return checkset(_.get(point, 'price'), defaults);
};

/**
 * 去抖动函数，等多次频繁调用的函数在全部调用完后才执行
 * @param {function} func - 待执行去抖动的函数
 * @param {number} wait - 等待时间，毫秒
 * @returns {Function}
 */
export const debounce = (func, wait) => {
  let timeout = null;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * 节流函数，多次频繁调用的函数按固定时间间隔执行
 * @param {function} func - 待执行节流的函数
 * @param {number} wait - 等待时间，毫秒
 * @returns {Function}
 */
export const throttle = (func, rate) => {
  let timeout = null;
  let start = new Date();
  return function (...args) {
    let current = new Date();
    clearTimeout(timeout);
    if (current - start >= rate) {
      func(...args);
      start = current;
    } else {
      timeout = setTimeout(() => func(...args), rate);
    }
  };
};

/**
 * 映射双向绑定的 state 属性， get 获取，set 提交 mutation
 * 使用方式同 mapStates mapMutations https://vuex.vuejs.org/zh-cn/mutations.html#在组件中提交-mutations
 * @param {string} [namespace] - 指定 state 所属的模块名，可选项
 * @param {string[] | {string: string}[]} states - 指定 state 的变量名和对应 mutation 的名称
 * @return {{get, set}}
 */
export const mapModel = (namespace, states = namespace) => {
  let maps = {};
  if (_.isArray(states)) {
    let statemaps = {};
    states.forEach(x => { statemaps[x] = x });
    states = statemaps;
  }
  for (let state in states) {
    let mutation = states[state];
    let gets = [{ get: state }];
    let sets = [{ set: mutation }];
    if (_.isString(namespace)) {
      gets.unshift(namespace);
      sets.unshift(namespace);
    }
    maps[state] = {
      ...mapState(...gets),
      ...mapMutations(...sets)
    };
  }
  return maps;
};

/**
 * 生成全局弹窗组件的 install 方法
 * @param {ComponentOptions<Vue>} component - 作为全局弹窗的 Vue 组件，组件必须包含 `open` 和 `close` 方法，
 * `close` 方法中应显式调用 $nextTick($destroy) 销毁自身示例
 * @param {string} handle - 要注入到 Vue 原型上的方法调用名，以 `$` 开头
 * @return {function} - 返回一个组件的 install 方法，此方法中将在 Vue 原型上注入一个可以接收 props 的调用该组件的方法
 */
export const globalPopupInstaller = (component, handle) => Vue => {
  Vue.prototype[handle] = (propsData = {}) => {
    let constructor = Vue.extend(component);
    let instance = new constructor({ propsData });
    document.body.append(instance.$mount().$el);
    return instance.open();
  };
};
