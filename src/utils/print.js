import _ from 'lodash'

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
