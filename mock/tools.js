import crypto from 'crypto'
import { Random } from 'mockjs'

export const md5 = str => crypto.createHash('md5').update(str).digest('hex')

export const randomMD5 = () => md5(Random.ctitle())

export const randomAvatar = () => `https://www.gravatar.com/avatar/${md5(Random.email())}?d=retro&s=96`
