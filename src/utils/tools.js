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
  let checks = ['size', 'caliper', 'color', 'side'];
  let reset = {};
  let choices = price;
  for (let key of checks) {
    let item = setting[key];
    if (!_.has(choices, item)) {
      item = _.keys(choices).sort().shift();
      reset[key] = item;
    }
    choices = choices[item];
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
