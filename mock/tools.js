import crypto from 'crypto'
import { Random } from 'mockjs'

export const md5 = str => crypto.createHash('md5').update(str).digest('hex')

export const randomMD5 = () => md5(Random.ctitle())

export const randomAvatar = () => `https://www.gravatar.com/avatar/${md5(Random.email())}?d=retro&s=96`

export const extract = (arr, min = 0, max = arr.length) => () => {
  let len = ~~(Math.random() * (max - min + 1) + min)
  if (len >= arr.length) return arr
  if (len === 0) return []
  let start = ~~(Math.random() * (arr.length - len + 1))
  return arr.slice(start, start + len)
}
