import _ from 'lodash'

/*
 把人名币分值格式化到元
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
