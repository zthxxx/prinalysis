import moment from 'moment'

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
