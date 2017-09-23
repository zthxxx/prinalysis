import _ from 'lodash'
import {mapState, mapMutations} from 'vuex'

/**
 * 把人名币分值格式化到元
 * @param cents {Number} 以分为单位的人名币数值
 * return 以元为单位的人名币数值
 */
export const formatCNY = (cents) => new Intl.NumberFormat(
  'zh-CN',
  {
    style: 'currency',
    currency: 'CNY'
  }).format(cents / 100);

export const sideMap = {
  oneside: 1,
  duplex: 2
};

export const checkset = (price, setting) => {
  if (!price) return setting;
  let checks = ['color', 'side'];
  let reset = {};
  let types = null;
  price.map(({size, caliper, money}) => {
    if (setting['size'] == size && setting['caliper'] == caliper) {
      types = money;
    }
  });
  if (!types) {
    let {size, caliper, money} = price[0];
    reset = {size, caliper};
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
  }
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

export const debounce = (func, wait) => {
  let timeout = null;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

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
  }
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
    states.map(x => statemaps[x] = x);
    states = statemaps;
  }
  for (let state in states) {
    let mutation = states[state];
    let gets = [{get: state}];
    let sets = [{set: mutation}];
    if (_.isString(namespace)) {
      gets.unshift(namespace);
      sets.unshift(namespace);
    }
    maps[state] = {
      ...mapState(...gets),
      ...mapMutations(...sets)
    }
  }
  return maps;
};
