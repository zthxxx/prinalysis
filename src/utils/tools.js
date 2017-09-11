/*
 把人名币分值格式化到元
 */
export const formatCNY = (cents) => new Intl.NumberFormat(
  'zh-CN',
  {
    style: 'currency',
    currency: 'CNY'
  }).format(cents / 100);

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
