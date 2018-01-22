import _ from 'lodash'

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
